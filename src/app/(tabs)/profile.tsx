import { useAuth, useUser } from "@clerk/expo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { getLanguage } from "@/data/languages";
import { posthog } from "@/lib/posthog";
import { useLanguageStore } from "@/store/useLanguageStore";
import { colors } from "@/theme";

// Placeholder — the real Profile screen comes in a later feature.
// Keeps the testing helpers (change language, clear storage, sign out) for now.
export default function ProfileScreen() {
  const { signOut } = useAuth();
  const { user } = useUser();
  const selectedLanguage = useLanguageStore((state) => state.selectedLanguage);
  const clearSelectedLanguage = useLanguageStore(
    (state) => state.clearSelectedLanguage,
  );

  // Testing helper: wipes AsyncStorage so the language selection flow runs again.
  // Also reset the store, since it keeps its value in memory.
  const handleClearStorage = async () => {
    await AsyncStorage.clear();
    clearSelectedLanguage();
  };

  const handleSignOut = async () => {
    posthog?.capture("user_signed_out");
    await signOut();
  };

  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1, backgroundColor: colors.background }}>
      <View className="tab-placeholder px-4">
        <Text className="h2 text-foreground">Profile</Text>
        <Text className="body-md text-muted">
          {user?.primaryEmailAddress?.emailAddress}
        </Text>
        <Text className="body-md text-muted">
          Learning: {selectedLanguage ? getLanguage(selectedLanguage)?.name : "—"}
        </Text>

        <View className="mt-4 w-full gap-3">
          <Link href="/language-selection" asChild>
            <TouchableOpacity className="btn-primary h-[56px]" activeOpacity={0.85}>
              <Text className="btn-primary__label">Choose a Language</Text>
            </TouchableOpacity>
          </Link>

          <TouchableOpacity
            className="btn-primary h-[56px]"
            onPress={handleClearStorage}
            activeOpacity={0.85}
          >
            <Text className="btn-primary__label">Clear Storage (Testing)</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="btn-primary h-[56px]"
            onPress={handleSignOut}
            activeOpacity={0.85}
          >
            <Text className="btn-primary__label">Sign Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
