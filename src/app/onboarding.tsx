import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Image, LayoutRectangle, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "@/constants/images";
import { colors } from "@/theme";

// The illustration is laid out in design-space points (393 × 416),
// then scaled down to fit whatever space is left on the device.
const ART_WIDTH = 393;
const ART_HEIGHT = 416;

export default function Onboarding() {
  const [artArea, setArtArea] = useState<LayoutRectangle | null>(null);
  const artScale = artArea
    ? Math.min(artArea.width / ART_WIDTH, artArea.height / ART_HEIGHT, 1)
    : 0;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style="dark" />

      <View className="flex-1 overflow-hidden">
        {/* Logo */}
        <View className="flex-row items-center justify-center gap-3.5 pt-5">
          <Image
            source={images.mascotLogo}
            className="h-[62px] w-[56px]"
            resizeMode="contain"
          />
          <Text className="font-poppins-bold text-[30px] leading-[38px] text-foreground">
            Fluensa
          </Text>
        </View>

        {/* Headline */}
        <View className="mt-10 px-9">
          <Text className="font-poppins-bold text-[32px] leading-[42px] text-foreground">
            Your AI language{"\n"}
            <Text className="text-primary">teacher</Text>.
          </Text>
          <Text className="body-lg mt-4 text-muted">
            Real conversations, personalized lessons, anytime, anywhere.
          </Text>
        </View>

        {/* Illustration */}
        <View
          className="flex-1 items-center justify-center"
          onLayout={(event) => setArtArea(event.nativeEvent.layout)}
        >
          {artScale > 0 && (
            <View
              style={{
                width: ART_WIDTH,
                height: ART_HEIGHT,
                transform: [{ scale: artScale }],
              }}
            >
              {/* Background blobs */}
              <View className="blob blob--teal left-[338px] top-[-73px] size-[170px]" />
              <View className="blob blob--teal left-[-40px] top-[125px] size-[150px]" />
              <View className="blob blob--cream left-[290px] top-[250px] size-[220px]" />

              {/* Ground shadow */}
              <View className="absolute left-[64px] top-[394px] h-[20px] w-[240px] rounded-full bg-[#dce8ee]/60" />

              {/* Sparkles on the left (the right ones are part of the mascot image) */}
              <View className="absolute left-[80px] top-[128px] h-[20px] w-[7px] -rotate-30 rounded-full bg-accent" />
              <View className="absolute left-[68px] top-[148px] h-[16px] w-[7px] -rotate-60 rounded-full bg-accent" />

              <Image
                source={images.mascotWelcome}
                className="absolute left-[35px] top-[80px] h-[336px] w-[298px]"
                resizeMode="contain"
              />

              <View className="speech-bubble speech-bubble--teal left-[37px] top-[38px] h-[58px] w-[96px] -rotate-10">
                <View className="speech-bubble__tail speech-bubble--teal right-[20px]" />
                <Text className="speech-bubble__text speech-bubble__text--teal">
                  Hello!
                </Text>
              </View>

              <View className="speech-bubble speech-bubble--yellow left-[238px] top-[6px] h-[62px] w-[108px] rotate-8">
                <View className="speech-bubble__tail speech-bubble--yellow left-[24px]" />
                <Text className="speech-bubble__text speech-bubble__text--yellow">
                  ¡Hola!
                </Text>
              </View>

              <View className="speech-bubble speech-bubble--coral left-[290px] top-[94px] h-[58px] w-[86px] rotate-8">
                <View className="speech-bubble__tail speech-bubble--coral left-[18px]" />
                <Text className="speech-bubble__text speech-bubble__text--coral">
                  你好!
                </Text>
              </View>
            </View>
          )}
        </View>

        {/* Call to action */}
        <View className="px-[26px] pb-[30px]">
          <Link href="/sign-up" asChild>
            <TouchableOpacity className="btn-primary" activeOpacity={0.85}>
              <Text className="btn-primary__label">Get Started</Text>
              <View className="btn-primary__chevron" />
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}
