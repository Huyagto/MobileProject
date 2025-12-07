import React from 'react';
import { View } from 'react-native';
import { useTheme } from '@/themes/themeContext';
import { CardTheme } from './card.theme';

export const Card = ({ children, style }: any) => {
  const  theme  = useTheme();
  return <View style={[CardTheme.container(theme), style]}>{children}</View>;
};
