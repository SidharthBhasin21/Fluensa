import type { Lesson } from "@/types/learning";

export const lessons: Lesson[] = [
  // ─── Spanish · Unit 1 ─────────────────────────────────────────
  {
    id: "es-u1-l1",
    unitId: "es-u1",
    languageCode: "es",
    order: 1,
    title: "Greetings & Introductions",
    description: "Say hello and tell people your name.",
    durationMinutes: 5,
    goals: [
      "Greet someone at different times of day",
      "Introduce yourself by name",
      "Ask someone how they are",
    ],
    vocabulary: [
      { term: "hola", translation: "hello", pronunciation: "OH-lah" },
      {
        term: "buenos días",
        translation: "good morning",
        pronunciation: "BWEH-nohs DEE-ahs",
      },
      { term: "adiós", translation: "goodbye", pronunciation: "ah-DYOHS" },
      { term: "gracias", translation: "thank you", pronunciation: "GRAH-syahs" },
      {
        term: "me llamo",
        translation: "my name is",
        pronunciation: "meh YAH-moh",
        example: "Me llamo Alex.",
      },
    ],
    phrases: [
      { text: "¿Cómo te llamas?", translation: "What's your name?" },
      { text: "¿Cómo estás?", translation: "How are you?" },
      { text: "Muy bien, gracias.", translation: "Very well, thank you." },
      { text: "Mucho gusto.", translation: "Nice to meet you." },
    ],
    activities: [
      {
        id: "es-u1-l1-a1",
        type: "vocabulary",
        title: "New words",
        description: "5 words",
        xp: 5,
      },
      {
        id: "es-u1-l1-a2",
        type: "phrases",
        title: "Key phrases",
        description: "Practice greetings",
        xp: 5,
      },
      {
        id: "es-u1-l1-a3",
        type: "ai-video-call",
        title: "AI Video Call",
        description: "Introduce yourself",
        xp: 10,
      },
    ],
    aiTeacher: {
      scenario: "Meeting a new friend for the first time.",
      instructions:
        "You are a friendly Spanish teacher meeting the learner for the first time. Greet them, ask their name and how they are. Use only the lesson vocabulary and phrases. Speak slowly and keep sentences short.",
      openingLine: "¡Hola! Me llamo Lumi. ¿Cómo te llamas?",
      openingLineTranslation: "Hi! My name is Lumi. What's your name?",
      feedbackSkills: ["speaking", "pronunciation"],
    },
  },
  {
    id: "es-u1-l2",
    unitId: "es-u1",
    languageCode: "es",
    order: 2,
    title: "Daily Life",
    description: "Talk about simple things you do every day.",
    durationMinutes: 6,
    goals: [
      "Name common daily activities",
      "Say what you do in the morning",
      "Ask someone about their day",
    ],
    vocabulary: [
      { term: "trabajar", translation: "to work", pronunciation: "trah-bah-HAR" },
      { term: "comer", translation: "to eat", pronunciation: "koh-MEHR" },
      { term: "dormir", translation: "to sleep", pronunciation: "dor-MEER" },
      { term: "hoy", translation: "today", pronunciation: "oy" },
      { term: "la mañana", translation: "the morning", pronunciation: "lah mah-NYAH-nah" },
    ],
    phrases: [
      { text: "¿Qué haces hoy?", translation: "What are you doing today?" },
      { text: "Hoy trabajo.", translation: "Today I work." },
      { text: "Por la mañana como pan.", translation: "In the morning I eat bread." },
    ],
    activities: [
      {
        id: "es-u1-l2-a1",
        type: "vocabulary",
        title: "New words",
        description: "5 words",
        xp: 5,
      },
      {
        id: "es-u1-l2-a2",
        type: "ai-conversation",
        title: "AI Conversation",
        description: "Talk about your day",
        xp: 10,
      },
    ],
    aiTeacher: {
      scenario: "Chatting with a friend about your day.",
      instructions:
        "You are a friendly Spanish teacher. Ask the learner simple questions about their day using present tense only. If they make a mistake, gently repeat the correct sentence and continue.",
      openingLine: "¡Hola! ¿Qué haces hoy?",
      openingLineTranslation: "Hi! What are you doing today?",
      feedbackSkills: ["speaking", "grammar"],
    },
  },

  // ─── Spanish · Unit 2 ─────────────────────────────────────────
  {
    id: "es-u2-l1",
    unitId: "es-u2",
    languageCode: "es",
    order: 1,
    title: "Ordering Coffee",
    description: "Order a drink and a snack at a café.",
    durationMinutes: 6,
    goals: [
      "Order a drink politely",
      "Ask how much something costs",
      "Say thank you and goodbye",
    ],
    vocabulary: [
      { term: "el café", translation: "the coffee", pronunciation: "el kah-FEH" },
      { term: "el agua", translation: "the water", pronunciation: "el AH-gwah" },
      { term: "el pan", translation: "the bread", pronunciation: "el pahn" },
      { term: "la cuenta", translation: "the bill", pronunciation: "lah KWEN-tah" },
      { term: "por favor", translation: "please", pronunciation: "por fah-VOR" },
    ],
    phrases: [
      { text: "Un café, por favor.", translation: "A coffee, please." },
      { text: "¿Cuánto cuesta?", translation: "How much does it cost?" },
      { text: "La cuenta, por favor.", translation: "The bill, please." },
    ],
    activities: [
      {
        id: "es-u2-l1-a1",
        type: "vocabulary",
        title: "New words",
        description: "5 words",
        xp: 5,
      },
      {
        id: "es-u2-l1-a2",
        type: "phrases",
        title: "Key phrases",
        description: "Order like a local",
        xp: 5,
      },
      {
        id: "es-u2-l1-a3",
        type: "ai-video-call",
        title: "AI Video Call",
        description: "Order at the café",
        xp: 10,
      },
    ],
    aiTeacher: {
      scenario: "You are a waiter at a café in Madrid.",
      instructions:
        "Role-play as a cheerful café waiter. Take the learner's order, tell them the price, and bring the bill when asked. Stay in character and use only simple A1 Spanish.",
      openingLine: "¡Buenos días! ¿Qué quieres tomar?",
      openingLineTranslation: "Good morning! What would you like to have?",
      feedbackSkills: ["speaking", "pronunciation", "grammar"],
    },
  },

  // ─── French · Unit 1 ──────────────────────────────────────────
  {
    id: "fr-u1-l1",
    unitId: "fr-u1",
    languageCode: "fr",
    order: 1,
    title: "Greetings & Introductions",
    description: "Say hello politely and introduce yourself.",
    durationMinutes: 5,
    goals: [
      "Greet someone politely",
      "Introduce yourself by name",
      "Say goodbye",
    ],
    vocabulary: [
      { term: "bonjour", translation: "hello", pronunciation: "bohn-ZHOOR" },
      { term: "salut", translation: "hi", pronunciation: "sah-LOO" },
      { term: "merci", translation: "thank you", pronunciation: "mehr-SEE" },
      { term: "au revoir", translation: "goodbye", pronunciation: "oh ruh-VWAHR" },
      {
        term: "je m'appelle",
        translation: "my name is",
        pronunciation: "zhuh mah-PEL",
        example: "Je m'appelle Alex.",
      },
    ],
    phrases: [
      { text: "Comment tu t'appelles ?", translation: "What's your name?" },
      { text: "Ça va ?", translation: "How are you?" },
      { text: "Enchanté.", translation: "Nice to meet you." },
    ],
    activities: [
      {
        id: "fr-u1-l1-a1",
        type: "vocabulary",
        title: "New words",
        description: "5 words",
        xp: 5,
      },
      {
        id: "fr-u1-l1-a2",
        type: "ai-video-call",
        title: "AI Video Call",
        description: "Introduce yourself",
        xp: 10,
      },
    ],
    aiTeacher: {
      scenario: "Meeting a new classmate in Paris.",
      instructions:
        "You are a friendly French teacher. Greet the learner, ask their name and how they are. Use only the lesson vocabulary and phrases, and speak slowly.",
      openingLine: "Bonjour ! Je m'appelle Lumi. Comment tu t'appelles ?",
      openingLineTranslation: "Hello! My name is Lumi. What's your name?",
      feedbackSkills: ["speaking", "pronunciation"],
    },
  },

  // ─── Japanese · Unit 1 ────────────────────────────────────────
  {
    id: "ja-u1-l1",
    unitId: "ja-u1",
    languageCode: "ja",
    order: 1,
    title: "Greetings & Introductions",
    description: "Learn everyday greetings and say your name.",
    durationMinutes: 5,
    goals: [
      "Greet someone during the day",
      "Introduce yourself by name",
      "Say thank you",
    ],
    vocabulary: [
      { term: "こんにちは", translation: "hello", pronunciation: "konnichiwa" },
      { term: "おはよう", translation: "good morning", pronunciation: "ohayou" },
      { term: "ありがとう", translation: "thank you", pronunciation: "arigatou" },
      { term: "さようなら", translation: "goodbye", pronunciation: "sayounara" },
      {
        term: "わたしは",
        translation: "I am",
        pronunciation: "watashi wa",
        example: "わたしはアレックスです。",
      },
    ],
    phrases: [
      {
        text: "はじめまして。",
        translation: "Nice to meet you.",
        pronunciation: "hajimemashite",
      },
      {
        text: "おなまえは？",
        translation: "What's your name?",
        pronunciation: "onamae wa?",
      },
      {
        text: "よろしくおねがいします。",
        translation: "Pleased to meet you.",
        pronunciation: "yoroshiku onegaishimasu",
      },
    ],
    activities: [
      {
        id: "ja-u1-l1-a1",
        type: "vocabulary",
        title: "New words",
        description: "5 words",
        xp: 5,
      },
      {
        id: "ja-u1-l1-a2",
        type: "phrases",
        title: "Key phrases",
        description: "Polite introductions",
        xp: 5,
      },
      {
        id: "ja-u1-l1-a3",
        type: "ai-video-call",
        title: "AI Video Call",
        description: "Introduce yourself",
        xp: 10,
      },
    ],
    aiTeacher: {
      scenario: "Meeting someone for the first time in Tokyo.",
      instructions:
        "You are a patient Japanese teacher. Greet the learner and practice a polite self-introduction. Say each Japanese phrase, then its romaji, then the English meaning. Keep it very simple.",
      openingLine: "こんにちは！はじめまして。おなまえは？",
      openingLineTranslation: "Hello! Nice to meet you. What's your name?",
      feedbackSkills: ["pronunciation", "speaking"],
    },
  },
];

export function getLessonsByUnit(unitId: string): Lesson[] {
  return lessons
    .filter((lesson) => lesson.unitId === unitId)
    .sort((a, b) => a.order - b.order);
}

export function getLesson(id: string): Lesson | undefined {
  return lessons.find((lesson) => lesson.id === id);
}

export function getLessonXp(lesson: Lesson): number {
  return lesson.activities.reduce((total, activity) => total + activity.xp, 0);
}
