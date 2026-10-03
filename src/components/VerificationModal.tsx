import { SymbolView } from "expo-symbols";
import { useRef, useState } from "react";
import {
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
  onClose: () => void;
  onVerified: () => void;
};

export default function VerificationModal({
  visible,
  email,
  onClose,
  onVerified,
}: VerificationModalProps) {
  const inputRef = useRef<TextInput>(null);
  const [code, setCode] = useState("");
  const keyboardHeight = useKeyboardHeight();

  const handleChange = (text: string) => {
    const digits = text.replace(/\D/g, "").slice(0, CODE_LENGTH);
    setCode(digits);

    if (digits.length === CODE_LENGTH) {
      onVerified();
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
              caretHidden
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                opacity: 0,
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}
