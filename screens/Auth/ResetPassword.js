import React, { useCallback, useState } from "react";
import { Utils } from "expo-ui-kit";
import { StyleSheet, Image, ImageBackground, StatusBar } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { Block, Button, Card, Text, Input, Icon } from "../../components";
import { images, icons, COLORS, SIZES } from "../../constants";

import deviceSize from "../../utils/deviceSize";
import { useStaturBar } from "../../utils/hooks";

// Custom RATION
const RATION = {
  xlarge: 0.4,
  large: 0.45,
  normal: 0.5,
  small: 0.5,
  xsmall: 0.5,
};

const ResetPassword = ({ navigation }) => {
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);

  useStaturBar("light-content");

  const handleReset = useCallback(() => {
    if (step === "email") {
      setStep("password");
    }
    if (step === "password") {
      setStep("success");
    }
    if (step === "success") {
      navigation.navigate("SignIn");
    }
  }, [step]);

  return (
    <KeyboardAwareScrollView
      scrollToOverflowEnabled={false}
      contentContainerStyle={{ flex: 1 }}
      extraScrollHeight={SIZES.height * 0.1}
    >
      <Block>
        <StatusBar barStyle="light-content" />
        <ImageBackground style={styles.header} source={images.login}>
          <Block
            center
            middle
            marginBottom="2x"
            color={Utils.rgba(COLORS.black, 0.2)}
          >
            <Image style={{ width: 165, height: 50 }} source={icons.logo} />
          </Block>
        </ImageBackground>

        <Card
          radius={32}
          marginTop={-64}
          padding={[38, 28]}
          flex={RATION[deviceSize]}
        >
          <Text h2 bold>
            Password Recovery
          </Text>

          <Text gray medium marginTop={10}>
            {step === "email" && "Enter your email to recover your password"}
            {step === "password" && "You succesfully reset your password"}
            {step === "success" && "You succesfully reset your password"}
          </Text>

          {step === "email" && (
            <>
              <Text caption bold marginBottom={10} marginTop={28}>
                EMAIL
              </Text>
              <Input
                flex={false}
                value={email}
                style={styles.input}
                validation={validEmail}
                keyboardType="email-address"
                onChangeText={(value) => setEmail(value)}
                onValidation={(isValid) => setValidEmail(isValid)}
                pattern='^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$'
              />
            </>
          )}
          {step === "password" && (
            <>
              <Text caption bold marginBottom={10} marginTop={28}>
                PASSWORD
              </Text>
              <Input
                flex={false}
                secureTextEntry
                value={password}
                style={styles.input}
                validation={validPassword}
                onChangeText={(value) => setPassword(value)}
                onValidation={(isValid) => setValidPassword(isValid)}
                pattern="^.{9,}$"
              />
            </>
          )}
          {step === "success" && (
            <Block center middle>
              <Icon name="checkCircle" size={54} color={COLORS.success} />
            </Block>
          )}

          <Button flex={0} success onPress={() => handleReset()}>
            <Text center bold white>
              {step === "email" && "Send Email"}
              {step === "password" && "Reset my password"}
              {step === "success" && "Jump to login screen"}
            </Text>
          </Button>
        </Card>
      </Block>
    </KeyboardAwareScrollView>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
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
    height: 48,
    marginBottom: 18,
  },
});
