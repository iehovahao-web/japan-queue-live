const SOURCE = "https://omatase10.jp/h81000/";
const MAX_STALE_MINUTES = 120;

export async function onRequestGet() {
  try {
    const response = await fetch(SOURCE, {
      headers: {
        "User-Agent": "JapanQueueLive/1.0",
        "Accept": "text/html,application/xhtml+xml"
      },
      cf: {
        cacheTtl: 60,
        cacheEverything: true
      }
    });

    if (!response.ok) {
      return json(
        {
          ok: false,
          code: "UPSTREAM_HTTP",
          error: `Upstream ${response.status}`
        },
        502
      );
    }

    const html = await response.text();
    const parsed = parseOfficialPage(html);

    if (!parsed) {
      return json(
        {
          ok: false,
          code: "PARSE_FAILED",
          error: "Permission counter pattern not found"
        },
        502
      );
    }

    const staleMinutes = parsed.updatedAt
      ? Math.max(
          0,
          Math.floor((Date.now() - Date.parse(parsed.updatedAt)) / 60000)
        )
      : null;

    return json(
      {
        ok: true,
        office: "osaka-immigration",
        service: "permission",
        current: parsed.current,
        waiting: parsed.waiting,
        updatedAt: parsed.updatedAt,
        staleMinutes,
        stale:
          staleMinutes === null
            ? true
            : staleMinutes > MAX_STALE_MINUTES,
        source: SOURCE
      },
      200,
      60
    );
  } catch (error) {
    return json(
      {
        ok: false,
        code: "FETCH_FAILED",
        error: error.message || "Fetch failed"
      },
      500
    );
  }
}

export function parseOfficialPage(html) {
  const text = String(html)
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();

  const row =
    text.match(
      /(?:^|\s)2\s*許可証印\s*2\s*Permission\s+(\d{1,4})\s+(\d+)\s*人(?:\s|$)/i
    ) ||
    text.match(
      /許可証印[\s\S]{0,180}?Permission[\s\S]{0,80}?(\d{1,4})\s+(\d+)\s*人/i
    );

  if (!row) return null;

  const current = Number(row[1]);
  const waiting = Number(row[2]);

  if (!Number.isInteger(current) || current < 0 || current > 9999) {
    return null;
  }

  if (!Number.isInteger(waiting) || waiting < 0 || waiting > 10000) {
    return null;
  }

  const updated =
    text.match(
      /(\d{4})-(\d{2})-(\d{2})\s+(\d{1,2}):(\d{2})\s*現在/
    ) ||
    text.match(
      /(\d{4})\/(\d{1,2})\/(\d{1,2})\s+(\d{1,2}):(\d{2})/
    );

  let updatedAt = null;

  if (updated) {
    const [, y, m, d, h, min] = updated;

    updatedAt =
      `${y}-${String(m).padStart(2, "0")}` +
      `-${String(d).padStart(2, "0")}` +
      `T${String(h).padStart(2, "0")}` +
      `:${min}:00+09:00`;
  }

  return {
    current,
    waiting,
    updatedAt
  };
}

function json(body, status = 200, maxAge = 0) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": `public, max-age=${maxAge}`,
      "access-control-allow-origin": "*"
    }
  });
}
