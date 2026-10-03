import AuthScreen from "@/components/AuthScreen";

export default function SignIn() {
  return (
    <AuthScreen
      mode="sign-in"
      title="Welcome back"
      subtitle="Pick up right where you left off ✨"
      submitLabel="Sign In"
      footerPrompt="Don't have an account?"
      footerLinkLabel="Sign up"
      footerHref="/sign-up"
    />
  );
}
