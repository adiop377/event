import { NextResponse } from "next/server";
import { z } from "zod";
import { addRegistration } from "@/data/registrationsStore";

const registrationSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  gender: z.enum(["male", "female", "other"], {
    errorMap: () => ({ message: "Please select gender" }),
  }),
  dob: z.string().min(4, "Please enter your date of birth"),
  city: z.string().min(2, "City of residence is required"),
  emergencyContactName: z.string().min(2, "Emergency contact name is required"),
  emergencyContactPhone: z.string().min(10, "Emergency phone must be at least 10 digits"),
  categoryCode: z.enum(["5k", "10k", "21k"], {
    errorMap: () => ({ message: "Please select a race category" }),
  }),
  bibName: z.string().min(2, "Bib name must be at least 2 characters"),
  tShirtSize: z.enum(["XS", "S", "M", "L", "XL", "XXL"], {
    errorMap: () => ({ message: "Please select a jersey size" }),
  }),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "You must accept race terms and medical waiver",
  }),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = registrationSchema.safeParse(body);

    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        if (!errors[field]) errors[field] = issue.message;
      });
      return NextResponse.json(
        { success: false, message: "Validation error", errors },
        { status: 400 }
      );
    }

    const data = result.data;
    // Generate a unique bib confirmation number
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const bibPrefix = data.categoryCode.toUpperCase();
    const bibNumber = `PPM-${bibPrefix}-${randomSuffix}`;
    const transactionId = `TXN-${Date.now().toString(36).toUpperCase()}-${Math.floor(
      100 + Math.random() * 900
    )}`;

    const corralMap: Record<string, string> = {
      "21k": "Corral A (Half Marathon)",
      "10k": "Corral B (10K Challenge)",
      "5k": "Family Corral C (5K Fun Run)",
    };

    // Save into centralized registration store
    const savedRecord = addRegistration({
      bibNumber,
      transactionId,
      fullName: data.fullName,
      bibName: data.bibName.toUpperCase(),
      email: data.email,
      phone: data.phone,
      gender: data.gender,
      dob: data.dob,
      city: data.city,
      emergencyContactName: data.emergencyContactName,
      emergencyContactPhone: data.emergencyContactPhone,
      categoryCode: data.categoryCode,
      tShirtSize: data.tShirtSize,
      corral: corralMap[data.categoryCode] || "Corral Gate 1",
    });

    const details = {
      bibNumber,
      transactionId,
      fullName: data.fullName,
      bibName: data.bibName.toUpperCase(),
      email: data.email,
      phone: data.phone,
      categoryCode: data.categoryCode,
      tShirtSize: data.tShirtSize,
      registeredAt: savedRecord.registeredAt,
      venue: "JP Ganga Path, Vending Zone",
      reportingTime: "04:30 AM IST",
      raceDate: "7 Feb 2027",
    };

    return NextResponse.json({
      success: true,
      message: "Registration successful! Your bib is reserved.",
      details,
    });
  } catch (error) {
    console.error("Registration API error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error occurred." },
      { status: 500 }
    );
  }
}

