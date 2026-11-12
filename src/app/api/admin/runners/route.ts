import { NextResponse } from "next/server";
import {
  getAllRegistrations,
  addRegistration,
  getAdminMetrics,
} from "@/data/registrationsStore";

export async function GET() {
  try {
    const runners = getAllRegistrations();
    const metrics = getAdminMetrics();
    return NextResponse.json({
      success: true,
      runners,
      metrics,
    });
  } catch (error) {
    console.error("Admin runners GET error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch registrations" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.fullName || !body.email || !body.phone || !body.categoryCode) {
      return NextResponse.json(
        { success: false, message: "Missing required runner fields" },
        { status: 400 }
      );
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const bibPrefix = body.categoryCode.toUpperCase();
    const bibNumber = body.bibNumber || `PPM-${bibPrefix}-${randomSuffix}`;
    const transactionId = `OFFLINE-${Date.now().toString(36).toUpperCase()}`;

    const corralMap: Record<string, string> = {
      "21k": "Corral A (Half Marathon)",
      "10k": "Corral B (10K Challenge)",
      "5k": "Family Corral C (5K Fun Run)",
    };

    const newRunner = addRegistration({
      bibNumber,
      transactionId,
      fullName: body.fullName,
      bibName: (body.bibName || body.fullName.split(" ")[0]).toUpperCase(),
      email: body.email,
      phone: body.phone,
      gender: body.gender || "male",
      dob: body.dob || "1995-01-01",
      city: body.city || "Patna",
      emergencyContactName: body.emergencyContactName || "Parent / Kin",
      emergencyContactPhone: body.emergencyContactPhone || body.phone,
      categoryCode: body.categoryCode,
      tShirtSize: body.tShirtSize || "L",
      corral: corralMap[body.categoryCode] || "Corral Gate 1",
      medicalNotes: body.medicalNotes || "Admin Manual Registration",
    });

    return NextResponse.json({
      success: true,
      message: "Runner added successfully",
      runner: newRunner,
    });
  } catch (error) {
    console.error("Admin runners POST error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to add runner" },
      { status: 500 }
    );
  }
}

