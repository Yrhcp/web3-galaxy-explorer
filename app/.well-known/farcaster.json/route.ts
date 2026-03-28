import { NextResponse } from "next/server";

export async function GET() {
  const appUrl = process.env.NEXT_PUBLIC_URL || "https://web3-edu-app.vercel.app";

  const manifest = {
    accountAssociation: {
      header: "eyJmaWQiOjEsInR5cGUiOiJjdXN0b2RrZXkiLCJrZXkiOiIweDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAifQ",
      payload: "eyJkb21haW4iOiJ3ZWIzLWVkdS1hcHAudmVyY2VsLmFwcCJ9",
      signature: "placeholder_signature",
    },
    frame: {
      version: "1",
      name: "Web3 Galaxy Explorer",
      iconUrl: `${appUrl}/icon.png`,
      homeUrl: appUrl,
      splashImageUrl: `${appUrl}/splash.png`,
      splashBackgroundColor: "#020617",
      subtitle: "Learn Web3 through cosmic exploration",
      description:
        "An educational mini app that teaches blockchain fundamentals through an interactive planetary journey.",
      primaryCategory: "education",
      tags: ["web3", "education", "blockchain", "base"],
    },
  };

  return NextResponse.json(manifest);
}
