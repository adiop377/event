import { NextResponse } from "next/server";
import {
  toggleKitCollection,
  updateRegistration,
  deleteRegistration,
} from "@/data/registrationsStore";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await req.json();

    if (body.action === "toggleKit") {
      const updated = toggleKitCollection(id);
      if (!updated) {
        return NextResponse.json(
          { success: false, message: "Runner not found" },
          { status: 404 }
        );
      }
      return NextResponse.json({
        success: true,
        message: updated.kitCollected
          ? "Kit marked as collected"
          : "Kit status reverted to pending",
        runner: updated,
      });
    }

    // Generic update
    const updated = updateRegistration(id, body);
    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Runner not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Runner updated successfully",
      runner: updated,
    });
  } catch (error) {
    console.error("Admin runner PATCH error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update runner" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const deleted = deleteRegistration(id);
    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "Runner not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Runner registration removed",
    });
  } catch (error) {
    console.error("Admin runner DELETE error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete runner" },
      { status: 500 }
    );
  }
}
