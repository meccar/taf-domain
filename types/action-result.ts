export type ActionResult<T = unknown> = {
  success: boolean;
  error: string | null;
  data: T | null;
};

export type EmptyActionResult = ActionResult<null>;
