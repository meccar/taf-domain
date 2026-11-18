export const DRAFT_MARK = "[CẦN XÁC NHẬN]";

export function isDraft(text: string): boolean {
  return text.includes(DRAFT_MARK);
}

export function visibleItems<T>(items: T[], getText: (item: T) => string): T[] {
  if (process.env.NODE_ENV !== "production") return items;
  return items.filter((item) => !isDraft(getText(item)));
}
