import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { person1, person2, location, plan } = body;

    if (!person1 || !person2) {
      return NextResponse.json(
        {
          error: "Please provide preferences for both people.",
        },
        { status: 400 }
      );
    }

    const qlooApiKey = process.env.QLOO_API_KEY;

    // Until Qloo API access is available, return a safe demo response.
    if (!qlooApiKey) {
      return NextResponse.json({
        mode: "demo",
        recommendation: {
          title: "A shared cultural experience",
          summary: `For your ${plan || "outing"}${
            location ? ` in ${location}` : ""
          }, explore an experience that combines food, culture, entertainment and discovery.`,
          person1Match: person1,
          person2Match: person2,
          bridge:
            "TasteBridge looks for cultural relationships between both sets of interests instead of choosing one person's preferences over the other.",
        },
      });
    }

    /*
      LIVE QLOO INTEGRATION WILL GO HERE.

      We intentionally do not guess the Qloo endpoint or request format.

      Once Qloo API access is available and verified, this server route
      will make the authenticated Qloo request using QLOO_API_KEY.

      Keeping the request here ensures the API key is never exposed
      to the browser.
    */

    return NextResponse.json({
      mode: "pending-live-integration",
      message:
        "Qloo credentials are available, but the live request has not yet been configured.",
    });
  } catch (error) {
    console.error("TasteBridge recommendation error:", error);

    return NextResponse.json(
      {
        error: "Unable to create a recommendation.",
      },
      { status: 500 }
    );
  }
}