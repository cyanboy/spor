import {
  composeRestyleFunctions,
  createVariant,
  spacing,
  SpacingProps,
  useRestyle,
  useTheme,
  VariantProps,
} from "@shopify/restyle";
import { Box } from "@vygruppen/spor-layout-react-native";
import { ColorInlineLoader } from "@vygruppen/spor-loader-react-native";
import type { Theme } from "@vygruppen/spor-theme-react-native";
import React, { useState } from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from "react-native";

const variants = createVariant({
  themeKey: "buttonVariants",
  property: "variant",
});

type ButtonVariant =
  | "primary"
  | "control"
  | "secondary"
  | "tertiary"
  | "additional"
  | "ghost";

type RestyleProps = SpacingProps<Theme> &
  VariantProps<Theme, "buttonVariants", "variant"> &
  VariantProps<Theme, "buttonSizes", "size">;

const sizes = createVariant({ themeKey: "buttonSizes", property: "size" });

const restyleFunctions = composeRestyleFunctions<Theme, RestyleProps>([
  spacing,
  sizes,
  variants,
]);

type ButtonProps = Exclude<RestyleProps, "variant"> & {
  onPress: () => void;
  variant: ButtonVariant;
  children?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  accessibilityLabel?: string;
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  style?: StyleProp<ViewStyle>;
};

/** A button. */
export const Button = ({
  onPress,
  variant,
  isDisabled = false,
  isLoading = false,
  accessibilityLabel,
  children,
  leftIcon,
  rightIcon,
  style,
  ...rest
}: ButtonProps) => {
  const [isPressed, setIsPressed] = useState(false);

  const { buttonVariantsActive, buttonVariantsDisabled } = useTheme();
  const { style: restyleStyle } = useRestyle(restyleFunctions, {
    variant,
    ...rest,
  });
  const activeStyle = isPressed ? buttonVariantsActive[variant] : {};
  const disabledAndLoadingStyle =
    isDisabled || isLoading ? buttonVariantsDisabled : {};

  const buttonStyle = [
    restyleStyle,
    activeStyle,
    disabledAndLoadingStyle,
    style,
  ] as StyleProp<TextStyle>;

  const flatStyles = StyleSheet.flatten(buttonStyle);
  const { fontSize, fontWeight, color, backgroundColor } = flatStyles;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: isLoading }}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      onPress={onPress}
      disabled={isDisabled || isLoading}
      accessibilityLabel={accessibilityLabel}
      style={buttonStyle}
      android_ripple={{
        color: backgroundColor,
      }}
      {...rest}
    >
      <Box flexDirection="row" alignItems="center" opacity={isLoading ? 0 : 1}>
        {leftIcon && (
          <Box marginRight={children ? 1 : 0}>
            <leftIcon.type {...leftIcon.props} {...{ color }} />
          </Box>
        )}
        <Text
          style={{
            color,
            fontSize,
            fontWeight,
          }}
        >
          {children}
        </Text>
        {rightIcon && (
          <Box marginLeft={children ? 1 : 0}>
            <rightIcon.type {...rightIcon.props} {...{ color }} />
          </Box>
        )}
      </Box>

      {isLoading && (
        <Box
          position="absolute"
          justifyContent="center"
          alignItems="center"
          top={0}
          bottom={0}
        >
          <ColorInlineLoader height="75%" />
        </Box>
      )}
    </Pressable>
  );
};
