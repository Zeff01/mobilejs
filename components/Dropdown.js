import React from "react";
import { StyleSheet } from "react-native";

import { Utils } from "expo-ui-kit";

import Block from "./Block";
import Text from "./Text";
import Icon from "./Icon";
import { COLORS } from "../constants";

const Dropdown = ({
  label,
  style,
  transparent,
  direction = "down",
  color = COLORS.black,
}) => {
  const rotate = direction === "down" ? "0deg" : "180deg";
  const dropdownStyle = [
    styles.dropdown,
    transparent && { borderColor: "transparent" },
    style,
  ];
  return (
    <Block row center padding={[6, 10]} style={dropdownStyle}>
      <Text medium marginRight={6} color={color}>
        {label}
      </Text>
      <Icon
        size={10}
        color={color}
        name="arrowLight"
        resizeMode="contain"
        style={{ transform: [{ rotate }] }}
      />
    </Block>
  );
};

export default Dropdown;

const styles = StyleSheet.create({
  dropdown: {
    borderColor: Utils.rgba(COLORS.gray, 0.2),
    borderRadius: 4,
    borderWidth: 2,
  },
});
