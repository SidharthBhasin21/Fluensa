import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "@/theme";

// Placeholder — the real Learn screen comes in a later feature.
export default function LearnScreen() {
  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1, backgroundColor: colors.background }}>
      <View className="tab-placeholder">
        <Text className="h2 text-foreground">Learn</Text>
        <Text className="body-md text-muted">Coming soon</Text>
      </View>
    </SafeAreaView>
  );
}
