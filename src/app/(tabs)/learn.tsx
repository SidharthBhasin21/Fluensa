import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SymbolView } from "expo-symbols";
import { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import LessonCard from "@/components/LessonCard";
import PlanItem from "@/components/PlanItem";
import { images } from "@/constants/images";
import { getCurrentLesson, getLessonStatus, getLessonsByLanguage } from "@/data/lessons";
import { getUnit } from "@/data/units";
import { posthog } from "@/lib/posthog";
import { posthogLogger } from "@/lib/posthog-logger";
import { useLanguageStore } from "@/store/useLanguageStore";
import { useProgressStore } from "@/store/useProgressStore";
import { colors } from "@/theme";
import type { Activity } from "@/types/learning";

// Height of the photo below the status bar.
const HERO_HEIGHT = 287;

type Tab = "lessons" | "practice";

export default function LearnScreen() {
  const insets = useSafeAreaInsets();
  const selectedLanguage = useLanguageStore((state) => state.selectedLanguage);
  const completedActivityIds = useProgressStore((state) => state.completedActivityIds);
  const completeActivity = useProgressStore((state) => state.completeActivity);

  const [activeTab, setActiveTab] = useState<Tab>("lessons");
  // The lesson the user tapped. Until then we show the current lesson.
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);

  // The tabs layout redirects to language selection when nothing is picked,
  // so this only guards against a missing language for TypeScript.
  if (!selectedLanguage) {
    return null;
  }

  const lessons = getLessonsByLanguage(selectedLanguage);
  const currentLesson = getCurrentLesson(selectedLanguage, completedActivityIds);
  // Falls back to the current lesson if nothing is picked yet,
  // or if the picked lesson belongs to a language the user switched away from.
  const selectedLesson =
    lessons.find((lesson) => lesson.id === selectedLessonId) ?? currentLesson;

  if (!selectedLesson) {
    return null;
  }

  const selectedNumber = lessons.indexOf(selectedLesson) + 1;
  const unit = getUnit(selectedLesson.unitId);

  const handleCompleteActivity = (activity: Activity) => {
    if (!completedActivityIds.includes(activity.id)) {
      posthog?.capture("learning_activity_completed", {
        activity_id: activity.id,
        activity_type: activity.type,
        xp_earned: activity.xp,
      });
      posthogLogger.info("learning activity completed", {
        activity_id: activity.id,
        activity_type: activity.type,
        xp_earned: activity.xp,
      });
    }
    completeActivity(activity);
  };

  return (
    <View className="flex-1 bg-background">
      <StatusBar style="dark" />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Hero: lesson photo with the mascot, title and unit progress */}
        <View className="lesson-hero" style={{ height: insets.top + HERO_HEIGHT }}>
          <Image
            source={selectedLesson.image}
            className="absolute inset-0 h-full w-full"
            resizeMode="cover"
          />
          <View className="lesson-hero__fade" />
          <Image
            source={images.mascotWelcome}
            className="absolute bottom-[-34px] left-[64px] h-[176px] w-[156px]"
            resizeMode="contain"
          />

          <View
            className="absolute left-0 right-0 top-0 flex-row items-start px-[3px]"
            style={{ paddingTop: insets.top + 4 }}
          >
            <TouchableOpacity
              className="h-[42px] w-[42px] items-center justify-center"
              onPress={() => router.navigate("/home")}
              hitSlop={8}
              activeOpacity={0.6}
              accessibilityLabel="Back to home"
            >
              <SymbolView
                name={{ ios: "chevron.left", android: "arrow_back_ios_new", web: "arrow_back_ios_new" }}
                size={22}
                weight="semibold"
                tintColor={colors.foreground}
              />
            </TouchableOpacity>

            <View className="ml-[15px] flex-1">
              <Text className="lesson-hero__title" numberOfLines={1}>
                {selectedLesson.title}
              </Text>
              <Text className="lesson-hero__subtitle">
                Unit {unit?.order ?? 1} • {selectedNumber} / {lessons.length} lessons
              </Text>
            </View>

            <View className="lesson-hero__bookmark mr-[15px] mt-[5px]">
              <SymbolView
                name={{ ios: "bookmark.fill", android: "bookmark", web: "bookmark" }}
                size={20}
                tintColor={colors.accent}
              />
              <View className="absolute">
                <SymbolView
                  name={{ ios: "bookmark", android: "bookmark_border", web: "bookmark_border" }}
                  size={20}
                  weight="semibold"
                  tintColor={colors.foreground}
                />
              </View>
            </View>
          </View>
        </View>

        {/* Lessons / Practice switch */}
        <View className="lesson-tabs mx-[12px] mt-[-2px]">
          {(["lessons", "practice"] as const).map((tab) => {
            const isActive = activeTab === tab;
            return (
              <TouchableOpacity
                key={tab}
                className={`lesson-tabs__item ${isActive ? "lesson-tabs__item--active" : ""}`}
                onPress={() => setActiveTab(tab)}
                activeOpacity={0.7}
                accessibilityRole="tab"
                accessibilityState={{ selected: isActive }}
              >
                <Text
                  className={`lesson-tabs__label ${isActive ? "lesson-tabs__label--active" : ""}`}
                >
                  {tab === "lessons" ? "Lessons" : "Practice"}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {activeTab === "lessons" ? (
          // Every lesson can be opened — there's no locking yet.
          // Tapping a lesson selects it and opens its AI teacher audio lesson.
          <View className="mt-[18px] gap-[7px] px-[17px]">
            {lessons.map((lesson, index) => (
              <LessonCard
                key={lesson.id}
                lesson={lesson}
                number={index + 1}
                status={getLessonStatus(lesson, completedActivityIds, currentLesson?.id)}
                isSelected={lesson.id === selectedLesson.id}
                onPress={() => {
                  setSelectedLessonId(lesson.id);
                  router.navigate({ pathname: "/ai-teacher", params: { lessonId: lesson.id } });
                }}
              />
            ))}
          </View>
        ) : (
          // Activities of the selected lesson. Tapping marks one done for now.
          <View className="mt-[18px] px-[17px]">
            <Text className="body-md text-muted">{selectedLesson.description}</Text>
            <View className="mt-[12px] gap-[5px]">
              {selectedLesson.activities.map((activity) => (
                <PlanItem
                  key={activity.id}
                  activity={activity}
                  isCompleted={completedActivityIds.includes(activity.id)}
                  onPress={() => handleCompleteActivity(activity)}
                />
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: 20,
  },
});
