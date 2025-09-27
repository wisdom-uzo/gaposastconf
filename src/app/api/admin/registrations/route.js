import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { 
  getAllRegistrations, 
  updateRegistration, 
  deleteRegistration 
} from "@/lib/astra";

// GET - Fetch all registrations
export async function GET(request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const registrations = await getAllRegistrations();
    return NextResponse.json(registrations);
  } catch (error) {
    console.error("Error fetching registrations:", error);
    return NextResponse.json(
      { error: "Failed to fetch registrations" },
      { status: 500 }
    );
  }
}

// PUT - Update registration
export async function PUT(request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, ...updateData } = await request.json();
    
    if (!id) {
      return NextResponse.json(
        { error: "Registration ID is required" },
        { status: 400 }
      );
    }

    const updatedRegistration = await updateRegistration(id, updateData);
    
    if (updatedRegistration) {
      return NextResponse.json(updatedRegistration);
    } else {
      return NextResponse.json(
        { error: "Registration not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error updating registration:", error);
    return NextResponse.json(
      { error: "Failed to update registration" },
      { status: 500 }
    );
  }
}

// DELETE - Delete registration
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
        { error: "Registration ID is required" },
        { status: 400 }
      );
    }

    const deleted = await deleteRegistration(id);

    if (deleted) {
      return NextResponse.json({ message: "Registration deleted successfully" });
    } else {
      return NextResponse.json(
        { error: "Registration not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error deleting registration:", error);
    return NextResponse.json(
      { error: "Failed to delete registration" },
      { status: 500 }
    );
  }
}