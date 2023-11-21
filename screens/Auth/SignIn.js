import React, { useCallback, useState } from "react";
import { StyleSheet, Image, ImageBackground, StatusBar } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Utils } from "expo-ui-kit";

import { Block, Card, Text, Input, Icon, Button } from "../../components";
import { icons, images, COLORS, SIZES } from "../../constants/";

import deviceSize from "../../utils/deviceSize";
import { useStaturBar } from "../../utils/hooks";

// Custom RATION
const RATION = {
  xlarge: 1.3,
  large: 0.95,
  normal: 1.05,
  small: 1.05,
  xsmall: 1.05,
};

const CONTAINER_HEIGHT = (558 * 100) / SIZES.height / RATION[deviceSize];

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  useStaturBar("light-content");

  const handleLogin = useCallback(() => {
    // login with email & password
    navigation.navigate("Home", { screen: "Dashboard" });
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
          <Block center middle color={Utils.rgba(COLORS.black, 0.2)}>
            <Image
              style={{ width: 77.38, height: 23.41 }}
              source={icons.logo}
            />
          </Block>
        </ImageBackground>

        <Card
          noflex
          radius={32}
          marginTop={-38}
          padding={[38, 28]}
          style={{ height: `${CONTAINER_HEIGHT}%` }}
        >
          <Text h2 bold>
            Welcome Back!
          </Text>
          <Text gray medium marginTop={10} marginBottom={28}>
            Login to continue
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
            <Block row space="between">
              <Text caption bold marginBottom={10}>
                EMAIL
              </Text>
              {Boolean(email && !validEmail) && (
                <Text caption error marginBottom={10}>
                  Incorrect email, try again
                </Text>
              )}
            </Block>
            <Input
              value={email}
              style={[
                styles.input,
                Boolean(email && !validEmail) && {
                  borderColor: Utils.rgba(COLORS.error, 0.2),
                },
              ]}
              validation={validEmail}
              keyboardType="email-address"
              onChangeText={(value) => setEmail(value)}
              onValidation={(isValid) => setValidEmail(isValid)}
              pattern='^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$'
            />
          </Block>
          <Block noflex marginBottom={18}>
            <Text caption bold marginBottom={10}>
              PASSWORD
            </Text>
            <Input
              secureTextEntry
              value={password}
              style={styles.input}
              onChangeText={(value) => setPassword(value)}
            />
          </Block>

          <Button onPress={() => handleLogin()}>
            <Text center bold white>
              Login
            </Text>
          </Button>
          <Button
            transparent
            onPress={() => navigation.navigate("ResetPassword")}
          >
            <Text center gray>
              Forgot Password?
            </Text>
          </Button>
          <Button
            outlined
            style={styles.button}
            color={Utils.rgba(COLORS.gray, 0.2)}
            onPress={() => navigation.navigate("SignUp")}
          >
            <Text center bold>
              Create an account
            </Text>
          </Button>
        </Card>
      </Block>
    </KeyboardAwareScrollView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  header: {
    flex: 0.7,
    height: "100%",
    width: "100%",
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
