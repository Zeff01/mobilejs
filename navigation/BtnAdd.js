import React from "react";
import { useNavigation } from "@react-navigation/native";

import { Button, Icon } from "../components/";
import { COLORS } from "../constants/";

export default (props) => {
  const navigation = useNavigation();

  return (
    <Button
      success
      style={{ marginHorizontal: 28 }}
      onPress={() => navigation.navigate(props.screen)}
      icon={<Icon name="plus" size={16} color={COLORS.white} />}
      {...props}
    />
  );
};
