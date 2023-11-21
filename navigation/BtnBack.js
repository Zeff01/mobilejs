import React from "react";

import { Button, Icon } from "../components/";
import { COLORS } from "../constants/";

export default ({ white = false, black = false, ...props }) => {
  return (
    <Button
      white={white}
      black={black}
      secondary={!white || !black}
      style={{ marginHorizontal: 28 }}
      icon={
        <Icon
          size={12}
          name="arrowLight"
          color={white ? COLORS.black : COLORS.white}
          style={{ transform: [{ rotate: "90deg" }] }}
        />
      }
      {...props}
    />
  );
};
