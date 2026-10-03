import AuthScreen from "@/components/AuthScreen";

export default function SignUp() {
  return (
    <AuthScreen
      mode="sign-up"
      title="Create your account"
      subtitle="Start your language journey today ✨"
      submitLabel="Sign Up"
      footerPrompt="Already have an account?"
      footerLinkLabel="Log in"
      footerHref="/sign-in"
    />
  );
}
