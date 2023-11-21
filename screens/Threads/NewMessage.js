import React from "react";
import { Utils } from "expo-ui-kit";
import { Image, FlatList, StyleSheet, TouchableOpacity } from "react-native";

import { Block, Button, Text, Card, Input, Icon } from "../../components/";
import { mock, SIZES, COLORS } from "../../constants/";
import { useStaturBar } from "../../utils/hooks";

const NewMessage = ({ navigation, users = mock.USERS }) => {
  const [search, setSearch] = React.useState("");
  const [selectedIds, setSelected] = React.useState([]);
  const searchRef = React.useRef();

  // filter users by search term
  const usersList = Object.values(users)?.filter(
    (user) => user?.id.indexOf(search) >= 0
  );

  // get 1st selected user from users
  const selectedUser = Object.values(users)?.filter(
    (user) => user?.id.indexOf(selectedIds[0]) >= 0
  )[0];

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
            color={Utils.rgba(COLORS.gray, 0.2)}
          >
            <Icon name="search" color={COLORS.gray} />
            <Input
              style={styles.input}
              internalRef={searchRef}
              borderColor={COLORS.gray}
              placeholder="Search in contacts..."
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

  const handleSelection = (id) => {
    const isIncluded = selectedIds.includes(id);

    if (isIncluded) {
      setSelected([...selectedIds?.filter((userId) => userId !== id)]);
    } else {
      setSelected([...selectedIds, id]);
    }
  };

  const isDirectChat = selectedIds.length === 1;

  return (
    <Block>
      <FlatList
        data={usersList}
        keyExtractor={(item) => `${item.id}`}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ marginTop: 32, paddingBottom: "35%" }}
        renderItem={({ item }) => (
          <Card marginHorizontal={24} marginBottom padding={18}>
            <Block row>
              <Image source={item?.avatar} style={styles.avatar} />
              <Block marginLeft>
                <Text title>{item?.name}</Text>
                <Text title gray>
                  @{item?.id}
                </Text>
              </Block>
              <Button
                onPress={() => handleSelection(item.id)}
                icon={<Icon name="check" color={COLORS.white} />}
                color={
                  !selectedIds.includes(item.id)
                    ? Utils.rgba(COLORS.gray, 0.2)
                    : COLORS.primary
                }
              />
            </Block>
          </Card>
        )}
      />
      <Button
        primary
        marginHorizontal={24}
        style={styles.startChat}
        onPress={() =>
          navigation.navigate("Chat", {
            type: isDirectChat ? "direct" : "group",
          })
        }
      >
        <Text title white center bold>
          {isDirectChat
            ? `Start chat with ${selectedUser?.name?.split(" ")?.[0]}`
            : "Start Group Chat"}
        </Text>
      </Button>
    </Block>
  );
};

export default NewMessage;

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
  startChat: { bottom: 32, left: 0, position: "absolute", right: 0 },
});
