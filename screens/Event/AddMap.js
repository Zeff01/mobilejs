import React from "react";
import MapView, { Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";

import { Block, Button, Text, Icon } from "../../components";
import { COLORS, SIZES } from "../../constants";

const Map = ({ onChange = () => {} }) => {
  const [position, setPosition] = React.useState({
    latitude: 34.037873,
    longitude: -118.242847,
  });

  React.useEffect(() => {
    onChange(position);
  }, [position]);

  return (
    <MapView
      style={{ ...StyleSheet.absoluteFillObject }}
      region={{
        // user location
        ...position,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      <Marker
        draggable
        coordinate={position}
        onDragEnd={(e) => setPosition(e.nativeEvent.coordinate)}
      >
        <Icon name="pin" color={COLORS.error} size={24} />
      </Marker>
    </MapView>
  );
};

const Success = () => {
  return (
    <Block white middle center>
      <Icon name="success" color={COLORS.success} size={94} />
      <Text h2 bold marginBottom marginTop={24}>
        Congratulations!
      </Text>
      <Text gray center marginHorizontal={SIZES.width / 5}>
        You added a new event! Now your friends and other people can join him
        via the application
      </Text>
    </Block>
  );
};

const AddMap = () => {
  const navigation = useNavigation();
  const [success, setSuccess] = React.useState(false);

  const handlePosition = React.useCallback((position) => {
    // log position changes
  });

  const handleCreate = React.useCallback(() => {
    // use/save position and create event
    if (!success) {
      setSuccess(true);
      navigation.setOptions({ headerShown: false });
    } else {
      navigation.navigate("Events");
    }
  });

  return (
    <>
      {!success && <Map onChange={(value) => handlePosition()} />}
      {success && <Success />}
      <Block
        noflex
        marginBottom={24}
        style={{
          bottom: 0,
          left: 24,
          right: 24,
          zIndex: 9999,
          position: "absolute",
        }}
      >
        <Button primary onPress={() => handleCreate()}>
          <Text title white bold center>
            {success ? "Done" : "Create event"}
          </Text>
        </Button>
      </Block>
    </>
  );
};

export default AddMap;
