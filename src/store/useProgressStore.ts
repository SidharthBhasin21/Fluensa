import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { Activity } from "@/types/learning";

export const DAILY_XP_GOAL = 20;

// Local calendar day as "YYYY-MM-DD", so days are compared by date, not time.
function toDateKey(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

function getToday(): string {
  return toDateKey(new Date());
}

function getYesterday(): string {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return toDateKey(date);
}

interface ProgressState {
  completedActivityIds: string[];
  // XP earned on `lastActiveDate`. Counts as 0 once that day has passed.
  xpToday: number;
  // Days in a row with at least one finished activity.
  streak: number;
  lastActiveDate: string | null;
  completeActivity: (activity: Activity) => void;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      completedActivityIds: [],
      xpToday: 0,
      streak: 0,
      lastActiveDate: null,
      completeActivity: (activity) => {
        const { completedActivityIds, xpToday, streak, lastActiveDate } = get();

        if (completedActivityIds.includes(activity.id)) {
          return;
        }

        const today = getToday();
        const isSameDay = lastActiveDate === today;
        const isNextDay = lastActiveDate === getYesterday();

        set({
          completedActivityIds: [...completedActivityIds, activity.id],
          xpToday: isSameDay ? xpToday + activity.xp : activity.xp,
          streak: isSameDay ? streak : isNextDay ? streak + 1 : 1,
          lastActiveDate: today,
        });
      },
    }),
    {
      name: "progress-store",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

// Today's XP — resets to 0 on a new day.
export const selectXpToday = (state: ProgressState) =>
  state.lastActiveDate === getToday() ? state.xpToday : 0;

// The streak only survives if the last activity was today or yesterday.
export const selectStreak = (state: ProgressState) =>
  state.lastActiveDate === getToday() || state.lastActiveDate === getYesterday()
    ? state.streak
    : 0;
