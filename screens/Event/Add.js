import React from "react";
import dayjs from "dayjs";
import { Utils } from "expo-ui-kit";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DateTimePicker from "@react-native-community/datetimepicker";

import {
  Block,
  Button,
  Card,
  Input,
  Icon,
  Text,
  Modal,
} from "../../components";
import { COLORS } from "../../constants";

const INIT_ERRORS = {
  image: false,
  title: false,
  date: false,
  price: false,
  description: false,
};

const AddEvent = () => {
  const navigation = useNavigation();
  const dateRef = React.useRef();

  const [errors, setErrors] = React.useState(INIT_ERRORS);
  const [showDate, setShowDate] = React.useState(false);
  const [image, setImage] = React.useState(null);
  const [title, setTitle] = React.useState(null);
  const [date, setDate] = React.useState(dayjs());
  const [price, setPrice] = React.useState(null);
  const [description, setDescription] = React.useState(null);

  const handleImage = async () => {
    const permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled === true) {
      return;
    }

    setImage(pickerResult.uri);
  };

  const handleNext = React.useCallback(() => {
    // reset errors
    setErrors(INIT_ERRORS);
    // check for new errors based on their value lenght
    const newErrors = {
      image: !image?.length,
      date: !date,
      price: !price?.length,
      description: !description?.length,
    };
    const hasErrors = Object.values(newErrors).includes(true);
    if (hasErrors) {
      setErrors(newErrors);
    } else {
      navigation.navigate("NewEventMap");
    }
  }, [image, date, price, description]);

  return (
    <Block marginHorizontal={24}>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity activeOpacity={0.9} onPress={() => handleImage()}>
          <Card
            noflex
            center
            middle
            marginTop={32}
            color="transparent"
            overflow="hidden"
            style={{
              minHeight: 168,
              borderWidth: 2,
              borderColor: Utils.rgba(COLORS.gray, 0.2),
            }}
          >
            {image ? (
              <Image
                source={{ uri: image, height: 168 }}
                style={{ ...StyleSheet.absoluteFill }}
              />
            ) : (
              <>
                <Block
                  noflex
                  center
                  middle
                  radius={12}
                  width={48}
                  height={48}
                  marginTop={40}
                  marginBottom={8}
                  color={Utils.rgba(COLORS.gray, 0.2)}
                >
                  <Icon name="plus" color={COLORS.black} />
                </Block>
                <Text title semibold marginTop={16}>
                  Add photo
                </Text>
                <Block row center marginTop marginBottom={16}>
                  {errors.image && (
                    <>
                      <Icon name="closeCircle" color={COLORS.error} />
                      <Text small error marginLeft>
                        An image is Required
                      </Text>
                    </>
                  )}
                </Block>
              </>
            )}
          </Card>
        </TouchableOpacity>
        <Input
          multiline
          flex={false}
          value={title}
          style={styles.title}
          placeholder="Event title"
          onChangeText={(value) => setTitle(value)}
          placeholderTextColor={Utils.rgba(COLORS.black, 0.2)}
        />
        <Block row>
          <Block marginRight={16} marginBottom={16}>
            <Block noflex row space="between">
              <Text caption bold marginBottom={10}>
                DATE
              </Text>
              {errors.date && (
                <Text small error>
                  Required
                </Text>
              )}
            </Block>
            <Input
              internalRef={dateRef}
              placeholder="DD.MM.YYYY"
              placeholderTextColor={COLORS.gray}
              value={dayjs(date).format("DD.MM.YYYY")}
              style={[styles.input, errors.date && styles.error]}
              onFocus={() => setShowDate(true)}
            />
            <Modal
              isVisible={showDate}
              onModalHide={() => setShowDate(false)}
              onSwipeComplete={() => {
                setShowDate(false);
                dateRef.current.blur();
              }}
            >
              <Block noflex white>
                <DateTimePicker
                  is24Hour
                  mode="datetime"
                  display="default"
                  timeZoneOffsetInMinutes={0}
                  value={dayjs(date).toDate()}
                  onChange={(_, date) => setDate(dayjs(date))}
                />
              </Block>
            </Modal>
          </Block>
          <Block>
            <Block noflex row space="between">
              <Text caption bold marginBottom={10}>
                PRICE
              </Text>
              {errors.price && (
                <Text small error>
                  Required
                </Text>
              )}
            </Block>
            <Input
              value={price}
              placeholder="$00.00 (FREE)"
              keyboardType="numeric"
              placeholderTextColor={COLORS.gray}
              onChangeText={(value) => setPrice(value)}
              style={[styles.input, errors.price && styles.error]}
              validation={!errors.price}
              pattern="^[0-9]{1,}$"
            />
          </Block>
        </Block>
        <Block>
          <Block noflex row space="between">
            <Text caption bold marginBottom={10}>
              DESCRIPTION
            </Text>
            {errors.description && (
              <Text small error>
                Required
              </Text>
            )}
          </Block>
          <Input
            multiline
            value={description}
            textAlignVertical="top"
            placeholder="Example message..."
            placeholderTextColor={COLORS.gray}
            onChangeText={(value) => setDescription(value)}
            style={[styles.multiline, errors.description && styles.error]}
            validation={!errors.description}
            pattern="^.{3,}$"
          />
        </Block>
        <Button
          primary
          marginTop={40}
          marginBottom={16}
          onPress={() => handleNext()}
        >
          <Text title white bold center>
            Next step
          </Text>
        </Button>
      </KeyboardAwareScrollView>
    </Block>
  );
};

export default AddEvent;

const styles = StyleSheet.create({
  error: {
    borderColor: Utils.rgba(COLORS.error, 0.2),
  },
  input: {
    borderColor: Utils.rgba(COLORS.gray, 0.2),
    borderRadius: 4,
    borderWidth: 2,
    color: COLORS.gray,
    fontSize: 14,
    fontWeight: "500",
  },
  multiline: {
    borderColor: Utils.rgba(COLORS.gray, 0.2),
    borderRadius: 4,
    borderWidth: 2,
    color: COLORS.gray,
    fontSize: 14,
    fontWeight: "500",
    height: 122,
    paddingTop: 14,
  },
  title: {
    borderWidth: 0,
    color: COLORS.black,
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    marginLeft: 0,
    marginTop: 24,
    paddingLeft: 0,
  },
});
