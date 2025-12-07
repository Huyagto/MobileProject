import { Spacing, Radius } from '@/themes';

export const CardTheme = {
  container: (theme: any) => ({
    backgroundColor: theme.colors.neutral0,
    padding: Spacing.lg,
    borderRadius: Radius.lg,
    borderColor: theme.colors.neutral100,
    borderWidth: 1,
  }),
};
