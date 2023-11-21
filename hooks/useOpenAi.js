import axios from "axios";
import { useState } from "react";

import * as FileSystem from "expo-file-system";
import { Audio } from "expo-av";
import Constants from "expo-constants";

const {
  WHISPER_API_ENDPOINT,
  TTS_API_ENDPOINT,
  CHAT_API_ENDPOINT,
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

  const handleApiRequest = async (
    endpoint,
    method,
    data,
    headers,
    responseType
  ) => {
    try {
      setIsLoading(true);
      const response = await axios({
        method,
        url: endpoint,
        data,
        headers,
        responseType,
      });

      setIsLoading(false);

      return response;
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.error.message
        : error.message;

      setError(errorMessage);
      setIsLoading(false);
      console.error(
        "API Request Error:",
        error.response ? error.response.data : error.message
      );
    }
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
      WHISPER_API_ENDPOINT,
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
  const sendTextToChatGpt = async (text) => {
    setIsFetchingResponse(true);
    setError(null);
    const data = {
      model: "gpt-4-1106-preview",
      messages: [
        {
          role: "system",
          content: "Your system message here.",
        },
        {
          role: "user",
          content: text,
        },
      ],
    };

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    };

    const response = await handleApiRequest(
      CHAT_API_ENDPOINT,
      "post",
      data,
      headers
    );
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
      TTS_API_ENDPOINT,
      "post",
      data,
      headers,
      "blob"
    );
    if (response && response.status === 200) {
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
      await sound.playAsync();
      // Handle sound completion and release here as needed
    } catch (error) {
      setError(error);
      console.error("Failed to load and play the sound", error);
    }
  };

  return {
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
  };
};
