import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
    NavigationContainer,
    DefaultTheme,
    getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import { Utils } from "expo-ui-kit";



import useAuthStore from '../store/auth/authStore';
import BtnSearch from "./BtnSearch";
import BtnBack from "./BtnBack";
import BtnOptions from "./BtnOptions";
import BtnNotifications from "./BtnNotifications";


// Import your screens
import {
    SignIn,
    SignUp,
    ResetPassword,
    Search,
    Notifications,
    Comments,
    NewMessage,
    NewEvent,
    NewEventMap,
    Chat,
    Video,
    Friends,
    Account,
    User,
    Settings,
    EditAccount,
    NewStory,
    Home, Events, NewPost, Threads, MyProfile
} from "../screens/";
import AiVideo from "../screens/AiModules/AiVideo";
import AiModules from "../screens/AiModules/AiModulesHome";
// ... import other screens as needed


import hasNotch from '../utils/hasNotch';
import { COLORS } from '../constants';
import { Icon, Text } from "../components/";
import { getHeaderTitle, getHeaderButtons } from "../utils/helpers";
import useToken from '../hooks/useToken';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


const HEADER_HEIGHT = hasNotch() ? 122 : 96;
const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: COLORS.lightGray,
        border: "transparent",
        card: COLORS.white,
    },
};

const tabOptions = {
    showLabel: false,
    activeBackgroundColor: COLORS.white,
    inactiveBackgroundColor: Utils.rgba(COLORS.gray, 0.2),
    style: {
        backgroundColor: COLORS.primary,
        height: hasNotch() ? 122 : 96,
        borderTopRightRadius: 32,
        borderTopLeftRadius: 32,
        alignItems: "center",
        paddingTop: 25,
        // shadow
        shadowRadius: 5,
        shadowOpacity: 0.15,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 0 },
        elevation: 6,
    },
    tabStyle: {
        borderRadius: 12,
        maxHeight: 38,
        minHeight: 38,
        maxWidth: 38,
        marginHorizontal: 16,
    },
};

const authOptions = {
    headerShown: false,
    gestureEnabled: false,
    cardStyle: { backgroundColor: COLORS.white },
};

const screenOptions = {
    gestureEnabled: false,
    headerStyle: {
        height: HEADER_HEIGHT,
        shadowRadius: 5,
        shadowOpacity: 0.15,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 0 },
        elevation: 1,
    },
    headerTitle: ({ children }) => (
        <Text center bold caption transform="uppercase">
            {children}
        </Text>
    ),
    headerRight: () => <BtnOptions />,
};


const tabsOptions = ({ route }) => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? "DefaultRouteName";

    return {
        title: routeName,
        gestureEnabled: false,
        headerStyle: {
            height: HEADER_HEIGHT,
            shadowRadius: 5,
            shadowOpacity: 0.15,
            shadowColor: COLORS.black,
            shadowOffset: { width: 0, height: 0 },
            elevation: 1,
        },
        headerTitle: ({ children }) => (
            <Text center bold caption transform="uppercase">
                {children}
            </Text>
        ),
        headerLeft: () => <BtnSearch />,
        headerRight: () => <BtnNotifications />,
    };
};

function getActiveRouteName(state) {
    const route = state.routes[state.index];

    // Dive into nested navigators
    if (route.state) {
        return getActiveRouteName(route.state);
    }

    return route.name;
}

// Tabs Navigator
const Tabs = ({ navigation, route }) => {
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: (
                <Text center bold caption transform="uppercase">
                    {getHeaderTitle(route)}
                </Text>
            ),
            ...getHeaderButtons({ navigation, route }),
        });
    }, [navigation, route]);

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) => {
                    const tintColor = focused ? COLORS.primary : COLORS.white;
                    switch (route.name) {
                        case "Home":
                            return (
                                <Icon name="home" color={tintColor} resizeMode="contain" />
                            );

                        case "Events":
                            return (
                                <Icon name="calendar" color={tintColor} resizeMode="contain" />
                            );

                        case "NewPost":
                            return (
                                <Icon name="addPost" color={tintColor} resizeMode="contain" />
                            );

                        case "Threads":
                            return (
                                <Icon name="message" color={tintColor} resizeMode="contain" />
                            );

                        case "MyProfile":
                            return (
                                <Icon name="user" color={tintColor} resizeMode="contain" />
                            );
                        case "AiModules":
                            return (
                                <Icon name="user" color={tintColor} resizeMode="contain" />
                            );
                    }
                },
                tabBarVisible: route.name !== "AiVideo",
            })}
            tabBarOptions={tabOptions}
        >
            <Tab.Screen name="Threads" component={Threads} />
            <Tab.Screen name="AiModules" component={AiModules} />
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Events" component={Events} />
            <Tab.Screen
                name="NewPost"
                component={NewPost}
                options={{ style: { shadowOpacity: 0 } }}
            />

            <Tab.Screen name="MyProfile" component={MyProfile} />
        </Tab.Navigator>
    );
};


// Main App Stack Navigator
const MainAppStack = () => (
    <Stack.Navigator>
        <Stack.Screen name="Home" component={Tabs} options={tabsOptions} />

        <Stack.Screen
            name="Notifications"
            component={Notifications}
            options={(props) => ({
                ...screenOptions,
                ...props,
                headerRight: null,
                headerLeft: ({ onPress }) => (
                    <BtnBack onPress={(event) => onPress(event)} />
                ),
            })}
        />
        <Stack.Screen
            name="Friends"
            component={Friends}
            options={(props) => ({
                headerLeft: ({ onPress }) => (
                    <BtnBack onPress={(event) => onPress(event)} />
                ),
                ...screenOptions,
                ...props,
            })}
        />
        <Stack.Screen
            name="Settings"
            component={Settings}
            options={(props) => ({
                ...screenOptions,
                ...props,
                headerRight: () => (
                    <BtnOptions color="transparent" iconColor={COLORS.gray} />
                ),
                headerLeft: ({ onPress }) => (
                    <BtnBack onPress={(event) => onPress(event)} />
                ),
            })}
        />
        <Stack.Screen
            name="Account"
            component={Account}
            options={(props) => ({
                ...screenOptions,
                ...props,
                headerRight: () => (
                    <BtnOptions color="transparent" iconColor={COLORS.gray} />
                ),
                headerLeft: ({ onPress }) => (
                    <BtnBack onPress={(event) => onPress(event)} />
                ),
            })}
        />
        <Stack.Screen
            name="User"
            component={User}
            options={{
                headerStyle: { height: HEADER_HEIGHT },
                headerRight: () => <BtnOptions iconColor={COLORS.black} />,
                headerLeft: ({ onPress }) => {
                    return <BtnBack black onPress={(event) => onPress(event)} />;
                },
            }}
        />
        <Stack.Screen
            name="Search"
            component={Search}
            options={(props) => ({
                ...screenOptions,
                ...props,
                headerRight: null,
                headerLeft: ({ onPress }) => (
                    <BtnBack onPress={(event) => onPress(event)} />
                ),
            })}
        />
        <Stack.Screen
            name="Comments"
            component={Comments}
            options={(props) => ({
                ...screenOptions,
                ...props,
                headerRight: null,
                headerLeft: ({ onPress }) => (
                    <BtnBack onPress={(event) => onPress(event)} />
                ),
            })}
        />
        <Stack.Screen
            name="NewEvent"
            component={NewEvent}
            options={(props) => ({
                ...screenOptions,
                ...props,
                title: "Add Event",
                headerRight: null,
                headerLeft: ({ onPress }) => (
                    <BtnBack onPress={(event) => onPress(event)} />
                ),
            })}
        />
        <Stack.Screen
            name="NewEventMap"
            component={NewEventMap}
            options={(props) => ({
                ...screenOptions,
                ...props,
                title: "Add Location Pin",
                headerRight: null,
                headerLeft: ({ onPress }) => (
                    <BtnBack onPress={(event) => onPress(event)} />
                ),
            })}
        />
        <Stack.Screen
            name="NewMessage"
            component={NewMessage}
            options={(props) => ({
                ...screenOptions,
                ...props,
                headerRight: null,
                headerLeft: ({ onPress }) => (
                    <BtnBack onPress={(event) => onPress(event)} />
                ),
            })}
        />
        <Stack.Screen
            name="Chat"
            component={Chat}
            options={(props) => ({
                ...screenOptions,
                ...props,
                headerStyle: {
                    ...screenOptions.headerStyle,
                    backgroundColor: COLORS.black,
                },
                headerRight: () => (
                    <Button
                        flex
                        style={{ height: 48, padding: 10, margin: 10, width: 40 }}
                        color={Utils.rgba(COLORS.gray, 0.6)}
                        onPress={() => props?.navigation?.navigate("AiVideo")}
                        icon={<Icon name="video" color={COLORS.white} />}
                    />
                ),
                headerLeft: () => (
                    <BtnBack
                        white
                        onPress={() => props?.navigation?.navigate("Threads")}
                    />
                ),
            })}
        />
        <Stack.Screen
            name="Video"
            component={Video}
            options={(props) => ({
                ...screenOptions,
                ...props,
                title: null,
                headerTransparent: true,
                headerRight: null,
                headerLeft: ({ onPress }) => (
                    <BtnBack onPress={(event) => onPress(event)} />
                ),
            })}
        />
        <Stack.Screen
            name="EditAccount"
            component={EditAccount}
            options={(props) => ({
                ...screenOptions,
                ...props,
                title: null,
                headerRight: null,
                headerLeft: ({ onPress }) => (
                    <BtnBack onPress={(event) => onPress(event)} />
                ),
            })}
        />
        <Stack.Screen
            name="NewStory"
            component={NewStory}
            options={(props) => ({
                ...props,
                headerShown: false,
            })}
        />
        <Stack.Screen
            name="AiVideo"
            component={AiVideo}
            options={(props) => ({
                ...props,
                // headerShown: false,
            })}
        />
    </Stack.Navigator>
);

// Auth Stack Navigator
const AuthStack = () => (
    <Stack.Navigator screenOptions={authOptions}>
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
    </Stack.Navigator>
);


const ConditionalScreens = ({ token }) => {
    if (token) {
        return (
            <>
                {/* MainApp Screens */}
                <Stack.Screen name="Home" component={Tabs} options={tabsOptions} />

                <Stack.Screen
                    name="Notifications"
                    component={Notifications}
                    options={(props) => ({
                        ...screenOptions,
                        ...props,
                        headerRight: null,
                        headerLeft: ({ onPress }) => (
                            <BtnBack onPress={(event) => onPress(event)} />
                        ),
                    })}
                />
                <Stack.Screen
                    name="Friends"
                    component={Friends}
                    options={(props) => ({
                        headerLeft: ({ onPress }) => (
                            <BtnBack onPress={(event) => onPress(event)} />
                        ),
                        ...screenOptions,
                        ...props,
                    })}
                />
                <Stack.Screen
                    name="Settings"
                    component={Settings}
                    options={(props) => ({
                        ...screenOptions,
                        ...props,
                        headerRight: () => (
                            <BtnOptions color="transparent" iconColor={COLORS.gray} />
                        ),
                        headerLeft: ({ onPress }) => (
                            <BtnBack onPress={(event) => onPress(event)} />
                        ),
                    })}
                />
                <Stack.Screen
                    name="Account"
                    component={Account}
                    options={(props) => ({
                        ...screenOptions,
                        ...props,
                        headerRight: () => (
                            <BtnOptions color="transparent" iconColor={COLORS.gray} />
                        ),
                        headerLeft: ({ onPress }) => (
                            <BtnBack onPress={(event) => onPress(event)} />
                        ),
                    })}
                />
                <Stack.Screen
                    name="User"
                    component={User}
                    options={{
                        headerStyle: { height: HEADER_HEIGHT },
                        headerRight: () => <BtnOptions iconColor={COLORS.black} />,
                        headerLeft: ({ onPress }) => {
                            return <BtnBack black onPress={(event) => onPress(event)} />;
                        },
                    }}
                />
                <Stack.Screen
                    name="Search"
                    component={Search}
                    options={(props) => ({
                        ...screenOptions,
                        ...props,
                        headerRight: null,
                        headerLeft: ({ onPress }) => (
                            <BtnBack onPress={(event) => onPress(event)} />
                        ),
                    })}
                />
                <Stack.Screen
                    name="Comments"
                    component={Comments}
                    options={(props) => ({
                        ...screenOptions,
                        ...props,
                        headerRight: null,
                        headerLeft: ({ onPress }) => (
                            <BtnBack onPress={(event) => onPress(event)} />
                        ),
                    })}
                />
                <Stack.Screen
                    name="NewEvent"
                    component={NewEvent}
                    options={(props) => ({
                        ...screenOptions,
                        ...props,
                        title: "Add Event",
                        headerRight: null,
                        headerLeft: ({ onPress }) => (
                            <BtnBack onPress={(event) => onPress(event)} />
                        ),
                    })}
                />
                <Stack.Screen
                    name="NewEventMap"
                    component={NewEventMap}
                    options={(props) => ({
                        ...screenOptions,
                        ...props,
                        title: "Add Location Pin",
                        headerRight: null,
                        headerLeft: ({ onPress }) => (
                            <BtnBack onPress={(event) => onPress(event)} />
                        ),
                    })}
                />
                <Stack.Screen
                    name="NewMessage"
                    component={NewMessage}
                    options={(props) => ({
                        ...screenOptions,
                        ...props,
                        headerRight: null,
                        headerLeft: ({ onPress }) => (
                            <BtnBack onPress={(event) => onPress(event)} />
                        ),
                    })}
                />
                <Stack.Screen
                    name="Chat"
                    component={Chat}
                    options={(props) => ({
                        ...screenOptions,
                        ...props,
                        headerStyle: {
                            ...screenOptions.headerStyle,
                            backgroundColor: COLORS.black,
                        },
                        headerRight: () => (
                            <Button
                                flex
                                style={{ height: 48, padding: 10, margin: 10, width: 40 }}
                                color={Utils.rgba(COLORS.gray, 0.6)}
                                onPress={() => props?.navigation?.navigate("AiVideo")}
                                icon={<Icon name="video" color={COLORS.white} />}
                            />
                        ),
                        headerLeft: () => (
                            <BtnBack
                                white
                                onPress={() => props?.navigation?.navigate("Threads")}
                            />
                        ),
                    })}
                />
                <Stack.Screen
                    name="Video"
                    component={Video}
                    options={(props) => ({
                        ...screenOptions,
                        ...props,
                        title: null,
                        headerTransparent: true,
                        headerRight: null,
                        headerLeft: ({ onPress }) => (
                            <BtnBack onPress={(event) => onPress(event)} />
                        ),
                    })}
                />
                <Stack.Screen
                    name="EditAccount"
                    component={EditAccount}
                    options={(props) => ({
                        ...screenOptions,
                        ...props,
                        title: null,
                        headerRight: null,
                        headerLeft: ({ onPress }) => (
                            <BtnBack onPress={(event) => onPress(event)} />
                        ),
                    })}
                />
                <Stack.Screen
                    name="NewStory"
                    component={NewStory}
                    options={(props) => ({
                        ...props,
                        headerShown: false,
                    })}
                />
                <Stack.Screen
                    name="AiVideo"
                    component={AiVideo}
                    options={(props) => ({
                        ...props,
                        // headerShown: false,
                    })}
                />
            </>
        );
    } else {
        return (
            <>
                {/* Auth Screens */}
                <Stack.Screen name="SignIn" component={SignIn} />
                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen name="ResetPassword" component={ResetPassword} />
                {/* ... other Auth screens ... */}
            </>
        );
    }
};

// Main Navigation Container
export default function Navigation() {
    const token = useAuthStore((state) => state.token);
    console.log("token from zustand @ navigation:", token)
    // const { initializeToken } = useAuthStore();
    // const { token, deleteToken } = useToken()


    // useEffect(() => {
    //     initializeToken();
    // }, []);


    // useEffect(() => {
    //     if (token) {
    //         // User just signed in
    //         navigationRef.current?.reset({
    //             index: 0,
    //             routes: [{ name: 'Home' }],
    //         });
    //     } else {
    //         // User just signed out
    //         navigationRef.current?.reset({
    //             index: 0,
    //             routes: [{ name: 'SignIn' }],
    //         });
    //     }
    // }, [token]);


    const isSignedIn = Boolean(token);
    console.log("isSignedIn-", isSignedIn)

    const navigationRef = React.useRef();
    const routeNameRef = React.useRef();



    return (
        <NavigationContainer
            theme={theme}
            ref={navigationRef}
            onReady={() => {
                routeNameRef.current = navigationRef.current.getCurrentRoute().name;
            }}
            onStateChange={() => {
                const previousRouteName = routeNameRef.current;
                const currentRouteName = getActiveRouteName(navigationRef.current.getRootState());

                if (previousRouteName !== currentRouteName) {
                    console.log("Current screen:", currentRouteName);
                }

                // Save the current route name for later comparision
                routeNameRef.current = currentRouteName;
            }}
        >
            <Stack.Navigator>
                {isSignedIn ? (
                    <>
                        {/* MainApp Screens */}
                        <Stack.Screen name="Home" component={Tabs} options={tabsOptions} />

                        <Stack.Screen
                            name="Notifications"
                            component={Notifications}
                            options={(props) => ({
                                ...screenOptions,
                                ...props,
                                headerRight: null,
                                headerLeft: ({ onPress }) => (
                                    <BtnBack onPress={(event) => onPress(event)} />
                                ),
                            })}
                        />
                        <Stack.Screen
                            name="Friends"
                            component={Friends}
                            options={(props) => ({
                                headerLeft: ({ onPress }) => (
                                    <BtnBack onPress={(event) => onPress(event)} />
                                ),
                                ...screenOptions,
                                ...props,
                            })}
                        />
                        <Stack.Screen
                            name="Settings"
                            component={Settings}
                            options={(props) => ({
                                ...screenOptions,
                                ...props,
                                headerRight: () => (
                                    <BtnOptions color="transparent" iconColor={COLORS.gray} />
                                ),
                                headerLeft: ({ onPress }) => (
                                    <BtnBack onPress={(event) => onPress(event)} />
                                ),
                            })}
                        />
                        <Stack.Screen
                            name="Account"
                            component={Account}
                            options={(props) => ({
                                ...screenOptions,
                                ...props,
                                headerRight: () => (
                                    <BtnOptions color="transparent" iconColor={COLORS.gray} />
                                ),
                                headerLeft: ({ onPress }) => (
                                    <BtnBack onPress={(event) => onPress(event)} />
                                ),
                            })}
                        />
                        <Stack.Screen
                            name="User"
                            component={User}
                            options={{
                                headerStyle: { height: HEADER_HEIGHT },
                                headerRight: () => <BtnOptions iconColor={COLORS.black} />,
                                headerLeft: ({ onPress }) => {
                                    return <BtnBack black onPress={(event) => onPress(event)} />;
                                },
                            }}
                        />
                        <Stack.Screen
                            name="Search"
                            component={Search}
                            options={(props) => ({
                                ...screenOptions,
                                ...props,
                                headerRight: null,
                                headerLeft: ({ onPress }) => (
                                    <BtnBack onPress={(event) => onPress(event)} />
                                ),
                            })}
                        />
                        <Stack.Screen
                            name="Comments"
                            component={Comments}
                            options={(props) => ({
                                ...screenOptions,
                                ...props,
                                headerRight: null,
                                headerLeft: ({ onPress }) => (
                                    <BtnBack onPress={(event) => onPress(event)} />
                                ),
                            })}
                        />
                        <Stack.Screen
                            name="NewEvent"
                            component={NewEvent}
                            options={(props) => ({
                                ...screenOptions,
                                ...props,
                                title: "Add Event",
                                headerRight: null,
                                headerLeft: ({ onPress }) => (
                                    <BtnBack onPress={(event) => onPress(event)} />
                                ),
                            })}
                        />
                        <Stack.Screen
                            name="NewEventMap"
                            component={NewEventMap}
                            options={(props) => ({
                                ...screenOptions,
                                ...props,
                                title: "Add Location Pin",
                                headerRight: null,
                                headerLeft: ({ onPress }) => (
                                    <BtnBack onPress={(event) => onPress(event)} />
                                ),
                            })}
                        />
                        <Stack.Screen
                            name="NewMessage"
                            component={NewMessage}
                            options={(props) => ({
                                ...screenOptions,
                                ...props,
                                headerRight: null,
                                headerLeft: ({ onPress }) => (
                                    <BtnBack onPress={(event) => onPress(event)} />
                                ),
                            })}
                        />
                        <Stack.Screen
                            name="Chat"
                            component={Chat}
                            options={(props) => ({
                                ...screenOptions,
                                ...props,
                                headerStyle: {
                                    ...screenOptions.headerStyle,
                                    backgroundColor: COLORS.black,
                                },
                                headerRight: () => (
                                    <Button
                                        flex
                                        style={{ height: 48, padding: 10, margin: 10, width: 40 }}
                                        color={Utils.rgba(COLORS.gray, 0.6)}
                                        onPress={() => props?.navigation?.navigate("AiVideo")}
                                        icon={<Icon name="video" color={COLORS.white} />}
                                    />
                                ),
                                headerLeft: () => (
                                    <BtnBack
                                        white
                                        onPress={() => props?.navigation?.navigate("Threads")}
                                    />
                                ),
                            })}
                        />
                        <Stack.Screen
                            name="Video"
                            component={Video}
                            options={(props) => ({
                                ...screenOptions,
                                ...props,
                                title: null,
                                headerTransparent: true,
                                headerRight: null,
                                headerLeft: ({ onPress }) => (
                                    <BtnBack onPress={(event) => onPress(event)} />
                                ),
                            })}
                        />
                        <Stack.Screen
                            name="EditAccount"
                            component={EditAccount}
                            options={(props) => ({
                                ...screenOptions,
                                ...props,
                                title: null,
                                headerRight: null,
                                headerLeft: ({ onPress }) => (
                                    <BtnBack onPress={(event) => onPress(event)} />
                                ),
                            })}
                        />
                        <Stack.Screen
                            name="NewStory"
                            component={NewStory}
                            options={(props) => ({
                                ...props,
                                headerShown: false,
                            })}
                        />
                        <Stack.Screen
                            name="AiVideo"
                            component={AiVideo}
                            options={(props) => ({
                                ...props,
                                // headerShown: false,
                            })}
                        />
                    </>
                ) : (
                    <>
                        {/* Auth Screens */}
                        <Stack.Screen name="SignIn" component={SignIn} />
                        <Stack.Screen name="SignUp" component={SignUp} />
                        <Stack.Screen name="ResetPassword" component={ResetPassword} />
                        {/* ... other Auth screens ... */}
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
