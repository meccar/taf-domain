/**
 * Helpers for untrusted input.
 *
 * Principles:
 * - SQL injection is prevented by parameterized queries (the Supabase client
 *   does this), NOT by filtering "bad words". These helpers cover the few
 *   places where user text is still placed inside a query string.
 * - XSS is prevented by validating input, escaping on output (React does it
 *   unless you use dangerouslySetInnerHTML) and the CSP in csp.ts.
 */

// Control chars (except \n and \t), plus bidi-override characters that can
// make text look different from what it is.
const CONTROL_AND_BIDI =
  /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F‪-‮⁦-⁩]/g;

/** Plain-text cleanup. Does not escape HTML: escape on output instead. */
export function sanitizeText(input: string, maxLength = 2000): string {
  return input
    .normalize("NFC")
    .replace(CONTROL_AND_BIDI, "")
    .trim()
    .slice(0, maxLength);
}

/** Removes anything that looks like an HTML tag, for fields that must be plain. */
export function stripHtml(input: string): string {
  return input.replace(/<[^>]*>/g, "");
}

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function isUuid(value: unknown): value is string {
  return typeof value === "string" && UUID_RE.test(value);
}

// ---- Supabase / PostgREST filter strings ---------------------------------
//
// `.eq("col", value)`, `.ilike("col", pattern)` etc. are safe: the value is
// encoded for you. The risk is a hand-built string such as
//   .or(`name.ilike.%${q}%,email.ilike.%${q}%`)
// where a user typing `x,role.eq.admin` or `)` changes the filter itself.
// Build those strings with the helpers below.

/** Escapes LIKE wildcards so user input is matched literally. */
export function escapeLike(value: string): string {
  return value.replace(/[\\%_]/g, "\\$&");
}

/** Wraps a value in double quotes so `, ( ) .` cannot alter the filter. */
export function postgrestQuote(value: string): string {
  return `"${value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}
