import React from "react";
import {
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createStyles } from "@/themes/helper/createStyles";
import { useKeyboardHeight } from "@/feature/auth/hooks/useKeyboard";

type Props = {
  children: React.ReactNode;
  footer?: React.ReactNode;
  progress?: React.ReactNode;
};

const useStyles = createStyles((theme) => ({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  progress: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.md,
  },
  keyboard: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
  },
  footer: {
  paddingHorizontal: theme.spacing.lg,
  paddingTop: theme.spacing.md,
  paddingBottom: theme.spacing.lg,
  backgroundColor: theme.colors.background,
},

}));

const OnboardingLayout = ({ children, footer, progress }: Props) => {
  const styles = useStyles();
  const keyboardHeight = useKeyboardHeight();

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      {progress && <View style={styles.progress}>{progress}</View>}

      {/* CONTENT */}
      <View style={styles.content}>
        {children}
      </View>

      {/* FOOTER – LUÔN NẰM TRÊN KEYBOARD */}
      {footer && (
        <View
          style={[
            styles.footer,
            {
              marginBottom:
                Platform.OS === "ios" ? keyboardHeight : 0,
            },
          ]}
        >
          {footer}
        </View>
      )}
    </SafeAreaView>
  );
};

export default OnboardingLayout;
