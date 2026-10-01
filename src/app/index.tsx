import { Text, View } from "react-native";

// Temporary preview of the design system. Replace with the onboarding screen.
export default function Index() {
  return (
    <View className="flex-1 justify-center gap-4 bg-surface px-4">
      <View className="card gap-2">
        <Text className="eyebrow--primary">Typography</Text>
        <Text className="h1 text-foreground">Fluensa</Text>
        <Text className="h2 text-foreground">Section Title</Text>
        <Text className="h3 text-foreground">Card Title</Text>
        <Text className="h4 text-foreground">Subheading</Text>
        <Text className="body-lg text-foreground">Important content</Text>
        <Text className="body-md text-foreground">Body text</Text>
        <Text className="body-sm text-muted">Supporting text</Text>
        <Text className="caption text-muted">Labels, meta text</Text>
      </View>

      <View className="card gap-3">
        <Text className="eyebrow">Colors</Text>
        <View className="flex-row flex-wrap gap-2">
          <View className="size-10 rounded-xl bg-primary" />
          <View className="size-10 rounded-xl bg-primary-deep" />
          <View className="size-10 rounded-xl bg-accent" />
          <View className="size-10 rounded-xl bg-coral" />
          <View className="size-10 rounded-xl bg-success" />
          <View className="size-10 rounded-xl bg-warning" />
          <View className="size-10 rounded-xl bg-streak" />
          <View className="size-10 rounded-xl bg-error" />
          <View className="size-10 rounded-xl bg-info" />
          <View className="size-10 rounded-xl bg-foreground" />
          <View className="size-10 rounded-xl bg-muted" />
          <View className="size-10 rounded-xl border border-border bg-background" />
        </View>
      </View>
    </View>
  );
}
