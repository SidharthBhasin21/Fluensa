export type LanguageCode = "es" | "fr" | "ja";

export type CefrLevel = "A1" | "A2" | "B1";

export interface Language {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flag: string;
  learners: string;
  greeting: string;
}

export interface Unit {
  id: string;
  languageCode: LanguageCode;
  order: number;
  level: CefrLevel;
  title: string;
  description: string;
}

export interface VocabularyItem {
  term: string;
  translation: string;
  pronunciation?: string;
  example?: string;
}

export interface Phrase {
  text: string;
  translation: string;
  pronunciation?: string;
}

export type ActivityType =
  | "vocabulary"
  | "phrases"
  | "ai-conversation"
  | "ai-video-call";

export interface Activity {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  xp: number;
}

export type FeedbackSkill = "speaking" | "pronunciation" | "grammar";

// Lesson-specific instructions for the AI teacher (Vision Agent).
// The backend combines this with the lesson's vocabulary and phrases
// to build the full prompt — it never ships to the AI from the app directly.
export interface AiTeacherPrompt {
  scenario: string;
  instructions: string;
  openingLine: string;
  openingLineTranslation: string;
  feedbackSkills: FeedbackSkill[];
}

export interface Lesson {
  id: string;
  unitId: string;
  languageCode: LanguageCode;
  order: number;
  title: string;
  description: string;
  durationMinutes: number;
  goals: string[];
  vocabulary: VocabularyItem[];
  phrases: Phrase[];
  activities: Activity[];
  aiTeacher: AiTeacherPrompt;
}
