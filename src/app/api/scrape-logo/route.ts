import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // Reference GEMINI_API_KEY configuration
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("GEMINI_API_KEY is not defined in the environment.");
  }

  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get("url");

  if (!targetUrl) {
    return NextResponse.json({ error: "Missing url parameter" }, { status: 400 });
  }

  // Clean URL
  let cleanedUrl = targetUrl.trim();
  if (!/^https?:\/\//i.test(cleanedUrl)) {
    cleanedUrl = "https://" + cleanedUrl;
  }

  let domain = "";
  try {
    domain = new URL(cleanedUrl).hostname.replace(/^www\./, "");
  } catch (e) {
    domain = cleanedUrl.replace(/https?:\/\/(www\.)?/, "").split("/")[0];
  }

  const fallbackLogo = `https://logo.clearbit.com/${domain}`;
  const googleFallback = `https://www.google.com/s2/favicons?sz=128&domain=${domain}`;

  try {
    // Attempt to fetch the website
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const response = await fetch(cleanedUrl, {
      signal: controller.signal,
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
      }
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      return NextResponse.json({ logoUrl: fallbackLogo, fallback: googleFallback });
    }

    const html = await response.text();

    // Regex parsing for og:image
    const ogImageRegex = /<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i;
    const ogImageMatch = html.match(ogImageRegex);
    if (ogImageMatch && ogImageMatch[1]) {
      return NextResponse.json({ logoUrl: resolveUrl(ogImageMatch[1], cleanedUrl) });
    }

    // Regex for apple-touch-icon
    const appleIconRegex = /<link[^>]*rel=["']apple-touch-icon["'][^>]*href=["']([^"']+)["']/i;
    const appleIconMatch = html.match(appleIconRegex);
    if (appleIconMatch && appleIconMatch[1]) {
      return NextResponse.json({ logoUrl: resolveUrl(appleIconMatch[1], cleanedUrl) });
    }

    // Regex for standard icon
    const iconRegex = /<link[^>]*rel=["'](?:shortcut )?icon["'][^>]*href=["']([^"']+)["']/i;
    const iconMatch = html.match(iconRegex);
    if (iconMatch && iconMatch[1]) {
      return NextResponse.json({ logoUrl: resolveUrl(iconMatch[1], cleanedUrl) });
    }

    // Fall back to clearbit
    return NextResponse.json({ logoUrl: fallbackLogo, fallback: googleFallback });
  } catch (error) {
    console.error("Scraper Error:", error);
    return NextResponse.json({ logoUrl: fallbackLogo, fallback: googleFallback });
  }
}

function resolveUrl(href: string, base: string) {
  try {
    return new URL(href, base).href;
  } catch (e) {
    return href;
  }
}
