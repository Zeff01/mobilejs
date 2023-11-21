import React from "react";
import dayjs from "dayjs";
import { Utils } from "expo-ui-kit";
import { Image, FlatList, StyleSheet, TouchableOpacity } from "react-native";

import { Block, Button, Text, Icon } from "../components/";
import { COLORS } from "../constants/";
import { useStaturBar } from "../utils/hooks";

const Comment = ({ item }) => {
  return (
    <Block marginBottom={40}>
      <Block row space="between">
        <Block row center>
          <Image style={styles.avatar} source={item?.user?.avatar} />
          <Text bold>{item?.user.name}</Text>
        </Block>
        <Text gray caption paddingLeft={10}>
          {dayjs().diff(item?.timestamp, "minute")}min ago
        </Text>
      </Block>
      <Text title gray marginVertical={10}>
        {item?.comment}
      </Text>
      <Block row>
        <TouchableOpacity activeOpacity={0.9} onPress={() => {}}>
          <Icon
            size={14}
            style={{ marginRight: 15 }}
            color={item?.liked ? COLORS.error : COLORS.gray}
            name={item?.liked ? "heartFilled" : "heartOutlined"}
          />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.9} onPress={() => {}}>
          <Icon name="comment" color={COLORS.gray} size={14} />
        </TouchableOpacity>
      </Block>
    </Block>
  );
};

const Comments = ({ route }) => {
  useStaturBar();

  const { comments } = route.params;
  const hasComments = Boolean(comments?.length);

  return (
    <Block paddingHorizontal={28}>
      <FlatList
        data={comments}
        scrollEnabled={hasComments}
        keyExtractor={(item) => `${item.id}`}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={!hasComments && { flex: 0.75 }}
        renderItem={({ item }) => <Comment item={item} />}
        ListHeaderComponent={
          <Text h3 bold marginBottom={28} marginTop={16}>
            Comments ({comments?.length})
          </Text>
        }
        ListEmptyComponent={
          <Block center middle marginHorizontal={60 - 24}>
            <Button
              style={{ width: 64, height: 64 }}
              color={Utils.rgba(COLORS.gray, 0.2)}
              icon={
                <Icon
                  size={30}
                  name="reload"
                  color={COLORS.black}
                  style={{ margin: 16 }}
                />
              }
            />
            <Text center title marginTop={16}>
              There are no comments
            </Text>
          </Block>
        }
      />
    </Block>
  );
};

export default Comments;

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: COLORS.gray,
    borderRadius: 8,
    height: 28,
    marginRight: 10,
    width: 28,
  },
});
