import { useUser } from "@clerk/expo";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SymbolView, type SymbolViewProps } from "expo-symbols";
import { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { images } from "@/constants/images";
import { getLanguage } from "@/data/languages";
import { getCurrentLesson, getLesson } from "@/data/lessons";
import { getUnit } from "@/data/units";
import { useLanguageStore } from "@/store/useLanguageStore";
import { selectStreak, useProgressStore } from "@/store/useProgressStore";
import { colors } from "@/theme";
import type { FeedbackSkill, Lesson, Phrase } from "@/types/learning";

const ICON_COLOR = "#1E2A4A";

// Height of the illustrated classroom. Controls sit near its bottom edge.
const STAGE_HEIGHT = 600;

// Placeholder scores until the AI teacher (Vision Agent backend) sends real feedback.
const SAMPLE_FEEDBACK: { skill: FeedbackSkill; label: string; rating: string; score: number; color: string }[] = [
  { skill: "speaking", label: "Speaking", rating: "Excellent", score: 0.75, color: "#22C55E" },
  { skill: "pronunciation", label: "Pronunciation", rating: "Great", score: 0.68, color: "#1E8EF0" },
  { skill: "grammar", label: "Grammar", rating: "Good", score: 0.78, color: "#7C3AED" },
];

// Leaves the lesson: back to the previous tab (usually Learn).
function leaveLesson() {
  if (router.canGoBack()) {
    router.back();
  } else {
    router.navigate("/learn");
  }
}

// AI Teacher tab. Opened from the Learn screen with a `lessonId`;
// opened from anywhere else it falls back to the current lesson.
export default function AiTeacherScreen() {
  const { lessonId } = useLocalSearchParams<{ lessonId?: string }>();
  const selectedLanguage = useLanguageStore((state) => state.selectedLanguage);
  const completedActivityIds = useProgressStore((state) => state.completedActivityIds);

  const lesson =
    (lessonId ? getLesson(lessonId) : undefined) ??
    (selectedLanguage ? getCurrentLesson(selectedLanguage, completedActivityIds) : undefined);

  if (!lesson) {
    return (
      <View className="tab-placeholder bg-background">
        <Text className="h3 text-foreground">Lesson not found</Text>
        <TouchableOpacity onPress={leaveLesson} activeOpacity={0.7}>
          <Text className="section-link">Back to lessons</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Tab screens stay mounted, so the key resets mic, subtitles and the
  // teacher's line whenever a different lesson is opened.
  return <AudioLesson key={lesson.id} lesson={lesson} />;
}

// AI Teacher audio lesson. Audio only — the learner talks to the AI teacher,
// sees what the teacher says, and gets feedback. There is no video call.
function AudioLesson({ lesson }: { lesson: Lesson }) {
  const insets = useSafeAreaInsets();
  const { user } = useUser();
  const streak = useProgressStore(selectStreak);

  const [isMicOn, setIsMicOn] = useState(true);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [showSubtitles, setShowSubtitles] = useState(true);
  // What the teacher is saying right now. null = the lesson's opening line.
  const [spokenPhrase, setSpokenPhrase] = useState<Phrase | null>(null);

  const language = getLanguage(lesson.languageCode);
  const unit = getUnit(lesson.unitId);
  const teacherLine = spokenPhrase ?? {
    text: lesson.aiTeacher.openingLine,
    translation: lesson.aiTeacher.openingLineTranslation,
  };

  return (
    <View className="call-screen flex-1" style={{ paddingTop: insets.top }}>
      <StatusBar style="dark" />

      {/* Header: back, title + session status, audio / streak / bell */}
      <View className="h-[68px] flex-row items-center pl-[16px] pr-[18px]">
        <TouchableOpacity
          className="h-[40px] w-[28px] justify-center"
          onPress={leaveLesson}
          hitSlop={8}
          activeOpacity={0.6}
          accessibilityLabel="Back to lessons"
        >
          <SymbolView
            name={{ ios: "chevron.left", android: "arrow_back_ios_new", web: "arrow_back_ios_new" }}
            size={22}
            weight="semibold"
            tintColor={colors.foreground}
          />
        </TouchableOpacity>

        <View className="ml-[21px] flex-1">
          <Text className="call-header__title">AI Teacher</Text>
          <View className="mt-[2px] flex-row items-center gap-[7px]">
            <View
              className={`call-header__dot ${isMicOn ? "call-header__dot--online" : "call-header__dot--muted"}`}
            />
            <Text className="call-header__status">{isMicOn ? "Online" : "Mic muted"}</Text>
          </View>
        </View>

        <View className="flex-row gap-[8px]">
          {/* Shows this is an audio lesson — there's no video */}
          <View className="call-header__btn" accessibilityLabel="Audio lesson">
            <SymbolView
              name={{ ios: "headphones", android: "headphones", web: "headphones" }}
              size={19}
              weight="medium"
              tintColor={ICON_COLOR}
            />
          </View>
          <View className="call-header__btn" accessibilityLabel={`${streak} day streak`}>
            <Text className="call-header__count">{streak}</Text>
          </View>
          <View className="call-header__btn">
            <SymbolView
              name={{ ios: "bell", android: "notifications_none", web: "notifications_none" }}
              size={19}
              weight="medium"
              tintColor={ICON_COLOR}
            />
          </View>
        </View>
      </View>

      {/* The tab bar is hidden here, so leave room for the home indicator */}
      <ScrollView
        contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Classroom with the AI teacher */}
        <View className="call-stage" style={{ height: STAGE_HEIGHT }}>
          <View className="call-stage__window left-[-6px] top-[-6px] h-[280px] w-[84px]" />
          <View className="call-stage__poster left-[160px] top-[22px] h-[96px] w-[118px]">
            <Image source={images.earth} className="h-full w-full" resizeMode="contain" />
          </View>

          <Image
            source={images.mascotAuth}
            className="absolute left-[34px] top-[150px] h-[262px] w-[270px]"
            resizeMode="contain"
          />
          <View className="call-stage__desk top-[398px] h-[110px]" />

          {/* Book stack — the red book shows the lesson's language */}
          <View className="call-stage__book call-stage__book--teal left-[-8px] top-[372px] w-[70px] -rotate-6" />
          <View className="call-stage__book call-stage__book--yellow left-[-8px] top-[398px] w-[66px] -rotate-3" />
          <View className="call-stage__book call-stage__book--red left-[-8px] top-[424px] w-[78px] -rotate-6">
            <Text className="call-stage__book-label" numberOfLines={1}>
              {language?.nativeName}
            </Text>
          </View>

          {/* The learner's tile: profile photo instead of a camera feed */}
          <View className="call-stage__self right-[17px] top-[61px] h-[134px] w-[101px]">
            {user?.imageUrl ? (
              <Image source={{ uri: user.imageUrl }} className="h-full w-full" resizeMode="cover" />
            ) : (
              <View className="flex-1 items-center justify-center">
                <SymbolView
                  name={{ ios: "person.fill", android: "person", web: "person" }}
                  size={40}
                  tintColor={colors.primary}
                />
              </View>
            )}
            {!isMicOn && (
              <View className="call-stage__self-badge">
                <SymbolView
                  name={{ ios: "mic.slash.fill", android: "mic_off", web: "mic_off" }}
                  size={12}
                  tintColor={colors.background}
                />
              </View>
            )}
          </View>

          {/* What the teacher just said */}
          <View className="teacher-bubble left-[121px] right-[47px] top-[349px]">
            <View className="teacher-bubble__tail" />
            <View className="flex-1 pr-[10px]">
              <Text className="teacher-bubble__text">{teacherLine.text}</Text>
              {showSubtitles && (
                <Text className="teacher-bubble__translation">{teacherLine.translation}</Text>
              )}
            </View>
            <SymbolView
              name={
                isSpeakerOn
                  ? { ios: "speaker.wave.2.fill", android: "volume_up", web: "volume_up" }
                  : { ios: "speaker.slash.fill", android: "volume_off", web: "volume_off" }
              }
              size={24}
              tintColor={isSpeakerOn ? "#5B4BF5" : "#94A3B8"}
            />
          </View>

          {/* Audio controls */}
          <View className="absolute left-0 right-0 top-[463px] flex-row px-[16px]">
            <CallControl
              label="Speaker"
              icon={
                isSpeakerOn
                  ? { ios: "speaker.wave.2.fill", android: "volume_up", web: "volume_up" }
                  : { ios: "speaker.slash.fill", android: "volume_off", web: "volume_off" }
              }
              isOff={!isSpeakerOn}
              onPress={() => setIsSpeakerOn((on) => !on)}
            />
            <CallControl
              label="Mic"
              icon={
                isMicOn
                  ? { ios: "mic.fill", android: "mic", web: "mic" }
                  : { ios: "mic.slash.fill", android: "mic_off", web: "mic_off" }
              }
              isOff={!isMicOn}
              onPress={() => setIsMicOn((on) => !on)}
            />
            <CallControl
              label="Subtitles"
              icon={{ ios: "translate", android: "translate", web: "translate" }}
              isOff={!showSubtitles}
              onPress={() => setShowSubtitles((on) => !on)}
            />
            <CallControl
              label="End Call"
              icon={{ ios: "phone.down.fill", android: "call_end", web: "call_end" }}
              isEnd
              onPress={leaveLesson}
            />
          </View>
        </View>

        {/* Lesson feedback */}
        <View className="feedback-card mx-[14px] mt-[-30px]">
          {SAMPLE_FEEDBACK.map((item, index) => (
            <View
              key={item.skill}
              className={`feedback-card__item ${index > 0 ? "feedback-card__item--divider" : ""}`}
            >
              <Text className="feedback-card__label" numberOfLines={1} adjustsFontSizeToFit>
                {item.label}
              </Text>
              <View className="feedback-card__track">
                <View
                  className="feedback-card__fill"
                  style={{ width: `${item.score * 100}%`, backgroundColor: item.color }}
                />
              </View>
              <Text className="feedback-card__rating" style={{ color: item.color }}>
                {item.rating}
              </Text>
            </View>
          ))}
        </View>

        {/* Lesson details: language, title, goal and the AI teacher's scenario */}
        <View className="card mx-[14px] mt-[16px] p-[20px]">
          <View className="flex-row items-center gap-[8px]">
            {language && (
              <Image source={{ uri: language.flag }} className="home-header__flag h-[22px] w-[22px]" />
            )}
            <Text className="eyebrow">
              {language?.name} • Unit {unit?.order ?? 1} • {unit?.level}
            </Text>
          </View>
          <Text className="h3 mt-[10px] text-foreground">{lesson.title}</Text>
          <Text className="body-md mt-[2px] text-muted">{lesson.description}</Text>

          <Text className="feedback-card__label mt-[16px]">Goal</Text>
          <View className="mt-[6px] gap-[6px]">
            {lesson.goals.map((goal) => (
              <View key={goal} className="flex-row items-start gap-[8px]">
                <View className="mt-[3px]">
                  <SymbolView
                    name={{ ios: "checkmark.circle.fill", android: "check_circle", web: "check_circle" }}
                    size={16}
                    tintColor={colors.primary}
                  />
                </View>
                <Text className="body-md flex-1 text-foreground">{goal}</Text>
              </View>
            ))}
          </View>

          <Text className="feedback-card__label mt-[16px]">Scenario</Text>
          <Text className="body-md mt-[4px] text-muted">{lesson.aiTeacher.scenario}</Text>
        </View>

        {/* Key phrases — tap one to hear the teacher say it */}
        <View className="mx-[14px] mt-[20px]">
          <Text className="section-title">Key phrases</Text>
          <View className="mt-[10px] gap-[7px]">
            {lesson.phrases.map((phrase) => {
              const isActive = phrase.text === spokenPhrase?.text;
              return (
                <TouchableOpacity
                  key={phrase.text}
                  className={`phrase-row ${isActive ? "phrase-row--active" : ""}`}
                  onPress={() => setSpokenPhrase(phrase)}
                  activeOpacity={0.7}
                >
                  <View className="flex-1 pr-[12px]">
                    <Text className="phrase-row__text">{phrase.text}</Text>
                    <Text className="phrase-row__translation">{phrase.translation}</Text>
                  </View>
                  <SymbolView
                    name={{ ios: "speaker.wave.2", android: "volume_up", web: "volume_up" }}
                    size={20}
                    tintColor={isActive ? colors.primary : "#94A3B8"}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

type CallControlProps = {
  label: string;
  icon: SymbolViewProps["name"];
  isOff?: boolean;
  isEnd?: boolean;
  onPress: () => void;
};

// One round control with its label: Speaker, Mic, Subtitles or End Call.
function CallControl({ label, icon, isOff = false, isEnd = false, onPress }: CallControlProps) {
  const circleModifier = isEnd ? "call-control__circle--end" : isOff ? "call-control__circle--off" : "";

  return (
    <TouchableOpacity
      className="call-control"
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityRole={isEnd ? "button" : "switch"}
      accessibilityState={isEnd ? undefined : { checked: !isOff }}
      accessibilityLabel={label}
    >
      <View className={`call-control__circle ${circleModifier}`}>
        <SymbolView
          name={icon}
          size={isEnd ? 30 : 28}
          weight="semibold"
          tintColor={isEnd ? colors.background : ICON_COLOR}
        />
      </View>
      <Text className="call-control__label">{label}</Text>
    </TouchableOpacity>
  );
}
