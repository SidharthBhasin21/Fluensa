// Lets TypeScript understand image imports like `import mascot from "@/assets/images/mascot.png"`.
// Metro resolves them to an asset id that <Image source={...} /> accepts.
declare module "*.png" {
  import type { ImageSourcePropType } from "react-native";

  const source: ImageSourcePropType;
  export default source;
}
