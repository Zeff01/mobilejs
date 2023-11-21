import React from "react";

// navigation buttons
import BtnSearch from "../navigation/BtnSearch";
import BtnAdd from "../navigation/BtnAdd";
import BtnNotifications from "../navigation/BtnNotifications";
import BtnMessage from "../navigation/BtnMessage";
import BtnOptions from "../navigation/BtnOptions";
import BtnBack from "../navigation/BtnBack";

import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import CustomButton from "../navigation/CustomButton";

export const getHeaderTitle = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Home";

  switch (routeName) {
    case "Home":
      return "Home";
    case "Events":
      return "Events";
    case "Threads":
      return "Threads";
  }
};

export const getHeaderButtons = ({ route }) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Home";

  switch (routeName) {
    case "Home":
      return {
        headerShown: true,
        headerLeft: () => <BtnSearch />,
        headerRight: () => <BtnNotifications />,
      };
    case "Events":
      return {
        headerShown: true,
        headerLeft: () => <BtnSearch />,
        headerRight: () => <BtnAdd screen="NewEvent" />,
      };
    case "Threads":
      return {
        headerShown: true,
        headerLeft: () => <BtnSearch />,
        headerRight: () => <BtnMessage />,
      };
    case "MyProfile":
      return {
        headerShown: false,
        headerRight: () => <BtnOptions />,
      };
    case "NewPost":
      return {
        headerShown: false,
      };
    case "AiVideo":
      return {
        headerShown: true,
        headerLeft: () => (
          <>
            <CustomButton />
          </>
        ),
        headerRight: null,
        headerStyle: {
          backgroundColor: "#d1d5ed",
          height: 80,
        },
      };
  }
};
