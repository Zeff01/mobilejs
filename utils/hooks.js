import { Keyboard, StatusBar, Platform } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useEffect, useState } from "react";

import { theme } from "../constants";

export const useKeyboard = () => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  function onKeyboardDidShow(e) {
    console.log("e:", e);
    setKeyboardHeight(e.endCoordinates.height);
  }

  function onKeyboardDidHide() {
    setKeyboardHeight(0);
  }

  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      "keyboardDidShow",
      onKeyboardDidShow
    );
    const hideSubscription = Keyboard.addListener(
      "keyboardDidHide",
      onKeyboardDidHide
    );

    showSubscription.remove();
    hideSubscription.remove();
  }, []);

  return [keyboardHeight];
};

export const useTheme = () => {
  return theme;
};

export const useStaturBar = (style = "dark-content") => {
  useFocusEffect(() => {
    StatusBar.setBarStyle(style); // light-content

    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor(`rgba(0, 0, 0, 0)`);
      StatusBar.setTranslucent(true);
    }
  });
};
