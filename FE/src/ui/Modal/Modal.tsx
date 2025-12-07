import React from 'react';
import { Modal as RNModal, View } from 'react-native';
import { useTheme } from '../../themeContext';

export const Modal = ({ visible, children, onRequestClose }: any) => {
  const { theme } = useTheme();
  return (
    <RNModal visible={visible} transparent onRequestClose={onRequestClose}>
      <View style={{ flex:1, backgroundColor: 'rgba(0,0,0,0.4)', alignItems:'center', justifyContent:'center' }}>
        <View style={{ width: '90%', backgroundColor: theme.colors.neutral0, borderRadius: theme.radius.lg, padding: theme.spacing.lg }}>{children}</View>
      </View>
    </RNModal>
  );
};
