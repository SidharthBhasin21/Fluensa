import { SymbolView, type SymbolViewProps } from "expo-symbols";
import { Text, TouchableOpacity, View } from "react-native";

import { colors } from "@/theme";
import type { Activity, ActivityType } from "@/types/learning";

type PlanIcon = {
  name: SymbolViewProps["name"];
  color: string;
  tileClassName: string;
};

// Icon + tile color for each kind of activity.
const PLAN_ICONS: Record<ActivityType, PlanIcon> = {
  phrases: {
    name: { ios: "book.fill", android: "menu_book", web: "menu_book" },
    color: "#7C5CE6",
    tileClassName: "plan-item__icon--purple",
  },
  "ai-conversation": {
    name: { ios: "headphones", android: "headphones", web: "headphones" },
    color: "#0F8C8C",
    tileClassName: "plan-item__icon--teal",
  },
  vocabulary: {
    name: { ios: "ellipsis.bubble.fill", android: "sms", web: "sms" },
    color: "#F59E0B",
    tileClassName: "plan-item__icon--yellow",
  },
  "ai-video-call": {
    name: { ios: "video.fill", android: "videocam", web: "videocam" },
    color: "#5CB82E",
    tileClassName: "plan-item__icon--green",
  },
};

type PlanItemProps = {
  activity: Activity;
  isCompleted: boolean;
  onPress: () => void;
};

// One row of "Today's plan": colored icon tile, title, description,
// and a teal check when done (empty circle otherwise).
export default function PlanItem({ activity, isCompleted, onPress }: PlanItemProps) {
  const icon = PLAN_ICONS[activity.type];

  return (
    <TouchableOpacity className="plan-item" onPress={onPress} activeOpacity={0.7}>
      <View className={`plan-item__icon ${icon.tileClassName}`}>
        <SymbolView name={icon.name} size={26} tintColor={icon.color} />
      </View>

      <View className="ml-[17px] flex-1">
        <Text className="plan-item__title" numberOfLines={1}>
          {activity.title}
        </Text>
        <Text className="plan-item__subtitle" numberOfLines={1}>
          {activity.description}
        </Text>
      </View>

      <View
        className={`plan-item__check ${isCompleted ? "plan-item__check--done" : ""}`}
      >
        {isCompleted && (
          <SymbolView
            name={{ ios: "checkmark", android: "check", web: "check" }}
            size={13}
            weight="bold"
            tintColor={colors.background}
          />
        )}
      </View>
    </TouchableOpacity>
  );
}
