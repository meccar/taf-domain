export const Severity = {
  Success: "success",
  Secondary: "secondary",
  Info: "info",
  Warning: "warning",
  Danger: "danger",
  Help: "help",
  Contrast: "contrast",
} as const;

export type SeverityConfig = typeof Severity;
