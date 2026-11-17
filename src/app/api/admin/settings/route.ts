import { NextResponse } from "next/server";
import {
  getEventControl,
  updateEventControl,
  addIncident,
  toggleIncidentStatus,
} from "@/data/eventControlStore";
import { ADMIN_CREDENTIALS } from "@/data/adminCredentials";

export const dynamic = "force-dynamic";

export async function GET() {
  const control = getEventControl();
  return NextResponse.json({
    success: true,
    control,
    currentAdminUsername: ADMIN_CREDENTIALS.username,
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, payload } = body;

    if (action === "update_control") {
      const updated = updateEventControl(payload);
      return NextResponse.json({ success: true, control: updated });
    }

    if (action === "toggle_registrations") {
      const current = getEventControl();
      const updated = updateEventControl({
        registrationsOpen: !current.registrationsOpen,
        registrationNotice: !current.registrationsOpen
          ? "Official Registrations are Live for 7 Feb 2027 at JP Ganga Path."
          : "Registrations are currently PAUSED by the Race Director.",
      });
      return NextResponse.json({ success: true, control: updated });
    }

    if (action === "toggle_emergency_alert") {
      const current = getEventControl();
      const updated = updateEventControl({
        emergencyAlert: {
          ...current.emergencyAlert,
          active: payload?.active !== undefined ? payload.active : !current.emergencyAlert.active,
          message: payload?.message || current.emergencyAlert.message,
          type: payload?.type || current.emergencyAlert.type,
          updatedAt: new Date().toISOString(),
        },
      });
      return NextResponse.json({ success: true, control: updated });
    }

    if (action === "add_incident") {
      const newInc = addIncident(payload);
      return NextResponse.json({ success: true, incident: newInc, control: getEventControl() });
    }

    if (action === "toggle_incident") {
      const updatedItem = toggleIncidentStatus(payload.id);
      return NextResponse.json({ success: true, incident: updatedItem, control: getEventControl() });
    }

    if (action === "update_credentials") {
      const { newUsername, newPassword } = payload;
      if (!newUsername || !newPassword) {
        return NextResponse.json(
          { success: false, error: "Username and password cannot be empty." },
          { status: 400 }
        );
      }
      ADMIN_CREDENTIALS.username = newUsername.trim();
      ADMIN_CREDENTIALS.password = newPassword.trim();
      return NextResponse.json({
        success: true,
        message: "Admin credentials successfully updated in real-time.",
      });
    }

    return NextResponse.json({ success: false, error: "Unknown action" }, { status: 400 });
  } catch (err) {
    console.error("Admin settings error:", err);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
