import React from 'react';
import { Text as RNText } from 'react-native';
import { useTheme } from '@/themes/themeContext';
import { TextTheme, TextVariant } from './text.theme';

type Props = {
  variant?: TextVariant;
  children: React.ReactNode;
  style?: any;
};

export const Text = ({ variant = 'body', children, style }: Props) => {
  const theme = useTheme();

  // TS nhận dạng key đúng → HẾT LỖI
  const v = TextTheme.variants[variant](theme);

  return <RNText style={[v, style]}>{children}</RNText>;
};

export default Text;
