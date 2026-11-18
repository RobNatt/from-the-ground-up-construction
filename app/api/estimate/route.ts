import { NextResponse } from "next/server";
import { contactTimes, projectTypes } from "@/lib/site";

/**
 * Estimate request endpoint.
 * PLACEHOLDER DELIVERY: this validates and logs the lead but does not send it anywhere yet.
 * Wire it to email (e.g. Resend/Postmark) or a CRM before launch.
 */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  // Honeypot: bots fill hidden fields. Pretend success.
  if (typeof body.company === "string" && body.company.trim()) return NextResponse.json({ ok: true });

  const str = (v: unknown, max = 200) => (typeof v === "string" ? v.trim().slice(0, max) : "");
  const lead = {
    name: str(body.name, 100),
    phone: str(body.phone, 30),
    location: str(body.location, 200),
    projectType: str(body.projectType, 20),
    bestTime: str(body.bestTime, 20),
    receivedAt: new Date().toISOString(),
  };

  const errors: string[] = [];
  if (!lead.name) errors.push("name");
  if (lead.phone.replace(/\D/g, "").length < 10) errors.push("phone");
  if (!lead.location) errors.push("location");
  if (!(projectTypes as readonly string[]).includes(lead.projectType)) errors.push("projectType");
  if (lead.bestTime && !(contactTimes as readonly string[]).includes(lead.bestTime)) errors.push("bestTime");
  if (errors.length) return NextResponse.json({ ok: false, errors }, { status: 422 });

  // TODO: deliver the lead to Donavan (email/SMS/CRM).
  console.info("[estimate] new request", lead);

  return NextResponse.json({ ok: true });
}
