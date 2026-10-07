import { SymbolView } from "expo-symbols";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { colors } from "@/theme";
import type { Lesson, LessonStatus } from "@/types/learning";

type LessonCardProps = {
  lesson: Lesson;
  // Position in the whole course (1, 2, 3…), not inside the unit.
  number: number;
  status: LessonStatus;
  isSelected: boolean;
  onPress: () => void;
};

// One row of the lesson list.
// The selected lesson is tinted teal and shows its illustration;
// the others show a status badge (check, play, or lock).
export default function LessonCard({
  lesson,
  number,
  status,
  isSelected,
  onPress,
}: LessonCardProps) {
  const meta = getMeta(lesson, status, isSelected);
  const isActiveMeta = isSelected || status === "in-progress";

  return (
    <TouchableOpacity
      className={`lesson-card ${isSelected ? "lesson-card--selected" : ""}`}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View className="flex-1 pr-[12px]">
        <Text
          className={`lesson-card__label ${isSelected ? "lesson-card__label--selected" : ""}`}
        >
          Lesson {number}
        </Text>
        <Text
          className={`lesson-card__title ${status === "not-started" ? "lesson-card__title--muted" : ""}`}
          numberOfLines={1}
        >
          {lesson.title}
        </Text>
        {meta && (
          <Text
            className={`lesson-card__meta ${isActiveMeta ? "lesson-card__meta--active" : ""}`}
          >
            {meta}
          </Text>
        )}
      </View>

      {isSelected ? (
        <Image source={lesson.image} className="lesson-card__thumb" resizeMode="cover" />
      ) : (
        <StatusBadge status={status} />
      )}
    </TouchableOpacity>
  );
}

// Finished lessons only need the check, unless they're selected.
function getMeta(lesson: Lesson, status: LessonStatus, isSelected: boolean) {
  if (status === "completed") {
    return isSelected ? "Completed" : null;
  }

  if (status === "in-progress") {
    return "In progress";
  }

  return `0 / ${lesson.activities.length} activities`;
}

function StatusBadge({ status }: { status: LessonStatus }) {
  if (status === "completed") {
    return (
      <View className="lesson-card__status lesson-card__status--completed">
        <SymbolView
          name={{ ios: "checkmark", android: "check", web: "check" }}
          size={14}
          weight="bold"
          tintColor={colors.background}
        />
      </View>
    );
  }

  if (status === "in-progress") {
    return (
      <View className="lesson-card__status lesson-card__status--progress">
        <SymbolView
          name={{ ios: "play.fill", android: "play_arrow", web: "play_arrow" }}
          size={12}
          tintColor={colors.background}
        />
      </View>
    );
  }

  // Not started yet. Every lesson can still be opened, the lock is only a visual hint.
  return (
    <View className="mr-[8px]">
      <SymbolView
        name={{ ios: "lock", android: "lock", web: "lock" }}
        size={22}
        weight="medium"
        tintColor="#64748B"
      />
    </View>
  );
}
