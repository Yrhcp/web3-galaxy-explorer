import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Log webhook events for debugging
    console.log("[Webhook] Received event:", JSON.stringify(body, null, 2));

    // Handle different event types
    const { type } = body;

    switch (type) {
      case "frame_added":
        console.log("[Webhook] Frame added by user");
        break;
      case "frame_removed":
        console.log("[Webhook] Frame removed by user");
        break;
      case "notifications_enabled":
        console.log("[Webhook] Notifications enabled");
        break;
      case "notifications_disabled":
        console.log("[Webhook] Notifications disabled");
        break;
      default:
        console.log("[Webhook] Unknown event type:", type);
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("[Webhook] Error processing webhook:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
