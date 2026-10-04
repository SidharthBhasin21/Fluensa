import { useUser } from "@clerk/expo";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SymbolView } from "expo-symbols";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import PlanItem from "@/components/PlanItem";
import { images } from "@/constants/images";
import { getLanguage } from "@/data/languages";
import { getCurrentLesson } from "@/data/lessons";
import { getUnit } from "@/data/units";
import { useLanguageStore } from "@/store/useLanguageStore";
import {
  DAILY_XP_GOAL,
  selectStreak,
  selectXpToday,
  useProgressStore,
} from "@/store/useProgressStore";
import { colors } from "@/theme";

export default function HomeScreen() {
  const { user } = useUser();
  const selectedLanguage = useLanguageStore((state) => state.selectedLanguage);
  const completedActivityIds = useProgressStore((state) => state.completedActivityIds);
  const completeActivity = useProgressStore((state) => state.completeActivity);
  const xpToday = useProgressStore(selectXpToday);
  const streak = useProgressStore(selectStreak);

  // The tabs layout redirects to language selection when nothing is picked,
  // so this only guards against a missing language for TypeScript.
  if (!selectedLanguage) {
    return null;
  }

  const language = getLanguage(selectedLanguage);
  const lesson = getCurrentLesson(selectedLanguage, completedActivityIds);
  const unit = lesson ? getUnit(lesson.unitId) : undefined;

  // The AI video call gets its own "Next up" card, everything else is today's plan.
  const planActivities =
    lesson?.activities.filter((activity) => activity.type !== "ai-video-call") ?? [];
  const videoCall = lesson?.activities.find(
    (activity) => activity.type === "ai-video-call",
  );

  const firstName =
    user?.firstName ??
    user?.username ??
    user?.primaryEmailAddress?.emailAddress.split("@")[0] ??
    "there";
  const goalProgress = Math.min(xpToday / DAILY_XP_GOAL, 1);

  return (
    <SafeAreaView edges={["top"]} style={styles.safeArea}>
      <StatusBar style="dark" />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header: flag, greeting, streak, notifications */}
        <View className="mt-[6px] h-[44px] flex-row items-center px-[4px]">
          {language && (
            <Image
              source={{ uri: language.flag }}
              className="home-header__flag"
              resizeMode="cover"
            />
          )}
          <Text className="home-header__greeting ml-[12px] flex-1" numberOfLines={1}>
            {language?.greeting ?? "Hello"}, {firstName}! 👋
          </Text>

          <Image
            source={images.streakFire}
            className="h-[28px] w-[26px]"
            resizeMode="contain"
          />
          <Text className="home-header__streak ml-[7px]">{streak}</Text>

          <TouchableOpacity className="ml-[24px]" hitSlop={10} activeOpacity={0.6}>
            <SymbolView
              name={{ ios: "bell", android: "notifications_none", web: "notifications_none" }}
              size={25}
              weight="medium"
              tintColor={colors.foreground}
            />
            <View className="home-header__badge" />
          </TouchableOpacity>
        </View>

        {/* Daily goal */}
        <View className="home-card home-card--goal mt-[14px] h-[118px]">
          <View className="cloud right-[90px] top-[30px] h-[44px] w-[70px] opacity-60" />
          <View className="cloud right-[-14px] top-[44px] h-[46px] w-[64px] opacity-60" />
          <View className="hill bottom-[-22px] right-[-8px] h-[52px] w-[150px]" />
          <Image
            source={images.treasure}
            className="absolute bottom-[14px] right-[22px] h-[82px] w-[94px]"
            resizeMode="contain"
          />
          <View className="absolute right-[48px] top-[10px]">
            <SymbolView name="sparkle" size={14} tintColor={colors.accent} />
          </View>
          <View className="absolute right-[124px] top-[44px]">
            <SymbolView name="sparkle" size={12} tintColor={colors.accent} />
          </View>

          <View className="pl-[20px] pt-[17px]">
            <Text className="home-card__eyebrow">Daily goal</Text>
            <View className="mt-[2px] flex-row items-end">
              <Text className="font-poppins-bold text-[32px] leading-[40px] text-[#0F9E9A]">
                {xpToday}
              </Text>
              <Text className="mb-[5px] ml-[6px] font-poppins-semibold text-[19px] leading-[26px] text-foreground">
                / {DAILY_XP_GOAL} XP
              </Text>
            </View>
            <View className="progress-bar mt-[8px] w-[56%]">
              <View
                className="progress-bar__fill"
                style={{ width: `${goalProgress * 100}%` }}
              />
            </View>
          </View>
        </View>

        {/* Continue learning */}
        {lesson && (
          <View className="home-card home-card--continue mt-[15px] h-[182px]">
            <View className="cloud left-[150px] top-[48px] h-[34px] w-[64px]" />
            <View className="cloud right-[-10px] top-[36px] h-[40px] w-[72px]" />
            <View className="cloud left-[118px] bottom-[34px] h-[40px] w-[90px] opacity-70" />
            <View className="hill bottom-[-48px] right-[-30px] h-[96px] w-[280px]" />
            <Image
              source={images.palace}
              className="absolute bottom-[-6px] right-[18px] h-[178px] w-[132px]"
              resizeMode="contain"
            />

            <View className="pl-[20px] pt-[20px]">
              <Text className="home-card__eyebrow text-[#0B4F5C]">Continue learning</Text>
              <Text className="mt-[2px] font-poppins-bold text-[32px] leading-[40px] text-[#0F2A3D]">
                {language?.name}
              </Text>
              {unit && (
                <Text className="font-poppins-medium text-[19px] leading-[26px] text-[#0F3B4C]">
                  {unit.level} • Unit {unit.order}
                </Text>
              )}

              <TouchableOpacity
                className="pill-btn mt-[13px]"
                onPress={() => router.push("/learn")}
                activeOpacity={0.85}
              >
                <Text className="pill-btn__label">Continue</Text>
                <SymbolView
                  name={{ ios: "arrow.right", android: "arrow_forward", web: "arrow_forward" }}
                  size={17}
                  weight="semibold"
                  tintColor={colors.background}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Today's plan */}
        <View className="mt-[22px] flex-row items-center justify-between px-[3px]">
          <Text className="section-title">Today’s plan</Text>
          <TouchableOpacity onPress={() => router.push("/learn")} hitSlop={10} activeOpacity={0.6}>
            <Text className="section-link">View all</Text>
          </TouchableOpacity>
        </View>

        <View className="mt-[10px] gap-[5px]">
          {/* Tapping marks the activity done for now — lesson screens come in a later feature. */}
          {planActivities.map((activity) => (
            <PlanItem
              key={activity.id}
              activity={activity}
              isCompleted={completedActivityIds.includes(activity.id)}
              onPress={() => completeActivity(activity)}
            />
          ))}
        </View>

        {/* Next up: AI video call, with the mascot peeking over the top edge */}
        {videoCall && (
          <TouchableOpacity
            className="mt-[16px] h-[114px] pt-[12px]"
            onPress={() => router.push("/ai-teacher")}
            activeOpacity={0.85}
          >
            <View className="home-card home-card--next flex-1">
              <View className="cloud bottom-[-20px] right-[-10px] h-[60px] w-[150px] bg-[#dff2e4]" />
              <View className="pl-[20px] pt-[18px]">
                <Text className="home-card__eyebrow">Next up</Text>
                <Text className="font-poppins-bold text-[18px] leading-[25px] text-foreground">
                  {videoCall.title}
                </Text>
                <Text className="mt-[1px] font-poppins text-[15px] leading-[22px] text-muted">
                  {videoCall.description}
                </Text>
              </View>
            </View>

            {/* Clips the mascot at the card's bottom edge, but lets it rise above the top */}
            <View className="pointer-events-none absolute inset-0 overflow-hidden">
              <Image
                source={images.mascotWelcome}
                className="absolute right-[30px] top-0 h-[207px] w-[184px]"
                resizeMode="contain"
              />
            </View>

            <View className="video-btn absolute right-[12px] top-[46px]">
              <SymbolView
                name={{ ios: "video.fill", android: "videocam", web: "videocam" }}
                size={18}
                tintColor={colors.background}
              />
            </View>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: 14,
    paddingBottom: 20,
  },
});
