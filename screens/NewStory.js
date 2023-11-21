import React from "react";
import { Utils } from "expo-ui-kit";
import { Camera } from "expo-camera";
import { Image, StyleSheet } from "react-native";

import { Block, Button, Icon, Text } from "../components/";
import { COLORS, mock } from "../constants/";
import { useStaturBar } from "../utils/hooks";

const Options = ({
  ready = false,
  hasPicture = false,
  onClose = () => {},
  onFlash = () => {},
}) => {
  return (
    <Block paddingHorizontal={24} row center space="between">
      <Button
        transparent
        onPress={() => onClose()}
        icon={<Icon name="close" color={COLORS.white} size={28} />}
      />
      {ready && !hasPicture && (
        <>
          <Button
            transparent
            onPress={() => onFlash()}
            icon={<Icon name="flash" color={COLORS.white} size={36} />}
          />
          <Button
            transparent
            icon={<Icon name="cameraOff" color={COLORS.white} size={32} />}
          />
        </>
      )}
      {ready && hasPicture && (
        <Block row right>
          <Button
            transparent
            marginRight={40}
            icon={<Icon name="pencil" color={COLORS.white} size={32} />}
          />
          <Button
            transparent
            icon={<Icon name="text" color={COLORS.white} size={32} />}
          />
        </Block>
      )}
    </Block>
  );
};

const Controls = ({ picture, onPhoto = () => {}, onFlip = () => {} }) => {
  return (
    <Block
      row
      center
      space="between"
      height="16.6%"
      paddingHorizontal={24}
      color={Utils.rgba(COLORS.gray, 0.4)}
    >
      <Button
        transparent
        icon={
          <Block
            noflex
            radius={4}
            width={32}
            minHeight={32}
            overflow="hidden"
            color={Utils.rgba(COLORS.white, 0.4)}
          >
            {picture && <Image source={picture} style={styles.preview} />}
          </Block>
        }
      />
      <Button transparent activeOpacity={0.5} onPress={() => onPhoto()}>
        <Block
          middle
          center
          radius={64}
          padding={16}
          maxWidth={64}
          minHeight={64}
          color={Utils.rgba(COLORS.white, 0.23)}
        >
          <Block white minWidth={48} minHeight={48} radius={48} />
        </Block>
      </Button>
      <Button
        transparent
        onPress={() => onFlip()}
        icon={<Icon name="reload" color={COLORS.white} size={38} />}
      />
    </Block>
  );
};

const SendIt = ({ onSend = () => {}, user = mock.USER }) => {
  return (
    <Block
      row
      center
      space="between"
      height="16.6%"
      paddingHorizontal={24}
      color={Utils.rgba(COLORS.gray, 0.4)}
    >
      <Block row center>
        <Image source={user?.avatar} style={styles.avatar} />
        <Text title white medium marginLeft>
          {user?.name}
        </Text>
      </Block>

      <Button color={COLORS.white} onPress={() => onSend()}>
        <Block row center margin={[18, 21]}>
          <Icon
            size={14}
            name="arrowLight"
            color={COLORS.black}
            style={{ transform: [{ rotate: "-90deg" }] }}
          />
          <Text title bold marginLeft>
            Send it
          </Text>
        </Block>
      </Button>
    </Block>
  );
};

export default ({ navigation }) => {
  const cameraRef = React.useRef();
  const [type, setType] = React.useState(false);
  const [flash, setFlash] = React.useState(false);
  const [picture, setPicture] = React.useState(null);
  const [ready, setReady] = React.useState(false);

  const handlePhoto = async () => {
    if (cameraRef?.current) {
      const photo = await cameraRef.current.takePictureAsync();
      cameraRef.current.pausePreview();
      setPicture(photo);
    }
  };

  const handleReset = () => {
    if (picture) {
      setPicture(null);
      cameraRef.current.resumePreview();
    } else {
      navigation.goBack();
    }
  };

  useStaturBar("light-content");

  React.useEffect(() => {
    (async () => {
      await Camera.requestPermissionsAsync();
    })();
  }, []);

  return (
    <Block black safe>
      <Camera
        ref={cameraRef}
        style={{ flex: 1 }}
        onCameraReady={() => setReady(true)}
        flashMode={Camera.Constants.FlashMode[flash ? "torch" : "off"]}
        type={type ? Camera.Constants.Type.front : Camera.Constants.Type.back}
      >
        <Block space="between" paddingTop={18}>
          <Options
            ready={ready}
            onClose={handleReset}
            hasPicture={Boolean(picture)}
            onFlash={() => setFlash(!flash)}
          />
          {!ready && (
            <Block center middle paddingHorizontal={24}>
              <Text center white h3 medium>
                Camera is not enabled
              </Text>
              <Text center white caption>
                Use your camera settings to enable the permission accessing it.
              </Text>
            </Block>
          )}
          {ready && !picture && (
            <Controls onPhoto={handlePhoto} onFlip={() => setType(!type)} />
          )}
          {ready && picture && <SendIt />}
        </Block>
      </Camera>
    </Block>
  );
};

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 12,
    height: 40,
    width: 40,
  },
  preview: {
    height: 32,
    width: 32,
    ...StyleSheet.absoluteFill,
  },
});
