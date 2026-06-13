export const ButtonSize = {
  Small: "small",
  Large: "large",
  Sm: "sm",
  Icon: "icon",
} as const;

export type ButtonSizeType = (typeof ButtonSize)[keyof typeof ButtonSize];

export const ButtonVariant = {
  Default: "default",
  Destructive: "destructive",
  Outline: "outline",
  Secondary: "secondary",
  Ghost: "ghost",
  Link: "link",
} as const;

export type ButtonVariantType =
  (typeof ButtonVariant)[keyof typeof ButtonVariant];

export function mapToPrimeSize(
  size: ButtonSizeType,
): "small" | "large" | undefined {
  if (size === ButtonSize.Sm || size === ButtonSize.Small) return "small";
  if (size === ButtonSize.Large) return "large";
  return undefined;
}

export default {
  ButtonSize,
  ButtonVariant,
  mapToPrimeSize,
};
