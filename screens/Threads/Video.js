import React from "react";
import { Video } from "expo-av";
import { Utils } from "expo-ui-kit";
import { Camera } from "expo-camera";
import { Animated, PanResponder, StyleSheet } from "react-native";

import { Block, Button, Icon, Text } from "../../components/";
import { COLORS, videos } from "../../constants/";
import { useStaturBar } from "../../utils/hooks";

const MyCamera = ({ pause = false, resume = false }) => {
  const cameraRef = React.useRef();
  const [isAvailable, setAvailable] = React.useState(false);

  // draggable camera animation
  const pan = React.useRef(new Animated.ValueXY()).current;
  const panResponder = React.useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({ x: pan.x._value, y: pan.y._value });
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }]),
      onPanResponderRelease: () => pan.flattenOffset(),
    })
  ).current;

  // pause / resume based on props value
  React.useEffect(() => {
    if (cameraRef?.current) {
      pause && cameraRef.current.pausePreview();
      resume && cameraRef.current.resumePreview();
    }
  }, [pause, resume]);

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
      {isAvailable && (
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

export default ({ navigation }) => {
  const [cameraStatus, setCameraStatus] = React.useState(false);
  const [micStatus, setMicStatus] = React.useState(false);

  useStaturBar();

  React.useEffect(() => {
    (async () => {
      await Camera.requestPermissionsAsync();
    })();
  }, []);

  const handleVideo = (action) => {
    setCameraStatus(action);
  };

  const handleMic = (action) => {
    setMicStatus(action);
  };

  return (
    <Block primary>
      <Video
        shouldPlay
        isLooping
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="cover"
        style={styles.video}
        source={videos.live}
      />
      <MyCamera pause={!cameraStatus} resume={cameraStatus} />
      <Block row center middle marginTop={28} marginBottom={28}>
        <Button
          white
          style={{ height: 48, width: 48 }}
          onPress={() => handleMic(!micStatus)}
          icon={
            <Icon
              name={micStatus ? "mic" : "micOff"}
              color={COLORS.black}
              size={26}
            />
          }
        />
        <Button
          color={Utils.rgba(COLORS.white, 0.2)}
          onPress={() => handleVideo(!cameraStatus)}
          style={{ height: 48, width: 48, marginHorizontal: 28 }}
          icon={
            <Icon
              size={26}
              color={COLORS.white}
              name={cameraStatus ? "video" : "cameraOff"}
            />
          }
        />
        <Button
          color={COLORS.error}
          style={{ height: 48, width: 48 }}
          onPress={() => navigation.goBack()}
          icon={<Icon name="phoneOff" color={COLORS.white} size={26} />}
        />
      </Block>
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
    width: 88,
    zIndex: 3,
  },
  video: {
    backgroundColor: COLORS.white,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    flex: 1,
  },
});
