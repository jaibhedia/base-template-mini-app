import {
  ParseWebhookEvent,
  parseWebhookEvent,
  verifyAppKeyWithNeynar,
} from "@farcaster/frame-node";
import { NextRequest } from "next/server";
import {
  deleteUserNotificationDetails,
  setUserNotificationDetails,
} from "~/lib/kv";
import { sendFrameNotification } from "~/lib/notifs";

export async function POST(request: NextRequest) {
  // If Neynar is enabled, we don't need to handle webhooks here
  // as they will be handled by Neynar's webhook endpoint
  const neynarEnabled = process.env.NEYNAR_API_KEY && process.env.NEYNAR_CLIENT_ID;
  if (neynarEnabled) {
    return Response.json({ success: true });
  }

  const requestJson = await request.json();

  let data;
  try {
    data = await parseWebhookEvent(requestJson, verifyAppKeyWithNeynar);
  } catch (e: unknown) {
    const error = e as ParseWebhookEvent.ErrorType;

    switch (error.name) {
      case "VerifyJsonFarcasterSignature.InvalidDataError":
      case "VerifyJsonFarcasterSignature.InvalidEventDataError":
        // The request data is invalid
        return Response.json(
          { success: false, error: error.message },
          { status: 400 }
        );
      case "VerifyJsonFarcasterSignature.InvalidAppKeyError":
        // The app key is invalid
        return Response.json(
          { success: false, error: error.message },
          { status: 401 }
        );
      case "VerifyJsonFarcasterSignature.VerifyAppKeyError":
        // Internal error verifying the app key (caller may want to try again)
        return Response.json(
          { success: false, error: error.message },
          { status: 500 }
        );
    }
  }

  const fid = data.fid;
  const event = data.event;

  // Handle notification events
  switch (event.event) {
    case "miniapp_added":
    case "notifications_enabled":
      if (event.notificationDetails) {
        await setUserNotificationDetails(fid, event.notificationDetails);
        await sendFrameNotification({
          fid,
          title: "Welcome to Base Ninja",
          body: "Game is now added to your client",
        });
      }
      break;

    case "miniapp_removed":
    case "notifications_disabled":
      await deleteUserNotificationDetails(fid);
      break;
  }

  return Response.json({ success: true });
}
