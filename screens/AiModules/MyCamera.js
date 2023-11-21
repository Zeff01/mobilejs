import { Camera } from "expo-camera";
import { Block, Text } from "../../components";
import React from "react";
import { Animated, PanResponder, StyleSheet } from "react-native";
import { Video, Audio } from "expo-av";
import { COLORS } from "../../constants";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

const MyCamera = ({ cameraStatus }) => {
  const cameraRef = React.useRef();
  const [isAvailable, setAvailable] = React.useState(true);

  // draggable camera animation
  const pan = React.useRef(new Animated.ValueXY()).current;
  const panResponder = React.useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({ x: pan.x._value, y: pan.y._value });
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => pan.flattenOffset(),
    })
  ).current;

  return (
    <Block
      black
      animated
      center
      middle
      radius={12}
      overflow="hidden"
      style={[
        { transform: [{ translateX: pan.x }, { translateY: pan.y }] },
        styles.camera,
      ]}
      {...panResponder.panHandlers}
    >
      {!isAvailable && (
        <Text medium white center size={10}>
          Unavailable
        </Text>
      )}
      {cameraStatus && (
        <Camera
          ref={cameraRef}
          type={Camera.Constants.Type.front}
          style={{ ...StyleSheet.absoluteFill }}
          onCameraReady={() => setAvailable(true)}
        />
      )}
    </Block>
  );
};

const styles = StyleSheet.create({
  camera: {
    borderRadius: 12,
    height: 128,
    position: "absolute",
    right: 24,
    top: 32,
    width: 100,
    zIndex: 3,
  },
  video: {
    backgroundColor: COLORS.white,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    flex: 1,
  },
  image: {
    backgroundColor: COLORS.white,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    flex: 1,
    width: screenWidth,
    height: screenWidth,
    resizeMode: "contain",
  },
});

export default MyCamera;
