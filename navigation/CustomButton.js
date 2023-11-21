import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import { Icon } from "../components"; // Assuming Icon component import path
import { COLORS } from "../constants";

const CustomButton = ({
  white = false,
  black = false,
  onPress,
  icon,
  ...props
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        {
          backgroundColor: white
            ? COLORS.white
            : black
            ? COLORS.black
            : COLORS.secondary,
        },
        props.style,
      ]}
      {...props}
    >
      <Icon
        size={12}
        name="arrowLight"
        color={white ? COLORS.black : COLORS.white}
        style={{ transform: [{ rotate: "90deg" }] }}
      />
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 28,
    height: 36,
    width: 36,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
});
