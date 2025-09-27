import { NextResponse } from 'next/server';
import { createPaperSubmission, getPaperSubmissionByEmail } from '../../../lib/astra-papers';

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = [
      'title',
      'authorName', 
      'authorEmail',
      'authorPhone',
      'authorInstitution',
      'presentationType',
      'researchArea',
      'keywords',
      'abstractFile'
    ];

    // Check for missing required fields
    const missingFields = requiredFields.filter(field => !body[field]);
    if (missingFields.length > 0) {
      return NextResponse.json(
        { 
          success: false, 
          message: `Missing required fields: ${missingFields.join(', ')}` 
        },
        { status: 400 }
      );
    }

    // Check if email already has a submission
    try {
      const existingSubmission = await getPaperSubmissionByEmail(body.authorEmail);
      if (existingSubmission) {
        return NextResponse.json(
          { 
            success: false, 
            message: 'A paper submission already exists for this email address.' 
          },
          { status: 409 }
        );
      }
    } catch (error) {
      console.error('Error checking existing submission:', error);
      // Continue with submission if check fails
    }

    // Process and clean the data
    const submissionData = {
      title: body.title.trim(),
      authorName: body.authorName.trim(),
      authorEmail: body.authorEmail.toLowerCase().trim(),
      authorPhone: body.authorPhone.trim(),
      authorInstitution: body.authorInstitution.trim(),
      presentationType: body.presentationType,
      researchArea: body.researchArea,
      keywords: body.keywords.trim(),
      abstractFile: body.abstractFile,
      fullPaperFile: body.fullPaperFile || null,
    };

    // Create the paper submission
    const result = await createPaperSubmission(submissionData);

    if (result.success) {
      return NextResponse.json(
        { 
          success: true, 
          message: 'Paper submitted successfully!',
          submissionId: result.id
        },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Failed to submit paper. Please try again.' 
        },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Paper submission API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error. Please try again later.' 
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Paper submission API endpoint' },
    { status: 200 }
  );
}