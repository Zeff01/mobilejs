

import React from "react";
import dayjs from "dayjs";
import { Image, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { Block, Text } from "../../components";
import { COLORS } from "../../constants";
import Constants from "expo-constants";
import useToken from '../../hooks/useToken'
import axios from 'axios';
import DefaultAIiPic from '../../assets/pictures/defaultAi.jpg'



const Preview = React.memo(({ item, navigation }) => {

  // console.log("item:", item)
  const sessionData = {
    _id: item?._id,
    title: item?.title,
    createdAt: item.createdAt,
    openAiAssistantId: item?.openAiAssistantId,
    openAiThreadId: item?.openAiThreadId,
    user: {
      userId: item?.user?._id,
      email: item?.user?.email,
      firstName: item?.user?.firstName,
      photo: item?.user?.photo,
      username: item?.user?.username
    },

  }

  const assistantData = {
    id: item?.assistant?.assistantId,
    name: item?.assistant?.name,
    instruction: item?.assistant?.instruction,
    image: item?.assistant?.image
  }

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => navigation.navigate("Chat", { sessionData: sessionData, assistantData: assistantData })}
      style={styles.previewContainer}
    >
      <Block row style={{ alignItems: 'center' }}>
        {assistantData?.image ? <Image source={{ uri: assistantData?.image }} style={styles.avatar} /> : <Image source={DefaultAIiPic} style={styles.avatar} />}


        <Block marginLeft>
          <Text style={styles.assistantName}>
            {assistantData?.name ?? sessionData?.title}
          </Text>
          <Text style={styles.subText}>
            {sessionData?.title}
          </Text>
        </Block>
        <Text style={styles.timestampText}>
          {dayjs(item?.createdAt).format("hh:mma")} {/* Displaying the timestamp */}
        </Text>
      </Block>

    </TouchableOpacity>
  );

});


const List = ({ navigation }) => {
  const [chatSessions, setChatSessions] = React.useState([]);
  const { token } = useToken()

  const {
    CHINGU_BASE_ENDPOINT
  } = Constants.expoConfig.extra;

  const fetchChatSessions = async () => {
    try {
      const response = await axios.get(`${CHINGU_BASE_ENDPOINT}/chat-session?client=mobileApp`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setChatSessions(response.data.records);
    } catch (error) {
      console.error('Error fetching chat sessions:', error);
    }
  };

  React.useEffect(() => {
    if (token) {
      fetchChatSessions();
    }
  }, [token]);




  return (
    <Block noflex paddingTop={24} marginHorizontal={20}>
      <FlatList
        data={chatSessions}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (

          <Preview item={item} navigation={navigation} />
        )}
      />
    </Block>
  );
};

export default List;

const styles = StyleSheet.create({
  avatar: { borderRadius: 12, height: 48, width: 48 },
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
  previewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginBottom: 10,
    backgroundColor: COLORS.white,
    borderRadius: 5,
    paddingVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 3,
  },
  assistantName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
    flex: 1,
  },

  subText: {
    fontSize: 12,
    color: COLORS.black,
    flex: 1,
    marginRight: 5,

  },
  timestampText: {
    color: COLORS.gray,
    fontSize: 12
  },
});
