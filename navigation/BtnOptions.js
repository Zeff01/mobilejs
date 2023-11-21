import React from "react";
import { Utils } from "expo-ui-kit";

import { COLORS } from "../constants/";
import { Button, Icon } from "../components/";

export default ({
  iconColor = COLORS.black,
  renderOptions = () => {},
  ...props
}) => {
  return (
    <>
      <Button
        outlined
        color={Utils.rgba(COLORS.gray, 0.2)}
        style={{ marginHorizontal: 28, borderWidth: 2 }}
        icon={<Icon name="options" size={16} color={iconColor} />}
        {...props}
      />
      {renderOptions()}
    </>
  );
};
