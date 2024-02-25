import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { username, password } = await req.json();
  } catch (error) {
    return NextResponse.json(
      {
        message: "Something went wrong, please try again later!",
      },
      { status: 500 }
    );
  }
}
