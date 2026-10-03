import { SymbolView } from "expo-symbols";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { colors } from "@/theme";
import type { Language } from "@/types/learning";

type LanguageCardProps = {
  language: Language;
  isSelected: boolean;
  onPress: () => void;
};

// One row in the language list: flag, name, learner count,
// and a check mark when selected (chevron otherwise).
export default function LanguageCard({
  language,
  isSelected,
  onPress,
}: LanguageCardProps) {
  return (
    <TouchableOpacity
      className={`language-card ${isSelected ? "language-card--selected" : ""}`}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Image
        source={{ uri: language.flag }}
        className="language-card__flag"
        resizeMode="cover"
      />

      <View className="ml-[19px] flex-1">
        <Text className="language-card__name">{language.name}</Text>
        <Text className="language-card__learners">
          {language.learners} learners
        </Text>
      </View>

      {isSelected ? (
        <View className="language-card__check">
          <SymbolView
            name={{ ios: "checkmark", android: "check", web: "check" }}
            size={14}
            weight="bold"
            tintColor={colors.background}
          />
        </View>
      ) : (
        <View className="mr-[6px]">
          <SymbolView
            name={{
              ios: "chevron.right",
              android: "arrow_forward_ios",
              web: "arrow_forward_ios",
            }}
            size={16}
            weight="semibold"
            tintColor={colors.muted}
          />
        </View>
      )}
    </TouchableOpacity>
  );
}
