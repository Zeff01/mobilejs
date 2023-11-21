import React from "react";
import { Utils } from "expo-ui-kit";
import { TouchableWithoutFeedback } from "react-native";

import { Block, Button, Text, Icon, User } from "../../components/";
import { mock, COLORS } from "../../constants/";
import { useStaturBar } from "../../utils/hooks";

const Settings = ({ navigation, user = mock.USER }) => {
  useStaturBar();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleAlign: "left",
      headerTitle: () => <User user={user} />,
    });
  }, [navigation]);

  return (
    <Block padding={[32, 24]}>
      <Text h2 black bold>
        Settings
      </Text>
      <Block marginTop={24}>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate("Account")}
        >
          <Block row center marginBottom={32}>
            <Button white icon={<Icon name="user" color={COLORS.black} />} />
            <Text title bold marginLeft={16}>
              My Account
            </Text>
          </Block>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate("Notifications")}
        >
          <Block row center marginBottom={32}>
            <Button
              transparent
              style={{
                borderColor: Utils.rgba(COLORS.gray, 0.4),
                borderWidth: 2,
              }}
              icon={<Icon name="notification" color={COLORS.black} />}
            />
            <Text title bold marginLeft={16}>
              Notifications
            </Text>
          </Block>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <Block row center marginBottom={32}>
            <Button
              transparent
              style={{
                borderColor: Utils.rgba(COLORS.gray, 0.4),
                borderWidth: 2,
              }}
              icon={<Icon name="currency" color={COLORS.black} />}
            />
            <Text title bold marginLeft={16}>
              Billing & Payment
            </Text>
          </Block>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <Block row center marginBottom={32}>
            <Button
              transparent
              style={{
                borderColor: Utils.rgba(COLORS.gray, 0.4),
                borderWidth: 2,
              }}
              icon={<Icon name="lock" color={COLORS.black} />}
            />
            <Text title bold marginLeft={16}>
              Security & Privacy
            </Text>
          </Block>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <Block row center marginBottom={32}>
            <Button
              transparent
              style={{
                borderColor: Utils.rgba(COLORS.gray, 0.4),
                borderWidth: 2,
              }}
              icon={<Icon name="help" color={COLORS.black} />}
            />
            <Text title bold marginLeft={16}>
              Help
            </Text>
          </Block>
        </TouchableWithoutFeedback>
      </Block>
    </Block>
  );
};

export default Settings;
