import { createStyles } from "@/themes/helper/createStyles";

const useStyles = (type: "like" | "nope") =>
  createStyles((theme) => ({
    container: {
      position: "absolute",
      top: 40,
      left: type === "like" ? 20 : undefined,
      right: type === "nope" ? 20 : undefined,

      borderWidth: 2,
      borderColor:
        type === "like"
          ? theme.colors.primary
          : theme.colors.secondary, // ✅ dùng secondary thay error

      padding: theme.spacing.md,
      borderRadius: theme.radius.md,
      backgroundColor: theme.colors.neutral0,
    },
  }))();

export default useStyles;
