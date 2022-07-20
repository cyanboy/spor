import React, { ReactNode } from "react";
import { Box } from "@vygruppen/spor-layout-react-native";
import { StyleProp, ViewStyle } from "react-native";

type DrawerFooterProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export const DrawerFooter = ({ children, style }: DrawerFooterProps) => {
  return (
    <Box marginTop="lg" marginBottom="md" flexDirection="row">
      {children}
    </Box>
  );
};
