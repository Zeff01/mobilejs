import React from "react";
import { useNavigation } from "@react-navigation/native";

import { COLORS } from "../constants/";
import { Button, Icon } from "../components/";

export default (props) => {
  const navigation = useNavigation();

  return (
    <Button
      success
      style={{ marginHorizontal: 28 }}
      onPress={() => navigation.navigate("NewMessage")}
      icon={<Icon name="comment" size={16} color={COLORS.white} />}
      {...props}
    />
  );
};
