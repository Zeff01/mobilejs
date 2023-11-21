import React from "react";
import { Utils } from "expo-ui-kit";
import { StyleSheet, ScrollView, TouchableWithoutFeedback } from "react-native";

import { Block, Card, Button, Text, Icon, User } from "../../components/";
import { mock, COLORS } from "../../constants/";
import { useStaturBar } from "../../utils/hooks";

const SETTINGS = [
  {
    label: "Full Name",
    type: "name",
  },
  {
    label: "Username",
    type: "id",
  },
  {
    label: "Birth Date",
    type: "dob",
  },
  {
    label: "Mobile number",
    type: "phone",
  },
  {
    label: "Email address",
    type: "email",
  },
  {
    label: "Password",
    type: "password",
    caption: "Change your password",
  },
  {
    label: "Language",
    type: "location",
  },
  {
    label: "Avatar",
    type: "avatar",
    caption: "Upload your picture",
  },
];

const MyAccount = ({ navigation, user = mock.USER }) => {
  useStaturBar();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleAlign: "left",
      headerTitle: () => <User user={user} />,
    });
  }, [navigation]);

  const handleEdit = (type) => {
    navigation.navigate("EditAccount", {
      type,
      user,
    });
  };

  return (
    <Block paddingHorizontal={24}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 32 }}
      >
        {SETTINGS?.map((setting) => (
          <Card
            noflex
            radius={12}
            padding={18}
            marginBottom
            key={`settings-for-${setting?.type}`}
          >
            <TouchableWithoutFeedback onPress={() => handleEdit(setting?.type)}>
              <Block row center>
                <Block>
                  <Text title medium>
                    {setting?.label}
                  </Text>
                  <Text gray caption>
                    {setting?.caption ? setting.caption : user?.[setting?.type]}
                  </Text>
                </Block>
                <Button
                  transparent
                  style={styles.outlined}
                  icon={<Icon name="edit" color={COLORS.black} size={14} />}
                />
              </Block>
            </TouchableWithoutFeedback>
          </Card>
        ))}
      </ScrollView>
    </Block>
  );
};

export default MyAccount;

const styles = StyleSheet.create({
  outlined: {
    borderColor: Utils.rgba(COLORS.gray, 0.4),
    borderRadius: 8,
    borderWidth: 2,
    height: 28,
    width: 28,
  },
});
