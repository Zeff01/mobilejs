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

const Header = ({ route }) => {
  const navigation = useNavigation();
  const { type } = route?.params;
  const isGroup = type === "group";

  return (
    <Block
      row
      middle
      margin={[0, 24, 44, 24]}
      style={{ borderWidth: 1, borderColor: "orange" }}
    >
      <Button
        flex
        style={styles.optionBtn}
        color={Utils.rgba(COLORS.gray, 0.6)}
        icon={
          <Icon name={isGroup ? "options" : "addUser"} color={COLORS.white} />
        }
      />
      <Button
        flex
        marginHorizontal={12}
        style={styles.optionBtn}
        color={Utils.rgba(COLORS.gray, 0.6)}
        icon={<Icon name="phone" color={COLORS.white} />}
      />
      <Button
        flex
        style={styles.optionBtn}
        color={Utils.rgba(COLORS.gray, 0.6)}
        onPress={() => navigation.navigate("AiVideo")}
        icon={<Icon name="video" color={COLORS.white} />}
      />
    </Block>
  );
};

const Message = ({ item }) => {
  const [sound, setSound] = React.useState(null);
  const [status, setStatus] = React.useState(null);
  const [isPlaying, setPlay] = React.useState(false);

  const remaining = status?.durationMillis - status?.positionMillis;

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
    <Block marginBottom={28}>
      <Block row>
        <Block noflex center marginRight>
          <Image source={item?.from?.avatar} style={styles.profile} />
        </Block>
        <Block row center>
          <Text title bold marginRight>
            {item?.from?.name}
          </Text>
          <Text small gray>
            {dayjs().diff(item?.timestamp, "minute")}min
          </Text>
        </Block>
      </Block>
      <Block marginLeft={26} marginTop>
        {item?.type === "text" && (
          <Text title gray>
            {item?.message}
          </Text>
        )}
        {item?.type === "audio" && (
          <Card row center width="80%" space="between" color={COLORS.lightGray}>
            <Button
              style={styles.play}
              color={Utils.rgba(COLORS.secondary, 0.4)}
              onPress={() =>
                isPlaying ? handlePause() : handleAudio(item?.file)
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
              <Block secondary radius={2} height={4} width={`${percentage}%`} />
            </Block>
            <Text right caption gray style={{ width: 40 }}>
              {status && remaining ? dayjs(remaining).format("mm:ss") : "00:00"}
            </Text>
          </Card>
        )}
        {item?.type === "image" && (
          <Block row>
            {item?.files?.map((img, index) => (
              <Image source={img} key={`img-${index}`} style={styles.image} />
            ))}
          </Block>
        )}
      </Block>
    </Block>
  );
};

const MessageInput = ({ value, ...props }) => {
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
        />
        <Button transparent style={styles.inputButton} onPress={() => { }}>
          <Icon name="emoji" color={COLORS.gray} />
        </Button>
      </Block>
    </Block>
  );
};

const Chat = ({ route, navigation, user = mock.USER }) => {
  const [keyboardHeight] = useKeyboard();
  const [message, setMessage] = React.useState("");

  const inputRef = React.useRef(null);

  const { type, userInfo } = route.params;


  const deserializedUserId = JSON.parse(userInfo);

  const isGroup = type === "group";
  const messages = isGroup ? mock.CHAT_GROUP : mock.CHAT_SIMPLE;

  useStaturBar("light-content");

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleAlign: "left",
      headerTitle: () => <User user={deserializedUserId.from} white />,
    });
  }, [navigation, route, userInfo]);

  React.useEffect(() => {
    if (keyboardHeight > 0) {
      inputRef.current?.focus();
    }
  }, [keyboardHeight]);

  return (
    <Block black>
      {/* <Header route={route} /> */}
      <Block safe white style={styles.messages} marginBottom={keyboardHeight}>
        <FlatList
          snapToEnd
          data={messages}
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => `${item?.id}`}
          renderItem={({ item }) => <Message item={item} />}
          contentContainerStyle={{ paddingTop: 38, paddingHorizontal: 24 }}
        />

        {Platform.OS === "ios" ? (
          <InputAccessoryView backgroundColor={COLORS.white}>
            <MessageInput value={message} onChangeText={setMessage} />
          </InputAccessoryView>
        ) : (
          <Block
            style={[
              styles.customInputAccessoryView,
              { bottom: keyboardHeight },
            ]}
          >
            <MessageInput value={message} onChangeText={setMessage} />
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
    height: 68,
    marginRight: 8,
    width: 68,
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
