import React from "react";
import {
  Animated,
  Easing,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { Utils } from "expo-ui-kit";
import { KeyboardAccessoryView } from "react-native-keyboard-accessory";

import Block from "./Block";
import Input from "./Input";
import Icon from "./Icon";
import Text from "./Text";
import Overlay from "./Overlay";
import { SIZES, COLORS } from "../constants/";

const STORY_SIZES = {
  height: (SIZES.width - (28 * 2 - 11) / 2) * 0.672,
  width: SIZES.width - (28 * 2 - 11) / 2,
};

const Slider = ({ items, duration = 3000, stop = false, onEnd = () => {} }) => {
  const width = React.useRef(new Animated.Value(0)).current;
  const [position, setPosition] = React.useState(0);
  const animationParams = {
    duration,
    toValue: 1,
    easing: Easing.linear,
  };

  React.useEffect(() => {
    if (stop) {
      Animated.timing(width, animationParams).stop();
    } else {
      Animated.timing(width, animationParams).start(({ finished }) => {
        if (finished) {
          setPosition(position + 1); // set next position
          onEnd(position + 1); // callback for next position
          width.setValue(0); // reset animation width value to 0
        }
      });
    }
  }, [position, stop]);

  const widthValue = width.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
    extrapolate: "clamp",
  });

  return (
    <Block row middle height={5} marginLeft={4} width={STORY_SIZES.width - 64}>
      {items?.map((item, index) => (
        <Block
          radius={8}
          height={5}
          marginLeft={4}
          overflow="hidden"
          key={`slider-${index}`}
          color={Utils.rgba(COLORS.white, 0.4)}
        >
          <Animated.View
            style={{
              flex: 1,
              height: 5,
              backgroundColor: COLORS.white,
              width:
                index === position
                  ? widthValue
                  : position > index
                  ? "100%"
                  : "0%",
            }}
          />
        </Block>
      ))}
    </Block>
  );
};

export default ({ story, onPress = () => {}, ...props }) => {
  const storyRef = React.useRef();
  const commentRef = React.useRef();
  const [stop, setStop] = React.useState(false);
  const [comment, setComment] = React.useState("");
  const [commentSent, setCommentSent] = React.useState(false);

  const handleComment = React.useCallback((sent = false) => {
    // save/send the comment
    commentRef.current.blur();
    commentRef.current.clear();
  });

  const changeImage = React.useCallback((index) => {
    handleComment();
    storyRef.current.scrollToIndex({ index, viewPosition: 0.5 });
  });

  return (
    <Block black paddingBottom={96}>
      <Block safe row flex center margin={18} style={styles.header}>
        <Image style={styles.avatar} source={story?.user?.avatar} />
        <Slider
          stop={stop}
          items={story?.images}
          onEnd={(index) => {
            const isLastItem = index === story?.images?.length;
            !isLastItem && changeImage(index);
            isLastItem && onPress();
          }}
        />
      </Block>
      <FlatList
        horizontal
        pagingEnabled
        ref={storyRef}
        data={story?.images}
        style={{ marginBottom: 58 }}
        scrollEnabled={false}
        keyExtractor={(item) => `${item}`}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              Keyboard.dismiss();
              onPress();
            }}
          >
            <Image
              source={item}
              resizeMode="cover"
              style={{ width: SIZES.width, borderRadius: 12, height: "100%" }}
            />
            <Overlay width={SIZES.width} height="100%" style={styles.overlay} />
            {commentSent && (
              <Block row center middle style={styles.commentStatus}>
                <Icon name="check" />
                <Text center white marginLeft={20}>
                  Comment added successfully
                </Text>
              </Block>
            )}
          </TouchableOpacity>
        )}
      />
      <KeyboardAccessoryView
        hideBorder
        alwaysVisible
        style={{ backgroundColor: "transparent", flex: 0 }}
      >
        <Input
          flex={false}
          margin={28}
          borderWidth={2}
          borderRadius={4}
          fontWeight="500"
          internalRef={commentRef}
          onFocus={() => setStop(true)}
          onBlur={() => setStop(false)}
          placeholder="White a comment..."
          style={{ color: COLORS.white }}
          placeholderTextColor={COLORS.white}
          onTextChange={(value) => setComment(value)}
          onSubmitEditing={() => handleComment(true)}
          borderColor={Utils.rgba(COLORS.lightGray, 0.4)}
          icon={
            <Block row style={styles.options}>
              <TouchableOpacity onPress={() => {}}>
                <Icon name="emoji" marginRight={15} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleComment(true)}>
                <Icon name="send" />
              </TouchableOpacity>
            </Block>
          }
        />
      </KeyboardAccessoryView>
    </Block>
  );
};

const styles = StyleSheet.create({
  avatar: { borderRadius: 13, height: 41, width: 41 },
  commentStatus: {
    bottom: 28,
    left: 0,
    position: "absolute",
    right: 0,
    zIndex: 2,
  },
  header: { position: "absolute", top: 18, zIndex: 1 },
  options: { position: "absolute", right: 42, top: 42 },
  overlay: {
    bottom: 0,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
  },
});
