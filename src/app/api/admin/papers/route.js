import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { 
  getAllPaperSubmissions, 
  updatePaperSubmission, 
  deletePaperSubmission 
} from "@/lib/astra-papers";

// GET - Fetch all papers
export async function GET(request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const papers = await getAllPaperSubmissions();
    return NextResponse.json(papers);
  } catch (error) {
    console.error("Error fetching papers:", error);
    return NextResponse.json(
      { error: "Failed to fetch papers" },
      { status: 500 }
    );
  }
}

// PUT - Update paper status/review
export async function PUT(request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, status, reviewNotes, ...updateData } = await request.json();
    
    if (!id) {
      return NextResponse.json(
        { error: "Paper ID is required" },
        { status: 400 }
      );
    }

    const updatedPaper = await updatePaperSubmission(id, {
      ...updateData,
      status: status,
      reviewNotes: reviewNotes,
      reviewedAt: new Date().toISOString(),
      reviewedBy: session.username,
    });

    if (updatedPaper) {
      return NextResponse.json(updatedPaper);
    } else {
      return NextResponse.json(
        { error: "Paper not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error updating paper:", error);
    return NextResponse.json(
      { error: "Failed to update paper" },
      { status: 500 }
    );
  }
}

// DELETE - Delete paper
export async function DELETE(request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Paper ID is required" },
        { status: 400 }
      );
    }

    const deleted = await deletePaperSubmission(id);

    if (deleted) {
      return NextResponse.json({ message: "Paper deleted successfully" });
    } else {
      return NextResponse.json(
        { error: "Paper not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error deleting paper:", error);
    return NextResponse.json(
      { error: "Failed to delete paper" },
      { status: 500 }
    );
  }
}