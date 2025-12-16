import { createStyles } from "@/themes/helper/createStyles";

export const useStyles = createStyles((theme) => ({
  container: {
    backgroundColor: theme.colors.neutral0,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,

    // ✅ SPREAD shadow object
    ...theme.shadows.md,
  },
}));
