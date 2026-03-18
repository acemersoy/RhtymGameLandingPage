import { NextRequest, NextResponse } from "next/server";
import { getAllUnnotified, markNotified } from "@/lib/db";
import { sendLaunchNotification } from "@/lib/mail";

export async function POST(req: NextRequest) {
  const auth = req.headers.get("authorization");
  const secret = process.env.NOTIFY_SECRET;

  if (!secret || auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const subscribers = await getAllUnnotified();
  let sent = 0;
  let failed = 0;

  for (const sub of subscribers) {
    try {
      await sendLaunchNotification(sub.email, sub.locale);
      await markNotified(sub.id);
      sent++;
    } catch (err) {
      console.error(`Failed to notify ${sub.email}:`, err);
      failed++;
    }
  }

  return NextResponse.json({ sent, failed, total: subscribers.length });
}
