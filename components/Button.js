import React from "react";
import { StyleSheet } from "react-native";
import * as Haptics from "expo-haptics";
import { Button } from "expo-ui-kit";

import theme from "../constants/theme";

export default ({
  children,
  icon,
  haptic = true,
  onPress = () => {},
  ...props
}) => {
  const content = icon || children;

  const btnStyle = StyleSheet.flatten([
    styles.button,
    icon && styles.icon,
    props.style,
  ]);

  const handlePress = React.useCallback((event) => {
    haptic && Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onPress(event);
  });

  return (
    <Button {...props} onPress={handlePress} theme={theme} style={btnStyle}>
      {content}
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: theme.SIZES.radius,
    height: theme.SIZES.base * 7.25,
    minHeight: "auto",
  },
  icon: {
    alignItems: "center",
    height: theme.SIZES.base * 4.75,
    justifyContent: "center",
    width: theme.SIZES.base * 4.75,
  },
});
