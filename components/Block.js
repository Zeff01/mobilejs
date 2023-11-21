import React from "react";
import { Block } from "expo-ui-kit";

import theme from "../constants/theme";

export default ({
  children,
  width,
  height,
  minWidth,
  minHeight,
  maxWidth,
  maxHeight,
  style,
  overflow,
  ...props
}) => {
  const blockStyles = [
    style,
    width && { width },
    height && { height },
    minWidth && { minWidth },
    minHeight && { minHeight },
    maxWidth && { maxWidth },
    maxHeight && { maxHeight },
    overflow && { overflow },
  ];

  return (
    <Block {...props} theme={theme} style={blockStyles}>
      {children}
    </Block>
  );
};
