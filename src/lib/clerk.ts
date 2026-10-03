import { isClerkAPIResponseError } from "@clerk/expo";

// Turns a Clerk error into a short, friendly message we can show in the UI.
export function getClerkErrorMessage(error: unknown) {
  if (isClerkAPIResponseError(error)) {
    const firstError = error.errors[0];
    return firstError?.longMessage ?? firstError?.message ?? "Something went wrong.";
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong. Please try again.";
}
