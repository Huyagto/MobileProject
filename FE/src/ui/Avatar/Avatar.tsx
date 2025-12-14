import React from 'react';
import { Image } from 'react-native';
import { useTheme } from '@/themes/themeContext';

type AvatarSize = 'sm' | 'md' | 'lg';

const sizeMap: Record<AvatarSize, number> = {
  sm: 32,
  md: 48,
  lg: 64,
};

type AvatarProps = {
  uri?: string;
  size?: AvatarSize;
  style?: any;
};

export const Avatar = ({ uri, size = 'md', style }: AvatarProps) => {
  const theme  = useTheme();
  const s = sizeMap[size];

  return (
    <Image
      source={uri ? { uri } : require('@/assets/icon.png')}
      style={[
        { width: s, height: s, borderRadius: theme.radius.full },
        style,
      ]}
    />
  );
};
