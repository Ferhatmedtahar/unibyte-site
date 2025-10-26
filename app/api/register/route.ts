import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const APPS_SCRIPT_ENDPOINT = process.env.APPS_SCRIPT_ENDPOINT?.trim();
const SECRET = process.env.SECRET?.trim();

export async function POST(req: Request) {
  try {
    // Ensure server environment is configured
    if (!APPS_SCRIPT_ENDPOINT || !SECRET) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Missing server environment variables: APPS_SCRIPT_ENDPOINT and SECRET",
        },
        { status: 500 }
      );
    }

    const data = await req.json().catch(() => ({} as any));

    // Basic validation for required fields (canHelp is optional)
    const required = [
      "name",
      "email",
      "phone",
      "universityNumber",
      "discord",
      "whyJoin",
      "interests",
      "hearAboutUs",
    ] as const;
    for (const field of required) {
      const v = (data?.[field] ?? "").toString().trim();
      if (!v) {
        return NextResponse.json(
          { success: false, error: `Missing field: ${field}` },
          { status: 400 }
        );
      }
    }

    const payload = { ...data, _secret: SECRET };

    const res = await fetch(APPS_SCRIPT_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const status = res.status;
    const ok = res.ok;

    let json: any = null;
    let bodyText: string | null = null;
    try {
      json = await res.json();
    } catch {
      try {
        bodyText = await res.text();
      } catch {
        bodyText = null;
      }
    }

    if (!ok || (json && json.success !== true)) {
      const errorMsg =
        json?.error ||
        (status >= 300 && status < 400
          ? `Apps Script redirected (status ${status}). Ensure Web App is deployed with access "Anyone" and "Execute as Me".`
          : `Apps Script submission failed (status ${status})`);

      return NextResponse.json(
        { success: false, error: errorMsg, upstreamBody: bodyText ?? null },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || "Unknown error" },
      { status: 500 }
    );
  }
}