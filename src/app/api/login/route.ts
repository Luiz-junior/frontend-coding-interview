import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: "Required fields" }, { status: 400 });
  }

  if (email === "user@email.com" && password === "123") {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ error: "Inválid Credentials" }, { status: 401 });
  }
}
