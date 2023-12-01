import React from "react";
import { Image, StyleSheet } from "react-native";

import Block from "./Block";
import Text from "./Text";
import { COLORS } from "../constants/";
import DefaultPic from '../assets/pictures/default.png'
import DefaultAIiPic from '../assets/pictures/defaultAi.jpg'
export default ({ user, white = false }) => {



  return (
    <Block row>
      <Block noflex marginLeft marginRight>
        {user?.image ?
          <Image source={{ uri: user?.image }} style={styles.avatar} /> :
          <Image source={DefaultAIiPic} style={styles.avatar} />}
        {/* <Block success style={styles.status} /> */}
      </Block>
      <Block style={{ flex: 1, justifyContent: 'center' }}>


        <Text title medium white={white}>
          {user?.name ? user?.name : "Default Name"}
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
