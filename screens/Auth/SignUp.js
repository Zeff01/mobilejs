import React, { useCallback, useState } from "react";
import { Utils } from "expo-ui-kit";
import {
  StyleSheet,
  Image,
  ImageBackground,
  StatusBar,
  Alert,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Block, Button, Card, Text, Input, Icon } from "../../components";
import { images, icons, COLORS, SIZES } from "../../constants";

import deviceSize from "../../utils/deviceSize";
import { useStaturBar } from "../../utils/hooks";

// Custom RATION
const RATION = {
  xlarge: 0.9,
  large: 0.85,
  normal: 0.85,
  small: 0.85,
  xsmall: 0.85,
};
const CONTAINER_HEIGHT = (558 * 100) / SIZES.height / RATION[deviceSize];

const SignUp = ({ navigation }) => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);

  useStaturBar("light-content");

  const isValidPassword = Boolean(password && !validPassword);

  const handleSignup = useCallback(() => {
    // register with name, email & password
    Alert.alert(
      "Thank you!",
      `Your information: ${name}, ${email} & ${password}`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "OK", onPress: () => navigation.navigate("SignIn") },
      ],
      { cancelable: false }
    );
  });

  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      extraScrollHeight={SIZES.height * 0.2}
      contentContainerStyle={{ paddingBottom: 68 }}
    >
      <Block>
        <StatusBar barStyle="light-content" />
        <ImageBackground style={styles.header} source={images.login}>
          <Block
            center
            middle
            marginBottom="4x"
            color={Utils.rgba(COLORS.black, 0.2)}
          >
            <Image
              style={{ width: 77.38, height: 23.41 }}
              source={icons.logo}
            />
          </Block>
        </ImageBackground>
        <Card
          noflex
          radius={32}
          marginTop={-64}
          padding={[38, 28]}
          style={{ height: `${CONTAINER_HEIGHT}%` }}
        >
          <Text h2 bold>
            Create an account
          </Text>
          <Text gray medium marginTop={10} marginBottom={38}>
            Sign up to continue
          </Text>

          <Block row space="between">
            <Button
              flex
              color={COLORS.facebook}
              style={{ marginRight: 11, height: "auto" }}
              icon={
                <Icon
                  name="facebook"
                  color={COLORS.white}
                  style={{ marginVertical: 20 }}
                />
              }
            />
            <Button
              flex
              color={COLORS.black}
              style={{ marginRight: 11, height: "auto" }}
              icon={
                <Icon
                  name="apple"
                  color={COLORS.white}
                  style={{ marginVertical: 20 }}
                />
              }
            />
            <Button
              flex
              outlined
              color={COLORS.gray}
              style={{ height: "auto" }}
              icon={
                <Icon
                  name="google"
                  color={COLORS.black}
                  style={{ marginVertical: 20 }}
                />
              }
            />
          </Block>

          <Text center gray caption margin={18}>
            Or connect with your email
          </Text>

          <Block noflex marginBottom={18}>
            <Text caption bold marginBottom={10}>
              NAME
            </Text>
            <Input
              style={styles.input}
              onChangeText={(value) => setName(value)}
            />
          </Block>
          <Block noflex marginBottom={18}>
            <Block row space="between">
              <Text caption bold marginBottom={10}>
                EMAIL
              </Text>
              {Boolean(email && !validEmail) && (
                <Text caption error marginBottom={10}>
                  This email is already taken
                </Text>
              )}
            </Block>
            <Input
              value={email}
              style={[
                styles.input,
                Boolean(email && !validEmail) && styles.error,
              ]}
              validation={validEmail}
              keyboardType="email-address"
              onChangeText={(value) => setEmail(value)}
              onValidation={(isValid) => setValidEmail(isValid)}
              pattern='^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$'
            />
          </Block>
          <Block noflex marginBottom={18}>
            <Block row space="between">
              <Text caption bold marginBottom={10}>
                PASSWORD
              </Text>
              {isValidPassword && (
                <Text caption error marginBottom={10}>
                  Your password should have 9 characters
                </Text>
              )}
            </Block>
            <Input
              value={password}
              secureTextEntry
              style={[styles.input, isValidPassword && styles.error]}
              onChangeText={(value) => setPassword(value)}
              onValidation={(isValid) => setValidPassword(isValid)}
              pattern="^.{9,}$"
            />
          </Block>

          <Button secondary onPress={() => handleSignup()}>
            <Text white center bold>
              Create an account
            </Text>
          </Button>
          <Button transparent onPress={() => navigation.navigate("SignIn")}>
            <Text center gray>
              Already have an account? Login
            </Text>
          </Button>
        </Card>
      </Block>
    </KeyboardAwareScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  error: {
    borderColor: Utils.rgba(COLORS.error, 0.2),
  },
  header: {
    flex: 1,
  },
  input: {
    borderColor: Utils.rgba(COLORS.gray, 0.2),
    borderRadius: 4,
    borderWidth: 2,
    color: COLORS.gray,
    fontSize: 14,
    fontWeight: "500",
  },
});
