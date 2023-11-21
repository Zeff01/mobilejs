import React, { useState, useEffect } from "react";
import { Audio } from "expo-av";
import { Utils } from "expo-ui-kit";
import { Camera } from "expo-camera";
import { Image, StyleSheet, Dimensions } from "react-native";
import aipic from "../../assets/pictures/aipic.jpeg";

import { Block, Button, Icon, Text } from "../../components";
import { COLORS } from "../../constants";
import { useStaturBar } from "../../utils/hooks";
import { useOpenAI } from "../../hooks/useOpenAi";
import MyCamera from "./MyCamera";

const screenWidth = Dimensions.get("window").width;

const AiVideo = ({ navigation }) => {
  const [cameraStatus, setCameraStatus] = useState(false);
  const [micStatus, setMicStatus] = useState(false);
  const [recording, setRecording] = useState();
  const [isRecording, setIsRecording] = useState(false);
  const [sound, setSound] = useState();

  const {
    transcribedText,
    chatGptResponse,
    transcribeAudio,
    isLoading,
    error,
    isTranscribing,
    isFetchingResponse,
    isGeneratingSpeech,
  } = useOpenAI();

  useStaturBar();

  const startRecording = async () => {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      setIsRecording(true);
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  };

  // Stop recording
  const stopRecording = async () => {
    setIsRecording(false);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI(); // Get the URI of the recording
    setRecording(uri); // Store only the URI

    transcribeAudio(uri); // Pass the URI to transcribeAudio
  };

  const playRecording = async () => {
    if (recording) {
      console.log("Loading Sound");
      const { sound } = await Audio.Sound.createAsync({ uri: recording }); // Use the URI directly
      setSound(sound);

      console.log("Playing Sound");
      await sound.playAsync();
    }
  };

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  useEffect(() => {
    (async () => {
      try {
        const { status: cameraStatus } =
          await Camera.requestCameraPermissionsAsync();
        const { status: microphoneStatus } =
          await Camera.requestMicrophonePermissionsAsync();

        if (cameraStatus !== "granted" || microphoneStatus !== "granted") {
          alert(
            "Permissions not granted. Camera and microphone functionalities might be limited."
          );
        }
      } catch (error) {
        console.error("Error requesting permissions", error);
      }
    })();
  }, []);

  const handleVideo = (action) => {
    setCameraStatus(!cameraStatus);
  };

  const handleMic = () => {
    setMicStatus(!micStatus);
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <Block primary>
      <Block style={{ flex: 5 }}>
        <Image source={aipic} style={styles.image} resizeMode="contain" />
        <MyCamera cameraStatus={cameraStatus} />
      </Block>

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
  image: {
    backgroundColor: COLORS.white,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  responseContainer: {
    margin: 5,
    padding: 10,
    backgroundColor: "#444",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: 1,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    flex: 2,
  },
  transcribeText: {
    fontSize: 16,
    color: "#0c043d",
    marginBottom: 5,
  },
  responseText: {
    fontSize: 16,
    color: "white",
  },
});

export default AiVideo;
