import { NextResponse } from "next/server";
import { getEventControl } from "@/data/eventControlStore";

export const dynamic = "force-dynamic";

export async function GET() {
  const status = getEventControl();
  return NextResponse.json({
    success: true,
    registrationsOpen: status.registrationsOpen,
    registrationNotice: status.registrationNotice,
    emergencyAlert: status.emergencyAlert,
    raceMode: status.raceMode,
    eventSchedule: status.eventSchedule,
    categoryQuotas: status.categoryQuotas,
    paymentSettings: status.paymentSettings,
  });
}
