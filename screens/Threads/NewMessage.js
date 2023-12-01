import React, { useEffect, useState } from "react";
import { Utils } from "expo-ui-kit";
import { Image, FlatList, StyleSheet, TouchableOpacity } from "react-native";

import { Block, Button, Text, Card, Input, Icon } from "../../components/";
import { mock, SIZES, COLORS } from "../../constants/";
import { useStaturBar } from "../../utils/hooks";
import Constants from "expo-constants";
import axios from "axios";

const {
  CHINGU_BASE_ENDPOINT
} = Constants.expoConfig.extra;


const NewMessage = ({ navigation, users = mock.USERS, messages = mock.MESSAGES }) => {
  const [search, setSearch] = React.useState("");
  const [filter, setFilter] = React.useState("direct");
  const [assistantList, setAssistantList] = useState([])
  const isGroup = filter === "group";
  const searchRef = React.useRef();

  useStaturBar();

  useEffect(() => {
    const fetchAssistants = async () => {
      try {
        const response = await axios.get(`${CHINGU_BASE_ENDPOINT}/assistant/list?client=mobileApp`);
        // console.log(response.data); 
        setAssistantList(response.data.data)
      } catch (error) {
        console.error("Error fetching assistants:", error);
      }
    };


    fetchAssistants();
  }, []);



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
    });
  }, [navigation, search]);


  return (
    <Block>
      <FlatList
        data={assistantList}
        keyExtractor={(item) => `${item._id}`}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ marginTop: 32, paddingBottom: "35%" }}
        renderItem={({ item }) => {

          const assistantData = {
            id: item.assistantId,
            name: item.name,
            image: item.image,
            instruction: item.instruction
          }
          return (
            <Card marginHorizontal={24} marginBottom padding={18}>
              <TouchableOpacity onPress={() => navigation.navigate("Chat", { assistantData: assistantData })}>
                <Block row>
                  <Image source={{ uri: item?.image }} style={styles.avatar} />
                  <Block marginLeft style={{ flex: 1, justifyContent: 'center' }}>
                    <Text title style={{ fontSize: 16, marginLeft: 5 }}>{item?.name}</Text>

                  </Block>

                </Block>
              </TouchableOpacity>
            </Card>
          )
        }}
      />
    </Block >
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
