import { Platform } from "react-native";
import { StripeProvider as NativeStripeProvider } from "./stripe/stripe.native";
import { StripeProvider as WebStripeProvider } from "./stripe/stripe.web";

type StripeProviderProps = {
  merchantIdentifier: string;
  children: JSX.Element | JSX.Element[];
};

const CustomStripeProvider: React.FC<StripeProviderProps> = ({
  merchantIdentifier,
  children,
}: StripeProviderProps): JSX.Element => {
  const publishableKey = process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY;

  if (!publishableKey) {
    throw new Error(
      "publishableKey is not set. Ensure that EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY is set in your environment variables."
    );
  }

  if (Platform.OS === "web") {
    return (
      <WebStripeProvider publishableKey={publishableKey}>
        {children}
      </WebStripeProvider>
    );
  }

  return (
    <NativeStripeProvider
      publishableKey={publishableKey}
      merchantIdentifier={merchantIdentifier}
    >
      {children}
    </NativeStripeProvider>
  );
};

export default CustomStripeProvider;
