import React from "react";
import { Utils } from "expo-ui-kit";
import { Keyboard, StyleSheet } from "react-native";
import { KeyboardAccessoryView } from "react-native-keyboard-accessory";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { Block, Button, Text, Input } from "../../components/";
import { mock, COLORS } from "../../constants/";
import { useStaturBar } from "../../utils/hooks";

const TITLES = {
  name: "Full Name change",
  id: "Username change",
  dob: "Birth date change",
  phone: "Mobile number change",
  email: "E-mail address change",
  password: "Password change",
  location: "Language change",
  avatar: "Avatar change",
};

const INFO = {
  name: "You can change your name only once",
  id: "Alternative option to signin on Social app",
  dob: "Your Date or Birth will personalise your feed",
  phone: "A phone numbers add extra security to your account",
  email:
    "A verified email address allows you to recover your account and find your friends on Social app",
  password:
    "You can change your password at any time, you must have a verified email",
  location: "Set up your language preferences based on your location",
  avatar: null,
};

const EditAccount = ({ navigation, route, user = mock.USER }) => {
  const [confirmPassword, setPassword] = React.useState(null);
  const { type } = route.params;
  const value = user?.[type];

  useStaturBar();

  React.useLayoutEffect(() => {
    navigation.setOptions({ title: TITLES?.[type] });
  }, [navigation]);

  const handleSave = () => {
    Keyboard.dismiss();
    navigation.goBack();
  };

  return (
    <Block padding={24}>
      <Block>
        {INFO?.[type] && (
          <Text title center medium marginHorizontal={18} marginBottom={24}>
            {INFO?.[type]}
          </Text>
        )}
        <KeyboardAwareScrollView>
          <Input
            flex={false}
            defaultValue={value}
            style={styles.input}
            secureTextEntry={type === "password"}
          />
          {type === "password" && (
            <Input
              flex={false}
              style={styles.input}
              defaultValue={confirmPassword}
              onChangeText={(value) => setPassword(value)}
              secureTextEntry={type === "password"}
            />
          )}
        </KeyboardAwareScrollView>
      </Block>
      <KeyboardAccessoryView
        hideBorder
        style={{ backgroundColor: "transparent" }}
      >
        <Button onPress={() => handleSave()}>
          <Text title bold white center>
            Save changes
          </Text>
        </Button>
      </KeyboardAccessoryView>
    </Block>
  );
};

export default EditAccount;

const styles = StyleSheet.create({
  input: {
    borderColor: Utils.rgba(COLORS.gray, 0.2),
    borderRadius: 4,
    borderWidth: 2,
    color: COLORS.gray,
    marginBottom: 16,
    padding: 14,
  },
});
