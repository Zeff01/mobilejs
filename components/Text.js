import React from "react";
import { Text } from "expo-ui-kit";

import theme from "../constants/theme";

export default ({ children, ...props }) => {
  return (
    <Text theme={theme} {...props}>
      {children}
    </Text>
  );
};
