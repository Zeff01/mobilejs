import React from "react";
import dayjs from "dayjs";
import { useNavigation } from "@react-navigation/native";
import { Image, FlatList, StyleSheet, TouchableOpacity } from "react-native";

import { Block, Text } from "../../components";
import { mock, COLORS } from "../../constants";
import { useStaturBar } from "../../utils/hooks";

const MESSAGES_TABS = [
  { id: "direct", title: "Direct Threads" },
  { id: "group", title: "Group Chat" },
  { id: "archived", title: "Archived" },
];

const Header = ({ onPress = () => { } }) => {
  const [tab, setTab] = React.useState("direct");

  useStaturBar();

  React.useEffect(() => {
    onPress(tab);
  }, [tab]);

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
    <FlatList
      horizontal
      data={MESSAGES_TABS}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ marginBottom: 28 }}
      renderItem={({ item, index }) => renderTab(item, index)}
    />
  );
};

const Preview = ({ item, isGroup, filter }) => {
  const navigation = useNavigation();


  const serializedItem = JSON.stringify(item);
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() =>
        navigation.navigate("Chat", {
          type: filter,
          userInfo: serializedItem
        })
      }
    >

      <Block row marginHorizontal={24} marginBottom={32}>
        <Block noflex center>
          {isGroup ? (
            <>
              <Block row>
                {item?.from?.slice(0, 2).map((user, key) => (
                  <Image
                    key={`user-${key}`}
                    source={user?.avatar}
                    style={[styles.groupAvatar, key && { marginLeft: -5 }]}
                  />
                ))}
              </Block>
              <Block
                black
                center
                middle
                style={[styles.groupAvatar, { marginTop: -5 }]}
              >
                <Text white small bold>
                  +{item?.from?.slice(3)?.length}
                </Text>
              </Block>
            </>
          ) : (
            <>
              <Image source={item?.from?.[0].avatar} style={styles.avatar} />
              <Block
                noflex
                gray={!item?.from?.[0].online}
                success={item?.from?.[0].online}
                style={styles.online}
              />
            </>
          )}
        </Block>
        <Block middle marginLeft={16}>
          <Text title semibold>
            {isGroup ? "Close Friends" : item?.from?.[0]?.name}
          </Text>
          <Text title gray>
            {item?.lastMessage}
          </Text>
        </Block>
        <Block noflex style={{ alignItems: "flex-end" }}>
          <Text caption gray right>
            {dayjs(item?.timestamp).format("hh:mma")}
          </Text>
          {item?.unread > 0 && (
            <Block error center middle radius={6} width={18} maxHeight={18}>
              <Text small white>
                {item?.unread}
              </Text>
            </Block>
          )}
        </Block>
      </Block>
    </TouchableOpacity>
  );
};

const List = ({ messages = mock.MESSAGES }) => {
  const [filter, setFilter] = React.useState("direct");
  const isGroup = filter === "group";
  const messageLen = isGroup ? 2 : 0;
  const messagesList = messages?.filter((message) =>
    filter === "archived"
      ? message?.archived
      : message?.from?.length > messageLen
  );

  return (
    <Block noflex paddingTop={24}>
      <Header onPress={(type) => setFilter(type)} />
      <FlatList
        data={messagesList}
        keyExtractor={(item) => `${item.id}`}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Preview item={item} isGroup={isGroup} filter={filter} />
        )}
      />
    </Block>
  );
};

export default List;

const styles = StyleSheet.create({
  avatar: { borderRadius: 12, height: 48, width: 48 },
  groupAvatar: { borderRadius: 8, height: 28, width: 28 },
  online: {
    borderColor: COLORS.white,
    borderRadius: 6,
    borderWidth: 2,
    height: 12,
    position: "absolute",
    right: -2,
    top: -2,
    width: 12,
  },
});
