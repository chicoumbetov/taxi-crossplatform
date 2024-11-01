import { useAuth } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
import { NativeWindStyleSheet } from "nativewind";
import "react-native-get-random-values";

NativeWindStyleSheet.setOutput({
  default: "native",
});

const Page = () => {
  const { isSignedIn } = useAuth();

  if (isSignedIn) return <Redirect href="/(root)/(tabs)/home" />;

  return <Redirect href="/(auth)/welcome" />;
};

export default Page;
