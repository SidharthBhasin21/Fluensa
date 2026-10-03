import { useSSO } from "@clerk/expo";
import type { OAuthStrategy } from "@clerk/expo/types";
import { router } from "expo-router";
import { useState } from "react";

import { getClerkErrorMessage } from "@/lib/clerk";

// Social sign in (Google, ...) through Clerk. Opens the provider's login page in an
// in-app browser and works for both new and existing users.
export function useSocialAuth() {
  const { startSSOFlow } = useSSO();
  const [loadingStrategy, setLoadingStrategy] = useState<OAuthStrategy | null>(null);
  const [error, setError] = useState<string | null>(null);

  const signInWith = async (strategy: OAuthStrategy) => {
    setError(null);
    setLoadingStrategy(strategy);

    try {
      const { createdSessionId, setActive, signUp } = await startSSOFlow({ strategy });

      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
        router.replace("/");
      } else if (signUp?.status === "missing_requirements") {
        setError("Your account is missing some required details.");
      }
      // Otherwise the user closed the browser — nothing to do.
    } catch (err) {
      setError(getClerkErrorMessage(err));
    } finally {
      setLoadingStrategy(null);
    }
  };

  return { signInWith, loadingStrategy, error, setError };
}
