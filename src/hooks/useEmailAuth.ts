import { useSignIn, useSignUp } from "@clerk/expo";
import { router } from "expo-router";
import { useState } from "react";

import { getClerkErrorMessage } from "@/lib/clerk";

export type AuthMode = "sign-in" | "sign-up";

// Must match the minimum password length set in the Clerk dashboard.
export const MIN_PASSWORD_LENGTH = 8;

// Email auth with Clerk, in two steps:
//   1. sendCode   — sign in: email only. Sign up: email + password.
//   2. verifyCode — the 6-digit code Clerk emailed to the user.
export function useEmailAuth(mode: AuthMode) {
  const { signIn, fetchStatus: signInStatus } = useSignIn();
  const { signUp, fetchStatus: signUpStatus } = useSignUp();
  const [error, setError] = useState<string | null>(null);

  const isLoading = signInStatus === "fetching" || signUpStatus === "fetching";

  // Runs after finalize() makes the new session active: leave the auth screens.
  const navigate = ({ session }: { session: { currentTask?: unknown } }) => {
    // Extra steps configured in the Clerk dashboard (e.g. forced MFA) aren't built yet.
    if (session.currentTask) {
      setError("Your account needs an extra step that this app doesn't support yet.");
      return;
    }
    router.replace("/");
  };

  // Returns true when the code was sent, so the screen can open the code modal.
  const sendCode = async (email: string, password: string) => {
    setError(null);

    if (mode === "sign-in") {
      const { error } = await signIn.emailCode.sendCode({ emailAddress: email });
      if (error) {
        setError(getClerkErrorMessage(error));
        return false;
      }
      return true;
    }

    if (password.length < MIN_PASSWORD_LENGTH) {
      setError(`Password must be at least ${MIN_PASSWORD_LENGTH} characters.`);
      return false;
    }

    const { error: signUpError } = await signUp.password({ emailAddress: email, password });
    if (signUpError) {
      setError(getClerkErrorMessage(signUpError));
      return false;
    }

    const { error: sendError } = await signUp.verifications.sendEmailCode();
    if (sendError) {
      setError(getClerkErrorMessage(sendError));
      return false;
    }
    return true;
  };

  const resendCode = async () => {
    setError(null);

    const { error } =
      mode === "sign-in"
        ? await signIn.emailCode.sendCode()
        : await signUp.verifications.sendEmailCode();

    if (error) {
      setError(getClerkErrorMessage(error));
    }
  };

  // Returns true when the user is signed in.
  const verifyCode = async (code: string) => {
    setError(null);

    if (mode === "sign-in") {
      const { error } = await signIn.emailCode.verifyCode({ code });
      if (error) {
        setError(getClerkErrorMessage(error));
        return false;
      }
      if (signIn.status !== "complete") {
        setError("Your account needs an extra sign-in step that this app doesn't support yet.");
        return false;
      }
      await signIn.finalize({ navigate });
      return true;
    }

    const { error } = await signUp.verifications.verifyEmailCode({ code });
    if (error) {
      setError(getClerkErrorMessage(error));
      return false;
    }
    if (signUp.status !== "complete") {
      setError("Your account is missing some required details.");
      return false;
    }
    await signUp.finalize({ navigate });
    return true;
  };

  return { sendCode, resendCode, verifyCode, error, setError, isLoading };
}
