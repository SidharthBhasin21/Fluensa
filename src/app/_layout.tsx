import { ClerkProvider, useUser } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";
import { PostHogProvider, usePostHog } from "posthog-react-native";
import "../../global.css";

import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useRef } from "react";

import { posthog } from "@/lib/posthog";
import { fontAssets } from "@/theme";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY ?? "";

if (!publishableKey) {
  throw new Error(
    "Missing EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY. Run `clerk env pull`, then restart the dev server.",
  );
}

// Keep the splash screen visible until the fonts are ready.
SplashScreen.preventAutoHideAsync();

function PostHogIdentity() {
  const posthog = usePostHog();
  const { isLoaded, user } = useUser();
  const identifiedUserId = useRef<string | null>(null);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    if (user && identifiedUserId.current !== user.id) {
      posthog.identify(
        user.id,
        user.primaryEmailAddress?.emailAddress
          ? { email: user.primaryEmailAddress.emailAddress }
          : undefined,
      );
      identifiedUserId.current = user.id;
      return;
    }

    if (!user && identifiedUserId.current) {
      posthog.reset();
      identifiedUserId.current = null;
    }
  }, [isLoaded, posthog, user]);

  return null;
}

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts(fontAssets);

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const app = (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="onboarding" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="language-selection" options={{ headerShown: false }} />
    </Stack>
  );

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      {posthog ? (
        <PostHogProvider client={posthog}>
          <PostHogIdentity />
          {app}
        </PostHogProvider>
      ) : (
        app
      )}
    </ClerkProvider>
  );
}
