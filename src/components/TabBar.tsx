import { SymbolView, type SymbolViewProps } from "expo-symbols";
import type { BottomTabBarProps } from "expo-router/js-tabs";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { colors } from "@/theme";

const CIRCLE_SIZE = 56;
const ICON_SIZE = 26;
const INACTIVE_COLOR = "#64748B";

// Inactive tabs stack the icon over the label (label 18px + 4px gap).
// Moving the icon down by half of that puts it in the center of the circle.
const ICON_SHIFT = (18 + 4) / 2;

// Shared by the circle and the icons so everything moves together.
const TIMING = { duration: 250, easing: Easing.out(Easing.cubic) };

// Icon for each tab, keyed by the route file name in app/(tabs)/.
// iOS uses SF Symbols, Android and web use Material icons.
const TAB_ICONS: Record<string, SymbolViewProps["name"]> = {
  home: { ios: "house.fill", android: "home", web: "home" },
  learn: { ios: "book", android: "menu_book", web: "menu_book" },
  "ai-teacher": { ios: "face.smiling", android: "smart_toy", web: "smart_toy" },
  chat: { ios: "bubble.left", android: "chat_bubble_outline", web: "chat_bubble_outline" },
  profile: { ios: "person", android: "person_outline", web: "person_outline" },
};

// Tabs that take over the whole screen, so the bar is hidden on them.
const HIDDEN_ON = ["ai-teacher"];

// Custom bottom tab bar.
// The selected tab sits inside a teal circle (icon only),
// the other tabs show their icon and label.
// The circle glides to the selected tab with a short ease-out animation.
export default function TabBar({ state, descriptors, navigation, insets }: BottomTabBarProps) {
  const [barWidth, setBarWidth] = useState(0);
  const tabWidth = barWidth / state.routes.length;

  // x position of the circle, centered inside the selected tab
  const circleX = useSharedValue(0);

  useEffect(() => {
    const targetX = state.index * tabWidth + (tabWidth - CIRCLE_SIZE) / 2;
    // Timing (not spring) so the circle stops exactly on the tab without overshooting.
    circleX.value = withTiming(targetX, TIMING);
  }, [state.index, tabWidth, circleX]);

  const circleStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: circleX.value }],
  }));

  // Full-screen tabs (like the AI Teacher lesson) hide the bar.
  if (HIDDEN_ON.includes(state.routes[state.index].name)) {
    return null;
  }

  return (
    <View className="tab-bar" style={{ paddingBottom: Math.max(insets.bottom, 12) }}>
      <View
        className="flex-row"
        onLayout={(event) => setBarWidth(event.nativeEvent.layout.width)}
      >
        {/* Wait for the bar width so the circle doesn't jump in from the left */}
        {barWidth > 0 && <Animated.View style={[styles.circle, circleStyle]} />}

        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = options.title ?? route.name;
          const isFocused = state.index === index;

          const handlePress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          return (
            <TabItem
              key={route.key}
              label={label}
              icon={TAB_ICONS[route.name]}
              isFocused={isFocused}
              onPress={handlePress}
            />
          );
        })}
      </View>
    </View>
  );
}

type TabItemProps = {
  label: string;
  icon: SymbolViewProps["name"];
  isFocused: boolean;
  onPress: () => void;
};

// One tab. When it becomes selected, the label fades out, the icon slides
// down into the center of the circle and cross-fades from gray to white.
function TabItem({ label, icon, isFocused, onPress }: TabItemProps) {
  // 0 = inactive, 1 = selected
  const progress = useSharedValue(isFocused ? 1 : 0);

  useEffect(() => {
    progress.value = withTiming(isFocused ? 1 : 0, TIMING);
  }, [isFocused, progress]);

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: progress.value * ICON_SHIFT }],
  }));
  const inactiveIconStyle = useAnimatedStyle(() => ({
    opacity: 1 - progress.value,
  }));
  const activeIconStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
  }));
  const labelStyle = useAnimatedStyle(() => ({
    opacity: 1 - progress.value,
  }));

  return (
    <TouchableOpacity
      className="tab-bar__item"
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityRole="tab"
      accessibilityState={{ selected: isFocused }}
      accessibilityLabel={label}
    >
      <Animated.View style={[styles.icon, iconStyle]}>
        <Animated.View style={inactiveIconStyle}>
          <SymbolView name={icon} size={ICON_SIZE} tintColor={INACTIVE_COLOR} />
        </Animated.View>
        <Animated.View style={[styles.iconOverlay, activeIconStyle]}>
          <SymbolView
            name={icon}
            size={ICON_SIZE}
            weight="semibold"
            tintColor={colors.background}
          />
        </Animated.View>
      </Animated.View>

      {/* Always rendered so the layout doesn't jump; only its opacity changes */}
      <Animated.View style={labelStyle}>
        <Text className="tab-bar__label">{label}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: ICON_SIZE,
    height: ICON_SIZE,
  },
  iconOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  circle: {
    position: "absolute",
    top: (72 - CIRCLE_SIZE) / 2,
    left: 0,
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
});
