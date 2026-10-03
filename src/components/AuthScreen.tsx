import { Href, Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SymbolView } from "expo-symbols";
import { useRef, useState } from "react";
import {
  Image,
  ImageSourcePropType,
  LayoutChangeEvent,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import VerificationModal from "@/components/VerificationModal";
import { images } from "@/constants/images";
import { useKeyboardHeight } from "@/hooks/useKeyboardHeight";
import { colors, fontFamily } from "@/theme";

type SocialProvider = {
  label: string;
  icon: ImageSourcePropType;
  iconClassName: string;
};

const SOCIAL_PROVIDERS: SocialProvider[] = [
  { label: "Google", icon: images.googleLogo, iconClassName: "size-[28px]" },
  { label: "Facebook", icon: images.facebookLogo, iconClassName: "size-[28px]" },
  { label: "Apple", icon: images.appleLogo, iconClassName: "h-[29px] w-[24px]" },
];

const inputStyle = {
  height: 28,
  padding: 0,
  marginTop: 6,
  fontFamily: fontFamily.regular,
  fontSize: 15,
  color: colors.foreground,
};

// The illustration is laid out in design-space points at its full height,
// then scaled down to fit whatever space is left so the screen never scrolls.
const ART_HEIGHT = 177;

type AuthScreenProps = {
  title: string;
  subtitle: string;
  submitLabel: string;
  showPasswordField?: boolean;
  footerPrompt: string;
  footerLinkLabel: string;
  footerHref: Href;
};

// Shared layout for the Sign Up and Sign In screens (UI only for now, no real auth).
export default function AuthScreen({
  title,
  subtitle,
  submitLabel,
  showPasswordField = false,
  footerPrompt,
  footerLinkLabel,
  footerHref,
}: AuthScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const insets = useSafeAreaInsets();
  const keyboardHeight = useKeyboardHeight();
  const scrollRef = useRef<ScrollView>(null);
  const formTopRef = useRef(0);
  const submitBottomRef = useRef(0);

  // Screen height without the keyboard. The content keeps this height while the
  // keyboard is open, so the layout doesn't squash and can scroll instead.
  const [screenHeight, setScreenHeight] = useState(0);
  const [artAreaHeight, setArtAreaHeight] = useState(0);
  const artScale = Math.min(artAreaHeight / ART_HEIGHT, 1);

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/onboarding");
    }
  };

  const handleVerified = () => {
    setIsVerifying(false);
    router.dismissTo("/");
  };

  // Keyboard closed: remember the full screen height.
  // Keyboard open: the scroll view has shrunk (see the bottom padding below),
  // so scroll until the submit button sits just above the keyboard.
  const handleScrollLayout = (event: LayoutChangeEvent) => {
    const visibleHeight = event.nativeEvent.layout.height;

    if (keyboardHeight === 0) {
      setScreenHeight(visibleHeight);
      return;
    }

    const offset = formTopRef.current + submitBottomRef.current + 16 - visibleHeight;
    if (offset > 0) {
      scrollRef.current?.scrollTo({ y: offset, animated: true });
    }
  };

  return (
    <SafeAreaView
      edges={["top"]}
      style={{
        flex: 1,
        backgroundColor: colors.background,
        paddingBottom: Math.max(keyboardHeight, insets.bottom),
      }}
    >
      <StatusBar style="dark" />

      <ScrollView
        ref={scrollRef}
        onLayout={handleScrollLayout}
        contentContainerStyle={{ flexGrow: 1, minHeight: screenHeight }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="px-[26px]">
          <TouchableOpacity
            className="mt-[2px] size-[24px] items-center justify-center"
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

          <Text className="mt-[18px] font-poppins-bold text-[30px] leading-[38px] text-foreground">
            {title}
          </Text>
          <Text className="mt-[4px] font-poppins text-[17px] leading-[26px] text-muted">
            {subtitle}
          </Text>
        </View>

        {/* Illustration — takes the leftover height; the mascot tucks behind the email field */}
        <View
          className="min-h-[110px] flex-1 overflow-hidden"
          onLayout={(event) => setArtAreaHeight(event.nativeEvent.layout.height)}
        >
          {artScale > 0 && (
            <View
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                height: ART_HEIGHT,
                // Scale around the bottom edge so the mascot stays on top of the form
                transform: [
                  { translateY: (ART_HEIGHT * (1 - artScale)) / 2 },
                  { scale: artScale },
                ],
              }}
            >
              <View className="blob blob--teal right-[-150px] top-[3px] size-[200px]" />
              <View className="blob blob--teal left-[-65px] top-[53px] size-[170px]" />
              <View className="blob blob--cream right-[20px] top-[41px] size-[120px]" />
              <View className="blob blob--cream left-[-45px] top-[148px] size-[120px]" />

              {/* Sparkles on the left (the right ones are part of the mascot image) */}
              <View className="absolute left-1/2 top-[36px] -ml-[90px] h-[22px] w-[7px] -rotate-20 rounded-full bg-accent" />
              <View className="absolute left-1/2 top-[50px] -ml-[106px] h-[18px] w-[7px] -rotate-60 rounded-full bg-accent" />

              <Image
                source={images.mascotAuth}
                className="absolute left-1/2 top-[4px] -ml-[93px] h-[204px] w-[210px]"
                resizeMode="contain"
              />
            </View>
          )}
        </View>

        {/* Form */}
        <View
          className="px-[26px]"
          onLayout={(event) => (formTopRef.current = event.nativeEvent.layout.y)}
        >
          <View className="auth-field">
            <Text className="auth-field__label">Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="alex@gmail.com"
              placeholderTextColor={colors.muted}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect={false}
              style={inputStyle}
            />
          </View>

          {showPasswordField && (
            <View className="auth-field mt-[12px] flex-row items-center pt-0">
              <View className="flex-1">
                <Text className="auth-field__label">Password</Text>
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="••••••••••"
                  placeholderTextColor={colors.muted}
                  secureTextEntry={!isPasswordVisible}
                  autoCapitalize="none"
                  autoComplete="password-new"
                  style={inputStyle}
                />
              </View>

              <TouchableOpacity
                onPress={() => setIsPasswordVisible((visible) => !visible)}
                hitSlop={12}
                activeOpacity={0.6}
              >
                <SymbolView
                  name={{
                    ios: isPasswordVisible ? "eye.slash" : "eye",
                    android: isPasswordVisible ? "visibility_off" : "visibility",
                    web: isPasswordVisible ? "visibility_off" : "visibility",
                  }}
                  size={24}
                  tintColor={colors.muted}
                />
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity
            className="btn-primary mt-[20px] h-[58px] rounded-[16px]"
            onLayout={(event) => {
              const { y, height } = event.nativeEvent.layout;
              submitBottomRef.current = y + height;
            }}
            onPress={() => setIsVerifying(true)}
            activeOpacity={0.85}
          >
            <Text className="btn-primary__label text-[18px] leading-[26px]">
              {submitLabel}
            </Text>
            <SymbolView
              name={{
                ios: "arrow.right",
                android: "arrow_forward",
                web: "arrow_forward",
              }}
              size={22}
              weight="semibold"
              tintColor={colors.background}
              style={{ position: "absolute", right: 22 }}
            />
          </TouchableOpacity>

          {/* Divider */}
          <View className="mt-[20px] flex-row items-center gap-[17px]">
            <View className="h-px flex-1 bg-border" />
            <Text className="font-poppins text-[14px] leading-[20px] text-muted">
              or continue with
            </Text>
            <View className="h-px flex-1 bg-border" />
          </View>

          {/* Social sign in */}
          <View className="mt-[14px] gap-[8px]">
            {SOCIAL_PROVIDERS.map((provider) => (
              <TouchableOpacity
                key={provider.label}
                className="social-btn"
                activeOpacity={0.7}
              >
                <View className="social-btn__icon">
                  <Image
                    source={provider.icon}
                    className={provider.iconClassName}
                    resizeMode="contain"
                  />
                </View>
                <Text className="social-btn__label">
                  Continue with {provider.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Footer */}
        <View className="flex-row items-center justify-center pb-[16px] pt-[18px]">
          <Text className="font-poppins text-[14px] leading-[20px] text-muted">
            {footerPrompt}{" "}
          </Text>
          <Link href={footerHref} replace asChild>
            <TouchableOpacity hitSlop={8} activeOpacity={0.6}>
              <Text className="font-poppins-semibold text-[15px] leading-[20px] text-primary">
                {footerLinkLabel}
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      </ScrollView>

      <VerificationModal
        visible={isVerifying}
        email={email}
        onClose={() => setIsVerifying(false)}
        onVerified={handleVerified}
      />
    </SafeAreaView>
  );
}
