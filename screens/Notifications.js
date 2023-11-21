import React from "react";
import dayjs from "dayjs";
import { Utils } from "expo-ui-kit";
import { Animated, Image, StyleSheet, TouchableOpacity } from "react-native";

import { Block, Text, Icon } from "../components/";
import { mock, COLORS } from "../constants/";
import { useStaturBar } from "../utils/hooks";

const Empty = ({ onReload = () => {} }) => {
  const rotation = React.useRef(new Animated.Value(0)).current;
  const animation = React.useRef(new Animated.Value(0)).current;
  const scaling = React.useRef(new Animated.Value(0)).current;

  const handleReload = React.useCallback(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(rotation, {
          duration: 2000,
          toValue: 1,
        }),
        Animated.timing(animation, {
          duration: 300,
          toValue: 1,
        }),
      ]),
      Animated.timing(scaling, {
        duration: 300,
        toValue: 1,
      }),
    ]).start(({ finished }) => finished && onReload());
  });

  const size = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [64, 36],
  });

  return (
    <Block center middle marginHorizontal={60 - 24}>
      <TouchableOpacity onPress={() => handleReload()}>
        <Block
          animated
          noflex
          center
          middle
          width={size}
          height={size}
          radius={animation.interpolate({
            inputRange: [0, 1],
            outputRange: [12, 36],
          })}
          paddingLeft={4}
          color={Utils.rgba(COLORS.gray, 0.2)}
          style={{
            transform: [
              {
                scale: scaling.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0],
                }),
              },
            ],
          }}
        >
          <Icon
            animated
            size={40}
            name="reload"
            color={COLORS.black}
            style={{
              marginLeft: -2,
              transform: [
                {
                  rotate: rotation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0deg", "1080deg"],
                  }),
                },
              ],
            }}
          />
        </Block>
      </TouchableOpacity>
      <Text
        center
        title
        animated
        marginTop={16}
        style={{
          opacity: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0],
          }),
        }}
      >
        At the moment you do not have any other notifications
      </Text>
    </Block>
  );
};

const Notification = ({ item, index }) => {
  const animation = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 350,
      delay: index,
    }).start();
  }, []);

  return (
    <Block
      row
      animated
      marginBottom={40}
      style={{
        opacity: animation,
        transform: [
          {
            translateY: animation.interpolate({
              inputRange: [0, 1],
              outputRange: [40, 0],
            }),
          },
        ],
      }}
    >
      <Block error radius={8} maxWidth={8} height={8} marginTop />
      <Image style={styles.avatar} source={item?.user.avatar} />
      <Block middle>
        <Block row center>
          <Text bold>{item?.user.name}</Text>
          <Text gray caption paddingLeft={10}>
            {dayjs().diff(item?.time, "minute")}min
          </Text>
        </Block>
        <Text gray height={22}>
          {item?.action}
        </Text>
        {item?.type === "addUser" && (
          <Block row center marginTop={20}>
            <Block
              row
              center
              success
              radius={4}
              marginRight={15}
              paddingVertical
              paddingHorizontal={12}
            >
              <Icon name="check" color={COLORS.white} size={12} />
              <Text white bold marginLeft={4}>
                Add
              </Text>
            </Block>
            <Block
              row
              center
              radius={4}
              paddingVertical
              paddingHorizontal={12}
              color={Utils.rgba(COLORS.black, 0.2)}
            >
              <Icon name="close" color={COLORS.white} size={9} />
              <Text white bold marginLeft={4}>
                Ignore
              </Text>
            </Block>
          </Block>
        )}
      </Block>
      {item?.type !== "image" && (
        <Block
          noflex
          center
          middle
          radius={12}
          height={38}
          width={38}
          color={Utils.rgba(COLORS.black, 0.2)}
        >
          <Icon name={item?.type} size={16} color={COLORS.black} />
        </Block>
      )}
      {item?.type === "image" && (
        <Block noflex center middle radius={8} width={49} height={49}>
          <Image resizeMode="cover" source={item?.image} style={styles.image} />
        </Block>
      )}
    </Block>
  );
};

const Notifications = ({ notifications = [], unread = 3 }) => {
  const animation = React.useRef(new Animated.Value(0)).current;
  const [list, setList] = React.useState(notifications);
  const [count, setCount] = React.useState(0);
  const hasItems = Boolean(list.length);

  useStaturBar();

  React.useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 350,
    }).start();
  }, [count]);

  const animateCount = React.useCallback(() => {
    animation.setValue(0);
  });

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [40, 0],
  });

  return (
    <Block paddingHorizontal={28}>
      <Animated.FlatList
        data={list}
        scrollEnabled={hasItems}
        keyExtractor={(item) => `${item.id}`}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={!hasItems && { flex: 0.75 }}
        renderItem={({ item, index }) => (
          <Notification item={item} index={index} />
        )}
        ListHeaderComponent={
          <Block noflex row center marginVertical={28}>
            <Text h3 bold>
              Notifications
            </Text>
            <Block noflex error radius={4} paddingHorizontal marginLeft>
              <Text
                white
                small
                center
                animated
                style={{
                  width: 20,
                  transform: [{ translateY }],
                }}
              >
                {count}
              </Text>
            </Block>
          </Block>
        }
        ListEmptyComponent={
          <Empty
            onReload={() => {
              setList(mock.NOTIFICATIONS);
              animateCount();
              setCount(`${unread}`.padStart(2, "0"));
            }}
          />
        }
      />
    </Block>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: COLORS.gray,
    borderRadius: 8,
    height: 28,
    marginHorizontal: 10,
    width: 28,
  },
  image: {
    borderRadius: 8,
    height: 49,
    width: 49,
  },
});
