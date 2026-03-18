import { NextRequest, NextResponse } from "next/server";
import { addSubscriber } from "@/lib/db";
import { sendWelcomeEmail } from "@/lib/mail";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const { email, locale } = (await req.json()) as {
      email?: string;
      locale?: string;
    };

    if (!email || !EMAIL_RE.test(email)) {
      return NextResponse.json(
        { error: "invalid_email" },
        { status: 400 }
      );
    }

    const result = addSubscriber(email, locale || "tr");

    if (!result.already) {
      try {
        await sendWelcomeEmail(email, locale || "tr");
      } catch (mailErr) {
        console.error("Failed to send welcome email:", mailErr);
      }
    }

    return NextResponse.json({
      success: true,
      already: result.already,
    });
  } catch (err) {
    console.error("Subscribe error:", err);
    return NextResponse.json(
      { error: "server_error" },
      { status: 500 }
    );
  }
}
