import React from "react";
import { Animated, Image, StyleSheet } from "react-native";

import { icons, COLORS } from "../constants/";

export default ({
  name,
  size,
  height,
  width,
  animated = false,
  color = COLORS.white,
  resizeMode = "contain",
  style,
  ...props
}) => {
  const iconStyles = [
    styles.icon,
    size && {
      width: size,
      height: size,
    },
    width && { width },
    height && { height },
    color !== "none" && { tintColor: color },
    style,
  ];

  if (animated) {
    return (
      <Animated.Image
        source={icons[name]}
        resizeMode={resizeMode}
        style={iconStyles}
        {...props}
      />
    );
  }

  return (
    <Image
      source={icons[name]}
      resizeMode={resizeMode}
      style={iconStyles}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    height: 18,
    width: 18,
  },
});
