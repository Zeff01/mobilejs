import React from "react";
import { Utils } from "expo-ui-kit";
import { useNavigation } from "@react-navigation/native";

import { COLORS } from "../constants/";
import { Button, Icon } from "../components/";

export default (props) => {
  const navigation = useNavigation();
  return (
    <Button
      outlined
      color={Utils.rgba(COLORS.gray, 0.2)}
      onPress={() => navigation.navigate("Search")}
      icon={<Icon name="search" size={16} color={COLORS.black} />}
      style={{ marginHorizontal: 28 }}
      {...props}
    />
  );
};
