import { NextResponse } from "next/server";
import { getSubscriberCount } from "@/lib/db";

export async function GET() {
  const count = getSubscriberCount();
  return NextResponse.json({ count });
}
