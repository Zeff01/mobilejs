import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Input, Block } from "expo-ui-kit";

import Icon from "./Icon";
import { theme, COLORS } from "../constants";

const TogglePassword = ({ value, onPress }) => {
  return (
    <TouchableOpacity
      onPress={() => onPress()}
      style={{ position: "absolute", right: 15, top: 15 }}
    >
      <Icon size={18} color={COLORS.gray} name={value ? "eye" : "eyeClosed"} />
    </TouchableOpacity>
  );
};

const Valid = ({ value, validation, pattern, secureTextEntry }) => {
  const isValid = !pattern || !value || secureTextEntry;
  if (isValid) return null;

  return (
    <Icon
      size={18}
      name={validation ? "checkCircle" : "closeCircle"}
      color={validation ? COLORS.success : COLORS.error}
      style={{ position: "absolute", right: 15, top: 15 }}
    />
  );
};

export default ({ flex = 1, children, icon, style, ...props }) => {
  const [showPassword, setShowPassword] = useState(
    Boolean(props.secureTextEntry)
  );
  const hasSpecialProps = Object.keys(props)
    .map((p) => ["secureTextEntry", "validation"].indexOf(p) > -1)
    .filter(Boolean);

  const inputStyles = [
    { height: 48 },
    hasSpecialProps && { paddingRight: 30 },
    style,
  ];

  return (
    <Block flex={flex}>
      <Input
        theme={theme}
        {...props}
        style={inputStyles}
        secureTextEntry={showPassword}
      >
        {children}
      </Input>
      {props.secureTextEntry && (
        <TogglePassword
          value={showPassword}
          onPress={() => setShowPassword(!showPassword)}
        />
      )}
      <Valid {...props} />
      {icon}
    </Block>
  );
};
