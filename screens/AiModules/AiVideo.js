import React, { useState, useEffect, useRef } from "react";
import { Audio } from "expo-av";
import { Utils } from "expo-ui-kit";
import { Camera } from "expo-camera";
import { Image, StyleSheet, Dimensions, ImageBackground, Animated } from "react-native";

import { Block, Button, Icon, Text } from "../../components";
import { COLORS } from "../../constants";
import { useStaturBar } from "../../utils/hooks";
import { useOpenAI } from "../../hooks/useOpenAi";
import MyCamera from "./MyCamera";
import { View } from "react-native";


const AiVideo = ({ route, navigation }) => {
  const [cameraStatus, setCameraStatus] = useState(false);
  const [recording, setRecording] = useState();
  const [sound, setSound] = useState();
  const scale = useRef(new Animated.Value(1)).current;

  const {
    transcribedText,
    chatGptResponse,
    sendTextToChatGpt,
    transcribeAudio,
    isLoading,
    error,
    isTranscribing,
    isFetchingResponse,
    isGeneratingSpeech,
    cancelRequests,
    stopAudioPlayback
  } = useOpenAI();


  const { assistantData } = route.params;
  useStaturBar();


  useEffect(() => {
    // Call sendTextToChatGpt and set isReadyForUserInput to true after response
    sendTextToChatGpt(assistantData.instruction).then(() => {
      console.log('USER COULD TALK NOW')
    });

  }, [assistantData]);


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
      Animated.timing(scale, {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true,
      }).start();
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  };

  // Stop recording
  const stopRecording = async () => {
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI(); // Get the URI of the recording
    setRecording(uri); // Store only the URI

    transcribeAudio(uri); // Pass the URI to transcribeAudio
    // Revert the press animation
    Animated.timing(scale, {
      toValue: 1, // Scale back to 100%
      duration: 100,
      useNativeDriver: true,
    }).start();
  };



  useEffect(() => {
    // Start processing or other logic here if needed

    return () => {
      // Cleanup when the component unmounts
      if (sound) {
        console.log("Unloading Sound");
        sound.unloadAsync(); // Unload the sound
      }
      // cancelRequests(); // Cancel any ongoing requests
    };
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

  return (

    <ImageBackground source={{ uri: assistantData?.image }} style={styles.image}>

      <View style={styles.overlay} >
      </View>

      {/* <MyCamera cameraStatus={cameraStatus} /> */}


      <Block row center middle style={{ backgroundColor: COLORS.primary, padding: 32 }}>
        <Button
          color={Utils.rgba(COLORS.white, 0.2)}
          onPress={() => handleVideo(!cameraStatus)}
          style={{ height: 48, width: 48 }}
          icon={
            <Icon
              size={26}
              color={COLORS.white}
              name={cameraStatus ? "video" : "cameraOff"}
            />
          }
        />
        <Button
          white
          style={[styles.micButton, { transform: [{ scale }] }]}
          onPressIn={startRecording}  // Start recording when button is pressed
          onPressOut={stopRecording}
          icon={
            <Icon
              name="mic"
              color={COLORS.black}
              size={26}
            />
          }
        />


        <Button
          color={COLORS.error}
          style={{ height: 48, width: 48 }}
          onPress={() => {
            if (sound) {
              sound.stopAsync();
              sound.unloadAsync();
            }
            cancelRequests();
            navigation.goBack();
          }}
          icon={<Icon name="phoneOff" color={COLORS.white} size={26} />}
        />
      </Block>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {
    backgroundColor: COLORS.white,
    width: "100%",
    height: "100%",
    resizeMode: "cover",

  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.5)',
    zIndex: 1,
    overflow: 'hidden'

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
  micButton: {
    height: 60,
    width: 60,
    marginHorizontal: 28,
  },
});

export default AiVideo;
