import { NextResponse } from "next/server";
import { getSubscriberCount } from "@/lib/db";

export async function GET() {
  try {
    const count = await getSubscriberCount();
    return NextResponse.json({ count });
  } catch (err) {
    console.error("Waitlist count error:", err);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
