import React from "react";
import { Utils } from "expo-ui-kit";
import Modal from "react-native-modal";
import { FlatList } from "react-native-gesture-handler";
import { Image, StyleSheet, TouchableOpacity } from "react-native";

import { Block, Text, Input, Icon, Story, Overlay } from "../components/";
import { mock, SIZES, COLORS } from "../constants/";
import { useStaturBar } from "../utils/hooks";

const SEARCH_TABS = [
  { id: "foryou", title: "For You" },
  { id: "following", title: "Following" },
  { id: "popular", title: "Popular" },
  { id: "featured", title: "Featured" },
  { id: "live", title: "Live" },
  { id: "continue", title: "Continue Watching" },
];

const STORY_SIZES = {
  height: (SIZES.width - (28 * 2 - 11) / 2) * 0.672,
  width: SIZES.width - (28 * 2 - 11) / 2,
};

const Search = ({ navigation, items = mock.STORIES }) => {
  const [search, setSearch] = React.useState("");
  const [tab, setTab] = React.useState("foryou");
  const [story, setStory] = React.useState(false);
  const searchRef = React.useRef();

  useStaturBar();

  React.useLayoutEffect(() => {
    const hasValue = search?.length > 0;

    navigation.setOptions({
      headerTitleAlign: "left",
      headerTitleStyle: { flex: 1, width: 500 },
      headerTitle: () => {
        return (
          <Block
            row
            center
            radius={8}
            marginLeft={10}
            paddingLeft={15}
            borderColor={Utils.rgba(COLORS.gray, 0.2)}
          >
            <Icon name="search" color={COLORS.gray} />
            <Input
              style={styles.input}
              internalRef={searchRef}
              borderColor={COLORS.gray}
              placeholder="Search in social..."
              placeholderTextColor={COLORS.gray}
              onChangeText={(value) => setSearch(value)}
            />
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.clear}
              onPress={() => {
                if (hasValue) {
                  searchRef.current.clear();
                  setSearch("");
                }
              }}
            >
              {hasValue && (
                <Icon size={16} name="closeCircle" color={COLORS.black} />
              )}
            </TouchableOpacity>
          </Block>
        );
      },
    });
  }, [navigation, search]);

  const renderTab = (item, index) => {
    const isSelected = item.id === tab;
    const isFirst = !index;

    return (
      <TouchableOpacity activeOpacity={0.8} onPress={() => setTab(item.id)}>
        <Block noflex center marginRight={28}>
          <Text
            title
            bold
            gray={!isSelected}
            black={isSelected}
            marginLeft={isFirst ? 28 : 0}
          >
            {item.title}
          </Text>
          {isSelected && (
            <Block
              noflex
              black
              radius={5}
              width={5}
              marginTop={6}
              minHeight={5}
              marginLeft={isFirst ? 28 : 0}
            />
          )}
        </Block>
      </TouchableOpacity>
    );
  };

  return (
    <Block>
      <Text h2 bold marginVertical={28} paddingHorizontal={28}>
        Explore Stories
      </Text>
      <Block noflex>
        <FlatList
          horizontal
          data={SEARCH_TABS}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ marginBottom: 28 }}
          renderItem={({ item, index }) => renderTab(item, index)}
        />
      </Block>

      <FlatList
        data={items}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => `${item.id}`}
        contentContainerStyle={{
          marginHorizontal: 28,
          paddingBottom: 28,
        }}
        renderItem={({ item, index }) => (
          <Block
            center
            radius={8}
            overflow="hidden"
            marginBottom={11}
            marginLeft={index % 2 ? 11 : 0}
          >
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => setStory(item)}
            >
              <Block noflex>
                <Image
                  source={item.images[0]}
                  resizeMode="contain"
                  style={{
                    height: STORY_SIZES.height,
                    width: STORY_SIZES.width,
                  }}
                />
                <Overlay
                  width={STORY_SIZES.width}
                  height={STORY_SIZES.height}
                  style={styles.overlay}
                />
              </Block>
              <Block bottom middle center style={styles.user}>
                <Image style={styles.avatar} source={item.user.avatar} />
                <Text title white bold marginTop={5}>
                  {item.user.name}
                </Text>
              </Block>
            </TouchableOpacity>
          </Block>
        )}
      />
      <Modal
        hasBackdrop={false}
        style={{ margin: 0 }}
        animationIn="zoomIn"
        animationOut="zoomOut"
        isVisible={Boolean(story)}
      >
        <Story story={story} onPress={() => setStory(false)} />
      </Modal>
    </Block>
  );
};

export default Search;

const styles = StyleSheet.create({
  avatar: { borderRadius: 13, height: 41, width: 41 },
  clear: {
    alignItems: "center",
    height: 40,
    justifyContent: "center",
    width: 40,
  },
  input: {
    borderWidth: 0,
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    height: SIZES.base * 4,
    width: SIZES.width - (38 + 92 + 28 * 2),
    // screen width - (left button width - margins/padding - marginHorizontal * 2)
  },
  overlay: {
    bottom: 0,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
  },
  user: {
    bottom: 28,
    left: 0,
    position: "absolute",
    right: 0,
    zIndex: 1,
  },
});
