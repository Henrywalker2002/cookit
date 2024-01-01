import { LocalizationKey, i18n } from '@/Localization';
import { HStack, Heading, Spinner } from 'native-base';
import React from 'react';
import { Modal, View } from 'react-native';

const LoadingModal = ({ visible }) => {
  return (
    <Modal visible={visible} transparent={true}>
    <View
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        width: "100%",
        height: "100%",
        justifyContent: "center",
      }}
    >
      <HStack space={2} justifyContent="center">
        <Spinner accessibilityLabel="Loading posts" />
        <Heading color="primary.500" fontSize="lg">
          {i18n.t(LocalizationKey.LOADING)}
        </Heading>
      </HStack>
    </View>
  </Modal>
  );
};

export default LoadingModal;
