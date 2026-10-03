import { useAuth, useUser } from "@clerk/expo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, Redirect } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

import { getLanguage } from "@/data/languages";
import { useLanguageStore } from "@/store/useLanguageStore";

// Temporary home screen: proves the user is signed in. Replace with the real home tabs.
export default function Index() {
  const { isLoaded, isSignedIn, signOut } = useAuth();
  const { user } = useUser();
  const selectedLanguage = useLanguageStore((state) => state.selectedLanguage);
  const hasHydrated = useLanguageStore((state) => state.hasHydrated);
  const clearSelectedLanguage = useLanguageStore(
    (state) => state.clearSelectedLanguage,
  );

  if (!isLoaded || !hasHydrated) {
    return null;
  }

  if (!isSignedIn) {
    return <Redirect href="/onboarding" />;
  }

  // Signed-in users must pick a language before they can use the app.
  if (!selectedLanguage) {
    return <Redirect href="/language-selection" />;
  }

  // Testing helper: wipes AsyncStorage so the language selection flow runs again.
  // Also reset the store, since it keeps its value in memory.
  const handleClearStorage = async () => {
    await AsyncStorage.clear();
    clearSelectedLanguage();
  };

  return (
    <View className="flex-1 justify-center gap-4 bg-surface px-4">
      <View className="card gap-2">
        <Text className="eyebrow--primary">Signed in</Text>
        <Text className="h2 text-foreground">Welcome to Fluensa 👋</Text>
        <Text className="body-md text-muted">
          {user?.primaryEmailAddress?.emailAddress}
        </Text>
        <Text className="body-md text-muted">
          Learning: {getLanguage(selectedLanguage)?.name}
        </Text>
      </View>

      <Link href="/language-selection" asChild>
        <TouchableOpacity className="btn-primary" activeOpacity={0.85}>
          <Text className="btn-primary__label">Choose a Language</Text>
        </TouchableOpacity>
      </Link>

      <TouchableOpacity
        className="btn-primary"
        onPress={handleClearStorage}
        activeOpacity={0.85}
      >
        <Text className="btn-primary__label">Clear Storage (Testing)</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="btn-primary"
        onPress={() => signOut()}
        activeOpacity={0.85}
      >
        <Text className="btn-primary__label">Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}
