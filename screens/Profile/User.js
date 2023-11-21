import React from "react";
import {
  Animated,
  FlatList,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Video } from "expo-av";
import { Utils } from "expo-ui-kit";
import { useNavigation } from "@react-navigation/native";

import { Block, Button, Card, Text, Icon, Modal } from "../../components";
import { SIZES, COLORS, mock, images, videos } from "../../constants/";

const TABS = [
  { id: "posts", title: "Posts" },
  { id: "photos", title: "Photos" },
  { id: "videos", title: "Videos" },
  { id: "events", title: "Events" },
];

const Post = ({ post, ...props }) => {
  const navigation = useNavigation();

  return (
    <Modal
      {...props}
      backdropColor={COLORS.gray}
      style={{ marginTop: SIZES.base * 4.5 }}
    >
      <Block white paddingHorizontal={24}>
        <Image
          resizeMode="cover"
          source={post?.images?.[0]}
          style={{
            height: 168,
            width: "100%",
            borderRadius: 12,
          }}
        />
        {post?.title && (
          <Text h2 bold marginTop={24}>
            {post?.title}
          </Text>
        )}
        <Block row marginVertical={24}>
          <Image source={post?.user?.avatar} style={styles.avatar} />
          <Block marginLeft>
            <Text title semibold>
              {post?.user?.name}
            </Text>
            <Text subtitle gray>
              5min ago
            </Text>
          </Block>
        </Block>
        <Text title gray>
          {post?.description}
        </Text>
      </Block>

      <Block
        row
        black
        middle
        space="between"
        paddingHorizontal={30}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          borderTopLeftRadius: SIZES.radius * 2.66,
          borderTopRightRadius: SIZES.radius * 2.66,
        }}
      >
        <Block row center marginTop={40} marginBottom={60}>
          <TouchableOpacity activeOpacity={0.9} onPress={() => {}}>
            <Block row center marginRight={28}>
              <Icon name="heartOutlined" color={COLORS.error} size={14} />
              <Text white title semibold marginLeft={5}>
                {post?.likes}
              </Text>
            </Block>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              props.onSwipeComplete();
              navigation.navigate("Comments", { comments: post?.comments });
            }}
          >
            <Block row center marginRight={28}>
              <Icon name="comment" color={COLORS.white} size={14} />
              <Text white title semibold marginLeft={5}>
                {post?.comments?.length}
              </Text>
            </Block>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.9} onPress={() => {}}>
            <Block row center>
              <Icon name="share" color={COLORS.white} size={14} />
              <Text white title semibold marginLeft={5}>
                Share
              </Text>
            </Block>
          </TouchableOpacity>
        </Block>
      </Block>
    </Modal>
  );
};

const Posts = ({ stories = mock.STORIES, onScroll = () => {} }) => {
  const [post, setPost] = React.useState(false);

  return (
    <>
      <FlatList
        data={stories}
        onScroll={onScroll}
        scrollEventThrottle={16}
        keyExtractor={(item) => `${item.id}`}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity activeOpacity={0.9} onPress={() => setPost(item)}>
            <Card margin={[0, 24, 18, 24]} padding={18}>
              <Block row center space="between" marginBottom={28}>
                <Image source={item?.user?.avatar} style={styles.user} />
                <Block marginLeft>
                  <Text title semibold>
                    {item?.user?.name}
                  </Text>
                  <Text subtitle gray>
                    5min ago
                  </Text>
                </Block>
                <Icon name="options" color={COLORS.gray} />
              </Block>
              {item?.images?.length === 1 && (
                <Block
                  radius={8}
                  height={150}
                  overflow="hidden"
                  marginTop={-10}
                  marginBottom={18}
                >
                  <Image
                    resizeMode="cover"
                    source={item?.images?.[0]}
                    style={{ height: 150, width: "100%" }}
                  />
                </Block>
              )}

              {Boolean(item?.title) && (
                <Text h3 bold marginBottom={8}>
                  {item?.title}
                </Text>
              )}
              {Boolean(item?.description) && (
                <Text title gray>
                  {item?.description}
                </Text>
              )}
              {item?.images?.length > 1 && (
                <Block row marginTop={18}>
                  <Block
                    flex={2}
                    radius={8}
                    height={160}
                    marginRight={10}
                    overflow="hidden"
                  >
                    <Image
                      resizeMode="cover"
                      style={{ height: 160 }}
                      source={item?.images?.[0]}
                    />
                  </Block>
                  <Block noflex>
                    <Block
                      radius={8}
                      height={75}
                      width={80}
                      marginBottom={10}
                      overflow="hidden"
                    >
                      <Image
                        resizeMode="cover"
                        source={item?.images?.[1]}
                        style={{ height: 75, width: 80 }}
                      />
                    </Block>
                    <Block radius={8} height={75} width={80} overflow="hidden">
                      <Image
                        resizeMode="cover"
                        source={item?.images?.[2]}
                        style={{ height: 75, width: 80 }}
                      />
                      <Block row middle center style={styles.imagesCount}>
                        <Icon name="camera" />
                        <Text white marginLeft={5} semibold>
                          {item?.images?.length - 2}
                        </Text>
                      </Block>
                    </Block>
                  </Block>
                </Block>
              )}
              <Block row center space="between" marginTop={28}>
                <Block row center>
                  <Block row center marginRight={28}>
                    <Icon name="heartOutlined" color={COLORS.gray} size={14} />
                    <Text title semibold marginLeft={5}>
                      {item?.likes}
                    </Text>
                  </Block>
                  <Block row center>
                    <Icon name="comment" color={COLORS.gray} size={14} />
                    <Text title semibold marginLeft={5}>
                      {item?.comments?.length}
                    </Text>
                  </Block>
                </Block>
                <Block row center>
                  <Text title semibold marginRight={5}>
                    Share
                  </Text>
                  <Icon name="share" color={COLORS.black} size={14} />
                </Block>
              </Block>
            </Card>
          </TouchableOpacity>
        )}
      />
      <Post
        post={post}
        isVisible={Boolean(post)}
        onSwipeComplete={() => setPost(false)}
      />
    </>
  );
};

const Media = ({ files = [], type = "image", onScroll = () => {} }) => {
  if (type === "image") {
    const imageSize = (SIZES.width - 24 * 3) / 3;
    const marginBottom = (SIZES.width - 24 * 2 - imageSize * 3) / 2;

    return (
      <ScrollView
        onScroll={onScroll}
        scrollEventThrottle={16}
        keyExtractor={(item) => `${item.id}`}
        showsVerticalScrollIndicator={false}
      >
        <Block row wrap space="between" marginHorizontal={24}>
          {files?.map((file, index) => {
            return (
              <Image
                key={`file-${index}`}
                source={file}
                style={{
                  borderRadius: 12,
                  width: imageSize,
                  height: imageSize,
                  marginBottom,
                  // marginHorizontal: 6,
                }}
              />
            );
          })}
        </Block>
      </ScrollView>
    );
  }

  return (
    <FlatList
      data={files}
      onScroll={onScroll}
      scrollEventThrottle={16}
      keyExtractor={(item) => `${item.id}`}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => (
        <Video
          source={item}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          style={styles.video}
        />
      )}
    />
  );
};

const Options = ({ isVisible = false, ...props }) => {
  return (
    <Modal isVisible={isVisible} {...props}>
      <Block noflex white paddingLeft={24} paddingRight={16} paddingBottom={24}>
        <TouchableOpacity activeOpacity={0.8}>
          <Block row center marginBottom={24}>
            <Block
              noflex
              padding
              radius={8}
              marginRight={16}
              color={Utils.rgba(COLORS.gray, 0.2)}
            >
              <Icon name="star" color={COLORS.black} size={14} />
            </Block>
            <Block>
              <Text title semibold>
                Mark as favorite
              </Text>
              <Text small gray>
                Mark this user or user post as your favorite content
              </Text>
            </Block>
          </Block>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8}>
          <Block row center marginBottom={24}>
            <Block
              noflex
              padding
              radius={8}
              marginRight={16}
              color={Utils.rgba(COLORS.gray, 0.2)}
            >
              <Icon name="closeCircle" color={COLORS.black} size={14} />
            </Block>
            <Block>
              <Text title semibold>
                Block this user
              </Text>
              <Text small gray>
                Block this user to receive any more notifications
              </Text>
            </Block>
          </Block>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8}>
          <Block row center>
            <Block
              noflex
              padding
              radius={8}
              marginRight={16}
              color={Utils.rgba(COLORS.gray, 0.2)}
            >
              <Icon name="help" color={COLORS.black} size={14} />
            </Block>
            <Block>
              <Text title semibold>
                Report this user
              </Text>
              <Text small gray>
                Report this user from your feed
              </Text>
            </Block>
          </Block>
        </TouchableOpacity>
      </Block>
    </Modal>
  );
};

const UserHeader = ({ user, opacity = 1, height }) => {
  const navigation = useNavigation();

  return (
    <Block center white noflex overflow="hidden" style={styles.header}>
      <Block
        noflex
        center
        animated
        marginBottom={24}
        style={{ height, opacity }}
      >
        <Text h2 bold marginTop>
          {user?.name}
        </Text>
        <Text caption medium gray>
          @{user?.id}
        </Text>

        <Block row center>
          <Block row center style={{ maxHeight: 30 }}>
            <Text title bold>
              518
            </Text>
            <Text title gray bold marginLeft>
              Posts
            </Text>
          </Block>
          <Button
            transparent
            style={{ maxHeight: 30 }}
            onPress={() => navigation.navigate("Friends")}
          >
            <Block row marginLeft={24}>
              <Text title bold>
                22k
              </Text>
              <Text title gray bold marginLeft>
                Friends
              </Text>
            </Block>
          </Button>
        </Block>
        <Block row center middle marginTop={18}>
          <Button success style={styles.button}>
            <Block row center middle margin={[18, 21]}>
              <Icon name="check" />
              <Text title white bold marginLeft={10}>
                Friends
              </Text>
            </Block>
          </Button>
          <Button
            color={Utils.rgba(COLORS.gray, 0.2)}
            style={[styles.button, { marginLeft: 24 }]}
          >
            <Block row center middle margin={[18, 21]}>
              <Icon name="message" color={COLORS.black} />
              <Text title bold marginLeft={10}>
                Message
              </Text>
            </Block>
          </Button>
        </Block>
      </Block>
    </Block>
  );
};

const Tab = ({ item, index, tab, onTabPress = () => {} }) => {
  const isSelected = item?.id === tab;
  const isFirst = !index;
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => onTabPress(item.id)}>
      <Block noflex center marginRight={28}>
        <Text
          title
          bold
          gray={!isSelected}
          black={isSelected}
          marginLeft={isFirst ? 28 : 0}
        >
          {item?.title}
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

export default ({ navigation, route, user = mock.USER }) => {
  const tabsRef = React.useRef();
  const [tab, setTab] = React.useState("posts");
  const [index, setIndex] = React.useState(0);
  const [showOptions, setShowOptions] = React.useState(false);
  const scrollY = React.useRef(new Animated.Value(0)).current;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleAlign: "center",
      headerStyle: { elevation: 0 },
      headerTitle: () => {
        return (
          <Block safe noflex>
            <Image source={user?.avatar} style={styles.avatar} />
          </Block>
        );
      },
    });
  }, [navigation, route, user]);

  React.useEffect(() => {
    tabsRef.current.scrollToIndex({ index, viewPosition: 0 });
  }, [index]);

  const height = scrollY.interpolate({
    inputRange: [0, 32],
    outputRange: [160, 0],
    extrapolate: "clamp",
  });

  const opacity = scrollY.interpolate({
    inputRange: [0, 32],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const margin = scrollY.interpolate({
    inputRange: [0, 32],
    outputRange: [40, 10],
    extrapolate: "clamp",
  });

  return (
    <Block>
      <UserHeader user={user} opacity={opacity} height={height} />
      <Block animated noflex margin={[margin, 0, margin, 0]}>
        <FlatList
          horizontal
          data={TABS}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <Tab
              tab={tab}
              item={item}
              index={index}
              onTabPress={(id) => {
                setIndex(index);
                setTab(id);
              }}
            />
          )}
        />
      </Block>
      <FlatList
        horizontal
        pagingEnabled
        data={TABS}
        ref={tabsRef}
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          switch (item?.id) {
            case "photos":
              return (
                <Block width={SIZES.width}>
                  <Media
                    files={[
                      // mock multiple images
                      ...Object.values(images.stories),
                      ...Object.values(images.stories),
                      ...Object.values(images.stories),
                    ]}
                    onScroll={Animated.event(
                      [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                      { useNativeDriver: false }
                    )}
                  />
                </Block>
              );
            case "videos":
              return (
                <Block width={SIZES.width}>
                  <Media
                    files={[
                      // mock multiple videos
                      videos.live,
                      videos.live,
                      videos.live,
                      videos.live,
                      videos.live,
                      videos.live,
                      videos.live,
                      videos.live,
                    ]}
                    onScroll={Animated.event(
                      [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                      { useNativeDriver: false }
                    )}
                  />
                </Block>
              );
            case "events":
              return (
                <Block width={SIZES.width}>
                  <Posts
                    onScroll={Animated.event(
                      [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                      { useNativeDriver: false }
                    )}
                  />
                </Block>
              );
            case "posts":
              return (
                <Block width={SIZES.width}>
                  <Posts
                    onScroll={Animated.event(
                      [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                      { useNativeDriver: false }
                    )}
                  />
                </Block>
              );
          }
        }}
      />
      <Options
        isVisible={showOptions}
        onBackdropPress={() => setShowOptions(false)}
        onSwipeComplete={() => setShowOptions(false)}
      />
    </Block>
  );
};

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: COLORS.success,
    borderRadius: 20,
    height: 78,
    marginTop: 48,
    width: 78,
  },
  header: {
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    paddingTop: 32,
  },
  user: {
    borderColor: COLORS.white,
    borderRadius: 15,
    borderWidth: 2,
    height: 44,
    width: 44,
  },
  video: {
    borderRadius: 12,
    flex: 1,
    height: 120,
  },
});
