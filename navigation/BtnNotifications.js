import React from "react";
import { useNavigation } from "@react-navigation/native";

import { COLORS } from "../constants/";
import { Button, Icon } from "../components/";

export default (props) => {
  const navigation = useNavigation();

  return (
    <Button
      secondary
      style={{ marginHorizontal: 28 }}
      onPress={() => navigation.navigate("Notifications")}
      icon={<Icon name="notification" size={16} color={COLORS.black} />}
      {...props}
    />
  );
};
