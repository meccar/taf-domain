/**
 * Content-Security-Policy with a per-request nonce (main XSS defence in
 * depth: even if some HTML slips through, injected scripts will not run).
 *
 * If you add third-party scripts (analytics, chat widget, maps, embeds),
 * they must be allowed here or they will be blocked. Roll out with
 * CSP_REPORT_ONLY=true first and watch the browser console.
 */
export function buildCsp(nonce: string, isDev: boolean): string {
  let supabaseOrigin = "";
  let supabaseWs = "";
  try {
    const url = new URL(process.env.NEXT_PUBLIC_SUPABASE_URL ?? "");
    supabaseOrigin = url.origin;
    supabaseWs = `wss://${url.host}`;
  } catch {
    // no valid Supabase URL configured
  }

  const directives: Record<string, string[]> = {
    "default-src": ["'self'"],
    "script-src": [
      "'self'",
      `'nonce-${nonce}'`,
      "'strict-dynamic'",
      // React dev tooling needs eval; never in production.
      ...(isDev ? ["'unsafe-eval'"] : []),
    ],
    // Next/Tailwind emit inline styles; script injection is the real risk.
    "style-src": ["'self'", "'unsafe-inline'"],
    "img-src": ["'self'", "data:", "blob:", supabaseOrigin],
    "font-src": ["'self'", "data:"],
    "connect-src": ["'self'", supabaseOrigin, supabaseWs],
    "object-src": ["'none'"],
    "base-uri": ["'self'"],
    "form-action": ["'self'"],
    "frame-ancestors": ["'none'"],
    ...(isDev ? {} : { "upgrade-insecure-requests": [] }),
  };

  return Object.entries(directives)
    .map(([name, values]) => [name, ...values.filter(Boolean)].join(" "))
    .join("; ");
}
