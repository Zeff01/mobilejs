import React, { useState } from "react";
import { Utils } from "expo-ui-kit";
import { Image, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Block, Button, Text, Icon, Input, Modal } from "../../components";
import { mock, COLORS, SIZES } from "../../constants";
import { useStaturBar } from "../../utils/hooks";

const Contact = ({ user }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate("User", { user })}>
      <Block
        row
        white
        noflex
        radius={12}
        padding={18}
        marginBottom
        space="between"
      >
        <Block noflex marginRight>
          <Image style={styles.avatar} source={{ uri: user.avatar }} />
        </Block>
        <Block space="between">
          <Text title semibold>
            {user.name}
          </Text>
          <Text small gray>
            @{user.username}
          </Text>
        </Block>
        <Block noflex center middle>
          <Button
            primary
            style={styles.button}
            icon={<Icon name="check" center size={14} />}
          />
        </Block>
      </Block>
    </TouchableOpacity>
  );
};

const Follow = ({ users }) => {
  const [visible, setVisible] = useState(true);

  return (
    <Modal
      isVisible={visible}
      backdropOpacity={0}
      propagateSwipe
      thumbColor={COLORS.gray}
      onSwipeComplete={() => setVisible(false)}
      onBackdropPress={() => setVisible(false)}
      headerStyle={{ backgroundColor: COLORS.black }}
    >
      <Block black safe marginTop={-18} style={{ maxHeight: 180 }}>
        <Block marginHorizontal={24}>
          <Text h3 white bold marginBottom={24}>
            Who to Follow
          </Text>
          <FlatList
            data={users}
            keyExtractor={(item) => `${item.id}`}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => { }}>
                <Block row noflex radius={12} space="between" marginBottom={32}>
                  <Block noflex marginRight>
                    <Image
                      style={styles.avatar}
                      source={{ uri: item?.avatar }}
                    />
                  </Block>
                  <Block space="between">
                    <Text white title semibold>
                      {item?.name}
                    </Text>
                    <Text white small>
                      @{item?.username}
                    </Text>
                  </Block>
                  <Block noflex center middle>
                    <Button
                      primary
                      style={styles.button}
                      icon={<Icon name="addUser" center size={14} />}
                    />
                  </Block>
                </Block>
              </TouchableOpacity>
            )}
          />
        </Block>
      </Block>
    </Modal>
  );
};

export default ({ navigation, contacts = mock.CONTACTS }) => {
  const [search, setSearch] = React.useState("");
  const searchRef = React.useRef();

  // filter users by search term
  const usersList = Object.values(contacts)?.filter(
    (user) => user?.username?.indexOf(search) >= 0
  );

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
              borderColor={COLORS.gray}
              internalRef={searchRef}
              placeholder="Search..."
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
      headerRight: null,
    });
  }, [navigation, search]);
  return (
    <Block paddingHorizontal={24}>
      <FlatList
        data={usersList}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => `${item.id}`}
        contentContainerStyle={{ marginVertical: 24, paddingBottom: 24 }}
        renderItem={({ item }) => <Contact user={item} />}
      />

      <Follow users={contacts?.slice(Math.random(3), 6)} />
    </Block>
  );
};

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: COLORS.secondary,
    borderRadius: 12,
    height: 38,
    width: 38,
  },
  button: {
    borderRadius: 8,
    height: 28,
    maxHeight: 28,
    maxWidth: 28,
    width: 28,
  },
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
});
