import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
  const apiKey = process.env.MICROCMS_API_KEY;
  const endpoint = process.env.MICROCMS_ENDPOINT || "blogs";

  if (!serviceDomain || !apiKey) {
    return NextResponse.json(
      { error: "MICROCMS_SERVICE_DOMAIN or MICROCMS_API_KEY is not set" },
      { status: 500 },
    );
  }

  const { searchParams } = new URL(req.url);
  const limit = Math.min(Number(searchParams.get("per_page")) || 10, 100);
  const page = Math.max(Number(searchParams.get("page")) || 1, 1);
  const offset = (page - 1) * limit;

  const url = `https://${serviceDomain}/api/v1/${endpoint}?limit=${limit}&offset=${offset}`;

  const res = await fetch(url, {
    headers: {
      "X-MICROCMS-API-KEY": apiKey,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: `microCMS API error: ${res.status}` },
      { status: 500 },
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}
