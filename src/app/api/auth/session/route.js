import { getSession } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getSession();
    
    if (session) {
      return Response.json({ authenticated: true, user: session });
    } else {
      return Response.json({ authenticated: false }, { status: 401 });
    }
  } catch (error) {
    return Response.json({ error: "Session check failed" }, { status: 500 });
  }
}