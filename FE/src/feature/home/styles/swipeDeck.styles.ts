import { createStyles } from "@/themes/helper/createStyles";

const useStyles = createStyles((theme) => ({
  container: {
    flex: 1,
  },

  cardWrapper: {
    width: "100%",
  },

  stackedCard: (index: number) => ({
    position: "absolute",
    top: index * 6,
    transform: [{ scale: 1 - index * 0.04 }],
    width: "100%",
  }),
}));

export default useStyles;
