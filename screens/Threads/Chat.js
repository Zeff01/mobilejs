import React from "react";
import dayjs from "dayjs";
import { Audio } from "expo-av";
import { Utils } from "expo-ui-kit";
import { useNavigation } from "@react-navigation/native";
import {
  FlatList,
  Image,
  InputAccessoryView,
  StyleSheet,
  Platform,
} from "react-native";

import {
  Block,
  Button,
  Text,
  Card,
  Input,
  Icon,
  User,
} from "../../components/";
import { mock, COLORS } from "../../constants/";
import { useKeyboard, useStaturBar } from "../../utils/hooks";
import Constants from "expo-constants";
import useToken from "../../hooks/useToken";
import axios from "axios";
import DefaultPic from "../../assets/pictures/default.png";
import DefaultAIiPic from "../../assets/pictures/defaultAi.jpg";
const { CHINGU_BASE_ENDPOINT } = Constants.expoConfig.extra;


const Message = ({ item }) => {
  const [sound, setSound] = React.useState(null);
  const [status, setStatus] = React.useState(null);
  const [isPlaying, setPlay] = React.useState(false);

  const remaining = status?.durationMillis - status?.positionMillis;

  const answerString = item.answer;

  let answerArray;

  try {
    answerArray = JSON.parse(answerString);
  } catch (error) {
    console.error("Error parsing JSON string:", error);
    // Handle error appropriately (e.g., set answerArray to an empty array or default value)
    answerArray = [];
  }

  let firstMessageContent = "";
  if (answerArray.length > 0 && answerArray[0].type === "message") {
    firstMessageContent = answerArray[0].content;
  }
  // Parse the JSON string into an array

  const messageItem = {
    avatar: item.user?.photo,
    name: item.user?.username,
    online: true, // You might need to adjust this based on your data
    message: item?.answer, // Adjust according to your actual data structure
    timestamp: item.createdAt,
    type: item.chatType, // Assuming this maps to 'audio', 'text', or 'image'
    file: item.file, // Adjust as necessary
  };

  const handlePause = async () => {
    if (sound) {
      setPlay(false);
      await sound.pauseAsync();
    }
  };

  const handleStop = async () => {
    if (sound) {
      setPlay(false);
      await sound.stopAsync();
      await sound.unloadAsync();
    }
  };

  const handleAudio = async (file) => {
    // resume audio playback
    if (sound) {
      setPlay(true);
      await sound.playAsync();
    } else {
      // start audio playback
      const { sound } = await Audio.Sound.createAsync(
        file,
        {
          shouldPlay: true,
        },
        (status) => setStatus(status)
      );
      setSound(sound);
      setPlay(true);
      await sound.playAsync();
    }
  };

  React.useEffect(() => {
    if (status?.didJustFinish) {
      handleStop();
    }
  }, [status]);

  const percentage = (status?.positionMillis * 100) / status?.durationMillis;

  return (
    <>
      {/* USER MESSAGES */}
      <Block marginBottom={28}>
        <Block row>
          <Block noflex center marginRight>
            {messageItem?.avatar ? (
              <Image source={messageItem?.image} style={styles.profile} />
            ) : (
              <Image source={DefaultPic} style={styles.profile} />
            )}
          </Block>
          <Block row center>
            <Text title bold marginRight>
              {messageItem?.name}
            </Text>
            <Text small gray>
              {dayjs().diff(messageItem?.timestamp, "minute")}min
            </Text>
          </Block>
        </Block>

        <Block marginLeft={26} marginTop>
          {messageItem?.type === "text" && (
            <Text title gray>
              {item?.prompt}
            </Text>
          )}

          {messageItem?.type === "audio" && (
            <Card
              row
              center
              width="80%"
              space="between"
              color={COLORS.lightGray}
            >
              <Button
                style={styles.play}
                color={Utils.rgba(COLORS.secondary, 0.4)}
                onPress={() =>
                  isPlaying ? handlePause() : handleAudio(messageItem?.file)
                }
                icon={
                  <Icon
                    size={12}
                    color={COLORS.secondary}
                    name={isPlaying ? "pause" : "play"}
                  />
                }
              />
              <Block
                radius={2}
                height={4}
                marginHorizontal={8}
                color={Utils.rgba(COLORS.gray, 0.4)}
              >
                <Block
                  secondary
                  radius={2}
                  height={4}
                  width={`${percentage}%`}
                />
              </Block>
              <Text right caption gray style={{ width: 40 }}>
                {status && remaining
                  ? dayjs(remaining).format("mm:ss")
                  : "00:00"}
              </Text>
            </Card>
          )}
          {messageItem?.type === "image" && (
            <Block row>
              {messageItem?.files?.map((img, index) => (
                <Image source={img} key={`img-${index}`} style={styles.image} />
              ))}
            </Block>
          )}
        </Block>
      </Block>
      {/* AI MESSAGES */}
      <Block marginBottom={28}>
        <Block row>
          <Block noflex center marginRight>
            {messageItem?.avatar ? (
              <Image source={messageItem?.image} style={styles.profile} />
            ) : (
              <Image source={DefaultAIiPic} style={styles.profile} />
            )}
          </Block>
          <Block row center>
            <Text title bold marginRight>
              AI HERE
            </Text>
            <Text small gray>
              {dayjs().diff(messageItem?.timestamp, "minute")}min
            </Text>
          </Block>
        </Block>
        {/* AI ANSWERS HERE */}
        <Block marginLeft={26} marginTop>
          {messageItem?.type === "text" && (
            <Text title gray>
              {firstMessageContent}
            </Text>
          )}
          {messageItem?.type === "audio" && (
            <Card
              row
              center
              width="80%"
              space="between"
              color={COLORS.lightGray}
            >
              <Button
                style={styles.play}
                color={Utils.rgba(COLORS.secondary, 0.4)}
                onPress={() =>
                  isPlaying ? handlePause() : handleAudio(messageItem?.file)
                }
                icon={
                  <Icon
                    size={12}
                    color={COLORS.secondary}
                    name={isPlaying ? "pause" : "play"}
                  />
                }
              />
              <Block
                radius={2}
                height={4}
                marginHorizontal={8}
                color={Utils.rgba(COLORS.gray, 0.4)}
              >
                <Block
                  secondary
                  radius={2}
                  height={4}
                  width={`${percentage}%`}
                />
              </Block>
              <Text right caption gray style={{ width: 40 }}>
                {status && remaining
                  ? dayjs(remaining).format("mm:ss")
                  : "00:00"}
              </Text>
            </Card>
          )}
          {messageItem?.type === "image" && (
            <Block row>
              {messageItem?.files?.map((img, index) => (
                <Image source={img} key={`img-${index}`} style={styles.image} />
              ))}
            </Block>
          )}
        </Block>
      </Block>
    </>
  );
};

const MessageInput = ({ value, onChangeText, onSend, ...props }) => {
  return (
    <Block padding={[0, 24, 24, 24]}>
      <Block
        row
        center
        radius={12}
        height={58}
        padding={16}
        color={COLORS.lightGray}
      >
        <Button style={styles.inputButton} onPress={() => { }}>
          <Icon size={12} name="plus" />
        </Button>
        <Input
          value={value}
          style={styles.input}
          marginHorizontal={8}
          placeholder="Start typing..."
          placeholderTextColor={COLORS.gray}
          {...props}
          onChangeText={onChangeText}
        />
        <Button transparent style={styles.inputButton} onPress={onSend}>
          <Icon name="emoji" color={COLORS.gray} />
        </Button>
      </Block>
    </Block>
  );
};

const Chat = ({ route, navigation }) => {
  const [keyboardHeight] = useKeyboard();
  const [message, setMessage] = React.useState("");
  console.log("message:", message)
  const [chatHistory, setChatHistory] = React.useState([]);
  const { token } = useToken();
  const { sessionData, assistantData } = route.params;



  const sendMessage = (message) => {
    console.log("Message type:", typeof message);
    if (typeof message === 'string' && message.trim()) {
      const messagePayload = {
        message: message,
        thread_id: sessionData ? sessionData?.openAiThreadId : null,
        assistant_id: sessionData ? sessionData.openAiAssistantId : assistantData.id,
      };
      console.log("messagePayload:", messagePayload);

      fetch(`${CHINGU_BASE_ENDPOINT}/assistant/message/add-run/streaming`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(messagePayload)
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const reader = response.body.getReader();
          const decoder = new TextDecoder();

          return new ReadableStream({
            start(controller) {
              function push() {
                reader.read().then(({ done, value }) => {
                  if (done) {
                    controller.close();
                    return;
                  }

                  controller.enqueue(value);
                  push();
                }).catch(err => {
                  console.error('Streaming error:', err);
                  controller.error(err);
                });
              }

              push();
            }
          });
        })
        .then(stream => new Response(stream))
        .then(response => response.text())
        .then(text => {
          console.log('Streaming response text:', text);
          // Process the text response here
        })
        .catch(error => {
          console.error('Error:', error.message);
        })

    } else {
      console.error("Invalid message type or empty message");
    }
  }

  useStaturBar("light-content");

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleAlign: "left",
      headerTitle: () => <User user={assistantData} white />,
    });
  }, [navigation, route, assistantData]);

  React.useEffect(() => {
    if (keyboardHeight > 0) {
      inputRef.current?.focus();
    }
  }, [keyboardHeight]);

  const fetchChatHistory = async () => {
    console.log("fetching");
    try {
      const response = await axios.get(
        `${CHINGU_BASE_ENDPOINT}/chat/history?sessionId=${sessionData._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setChatHistory(response.data.records);
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };

  React.useEffect(() => {
    if (token && sessionData) {
      fetchChatHistory();
    }
  }, [token, sessionData]);





  return (
    <Block black>
      <Block safe white style={styles.messages} marginBottom={keyboardHeight}>
        {chatHistory.length > 0 ? (
          <FlatList
            snapToEnd
            data={chatHistory}
            keyboardDismissMode="on-drag"
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => <Message item={item} />}
            contentContainerStyle={{ paddingTop: 38, paddingHorizontal: 24 }}
          />
        ) : (
          <Block
            style={{
              color: "black",
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 30, color: "gray" }}>No Chats yet...</Text>
          </Block>
        )}

        {Platform.OS === "ios" ? (
          <InputAccessoryView backgroundColor={COLORS.white}>
            <MessageInput value={message} onChangeText={setMessage} onSend={() => sendMessage(message)} />
          </InputAccessoryView>
        ) : (
          <Block
            style={[
              styles.customInputAccessoryView,
              { bottom: keyboardHeight },
            ]}
          >
            <MessageInput value={message} onChangeText={setMessage} onSend={() => sendMessage(message)} />
          </Block>
        )}
      </Block>
    </Block>
  );
};

export default Chat;

const styles = StyleSheet.create({
  image: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    marginRight: 8,
    height: 48,
    width: 48,
    borderWidth: 1,
    borderColor: "red",
  },
  input: {
    borderWidth: 0,
    color: COLORS.gray,
    fontSize: 14,
    fontWeight: "600",
  },
  inputButton: {
    alignItems: "center",
    borderRadius: 4,
    height: 24,
    justifyContent: "center",
    width: 24,
  },
  messages: { borderTopLeftRadius: 32, borderTopRightRadius: 32 },
  optionBtn: { height: 48 },
  play: { borderRadius: 9, height: 24, width: 24 },
  profile: { borderRadius: 6, height: 18, width: 18 },
  customInputAccessoryView: {
    position: "absolute",
    left: 0,
    right: 0,
    backgroundColor: "white",
  },
});
