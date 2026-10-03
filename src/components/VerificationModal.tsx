import { SymbolView } from "expo-symbols";
import { useRef, useState } from "react";
import {
  ActivityIndicator,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useKeyboardHeight } from "@/hooks/useKeyboardHeight";
import { colors } from "@/theme";

const CODE_LENGTH = 6;

type VerificationModalProps = {
  visible: boolean;
  email: string;
  error: string | null;
  isLoading: boolean;
  onClose: () => void;
  onSubmitCode: (code: string) => Promise<boolean>;
  onResend: () => void;
};

export default function VerificationModal({
  visible,
  email,
  error,
  isLoading,
  onClose,
  onSubmitCode,
  onResend,
}: VerificationModalProps) {
  const inputRef = useRef<TextInput>(null);
  const [code, setCode] = useState("");
  const keyboardHeight = useKeyboardHeight();

  const handleChange = async (text: string) => {
    const digits = text.replace(/\D/g, "").slice(0, CODE_LENGTH);
    setCode(digits);

    if (digits.length === CODE_LENGTH) {
      const isVerified = await onSubmitCode(digits);
      // Wrong or expired code: clear the boxes so the user can try again.
      if (!isVerified) setCode("");
    }
  };

  const handleClose = () => {
    setCode("");
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onShow={() => inputRef.current?.focus()}
      onRequestClose={handleClose}
    >
      {/* Bottom padding = keyboard height, so the card always sits above the keyboard */}
      <View
        className="flex-1 justify-end bg-foreground/50 px-4"
        style={{ paddingBottom: keyboardHeight + 16 }}
      >
        <View className="rounded-[28px] bg-background px-6 pb-7 pt-6">
          <TouchableOpacity
            className="absolute right-4 top-4 size-9 items-center justify-center rounded-full bg-surface"
            onPress={handleClose}
            activeOpacity={0.7}
          >
            <SymbolView
              name={{ ios: "xmark", android: "close", web: "close" }}
              size={16}
              weight="semibold"
              tintColor={colors.muted}
            />
          </TouchableOpacity>

          <View className="size-14 items-center justify-center rounded-full bg-primary/10">
            <SymbolView
              name={{ ios: "envelope.fill", android: "mail", web: "mail" }}
              size={26}
              tintColor={colors.primary}
            />
          </View>

          <Text className="h3 mt-4 text-foreground">Check your email</Text>
          <Text className="body-md mt-1 text-muted">
            We&apos;ve sent a verification code to{" "}
            <Text className="font-poppins-semibold text-foreground">
              {email || "your email"}
            </Text>
            . Enter the 6-digit code below.
          </Text>

          {/* Six boxes that mirror one invisible number-pad input laid on top of them */}
          <View className="mt-6 flex-row gap-2">
            {Array.from({ length: CODE_LENGTH }, (_, index) => (
              <View
                key={index}
                className={`code-cell ${index === code.length ? "code-cell--active" : ""}`}
              >
                <Text className="code-cell__digit">{code[index] ?? ""}</Text>
              </View>
            ))}

            <TextInput
              ref={inputRef}
              value={code}
              onChangeText={handleChange}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              autoComplete="one-time-code"
              maxLength={CODE_LENGTH}
              editable={!isLoading}
              caretHidden
              className="absolute size-full opacity-0"
            />
          </View>

          {error && <Text className="body-sm mt-3 text-error">{error}</Text>}

          <View className="mt-5 h-6 flex-row items-center justify-center">
            {isLoading ? (
              <ActivityIndicator color={colors.primary} />
            ) : (
              <>
                <Text className="body-sm text-muted">Didn&apos;t get it? </Text>
                <TouchableOpacity onPress={onResend} hitSlop={8} activeOpacity={0.6}>
                  <Text className="font-poppins-semibold text-[14px] leading-[20px] text-primary">
                    Resend code
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}
