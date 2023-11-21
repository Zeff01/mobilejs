import React from "react";
import { Card } from "expo-ui-kit";

import theme from "../constants/theme";

export default ({ children, ...props }) => {
  return (
    <Card {...props} theme={theme}>
      {children}
    </Card>
  );
};
