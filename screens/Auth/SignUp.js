import React, { useCallback, useState } from "react";
import { Utils } from "expo-ui-kit";
import {
  StyleSheet,
  Image,
  ImageBackground,
  StatusBar,
  Alert,
} from "react-native";
import Constants from "expo-constants";
import axios from 'axios';


import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Block, Button, Card, Text, Input, Icon } from "../../components";
import { images, icons, COLORS, SIZES } from "../../constants";

import deviceSize from "../../utils/deviceSize";
import { useStaturBar } from "../../utils/hooks";



const {
  CHINGU_BASE_ENDPOINT,
} = Constants.expoConfig.extra;


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
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState()
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [validConfirmPassword, setValidConfirmPassword] = useState(false);

  useStaturBar("light-content");

  const isValidPassword = Boolean(password && password.length >= 8 && !validPassword);
  const isConfirmPasswordValid = Boolean(confirmPassword && confirmPassword.length >= 8 && !validConfirmPassword);


  const handleSignup = useCallback(async () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(`${CHINGU_BASE_ENDPOINT}/auth/register`, {
        firstName,
        lastName,
        email,
        password,
        username,
        lang: 'en',
        phone: '09210900799',
        country: 'PH',
        client: "mobileApp"
      });
      console.log("response:", response)
      // Handle response here. For example:
      if (response.status === 200) {
        Alert.alert("Success", "Registration successful", [
          { text: "OK", onPress: () => navigation.navigate("SignIn") },
        ]);
      } else {
        Alert.alert("Error", response.data.message);
      }
    } catch (error) {
      if (error.response) {
        console.log("Server Response:", error.response.data);
        Alert.alert("Error", error.response.data.message || "An error occurred");
      } else {
        Alert.alert("Network Error", "An error occurred during registration");
        console.error(error);
      }
    }
  }, [firstName, lastName, username, email, password, confirmPassword, navigation]);


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
              style={{ marginRight: 11, height: "auto" }}
              icon={
                <Icon
                  name="google"
                  color={COLORS.black}
                  style={{ marginVertical: 20 }}
                />
              }
            />
            <Button
              flex
              color='yellow'
              style={{ height: "auto" }}
              icon={
                <Icon
                  name="kakao"
                  color={COLORS.black}
                  style={{ marginVertical: 20 }}
                />
              }
            />
          </Block>

          <Text center gray caption margin={18}>
            Or connect with your email
          </Text>


          {/* FIRST NAME */}
          <Block noflex marginBottom={10}>
            <Text caption bold marginBottom={2}>
              First Name
            </Text>
            <Input
              style={styles.input}
              onChangeText={setFirstName}
            />
          </Block>
          {/* LAST NAME */}
          <Block noflex marginBottom={10}>
            <Text caption bold marginBottom={2}>
              Last Name
            </Text>
            <Input
              style={styles.input}
              onChangeText={setLastName}
            />
          </Block>
          {/* USERNAME */}
          <Block noflex marginBottom={10}>
            <Text caption bold marginBottom={2}>
              Username
            </Text>
            <Input
              style={styles.input}
              onChangeText={setUsername}
            />
          </Block>
          {/* EMAIL */}
          <Block noflex marginBottom={10}>
            <Block row space="between">
              <Text caption bold marginBottom={2}>
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
          {/* PASSWORD */}
          <Block noflex marginBottom={10}>
            <Block row space="between">
              <Text caption bold marginBottom={2}>
                PASSWORD
              </Text>
              {isValidPassword && (
                <Text caption error marginBottom={10}>
                  Your password should have 8 characters
                </Text>
              )}
            </Block>
            <Input
              value={password}
              secureTextEntry
              style={[styles.input, isValidPassword && styles.error]}
              onChangeText={(value) => setPassword(value)}
              onValidation={(isValid) => setValidPassword(isValid)}
              pattern="^.{8,}$" // At least 8 characters
            />

          </Block>
          {/* CONFIRMPASSWORD */}
          <Block noflex marginBottom={15}>
            <Block row space="between">
              <Text caption bold marginBottom={2}>
                CONFIRM PASSWORD
              </Text>
              {isConfirmPasswordValid && confirmPassword !== password && (
                <Text caption error marginBottom={10}>
                  Passwords do not match
                </Text>
              )}
              {isConfirmPasswordValid && confirmPassword.length < 8 && (
                <Text caption error marginBottom={10}>
                  Password should be at least 8 characters
                </Text>
              )}

            </Block>
            <Input
              value={confirmPassword}
              secureTextEntry
              style={[styles.input, isConfirmPasswordValid && confirmPassword !== password && styles.error]}
              onChangeText={(value) => {
                setConfirmPassword(value);
                setValidConfirmPassword(value.length >= 8);
              }}
              pattern="^.{8,}$" // At least 8 characters
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
