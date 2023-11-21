import React from "react";
import { Image, StyleSheet } from "react-native";

import Block from "./Block";
import Text from "./Text";
import { COLORS } from "../constants/";

export default ({ user, white = false }) => {
  if (!user) return null;

  return (
    <Block row>
      <Block noflex marginLeft marginRight>
        <Image source={user?.avatar} style={styles.avatar} />
        <Block success style={styles.status} />
      </Block>
      <Block>
        <Text title medium white={white}>
          {user?.name}
        </Text>
        <Text title medium gray>
          {user?.online ? "Online" : "Offline"}
        </Text>
      </Block>
    </Block>
  );
};

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 12,
    height: 38,
    width: 38,
  },
  status: {
    borderColor: COLORS.black,
    borderRadius: 12,
    borderWidth: 2,
    height: 12,
    position: "absolute",
    right: -2,
    top: -2,
    width: 12,
  },
});
