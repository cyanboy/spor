import React, { createContext, useContext, useState } from "react";
import { Box } from "@vygruppen/spor-layout-react-native";
import { DrawerHandle } from "./DrawerHandle";
import Modal from "react-native-modal";

type BottomDrawerProps = {
  children: JSX.Element | JSX.Element[];
  onClose: () => void;
  isVisible: boolean;
  icon?: JSX.Element;
};

export const BottomDrawer = ({
  onClose,
  children,
  isVisible,
}: BottomDrawerProps) => {
  return (
    <Modal
      isVisible={isVisible}
      backdropOpacity={0.6}
      swipeDirection="down"
      onBackdropPress={onClose}
      animationInTiming={450}
      animationOutTiming={450}
      hideModalContentWhileAnimating
      useNativeDriverForBackdrop
      useNativeDriver
      propagateSwipe
      style={{
        justifyContent: "flex-end",
        marginHorizontal: 0,
        marginBottom: 0,
      }}
    >
      <Box
        borderBottomLeftRadius="none"
        borderBottomRightRadius="none"
        borderTopRightRadius="lg"
        borderTopLeftRadius="lg"
        paddingHorizontal="xl"
        justifyContent="center"
        backgroundColor="lightGrey"
      >
        <DrawerHandle onClose={onClose} />
        {children}
      </Box>
    </Modal>
  );
};
