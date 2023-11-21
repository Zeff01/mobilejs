import React from "react";
import { FlatList, Image, TouchableOpacity } from "react-native";
import { Block, Text } from "../../components";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import aipic from "../../assets/pictures/aipic.jpeg";
import { COLORS } from "../../constants";

const AiModulesHome = () => {
  const navigation = useNavigation();

  const modules = [
    {
      name: "AiVideo",
      description:
        "Capture and analyze videos using advanced AI algorithms. Transform video data into actionable insights.",
      screen: "AiVideo",
    },
    {
      name: "AutoPilot",
      description:
        "Automate routine tasks with AI-driven solutions. Improve efficiency and accuracy in your workflows.",
      screen: "Module2Screen",
    },
    {
      name: "In-Depth Research",
      description:
        "Leverage AI to conduct comprehensive research. Gain deep insights from vast data sources effortlessly.",
      screen: "Module3Screen",
    },
    {
      name: "Ez Code AI",
      description:
        "Simplify coding with AI assistance. Write and debug code faster and more efficiently.",
      screen: "Module4Screen",
    },
    {
      name: "Converting Product Description AI",
      description:
        "Automatically generate compelling product descriptions. Enhance your e-commerce platform with AI-powered content.",
      screen: "Module5Screen",
    },
    // ... more modules
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate(item.screen)}
      style={styles.moduleContainer}
    >
      <Image source={aipic} style={styles.image} resizeMode="contain" />
      <Block>
        <Text style={styles.moduleTitle}>{item.name}</Text>
        <Text style={styles.moduleDescription}>{item.description}</Text>
        <Text style={styles.moduleLink}>Go to {item.name}</Text>
      </Block>
    </TouchableOpacity>
  );

  return (
    <Block style={styles.container}>
      <Text h2 bold style={styles.header}>
        AI MODULES
      </Text>
      <FlatList
        data={modules}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
      />
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f0f0",
  },

  header: {
    marginBottom: 20,
    marginTop: 20,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 20,
    marginRight: 15,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
  },
  moduleContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  moduleTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  moduleDescription: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  moduleLink: {
    color: "#007bff",
    marginTop: 10,
    fontWeight: "bold",
  },
});

export default AiModulesHome;
