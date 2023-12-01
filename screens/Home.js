import React from "react";
import { Utils } from "expo-ui-kit";
// import Modal from "react-native-modal";
import { useNavigation } from "@react-navigation/native";
import { Image, FlatList, StyleSheet, TouchableOpacity } from "react-native";

import {
  Block,
  Card,
  Icon,
  Story,
  Text,
  Modal as CustomModal,
} from "../components";
import { mock, COLORS, SIZES } from "../constants";
import { useStaturBar } from "../utils/hooks";

const Post = ({ post, ...props }) => {
  const navigation = useNavigation();

  return (
    <CustomModal
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
          <TouchableOpacity activeOpacity={0.9} onPress={() => { }}>
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
          <TouchableOpacity activeOpacity={0.9} onPress={() => { }}>
            <Block row center>
              <Icon name="share" color={COLORS.white} size={14} />
              <Text white title semibold marginLeft={5}>
                Share
              </Text>
            </Block>
          </TouchableOpacity>
        </Block>
      </Block>
    </CustomModal>
  );
};

const Header = ({ stories = [] }) => {
  const navigation = useNavigation();
  const [story, setStory] = React.useState(false);

  return (
    <>
      <Text h2 bold marginLeft={28} marginBottom={28}>
        Features Stories
      </Text>

      <FlatList
        horizontal
        data={[{ id: "add" }, ...stories]}
        keyExtractor={(item) => `${item.id}`}
        showsHorizontalScrollIndicator={false}
        style={{ flexGrow: 0, paddingBottom: 28 }}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              item?.id === "add" && navigation.navigate("NewStory");
              item?.id !== "add" && setStory(item);
            }}
          >
            <Block
              center
              middle
              width={48}
              height={48}
              radius={16}
              marginRight={18}
              primary={item?.newActivity}
              color={!item?.newActivity ? Utils.rgba(COLORS.gray, 0.2) : null}
              {...(!index && {
                marginLeft: 28,
                color: Utils.rgba(COLORS.secondary, 0.3),
              })}
            >
              {!index && (
                <Icon name="plus" size={18} color={COLORS.secondary} />
              )}
              {Boolean(index) && (
                <Image source={item?.user?.avatar} style={styles.avatar} />
              )}
            </Block>
          </TouchableOpacity>
        )}
      />
      {/* <Modal
        hasBackdrop={false}
        style={{ margin: 0 }}
        animationIn="zoomIn"
        animationOut="zoomOut"
        isVisible={Boolean(story)}
      >
        <Story story={story} onPress={() => setStory(false)} />
      </Modal> */}
    </>
  );
};

const Home = ({ navigation, stories = mock.STORIES }) => {
  useStaturBar("dark-content");
  const [post, setPost] = React.useState(false);

  return (
    <Block>
      <FlatList
        data={stories}
        keyExtractor={(item) => `${item.id}`}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ marginTop: 24 }}
        ListHeaderComponent={() => <Header stories={stories} />}
        renderItem={({ item }) => (
          <Card margin={[0, 24, 18, 24]} padding={18}>
            <Block row center space="between" marginBottom={28}>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() =>
                  navigation.navigate("User", { id: item?.user?.id })
                }
              >
                <Image source={item?.user?.avatar} style={styles.avatar} />
              </TouchableOpacity>
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

            <TouchableOpacity activeOpacity={0.9} onPress={() => setPost(item)}>
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
            </TouchableOpacity>
          </Card>
        )}
      />
      <Post
        post={post}
        isVisible={Boolean(post)}
        onSwipeComplete={() => setPost(false)}
      />
    </Block>
  );
};

export default Home;

const styles = StyleSheet.create({
  avatar: {
    borderColor: COLORS.white,
    borderRadius: 15,
    borderWidth: 2,
    height: 44,
    width: 44,
  },
  imagesCount: {
    bottom: 0,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
  },
});
