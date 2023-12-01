import axios from "axios";
import { useRef, useState } from "react";

import * as FileSystem from "expo-file-system";
import { Audio } from "expo-av";
import Constants from "expo-constants";

const {
  TRANSCRIPTION_API_ENDPOINT,
  SPEECH_API_ENDPOINT,
  COMPLETIONS_API_ENDPOINT,
  OPENAI_API_KEY,
} = Constants.expoConfig.extra;

export const useOpenAI = () => {
  const [transcribedText, setTranscribedText] = useState("");
  const [chatGptResponse, setChatGptResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [isFetchingResponse, setIsFetchingResponse] = useState(false);
  const [isGeneratingSpeech, setIsGeneratingSpeech] = useState(false);
  const [error, setError] = useState(null);

  const abortControllersRef = useRef([]);
  const soundRef = useRef(null);

  const handleApiRequest = async (
    endpoint,
    method,
    data,
    headers,
    responseType
  ) => {
    const abortController = new AbortController();
    abortControllersRef.current.push(abortController);

    try {
      setIsLoading(true);
      const response = await axios({
        method,
        url: endpoint,
        data,
        headers,
        responseType,
        signal: abortController.signal,
      });

      setIsLoading(false);
      return response;
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request canceled:', error.message);
      } else {

        let errorMessage = 'An unknown error occurred';
        if (error.response && error.response.data) {
          if (error.response.data.error && error.response.data.error.message) {
            errorMessage = error.response.data.error.message;
          } else if (typeof error.response.data === 'string') {
            errorMessage = error.response.data;
          }
        } else if (error.message) {
          errorMessage = error.message;
        }

        setError(errorMessage);
        console.error("API Request Error:", errorMessage);
      }

      setIsLoading(false);
    }



  };

  const cancelRequests = () => {
    abortControllersRef.current.forEach(controller => controller.abort());
    abortControllersRef.current = []; // Reset the array after aborting
  };


  //USER speaks => to TEXT
  const transcribeAudio = async (audioFilePath) => {


    setIsTranscribing(true);
    setError(null);
    const formData = new FormData();

    formData.append("language", "en");
    formData.append("file", {
      uri: audioFilePath,
      type: "audio/mp3",
      name: "audio.mp3",
    });
    formData.append("model", "whisper-1");

    const headers = {
      Authorization: `Bearer ${OPENAI_API_KEY}`,
      "Content-Type": "multipart/form-data",
    };

    const response = await handleApiRequest(
      TRANSCRIPTION_API_ENDPOINT,
      "post",
      formData,
      headers
    );

    if (response && response.status === 200) {
      setTranscribedText(response.data.text);
      await sendTextToChatGpt(response.data.text);
    }
    setIsTranscribing(false);
  };

  //TEXT => to CHATGPT for a response
  const sendTextToChatGpt = async (instructions) => {
    console.log("instructions:", instructions)


    setIsFetchingResponse(true);
    setError(null);
    const data = {
      model: "gpt-4-1106-preview",
      messages: [
        {
          role: "system",
          content: instructions,
        },
        {
          role: "user",
          content: instructions,
        },
      ],
    };

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    };

    const response = await handleApiRequest(
      COMPLETIONS_API_ENDPOINT,
      "post",
      data,
      headers
    );
    console.log('processing...')

    if (response && response.data) {
      setChatGptResponse(response.data.choices[0].message.content);
      const chatResponseText = response.data.choices[0].message.content;
      await generateSpeechFromText(chatResponseText);
    }
    setIsFetchingResponse(false);
  };

  //RESPONSE => TTS
  const generateSpeechFromText = async (text, voice) => {
    setIsGeneratingSpeech(true);
    setError(null);
    console.log('process speaking...')
    const data = {
      model: "tts-1-hd",
      input: text,
      voice: voice ? voice : "shimmer",
    };

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    };

    const response = await handleApiRequest(
      SPEECH_API_ENDPOINT,
      "post",
      data,
      headers,
      "blob"
    );
    if (response && response.status === 200) {
      console.log('speaking now...')
      const audioPath = `${FileSystem.documentDirectory}sound.m4a`;

      await writeToFileSystem(response.data, audioPath);
    }

    setIsGeneratingSpeech(false);
  };

  const writeToFileSystem = async (blob, filePath) => {
    const base64data = await blobToBase64(blob);
    try {
      await FileSystem.writeAsStringAsync(filePath, base64data, {
        encoding: FileSystem.EncodingType.Base64,
      });
      playAudioFromFileSystem(filePath);
    } catch (error) {
      setError(error);
      console.error("File System Write Error:", error);
    }
  };

  const blobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(",")[1]); // Split at base64,
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(blob);
    });
  };

  const playAudioFromFileSystem = async (audioPath) => {
    const fileInfo = await FileSystem.getInfoAsync(audioPath);
    if (!fileInfo.exists) {
      console.error("Audio file does not exist at path:", audioPath);
      return;
    }

    try {
      const { sound } = await Audio.Sound.createAsync({ uri: audioPath });
      soundRef.current = sound;
      await sound.playAsync();
      // Handle sound completion and release here as needed
    } catch (error) {
      setError(error);
      console.error("Failed to load and play the sound", error);
    }
  };

  const stopAudioPlayback = async () => {
    if (soundRef.current) {
      await soundRef.current.stopAsync();
      soundRef.current = null; // Reset the ref after stopping playback
    }
  };


  return {
    sendTextToChatGpt,
    transcribedText,
    chatGptResponse,
    isLoading,
    error,
    transcribeAudio,
    generateSpeechFromText,
    playAudioFromFileSystem,
    isTranscribing,
    isFetchingResponse,
    isGeneratingSpeech,
    cancelRequests,
    stopAudioPlayback
  };
};
