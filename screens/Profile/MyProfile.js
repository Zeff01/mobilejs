import React from "react";
import { Utils } from "expo-ui-kit";
import { useNavigation } from "@react-navigation/native";
import {
  Animated,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { Block, Button, Card, Icon, Modal, Text, User } from "../../components";
import { COLORS, mock, SIZES } from "../../constants";
import { useStaturBar } from "../../utils/hooks";

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
        contentContainerStyle={{ marginTop: 24 }}
        renderItem={({ item }) => (
          <TouchableOpacity activeOpacity={0.9} onPress={() => setPost(item)}>
            <Card margin={[0, 24, 18, 24]} padding={18}>
              <Block row center space="between" marginBottom={28}>
                <Image source={item?.user?.avatar} style={styles.avatar} />
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

const MyProfile = ({ navigation, user = mock.USER }) => {
  const [tab, setTab] = React.useState("posts");
  const [hideBar, setHideBar] = React.useState(true);
  const [showOptions, setShowOptions] = React.useState(false);
  const scrollY = React.useRef(new Animated.Value(0)).current;

  // use at your own risk
  // hide the tabBar based on scrollY value
  React.useEffect(() => {
    scrollY.addListener(({ value }) => setHideBar(value <= 0));
    return scrollY.removeListener();
  }, [scrollY]);

  React.useEffect(() => {
    navigation.setOptions({ tabBarVisible: hideBar });
  }, [hideBar]);

  useStaturBar("light-content");

  const renderHeader = () => {
    return (
      <Block noflex black safe>
        <Block row space="between" paddingHorizontal={24} marginTop={24}>
          <Block>
            <User white user={user} />
          </Block>
          <Button
            transparent
            onPress={() => setShowOptions(true)}
            icon={<Icon name="options" color={COLORS.white} />}
          />
        </Block>
      </Block>
    );
  };

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

  const height = {
    height: scrollY.interpolate({
      inputRange: [0, 32],
      outputRange: [160, 0],
      extrapolate: "clamp",
    }),
  };

  const marginTop = scrollY.interpolate({
    inputRange: [0, 40],
    outputRange: [40, 20],
    extrapolate: "clamp",
  });

  return (
    <Block color={COLORS.lightGray}>
      <Block>
        {renderHeader()}
        <Block
          black
          row
          center
          space="between"
          paddingTop={40}
          paddingHorizontal={24}
        >
          <Block row center>
            <Block row>
              <Text title white bold>
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
                <Text title white bold>
                  22k
                </Text>
                <Text title gray bold marginLeft>
                  Friends
                </Text>
              </Block>
            </Button>
          </Block>
          <Button
            success
            style={{ maxHeight: 30, borderRadius: 4 }}
            onPress={() => navigation.navigate("Settings")}
          >
            <Block row center marginHorizontal>
              <Text title white medium marginRight>
                Settings
              </Text>
              <Icon name="settings" color={COLORS.white} />
            </Block>
          </Button>
        </Block>
        <Block
          animated
          black
          noflex
          overflow="hidden"
          paddingBottom={40}
          paddingHorizontal={24}
          style={[styles.about, height]}
        >
          <Text caption bold white marginBottom marginTop={40}>
            ABOUT
          </Text>
          <Text title white>
            Travel, Adventure & Lifestyle Photographer & Digital Influencer
            Nikon Ambassador Let's Work: annecarry@mail.com
          </Text>
        </Block>
        <Block animated noflex margin={[marginTop, 0, 32, 0]}>
          <FlatList
            horizontal
            data={TABS}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ marginBottom: 28 }}
            renderItem={({ item, index }) => renderTab(item, index)}
          />
          <Posts
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: false }
            )}
          />
        </Block>
      </Block>
      <Options
        isVisible={showOptions}
        onBackdropPress={() => setShowOptions(false)}
        onSwipeComplete={() => setShowOptions(false)}
      />
    </Block>
  );
};

export default MyProfile;

const styles = StyleSheet.create({
  about: {
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  avatar: {
    borderRadius: 12,
    height: 38,
    width: 38,
  },
});
