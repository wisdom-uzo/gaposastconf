import { NextResponse } from 'next/server';
import { createRegistration, getRegistrationByEmail } from '@/lib/astra';

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = [
      'firstName',
      'lastName', 
      'email',
      'phone',
      'institution',
      'department',
      'country',
      'state',
      'registrationType'
    ];

    const missingFields = requiredFields.filter(field => !body[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { 
          error: 'Missing required fields', 
          missingFields 
        },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingRegistration = await getRegistrationByEmail(body.email);
    if (existingRegistration) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 409 }
      );
    }

    // Create the registration
    const result = await createRegistration({
      firstName: body.firstName.trim(),
      middleName: body.middleName?.trim() || '',
      lastName: body.lastName.trim(),
      email: body.email.toLowerCase().trim(),
      phone: body.phone.trim(),
      institution: body.institution.trim(),
      department: body.department.trim(),
      country: body.country.trim(),
      state: body.state.trim(),
      registrationType: body.registrationType,
    });

    return NextResponse.json(
      { 
        message: 'Registration successful',
        registrationId: result.id
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Registration API error:', error);
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Registration API endpoint' },
    { status: 200 }
  );
}