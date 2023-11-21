import React from "react";
import { Utils } from "expo-ui-kit";
import { Video } from "expo-av";
import * as ImagePicker from "expo-image-picker";
import { Image, TouchableOpacity, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { Block, Button, Input, Icon, Text } from "../components";
import { COLORS, SIZES, mock } from "../constants";
import { useStaturBar } from "../utils/hooks";

const NewPost = ({ user = mock.USERS.user_1 }) => {
  const videoRef = React.useRef();
  const [file, setFile] = React.useState(null);
  const [fileType, setType] = React.useState(null);
  const [description, setDescription] = React.useState(null);
  const canCreate = description || (file && description);

  useStaturBar();

  const handleAdd = async (type) => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const options = {
      allowsEditing: false,
      mediaTypes:
        ImagePicker.MediaTypeOptions[type === "video" ? "Videos" : "Images"],
    };

    const result = await ImagePicker.launchImageLibraryAsync(options);
    if (result.cancelled === true) {
      return;
    }

    setType(type);
    setFile(result.uri);
  };

  const handleCreate = () => {};

  const renderFile = () => {
    if (!file) {
      return null;
    }

    if (fileType === "image") {
      return (
        <Block>
          <Image source={{ uri: file }} style={styles.image} />
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.close}
            onPress={() => setFile(null)}
          >
            <Block black noflex radius={12} padding={12}>
              <Icon name="close" color={COLORS.white} size={14} />
            </Block>
          </TouchableOpacity>
        </Block>
      );
    }

    return (
      <Block>
        <Video
          ref={videoRef}
          resizeMode="cover"
          style={styles.image}
          source={{ uri: file }}
        />
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.close}
          onPress={() => setFile(null)}
        >
          <Block black noflex radius={12} padding={12}>
            <Icon name="close" color={COLORS.white} size={14} />
          </Block>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.play}
          onPress={() => videoRef.current.playAsync()}
        >
          <Block
            noflex
            radius={12}
            padding={12}
            color={Utils.rgba(COLORS.gray, 0.6)}
          >
            <Icon name="play" color={COLORS.white} size={14} />
          </Block>
        </TouchableOpacity>
      </Block>
    );
  };

  const renderOptions = () => {
    return (
      <Block padding={28} color={COLORS.lightGray} style={styles.options}>
        <TouchableOpacity onPress={() => handleAdd("image")}>
          <Block row center marginBottom={32}>
            <Block black noflex radius={12} padding={12}>
              <Icon name="camera" color={COLORS.white} />
            </Block>
            <Text title bold marginLeft={16}>
              Add Photo
            </Text>
          </Block>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleAdd("video")}>
          <Block row center marginBottom={32}>
            <Block black noflex radius={12} padding={12}>
              <Icon name="video" color={COLORS.white} />
            </Block>
            <Text title bold marginLeft={16}>
              Add Video
            </Text>
          </Block>
        </TouchableOpacity>
        <TouchableOpacity>
          <Block row center marginBottom={32}>
            <Block black noflex radius={12} padding={12}>
              <Icon name="article" color={COLORS.white} />
            </Block>
            <Text title bold marginLeft={16}>
              Write an Article
            </Text>
          </Block>
        </TouchableOpacity>
      </Block>
    );
  };

  const renderHeader = () => {
    return (
      <Block row space="between" marginHorizontal={24} marginTop={24}>
        <Block row center>
          <Image source={user.avatar} style={styles.avatar} />
          <Text caption semibold marginLeft>
            {user.name}
          </Text>
        </Block>
        <Button
          gray={!canCreate}
          primary={canCreate}
          style={styles.post}
          onPress={() => handleCreate()}
        >
          <Block row center marginHorizontal={8}>
            <Text white={canCreate} title semibold marginRight={8}>
              Post
            </Text>
            <Icon
              size={10}
              name="arrowLight"
              style={{ transform: [{ rotate: "-90deg" }] }}
              color={canCreate ? COLORS.white : COLORS.black}
            />
          </Block>
        </Button>
      </Block>
    );
  };

  return (
    <Block white safe>
      {renderHeader()}
      <Block paddingHorizontal={24}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ marginTop: 24 }}
        >
          <Input
            multiline
            flex={false}
            borderColor={COLORS.white}
            placeholderTextColor={COLORS.gray}
            placeholder="What are you thinking?"
            onChangeText={(value) => setDescription(value)}
          />
          {renderFile()}
        </KeyboardAwareScrollView>
      </Block>
      {renderOptions()}
    </Block>
  );
};

export default NewPost;

const styles = StyleSheet.create({
  avatar: { borderRadius: 12, height: 40, width: 40 },
  close: { position: "absolute", right: 16, top: 16 },
  image: { borderRadius: 8, height: 230 },
  options: { borderTopLeftRadius: 24, borderTopRightRadius: 24 },
  play: {
    left: (SIZES.width - 40 - 48) / 2,
    position: "absolute",
    top: (230 - 40) / 2,
  },
  post: { borderRadius: 4, height: 32 },
});
