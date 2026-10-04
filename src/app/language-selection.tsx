import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SymbolView } from "expo-symbols";
import { useState } from "react";
import {
  Image,
  LayoutRectangle,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import LanguageCard from "@/components/LanguageCard";
import { images } from "@/constants/images";
import { languages } from "@/data/languages";
import { posthog } from "@/lib/posthog";
import { posthogLogger } from "@/lib/posthog-logger";
import { useLanguageStore } from "@/store/useLanguageStore";
import { colors } from "@/theme";
import type { LanguageCode } from "@/types/learning";

// earth.png is 730 × 724. The towers start 12% from the top of the image,
// and we show it down to 80% so the bottom of the globe is cut off by the
// screen edge, like in the design.
const EARTH_ASPECT_RATIO = 730 / 724;
const EARTH_TOP = 0.12;
const EARTH_BOTTOM = 0.8;

// Always the full screen width (keeping the aspect ratio).
// Pin the cut-off line to the bottom of the screen when there's room;
// on shorter screens keep the towers at the top and crop more of the globe.
function getEarthStyle(area: LayoutRectangle) {
  const width = area.width;
  const height = width / EARTH_ASPECT_RATIO;

  return {
    position: "absolute" as const,
    width,
    height,
    left: 0,
    top: Math.max(area.height - height * EARTH_BOTTOM, -height * EARTH_TOP),
  };
}

export default function LanguageSelection() {
  const [earthArea, setEarthArea] = useState<LayoutRectangle | null>(null);
  const [search, setSearch] = useState("");
  const savedLanguage = useLanguageStore((state) => state.selectedLanguage);
  const setSelectedLanguage = useLanguageStore(
    (state) => state.setSelectedLanguage,
  );
  const [selectedCode, setSelectedCode] = useState<LanguageCode>(
    savedLanguage ?? "es",
  );

  const query = search.trim().toLowerCase();
  const filteredLanguages = languages.filter(
    (language) =>
      language.name.toLowerCase().includes(query) ||
      language.nativeName.toLowerCase().includes(query),
  );

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/");
    }
  };

  // Save the language, then go home. dismissTo pops back to home if it's
  // already in the stack, otherwise it replaces this screen with home.
  const handleConfirm = () => {
    posthog?.capture("language_selected", { language_code: selectedCode });
    posthogLogger.info("language selection confirmed", {
      language_code: selectedCode,
    });
    setSelectedLanguage(selectedCode);
    router.dismissTo("/");
  };

  return (
    <SafeAreaView edges={["top"]} style={styles.safeArea}>
      <StatusBar style="dark" />

      <View className="flex-1">
        {/* Header + search, with the mascot peeking over the search field */}
        <View className="px-[25px] pt-[8px]">
          <View className="h-[44px] justify-center">
            <Text className="absolute inset-x-0 text-center font-poppins-bold text-[18px] leading-[26px] text-foreground">
              Choose a language
            </Text>
            <TouchableOpacity
              className="size-[24px] items-center justify-center"
              onPress={handleBack}
              hitSlop={12}
              activeOpacity={0.6}
            >
              <SymbolView
                name={{
                  ios: "chevron.left",
                  android: "arrow_back_ios_new",
                  web: "arrow_back_ios_new",
                }}
                size={22}
                weight="medium"
                tintColor={colors.foreground}
              />
            </TouchableOpacity>
          </View>

          <View className="search-field mt-[14px] pr-[90px]">
            <SymbolView
              name={{ ios: "magnifyingglass", android: "search", web: "search" }}
              size={19}
              weight="medium"
              tintColor={colors.muted}
            />
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Search languages"
              placeholderTextColor="#64748b"
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="search"
              className="search-field__input"
            />
          </View>

          <Image
            source={images.mascotAuth}
            className="pointer-events-none absolute bottom-[-2px] right-[8px] h-[88px] w-[91px]"
            resizeMode="contain"
          />
        </View>

        {/* Language list */}
        <View className="px-[25px]">
          <Text className="mt-[20px] font-poppins-semibold text-[16px] leading-[22px] text-foreground">
            Popular
          </Text>

          <View className="mt-[11px] gap-[9px]">
            {filteredLanguages.map((language) => (
              <LanguageCard
                key={language.code}
                language={language}
                isSelected={language.code === selectedCode}
                onPress={() => setSelectedCode(language.code)}
              />
            ))}

            {filteredLanguages.length === 0 && (
              <Text className="body-md py-[24px] text-center text-muted">
                No languages match “{search.trim()}”
              </Text>
            )}
          </View>
        </View>

        {/* Bottom: the earth fills the leftover space and sits behind the Confirm button */}
        <View
          className="flex-1 overflow-hidden"
          onLayout={(event) => setEarthArea(event.nativeEvent.layout)}
        >
          {earthArea && (
            <Image
              source={images.earth}
              style={getEarthStyle(earthArea)}
              resizeMode="contain"
            />
          )}

          <TouchableOpacity
            className="btn-primary btn-primary--elevated mx-[25px] mt-[17px] h-[56px] rounded-[16px]"
            onPress={handleConfirm}
            activeOpacity={0.85}
          >
            <Text className="btn-primary__label text-[18px] leading-[26px]">
              Confirm
            </Text>
            <View className="absolute right-[22px]">
              <SymbolView
                name={{
                  ios: "arrow.right",
                  android: "arrow_forward",
                  web: "arrow_forward",
                }}
                size={22}
                weight="semibold"
                tintColor={colors.background}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.surface,
  },
});
