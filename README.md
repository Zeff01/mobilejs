#### 1. How to use

Our React Native **Social Dashboard App** and components are easy to use in order to configure it on your own and get it ready for production.

Make sure you have **npm/yarn** installed. After you've installed any of those, install expo by writing the following in your terminal console: `npm install -g expo-cli` (or `yarn global add expo-cli`, whichever you prefer).

Now you're all set up. Navigate your way into the project's directory and write npm install or yarn install. This will install all dependencies that **Social Dashboard App** needs in order to function properly.

To run directly to a simulator (iOS/Android) just run `npm run ios` or `npm run android`. Open up your favorite text editor/IDE and an Android/iOS simulator.

### 2. Project packages

These are the main **dependencies** used inside **Social Dashboard App**:

```json
"@react-native-community/datetimepicker": "^2.3.2",
"@react-native-community/masked-view": "^0.1.9",
"@react-navigation/bottom-tabs": "^5.2.6",
"@react-navigation/native": "^5.1.5",
"@react-navigation/stack": "^5.2.10",
"dayjs": "^1.8.24",
"expo": "^37.0.0",
"expo-av": "~8.1.0",
"expo-camera": "~8.2.0",
"expo-device": "~2.1.0",
"expo-haptics": "~8.1.0",
"expo-image-picker": "~8.1.0",
"expo-ui-kit": "^0.1.0",
"react": "16.9.0",
"react-native": "https://github.com/expo/react-native/archive/sdk-37.0.0.tar.gz",
"react-native-gesture-handler": "~1.6.0",
"react-native-keyboard-accessory": "^0.1.10",
"react-native-keyboard-aware-scroll-view": "^0.9.1",
"react-native-maps": "^0.27.1",
"react-native-modal": "^11.5.6",
"react-native-reanimated": "^1.8.0",
"react-native-safe-area-context": "0.7.3",
"react-native-screens": "^2.5.0",
"react-native-svg": "^12.1.0"
```

For **development dependencies** we used the following:

```json
"@babel/core": "^7.9.0",
"@typescript-eslint/eslint-plugin": "^2.28.0",
"@typescript-eslint/parser": "^2.28.0",
"babel-preset-expo": "^8.1.0",
"eslint": "^6.8.0",
"eslint-config-universe": "^3.0.0",
"eslint-plugin-react-native": "^3.8.1",
"prettier": "^2.0.4",
"typescript": "^3.8.3"
```

For **code quality checks** we used **eslint**, and to check the project for any errors or warning run the following command: `npm run lint`

##### Side notes:

The project code is based on the latest **Expo SDK** version **37** (expo.io), easy to maintain and update. A bonus part is that the project can be ejected to React-Native project and implement non-expo modules.

##### Limitations:

- **Android** is not supported at this moment
- **Modal component**: vertical draggable is not fully supported

### 3. Project structure

```
.
├── App.js
├── app.json
├── assets
│   ├── audios
│   ├── background
│   ├── icons
│   ├── users
│   └── videos
├── components
│   ├── Block.js
│   ├── Button.js
│   ├── Card.js
│   ├── Dropdown.js
│   ├── Icon.js
│   ├── Input.js
│   ├── Modal.js
│   ├── Overlay.js
│   ├── Story.js
│   ├── Text.js
│   └── User.js
├── constants
│   ├── audios.js
│   ├── icons.js
│   ├── images.js
│   ├── mock.js
│   ├── theme.js
│   └── videos.js
├── navigation
│   ├── BtnAdd.js
│   ├── BtnBack.js
│   ├── BtnMessage.js
│   ├── BtnNotifications.js
│   ├── BtnOptions.js
│   ├── BtnSearch.js
│   └── tabs.js
├── package.json
├── screens
│   ├── Auth
│   │   ├── ResetPassword.js
│   │   ├── SignIn.js
│   │   └── SignUp.js
│   ├── Comments.js
│   ├── Event
│   │   ├── Add.js
│   │   └── AddMap.js
│   ├── Events.js
│   ├── Home.js
│   ├── Threads
│   │   ├── Chat.js
│   │   ├── List.js
│   │   ├── NewMessage.js
│   │   └── Video.js
│   ├── NewPost.js
│   ├── NewStory.js
│   ├── Notifications.js
│   ├── Profile
│   │   ├── Account.js
│   │   ├── Edit.js
│   │   ├── Friends.js
│   │   ├── MyProfile.js
│   │   ├── Settings.js
│   │   └── User.js
│   └── Search.js
└── utils
    ├── deviceSize.js
    ├── hasNotch.js
    ├── helpers.js
    └── hooks.js
```

### 4. Project 3rd party tools

**Expo** - https://expo.io
Expo apps are the same thing as React Native apps but they're using the Expo SDK. This SDK enables developers to easily access a lot of native features like the camera, local storage, and other features. Expo also provides a lot of other UI components like icons or blur views in order to enhance the user experience.

**react-navigation v5** - https://reactnavigation.org/
We love react-navigation. We consider it to be the coolest navigation library out there! Our whole navigation was built with this cool library! For anything API related go on their website.

**expo-ui-kit** - https://github.com/react-ui-kit/expo-ui-kit
React-Native UI library in the React Native for Expo projects. The library include basic components to get your project started. Each component has predefined styles and options to speed up the development time. Take a look under the hood and give it a try. The expo-ui-kit support is always ready to reply to any of your issues.
