import { Redirect } from "expo-router";

// App entry. The tabs layout decides whether the user needs
// to sign in or pick a language first.
export default function Index() {
  return <Redirect href="/home" />;
}
