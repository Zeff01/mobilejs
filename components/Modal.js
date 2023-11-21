import React from "react";
import Modal from "react-native-modal";
import { StyleSheet } from "react-native";
import { Utils } from "expo-ui-kit";

import Block from "./Block";
import { COLORS, SIZES } from "../constants/";

export default ({
  children,
  style,
  headerStyle,
  color = COLORS.white,
  thumbColor = COLORS.black,
  ...props
}) => {
  return (
    <Modal
      propagateSwipe
      backdropOpacity={0.6}
      swipeDirection={["down"]}
      style={[style, { margin: 0, justifyContent: "flex-end" }]}
      {...props}
    >
      <Block
        noflex
        center
        middle
        color={color}
        style={[styles.header, headerStyle]}
      >
        <Block
          radius={5}
          width={38}
          style={{ maxHeight: 5 }}
          color={Utils.rgba(thumbColor, 0.4)}
        />
      </Block>
      {children}
    </Modal>
  );
};

const styles = StyleSheet.create({
  header: {
    borderTopLeftRadius: SIZES.radius * 2.66,
    borderTopRightRadius: SIZES.radius * 2.66,
    flex: 0,
    height: 68,
    marginBottom: -2,
  },
});
