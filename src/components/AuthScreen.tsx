import { Href, Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import type { OAuthStrategy } from "@clerk/expo/types";
import { SymbolView } from "expo-symbols";
import { useRef, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ImageSourcePropType,
  LayoutChangeEvent,
  Platform,
  ScrollView,
  StyleSheet,
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
import { AuthMode, useEmailAuth } from "@/hooks/useEmailAuth";
import { useKeyboardHeight } from "@/hooks/useKeyboardHeight";
import { useSocialAuth } from "@/hooks/useSocialAuth";
import { colors } from "@/theme";

type SocialProvider = {
  label: string;
  icon: ImageSourcePropType;
  iconClassName: string;
  strategy: OAuthStrategy;
  iosOnly?: boolean;
};

const SOCIAL_PROVIDERS: SocialProvider[] = [
  {
    label: "Google",
    icon: images.googleLogo,
    iconClassName: "size-[28px]",
    strategy: "oauth_google",
  },
  {
    label: "Apple",
    icon: images.appleLogo,
    iconClassName: "h-[29px] w-[24px]",
    strategy: "oauth_apple",
    iosOnly: true,
  },
];

// Sign in with Apple is only offered on iPhone / iPad.
const VISIBLE_PROVIDERS = SOCIAL_PROVIDERS.filter(
  (provider) => !provider.iosOnly || Platform.OS === "ios",
);

// The illustration is laid out in design-space points at its full height,
// then scaled down to fit whatever space is left so the screen never scrolls.
const ART_HEIGHT = 177;

type AuthScreenProps = {
  mode: AuthMode;
  title: string;
  subtitle: string;
  submitLabel: string;
  footerPrompt: string;
  footerLinkLabel: string;
  footerHref: Href;
};

// Shared layout for the Sign Up and Sign In screens.
// Sign in: email -> emailed code. Sign up: email + password -> emailed code.
export default function AuthScreen({
  mode,
  title,
  subtitle,
  submitLabel,
  footerPrompt,
  footerLinkLabel,
  footerHref,
}: AuthScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const { sendCode, resendCode, verifyCode, error, setError, isLoading } =
    useEmailAuth(mode);
  const social = useSocialAuth();
  const isSignUp = mode === "sign-up";
  const formError = error ?? social.error;

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

  const handleSubmit = async () => {
    social.setError(null);
    const isCodeSent = await sendCode(email.trim(), password);
    if (isCodeSent) setIsVerifying(true);
  };

  const handleCloseVerification = () => {
    setIsVerifying(false);
    setError(null);
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
      style={[
        styles.safeArea,
        { paddingBottom: Math.max(keyboardHeight, insets.bottom) },
      ]}
    >
      <StatusBar style="dark" />

      <ScrollView
        ref={scrollRef}
        onLayout={handleScrollLayout}
        contentContainerStyle={[styles.scrollContent, { minHeight: screenHeight }]}
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
              className="absolute inset-x-0 bottom-0 h-[177px]"
              style={{
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
              className="auth-field__input"
            />
          </View>

          {isSignUp && (
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
                  className="auth-field__input"
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

          {formError && !isVerifying && (
            <Text className="body-sm mt-[12px] text-error">{formError}</Text>
          )}

          {/* Clerk's bot protection (CAPTCHA) mounts here during sign up */}
          {isSignUp && <View nativeID="clerk-captcha" />}

          <TouchableOpacity
            className="btn-primary mt-[20px] h-[58px] rounded-[16px]"
            onLayout={(event) => {
              const { y, height } = event.nativeEvent.layout;
              submitBottomRef.current = y + height;
            }}
            onPress={handleSubmit}
            disabled={isLoading || social.loadingStrategy !== null}
            activeOpacity={0.85}
          >
            {isLoading && !isVerifying ? (
              <ActivityIndicator color={colors.background} />
            ) : (
              <Text className="btn-primary__label text-[18px] leading-[26px]">
                {submitLabel}
              </Text>
            )}
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
            {VISIBLE_PROVIDERS.map((provider) => (
              <TouchableOpacity
                key={provider.label}
                className="social-btn"
                onPress={() => {
                  setError(null);
                  social.signInWith(provider.strategy);
                }}
                disabled={isLoading || social.loadingStrategy !== null}
                activeOpacity={0.7}
              >
                <View className="social-btn__icon">
                  {social.loadingStrategy === provider.strategy ? (
                    <ActivityIndicator color={colors.primary} />
                  ) : (
                    <Image
                      source={provider.icon}
                      className={provider.iconClassName}
                      resizeMode="contain"
                    />
                  )}
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
        error={error}
        isLoading={isLoading}
        onClose={handleCloseVerification}
        onSubmitCode={verifyCode}
        onResend={resendCode}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
});
