import { useAuth, useUser } from "@clerk/expo";
import { Redirect } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

// Temporary home screen: proves the user is signed in. Replace with the real home tabs.
export default function Index() {
  const { isLoaded, isSignedIn, signOut } = useAuth();
  const { user } = useUser();

  if (!isLoaded) {
    return null;
  }

  if (!isSignedIn) {
    return <Redirect href="/onboarding" />;
  }

  return (
    <View className="flex-1 justify-center gap-4 bg-surface px-4">
      <View className="card gap-2">
        <Text className="eyebrow--primary">Signed in</Text>
        <Text className="h2 text-foreground">Welcome to Fluensa 👋</Text>
        <Text className="body-md text-muted">
          {user?.primaryEmailAddress?.emailAddress}
        </Text>
      </View>

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
