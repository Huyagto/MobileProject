import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '@/themes/themeContext';

export const Badge = ({ children, style }: any) => {
  const  theme  = useTheme();
  return (
    <View style={{ backgroundColor: theme.colors.primary, paddingHorizontal: 8, paddingVertical: 4, borderRadius: theme.radius.sm, alignSelf: 'flex-start', ...theme.shadows.soft }}>
      <Text style={{ color: theme.colors.neutral0, fontWeight: '600' }}>{children}</Text>
    </View>
  );
};

