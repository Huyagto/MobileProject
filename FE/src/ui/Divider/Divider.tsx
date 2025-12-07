import React from 'react';
import { View } from 'react-native';
import { useTheme } from "@/themes/themeContext";
import { DividerTheme } from './divider.theme';

export const Divider = ({ style }: any) => {
  const  theme  = useTheme();
  return <View style={[DividerTheme.base(theme), style]} />;
};
