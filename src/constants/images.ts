import appleLogo from "@/assets/images/apple-logo.png";
import earth from "@/assets/images/earth.png";
import googleLogo from "@/assets/images/google-logo.png";
import mascotAuth from "@/assets/images/mascot-auth.png";
import mascotLogo from "@/assets/images/mascot-logo.png";
import mascotWelcome from "@/assets/images/mascot-welcome.png";
import palace from "@/assets/images/palace.png";
import streakFire from "@/assets/images/streak-fire.png";
import treasure from "@/assets/images/treasure.png";

export const images = {
  appleLogo,
  earth,
  googleLogo,
  mascotAuth,
  mascotLogo,
  mascotWelcome,
  palace,
  streakFire,
  treasure,
};

// Placeholder lesson photos from Unsplash.
// Swap these for local illustrations in assets/images/ when they're ready.
const unsplash = (id: string) => ({
  uri: `https://images.unsplash.com/photo-${id}?w=800&q=80`,
});

export const lessonImages = {
  greetings: unsplash("1521791136064-7986c2920216"),
  dailyLife: unsplash("1484981138541-3d074aa97716"),
  cafe: unsplash("1501339847302-ac426a4a7cbb"),
  coffee: unsplash("1495474472287-4d71bcdd2085"),
  travel: unsplash("1488646953014-85cb44e25828"),
  shopping: unsplash("1441986300917-64674bd600d8"),
  family: unsplash("1511895426328-dc8714191300"),
};
