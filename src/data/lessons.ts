import { lessonImages } from "@/constants/images";
import { getUnitsByLanguage } from "@/data/units";
import type { LanguageCode, Lesson, LessonStatus } from "@/types/learning";

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
    image: lessonImages.greetings,
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
    image: lessonImages.dailyLife,
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
    image: lessonImages.coffee,
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
    image: lessonImages.greetings,
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
  {
    id: "fr-u1-l2",
    unitId: "fr-u1",
    languageCode: "fr",
    order: 2,
    title: "Daily Life",
    description: "Talk about simple things you do every day.",
    durationMinutes: 6,
    image: lessonImages.dailyLife,
    goals: [
      "Name common daily activities",
      "Say what you do in the morning",
      "Ask someone about their day",
    ],
    vocabulary: [
      { term: "travailler", translation: "to work", pronunciation: "trah-vah-YAY" },
      { term: "manger", translation: "to eat", pronunciation: "mahn-ZHAY" },
      { term: "dormir", translation: "to sleep", pronunciation: "dor-MEER" },
      { term: "aujourd'hui", translation: "today", pronunciation: "oh-zhoor-DWEE" },
      { term: "le matin", translation: "the morning", pronunciation: "luh mah-TAN" },
    ],
    phrases: [
      { text: "Qu'est-ce que tu fais aujourd'hui ?", translation: "What are you doing today?" },
      { text: "Aujourd'hui, je travaille.", translation: "Today I work." },
      { text: "Le matin, je mange du pain.", translation: "In the morning I eat bread." },
    ],
    activities: [
      {
        id: "fr-u1-l2-a1",
        type: "vocabulary",
        title: "New words",
        description: "5 words",
        xp: 5,
      },
      {
        id: "fr-u1-l2-a2",
        type: "ai-conversation",
        title: "AI Conversation",
        description: "Talk about your day",
        xp: 10,
      },
    ],
    aiTeacher: {
      scenario: "Chatting with a friend about your day.",
      instructions:
        "You are a friendly French teacher. Ask the learner simple questions about their day using the present tense only. If they make a mistake, gently repeat the correct sentence and continue.",
      openingLine: "Salut ! Qu'est-ce que tu fais aujourd'hui ?",
      openingLineTranslation: "Hi! What are you doing today?",
      feedbackSkills: ["speaking", "grammar"],
    },
  },

  // ─── French · Unit 2 ──────────────────────────────────────────
  {
    id: "fr-u2-l1",
    unitId: "fr-u2",
    languageCode: "fr",
    order: 1,
    title: "At the Café",
    description: "Order a drink and a snack at a café.",
    durationMinutes: 6,
    image: lessonImages.cafe,
    goals: [
      "Order a drink politely",
      "Ask how much something costs",
      "Ask for the bill",
    ],
    vocabulary: [
      { term: "un café", translation: "a coffee", pronunciation: "uhn kah-FAY" },
      { term: "un croissant", translation: "a croissant", pronunciation: "uhn krwah-SAHN" },
      { term: "l'eau", translation: "the water", pronunciation: "loh" },
      { term: "l'addition", translation: "the bill", pronunciation: "lah-dee-SYOHN" },
      { term: "s'il vous plaît", translation: "please", pronunciation: "seel voo PLEH" },
    ],
    phrases: [
      { text: "Un café, s'il vous plaît.", translation: "A coffee, please." },
      { text: "C'est combien ?", translation: "How much is it?" },
      { text: "L'addition, s'il vous plaît.", translation: "The bill, please." },
    ],
    activities: [
      {
        id: "fr-u2-l1-a1",
        type: "vocabulary",
        title: "New words",
        description: "5 words",
        xp: 5,
      },
      {
        id: "fr-u2-l1-a2",
        type: "phrases",
        title: "Key phrases",
        description: "Order like a local",
        xp: 5,
      },
      {
        id: "fr-u2-l1-a3",
        type: "ai-video-call",
        title: "AI Video Call",
        description: "Order at the café",
        xp: 10,
      },
    ],
    aiTeacher: {
      scenario: "You are a waiter at a café in Paris.",
      instructions:
        "Role-play as a cheerful Parisian café waiter. Take the learner's order, tell them the price, and bring the bill when asked. Stay in character and use only simple A1 French.",
      openingLine: "Bonjour ! Qu'est-ce que vous désirez ?",
      openingLineTranslation: "Hello! What would you like?",
      feedbackSkills: ["speaking", "pronunciation", "grammar"],
    },
  },
  {
    id: "fr-u2-l2",
    unitId: "fr-u2",
    languageCode: "fr",
    order: 2,
    title: "Travel & Directions",
    description: "Ask for directions and find your way around.",
    durationMinutes: 7,
    image: lessonImages.travel,
    goals: [
      "Ask where a place is",
      "Understand left, right and straight ahead",
      "Name common places in a town",
    ],
    vocabulary: [
      { term: "la gare", translation: "the train station", pronunciation: "lah gahr" },
      { term: "l'hôtel", translation: "the hotel", pronunciation: "loh-TEL" },
      { term: "à gauche", translation: "to the left", pronunciation: "ah GOHSH" },
      { term: "à droite", translation: "to the right", pronunciation: "ah DRWAHT" },
      { term: "tout droit", translation: "straight ahead", pronunciation: "too DRWAH" },
    ],
    phrases: [
      { text: "Où est la gare ?", translation: "Where is the train station?" },
      { text: "C'est loin ?", translation: "Is it far?" },
      { text: "Allez tout droit, puis à gauche.", translation: "Go straight, then left." },
    ],
    activities: [
      {
        id: "fr-u2-l2-a1",
        type: "vocabulary",
        title: "New words",
        description: "5 words",
        xp: 5,
      },
      {
        id: "fr-u2-l2-a2",
        type: "phrases",
        title: "Key phrases",
        description: "Ask for directions",
        xp: 5,
      },
      {
        id: "fr-u2-l2-a3",
        type: "ai-video-call",
        title: "AI Video Call",
        description: "Find the station",
        xp: 10,
      },
    ],
    aiTeacher: {
      scenario: "A tourist asks you for directions in Lyon.",
      instructions:
        "Role-play as a helpful local. The learner is lost and asks for directions. Give short, simple directions using left, right and straight ahead. Use only simple A1 French.",
      openingLine: "Bonjour ! Vous cherchez quelque chose ?",
      openingLineTranslation: "Hello! Are you looking for something?",
      feedbackSkills: ["speaking", "pronunciation"],
    },
  },
  {
    id: "fr-u2-l3",
    unitId: "fr-u2",
    languageCode: "fr",
    order: 3,
    title: "Shopping",
    description: "Buy clothes and ask about sizes and prices.",
    durationMinutes: 6,
    image: lessonImages.shopping,
    goals: [
      "Say what you are looking for",
      "Ask about price and size",
      "Name a few colors",
    ],
    vocabulary: [
      { term: "le magasin", translation: "the shop", pronunciation: "luh mah-gah-ZAN" },
      { term: "la chemise", translation: "the shirt", pronunciation: "lah shuh-MEEZ" },
      { term: "la taille", translation: "the size", pronunciation: "lah TYE" },
      { term: "cher", translation: "expensive", pronunciation: "shehr" },
      { term: "bleu", translation: "blue", pronunciation: "bluh" },
    ],
    phrases: [
      { text: "Je cherche une chemise.", translation: "I'm looking for a shirt." },
      { text: "Vous avez une taille M ?", translation: "Do you have a size M?" },
      { text: "Je la prends.", translation: "I'll take it." },
    ],
    activities: [
      {
        id: "fr-u2-l3-a1",
        type: "vocabulary",
        title: "New words",
        description: "5 words",
        xp: 5,
      },
      {
        id: "fr-u2-l3-a2",
        type: "ai-conversation",
        title: "AI Conversation",
        description: "Buy a shirt",
        xp: 10,
      },
    ],
    aiTeacher: {
      scenario: "You work in a clothing shop in Paris.",
      instructions:
        "Role-play as a friendly shop assistant. Help the learner find a shirt, ask about size and color, and tell them the price. Use only simple A1 French.",
      openingLine: "Bonjour ! Je peux vous aider ?",
      openingLineTranslation: "Hello! Can I help you?",
      feedbackSkills: ["speaking", "grammar"],
    },
  },

  // ─── French · Unit 3 ──────────────────────────────────────────
  {
    id: "fr-u3-l1",
    unitId: "fr-u3",
    languageCode: "fr",
    order: 1,
    title: "Family & Friends",
    description: "Introduce the people who matter to you.",
    durationMinutes: 6,
    image: lessonImages.family,
    goals: [
      "Name family members",
      "Introduce a friend",
      "Say how many brothers and sisters you have",
    ],
    vocabulary: [
      { term: "la mère", translation: "the mother", pronunciation: "lah mehr" },
      { term: "le père", translation: "the father", pronunciation: "luh pehr" },
      { term: "le frère", translation: "the brother", pronunciation: "luh frehr" },
      { term: "la sœur", translation: "the sister", pronunciation: "lah suhr" },
      { term: "un ami", translation: "a friend", pronunciation: "uhn ah-MEE" },
    ],
    phrases: [
      { text: "Voici ma mère.", translation: "This is my mother." },
      { text: "J'ai un frère.", translation: "I have a brother." },
      { text: "C'est mon ami Paul.", translation: "This is my friend Paul." },
    ],
    activities: [
      {
        id: "fr-u3-l1-a1",
        type: "vocabulary",
        title: "New words",
        description: "5 words",
        xp: 5,
      },
      {
        id: "fr-u3-l1-a2",
        type: "phrases",
        title: "Key phrases",
        description: "Introduce your family",
        xp: 5,
      },
      {
        id: "fr-u3-l1-a3",
        type: "ai-video-call",
        title: "AI Video Call",
        description: "Talk about your family",
        xp: 10,
      },
    ],
    aiTeacher: {
      scenario: "Looking at family photos with a new friend.",
      instructions:
        "You are a friendly French teacher. Ask the learner about their family and friends: who they are and how many siblings they have. Use only simple A1 French.",
      openingLine: "Tu as des frères et sœurs ?",
      openingLineTranslation: "Do you have brothers and sisters?",
      feedbackSkills: ["speaking", "grammar"],
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
    image: lessonImages.greetings,
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
  {
    id: "ja-u1-l2",
    unitId: "ja-u1",
    languageCode: "ja",
    order: 2,
    title: "Daily Life",
    description: "Talk about simple things you do every day.",
    durationMinutes: 6,
    image: lessonImages.dailyLife,
    goals: [
      "Name common daily activities",
      "Say what you do in the morning",
      "Ask someone about their day",
    ],
    vocabulary: [
      { term: "はたらきます", translation: "to work", pronunciation: "hatarakimasu" },
      { term: "たべます", translation: "to eat", pronunciation: "tabemasu" },
      { term: "ねます", translation: "to sleep", pronunciation: "nemasu" },
      { term: "きょう", translation: "today", pronunciation: "kyou" },
      { term: "あさ", translation: "morning", pronunciation: "asa" },
    ],
    phrases: [
      {
        text: "きょうはなにをしますか？",
        translation: "What are you doing today?",
        pronunciation: "kyou wa nani o shimasu ka?",
      },
      {
        text: "きょうははたらきます。",
        translation: "Today I work.",
        pronunciation: "kyou wa hatarakimasu",
      },
      {
        text: "あさ、パンをたべます。",
        translation: "In the morning I eat bread.",
        pronunciation: "asa, pan o tabemasu",
      },
    ],
    activities: [
      {
        id: "ja-u1-l2-a1",
        type: "vocabulary",
        title: "New words",
        description: "5 words",
        xp: 5,
      },
      {
        id: "ja-u1-l2-a2",
        type: "ai-conversation",
        title: "AI Conversation",
        description: "Talk about your day",
        xp: 10,
      },
    ],
    aiTeacher: {
      scenario: "Chatting with a friend about your day.",
      instructions:
        "You are a patient Japanese teacher. Ask the learner simple questions about their day using polite -masu forms only. Say each phrase, then its romaji, then the English meaning.",
      openingLine: "こんにちは！きょうはなにをしますか？",
      openingLineTranslation: "Hello! What are you doing today?",
      feedbackSkills: ["speaking", "grammar"],
    },
  },

  // ─── Japanese · Unit 2 ────────────────────────────────────────
  {
    id: "ja-u2-l1",
    unitId: "ja-u2",
    languageCode: "ja",
    order: 1,
    title: "At the Café",
    description: "Order a drink and a snack at a café.",
    durationMinutes: 6,
    image: lessonImages.cafe,
    goals: [
      "Order a drink politely",
      "Ask how much something costs",
      "Say thank you",
    ],
    vocabulary: [
      { term: "コーヒー", translation: "coffee", pronunciation: "koohii" },
      { term: "おちゃ", translation: "tea", pronunciation: "ocha" },
      { term: "みず", translation: "water", pronunciation: "mizu" },
      { term: "ケーキ", translation: "cake", pronunciation: "keeki" },
      { term: "ください", translation: "please (give me)", pronunciation: "kudasai" },
    ],
    phrases: [
      {
        text: "コーヒーをください。",
        translation: "A coffee, please.",
        pronunciation: "koohii o kudasai",
      },
      {
        text: "いくらですか？",
        translation: "How much is it?",
        pronunciation: "ikura desu ka?",
      },
      {
        text: "ごちそうさまでした。",
        translation: "Thank you for the meal.",
        pronunciation: "gochisousama deshita",
      },
    ],
    activities: [
      {
        id: "ja-u2-l1-a1",
        type: "vocabulary",
        title: "New words",
        description: "5 words",
        xp: 5,
      },
      {
        id: "ja-u2-l1-a2",
        type: "phrases",
        title: "Key phrases",
        description: "Order like a local",
        xp: 5,
      },
      {
        id: "ja-u2-l1-a3",
        type: "ai-video-call",
        title: "AI Video Call",
        description: "Order at the café",
        xp: 10,
      },
    ],
    aiTeacher: {
      scenario: "You are a staff member at a café in Kyoto.",
      instructions:
        "Role-play as a polite café staff member. Welcome the learner, take their order, and tell them the price. Say each phrase, then its romaji, then the English meaning. Keep it very simple.",
      openingLine: "いらっしゃいませ！なにになさいますか？",
      openingLineTranslation: "Welcome! What would you like?",
      feedbackSkills: ["speaking", "pronunciation"],
    },
  },
  {
    id: "ja-u2-l2",
    unitId: "ja-u2",
    languageCode: "ja",
    order: 2,
    title: "Travel & Directions",
    description: "Ask for directions and find your way around.",
    durationMinutes: 7,
    image: lessonImages.travel,
    goals: [
      "Ask where a place is",
      "Understand left, right and straight ahead",
      "Name common places in a town",
    ],
    vocabulary: [
      { term: "えき", translation: "train station", pronunciation: "eki" },
      { term: "ホテル", translation: "hotel", pronunciation: "hoteru" },
      { term: "ひだり", translation: "left", pronunciation: "hidari" },
      { term: "みぎ", translation: "right", pronunciation: "migi" },
      { term: "まっすぐ", translation: "straight ahead", pronunciation: "massugu" },
    ],
    phrases: [
      {
        text: "えきはどこですか？",
        translation: "Where is the station?",
        pronunciation: "eki wa doko desu ka?",
      },
      {
        text: "とおいですか？",
        translation: "Is it far?",
        pronunciation: "tooi desu ka?",
      },
      {
        text: "まっすぐいって、ひだりです。",
        translation: "Go straight, then it's on the left.",
        pronunciation: "massugu itte, hidari desu",
      },
    ],
    activities: [
      {
        id: "ja-u2-l2-a1",
        type: "vocabulary",
        title: "New words",
        description: "5 words",
        xp: 5,
      },
      {
        id: "ja-u2-l2-a2",
        type: "phrases",
        title: "Key phrases",
        description: "Ask for directions",
        xp: 5,
      },
      {
        id: "ja-u2-l2-a3",
        type: "ai-video-call",
        title: "AI Video Call",
        description: "Find the station",
        xp: 10,
      },
    ],
    aiTeacher: {
      scenario: "A tourist asks you for directions in Tokyo.",
      instructions:
        "Role-play as a helpful local. The learner is lost and asks for directions. Give short directions using left, right and straight ahead. Say each phrase, then its romaji, then the English meaning.",
      openingLine: "すみません、どうしましたか？",
      openingLineTranslation: "Excuse me, is something wrong?",
      feedbackSkills: ["speaking", "pronunciation"],
    },
  },
  {
    id: "ja-u2-l3",
    unitId: "ja-u2",
    languageCode: "ja",
    order: 3,
    title: "Shopping",
    description: "Buy things and ask about prices.",
    durationMinutes: 6,
    image: lessonImages.shopping,
    goals: [
      "Say what you want to buy",
      "Ask about the price",
      "Name a few colors",
    ],
    vocabulary: [
      { term: "みせ", translation: "shop", pronunciation: "mise" },
      { term: "シャツ", translation: "shirt", pronunciation: "shatsu" },
      { term: "たかい", translation: "expensive", pronunciation: "takai" },
      { term: "やすい", translation: "cheap", pronunciation: "yasui" },
      { term: "あおい", translation: "blue", pronunciation: "aoi" },
    ],
    phrases: [
      {
        text: "これはいくらですか？",
        translation: "How much is this?",
        pronunciation: "kore wa ikura desu ka?",
      },
      {
        text: "あおいシャツはありますか？",
        translation: "Do you have a blue shirt?",
        pronunciation: "aoi shatsu wa arimasu ka?",
      },
      {
        text: "これをください。",
        translation: "I'll take this, please.",
        pronunciation: "kore o kudasai",
      },
    ],
    activities: [
      {
        id: "ja-u2-l3-a1",
        type: "vocabulary",
        title: "New words",
        description: "5 words",
        xp: 5,
      },
      {
        id: "ja-u2-l3-a2",
        type: "ai-conversation",
        title: "AI Conversation",
        description: "Buy a shirt",
        xp: 10,
      },
    ],
    aiTeacher: {
      scenario: "You work in a clothing shop in Osaka.",
      instructions:
        "Role-play as a polite shop assistant. Help the learner find a shirt, ask about color, and tell them the price. Say each phrase, then its romaji, then the English meaning.",
      openingLine: "いらっしゃいませ！",
      openingLineTranslation: "Welcome!",
      feedbackSkills: ["speaking", "grammar"],
    },
  },

  // ─── Japanese · Unit 3 ────────────────────────────────────────
  {
    id: "ja-u3-l1",
    unitId: "ja-u3",
    languageCode: "ja",
    order: 1,
    title: "Family & Friends",
    description: "Introduce the people who matter to you.",
    durationMinutes: 6,
    image: lessonImages.family,
    goals: [
      "Name family members",
      "Introduce a friend",
      "Say how many brothers and sisters you have",
    ],
    vocabulary: [
      { term: "はは", translation: "my mother", pronunciation: "haha" },
      { term: "ちち", translation: "my father", pronunciation: "chichi" },
      { term: "あに", translation: "my older brother", pronunciation: "ani" },
      { term: "あね", translation: "my older sister", pronunciation: "ane" },
      { term: "ともだち", translation: "friend", pronunciation: "tomodachi" },
    ],
    phrases: [
      {
        text: "これはははです。",
        translation: "This is my mother.",
        pronunciation: "kore wa haha desu",
      },
      {
        text: "あにがひとりいます。",
        translation: "I have one older brother.",
        pronunciation: "ani ga hitori imasu",
      },
      {
        text: "ともだちのケンです。",
        translation: "This is my friend Ken.",
        pronunciation: "tomodachi no Ken desu",
      },
    ],
    activities: [
      {
        id: "ja-u3-l1-a1",
        type: "vocabulary",
        title: "New words",
        description: "5 words",
        xp: 5,
      },
      {
        id: "ja-u3-l1-a2",
        type: "phrases",
        title: "Key phrases",
        description: "Introduce your family",
        xp: 5,
      },
      {
        id: "ja-u3-l1-a3",
        type: "ai-video-call",
        title: "AI Video Call",
        description: "Talk about your family",
        xp: 10,
      },
    ],
    aiTeacher: {
      scenario: "Looking at family photos with a new friend.",
      instructions:
        "You are a patient Japanese teacher. Ask the learner about their family and friends. Say each phrase, then its romaji, then the English meaning. Keep it very simple.",
      openingLine: "かぞくはなんにんですか？",
      openingLineTranslation: "How many people are in your family?",
      feedbackSkills: ["speaking", "grammar"],
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

// All lessons for a language, in course order (unit order, then lesson order).
export function getLessonsByLanguage(code: LanguageCode): Lesson[] {
  return getUnitsByLanguage(code).flatMap((unit) => getLessonsByUnit(unit.id));
}

// The first lesson that still has an unfinished activity.
// When everything is done, stay on the last lesson.
export function getCurrentLesson(
  code: LanguageCode,
  completedActivityIds: string[],
): Lesson | undefined {
  const languageLessons = getLessonsByLanguage(code);

  return (
    languageLessons.find((lesson) =>
      lesson.activities.some(
        (activity) => !completedActivityIds.includes(activity.id),
      ),
    ) ?? languageLessons[languageLessons.length - 1]
  );
}

// Completed when every activity is done. The current lesson (or any lesson
// with some activities done) is in progress. Everything else hasn't started.
export function getLessonStatus(
  lesson: Lesson,
  completedActivityIds: string[],
  currentLessonId: string | undefined,
): LessonStatus {
  const doneCount = lesson.activities.filter((activity) =>
    completedActivityIds.includes(activity.id),
  ).length;

  if (doneCount === lesson.activities.length) {
    return "completed";
  }

  if (doneCount > 0 || lesson.id === currentLessonId) {
    return "in-progress";
  }

  return "not-started";
}
