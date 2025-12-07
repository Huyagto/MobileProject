import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useTheme } from '@/themes/themeContext';
import { IconButtonTheme } from './iconButton.theme';

export const IconButton = ({ onPress, children, size = 40, style }: any) => {
  const theme  = useTheme();
  return (
    <TouchableOpacity onPress={onPress} style={[IconButtonTheme.base(theme, size), style]}>
      {children}
    </TouchableOpacity>
  );
};
