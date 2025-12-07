export type UseButtonProps = {
  disabled?: boolean;
  loading?: boolean;
  onPress?: () => void;
};

export const useButton = ({ disabled = false, loading = false, onPress }: UseButtonProps) => {
  const handlePress = () => {
    if (disabled || loading) return;
    onPress?.();
  };

  return { handlePress };
};
