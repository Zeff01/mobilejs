import dayjs from "dayjs";

import images from "./images";
import audios from "./audios";
import videos from "./videos";

const IMAGES = images;
const AUDIOS = audios;
const VIDEOS = videos;

const USERS = {
  user_1: {
    id: "teacherAi",
    name: "Teacher AI",
    online: true,
    avatar: images.users.user_1,
  },
  user_2: {
    id: "sarascholz",
    name: "Sara Scholz",
    online: true,
    avatar: images.users.user_2,
  },
  user_3: {
    id: "billygreen",
    name: "Billy Green",
    online: true,
    avatar: images.users.user_3,
  },
  user_4: {
    id: "lilyburgess",
    name: "Lily Burgess",
    avatar: images.users.user_4,
  },
  user_5: {
    id: "derrickbrooks",
    name: "Derrick Brooks",
    avatar: images.users.user_5,
  },
  user_6: {
    id: "marrietmiles",
    name: "Marriet Miles",
    avatar: images.users.user_6,
  },
  user_7: {
    id: "dustinhouston",
    name: "Dustin Houston",
    avatar: images.users.user_7,
  },
  user_8: {
    id: "louisaingram",
    name: "Louisa Ingram",
    avatar: images.users.user_8,
  },
};

const USER = {
  ...USERS.user_6,
  online: true,
  dob: "12.12.1998",
  email: "anne.carry@mail.com",
  phone: "+42 239 239 492",
  location: "England, UK",
  timestamp: dayjs(),
};

const NOTIFICATIONS = [
  {
    id: 1,
    user: USERS.user_1,
    time: dayjs().subtract(4, "minute"),
    action: "liked your photo",
    type: "image",
    image: images.stories.story_6,
  },
  {
    id: 2,
    user: USERS.user_2,
    time: dayjs().subtract(5, "minute"),
    action: "sent you a friend request",
    type: "addUser",
    accepted: false,
  },
  {
    id: 3,
    user: USERS.user_3,
    time: dayjs().subtract(10, "minute"),
    action: "liked your photo",
    type: "image",
    image: images.stories.story_3,
  },
  {
    id: 4,
    user: USERS.user_4,
    time: dayjs().subtract(15, "minute"),
    action: "sent you a friend request",
    type: "addUser",
    accepted: true,
  },
  {
    id: 5,
    user: USERS.user_5,
    time: dayjs().subtract(20, "minute"),
    action: "liked your photo",
    type: "image",
    image: images.stories.story_4,
  },
  {
    id: 6,
    user: USERS.user_6,
    time: dayjs().subtract(22, "minute"),
    action: "sent you a friend request",
    type: "addUser",
    accepted: true,
  },
  {
    id: 7,
    user: USERS.user_7,
    time: dayjs().subtract(23, "minute"),
    action: "sent you a friend request",
    type: "addUser",
    accepted: true,
  },
  {
    id: 8,
    user: USERS.user_8,
    time: dayjs().subtract(30, "minute"),
    action: "liked your photo",
    type: "image",
    image: images.stories.story_5,
  },
];

const CONTACT_ACTIVITIES = [
  {
    id: 1,
    type: "upload",
    content: "uploaded a new file",
    file: { name: "Analytics_report", type: "excel" },
    timestamp: dayjs(),
  },
  {
    id: 2,
    type: "comment",
    content: "invited you to a new channel",
    channel: {
      name: "# Analytics",
      users: [
        "https://faces.design/faces/w/w1.png",
        "https://faces.design/faces/m/m1.png",
        "https://faces.design/faces/w/w2.png",
        "https://faces.design/faces/m/m2.png",
        "https://faces.design/faces/m/m3.png",
        "https://faces.design/faces/w/w8.png",
        "https://faces.design/faces/m/m8.png",
        "https://faces.design/faces/w/w9.png",
        "https://faces.design/faces/m/m9.png",
      ],
    },
    timestamp: dayjs().subtract(10, "minute"),
  },
];

const CONTACTS = [
  {
    id: 1,
    name: "Cammy Hedling",
    email: "cammy.hedling@mail.com",
    username: "cammy.hedling",
    phone: "+1234567890",
    location: "San Francisco, CA",
    position: "Data Engineer",
    online: true,
    avatar: "https://faces.design/faces/w/w1.png",
    activities: CONTACT_ACTIVITIES,
  },
  {
    id: 2,
    name: "Gunther Ackner",
    email: "gunther.ackner@mail.com",
    username: "gunther.ackner",
    phone: "+1234567890",
    location: "San Francisco, CA",
    position: "Data Engineer",
    online: true,
    avatar: "https://faces.design/faces/m/m1.png",
    activities: CONTACT_ACTIVITIES,
  },
  {
    id: 3,
    name: "Margie Jutten",
    email: "margie.jutten@mail.com",
    username: "margie.jutten",
    phone: "+1234567890",
    location: "San Francisco, CA",
    position: "UI Designer",
    online: true,
    avatar: "https://faces.design/faces/w/w2.png",
    activities: CONTACT_ACTIVITIES,
  },
  {
    id: 4,
    name: "Hubert Franck",
    email: "hubert.franck@mail.com",
    username: "hubert.franck",
    phone: "+1234567890",
    location: "San Francisco, CA",
    position: "UX Designer",
    online: false,
    avatar: "https://faces.design/faces/m/m2.png",
    activities: CONTACT_ACTIVITIES,
  },
  {
    id: 5,
    name: "Meysam Nassour",
    email: "meysam.nassour@mail.com",
    username: "meysam.nassour",
    phone: "+1234567890",
    location: "San Francisco, CA",
    position: "UI Developer",
    online: false,
    avatar: "https://faces.design/faces/m/m3.png",
    activities: CONTACT_ACTIVITIES,
  },
  {
    id: 6,
    name: "Tommy Dawson",
    email: "tommy.dawson@mail.com",
    username: "tommy.dawson",
    phone: "+1234567890",
    location: "San Francisco, CA",
    position: "UI Developer",
    online: false,
    avatar: "https://faces.design/faces/m/m4.png",
    activities: CONTACT_ACTIVITIES,
  },
  {
    id: 7,
    name: "Isabelle Luna",
    email: "isabelle.luna@mail.com",
    username: "isabelle.luna",
    phone: "+1234567890",
    location: "San Francisco, CA",
    position: "Maketing Analyst",
    online: false,
    avatar: "https://faces.design/faces/w/w3.png",
    activities: CONTACT_ACTIVITIES,
  },
  {
    id: 8,
    name: "Ralph Guerrero",
    email: "ralph.guerrero@mail.com",
    username: "ralph.guerrero",
    phone: "+1234567890",
    location: "San Francisco, CA",
    position: "SEO Analyst",
    online: true,
    avatar: "https://faces.design/faces/m/m15",
    activities: CONTACT_ACTIVITIES,
  },
  {
    id: 9,
    name: "Mina Fleming",
    email: "mina.fleming@mail.com",
    username: "mina.fleming",
    phone: "+1234567890",
    location: "San Francisco, CA",
    position: "Data Engineer",
    online: false,
    avatar: "https://faces.design/faces/w/w4.png",
    activities: CONTACT_ACTIVITIES,
  },
  {
    id: 10,
    name: "Sara Scholz",
    email: "sara.scholz@mail.com",
    username: "sara.scholz",
    phone: "+1234567890",
    location: "San Francisco, CA",
    position: "QA Engineer",
    online: false,
    avatar: "https://faces.design/faces/w/w5.png",
    activities: CONTACT_ACTIVITIES,
  },
  {
    id: 11,
    name: "Gary Higgins",
    email: "gary.higgins@mail.com",
    username: "gary.higgins",
    phone: "+1234567890",
    location: "San Francisco, CA",
    position: "Team Lead",
    online: true,
    avatar: "https://faces.design/faces/m/m6.png",
    activities: CONTACT_ACTIVITIES,
  },
  {
    id: 12,
    name: "Louisa Ingram",
    email: "louisa.ingram@mail.com",
    username: "louisa.ingram",
    phone: "+1234567890",
    location: "San Francisco, CA",
    position: "Data Engineer",
    online: true,
    avatar: "https://faces.design/faces/w/w6.png",
    activities: CONTACT_ACTIVITIES,
  },
];

const STORIES = [
  {
    id: 1,
    description: "Whether its a driving tour",
    images: [
      images.stories.story_1,
      images.stories.story_3,
      images.stories.story_6,
    ],
    likes: 326,
    comments: [
      {
        id: 1,
        liked: true,
        user: USERS.user_2,
        comment:
          "Awesome Edward, remeber that five tips for low cost holidays I sent you?",
        timestamp: dayjs().subtract(10, "m"),
      },
      {
        id: 2,
        liked: false,
        user: USERS.user_3,
        comment:
          "Awesome Edward, remeber that five tips for low cost holidays I sent you?",
        timestamp: dayjs().subtract(20, "m"),
      },
      {
        id: 3,
        liked: true,
        user: USERS.user_4,
        comment:
          "Awesome Edward, remeber that five tips for low cost holidays I sent you?",
        timestamp: dayjs().subtract(30, "m"),
      },
    ],
    newActivity: true,
    user: USERS.user_1,
  },
  {
    id: 2,
    title:
      "The Best Fashion Instagrams of the Week: Céline Dion, Lizzo, and More",
    description:
      "If you are looking for a break from the cold, take a cue from Lizzo.",
    images: [images.stories.story_2],
    likes: 326,
    comments: [
      {
        id: 1,
        liked: true,
        user: USERS.user_2,
        comment:
          "Awesome Edward, remeber that five tips for low cost holidays I sent you?",
        timestamp: dayjs().subtract(10, "m"),
      },
      {
        id: 2,
        liked: false,
        user: USERS.user_3,
        comment:
          "Awesome Edward, remeber that five tips for low cost holidays I sent you?",
        timestamp: dayjs().subtract(20, "m"),
      },
      {
        id: 3,
        liked: true,
        user: USERS.user_4,
        comment:
          "Awesome Edward, remeber that five tips for low cost holidays I sent you?",
        timestamp: dayjs().subtract(30, "m"),
      },
    ],
    newActivity: true,
    user: USERS.user_2,
  },
  {
    id: 3,
    description: "Whether its a driving tour",
    images: [
      images.stories.story_3,
      images.stories.story_3,
      images.stories.story_3,
    ],
    likes: 326,
    comments: [
      {
        id: 1,
        liked: true,
        user: USERS.user_2,
        comment:
          "Awesome Edward, remeber that five tips for low cost holidays I sent you?",
        timestamp: dayjs().subtract(10, "m"),
      },
      {
        id: 2,
        liked: false,
        user: USERS.user_3,
        comment:
          "Awesome Edward, remeber that five tips for low cost holidays I sent you?",
        timestamp: dayjs().subtract(20, "m"),
      },
      {
        id: 3,
        liked: true,
        user: USERS.user_4,
        comment:
          "Awesome Edward, remeber that five tips for low cost holidays I sent you?",
        timestamp: dayjs().subtract(30, "m"),
      },
    ],
    newActivity: true,
    user: USERS.user_3,
  },
  {
    id: 4,
    description: "Whether its a driving tour",
    images: [
      images.stories.story_4,
      images.stories.story_4,
      images.stories.story_4,
    ],
    likes: 326,
    comments: [
      {
        id: 1,
        liked: true,
        user: USERS.user_2,
        comment:
          "Awesome Edward, remeber that five tips for low cost holidays I sent you?",
        timestamp: dayjs().subtract(10, "m"),
      },
      {
        id: 2,
        liked: false,
        user: USERS.user_3,
        comment:
          "Awesome Edward, remeber that five tips for low cost holidays I sent you?",
        timestamp: dayjs().subtract(20, "m"),
      },
      {
        id: 3,
        liked: true,
        user: USERS.user_4,
        comment:
          "Awesome Edward, remeber that five tips for low cost holidays I sent you?",
        timestamp: dayjs().subtract(30, "m"),
      },
    ],
    newActivity: false,
    user: USERS.user_4,
  },
  {
    id: 5,
    description: "Whether its a driving tour",
    images: [
      images.stories.story_5,
      images.stories.story_5,
      images.stories.story_5,
    ],
    likes: 326,
    comments: [
      {
        id: 1,
        liked: true,
        user: USERS.user_2,
        comment:
          "Awesome Edward, remeber that five tips for low cost holidays I sent you?",
        timestamp: dayjs().subtract(10, "m"),
      },
      {
        id: 2,
        liked: false,
        user: USERS.user_3,
        comment:
          "Awesome Edward, remeber that five tips for low cost holidays I sent you?",
        timestamp: dayjs().subtract(20, "m"),
      },
      {
        id: 3,
        liked: true,
        user: USERS.user_4,
        comment:
          "Awesome Edward, remeber that five tips for low cost holidays I sent you?",
        timestamp: dayjs().subtract(30, "m"),
      },
    ],
    newActivity: true,
    user: USERS.user_5,
  },
  {
    id: 6,
    description: "Whether its a driving tour",
    images: [
      images.stories.story_6,
      images.stories.story_6,
      images.stories.story_6,
    ],
    likes: 326,
    comments: [
      {
        id: 1,
        liked: true,
        user: USERS.user_2,
        comment:
          "Awesome Edward, remeber that five tips for low cost holidays I sent you?",
        timestamp: dayjs().subtract(10, "m"),
      },
      {
        id: 2,
        liked: false,
        user: USERS.user_3,
        comment:
          "Awesome Edward, remeber that five tips for low cost holidays I sent you?",
        timestamp: dayjs().subtract(20, "m"),
      },
      {
        id: 3,
        liked: true,
        user: USERS.user_4,
        comment:
          "Awesome Edward, remeber that five tips for low cost holidays I sent you?",
        timestamp: dayjs().subtract(30, "m"),
      },
    ],
    newActivity: false,
    user: USERS.user_6,
  },
];

const EVENTS = [
  {
    id: 1,
    image: images.stories.story_1,
    title: "Design meetup for designers with Los Angeles",
    description:
      "Hey Designers! I invite the everyone to the new meetup for us. Enjoy!",
    address: {
      city: "Los Angeles",
      state: "California",
      country: "US",
      street: "St. street 23-223",
      gps: {
        lat: 34.037873,
        lng: -118.242847,
      },
    },
    price: 50,
    date: dayjs().add(1, "d"),
    timestamp: dayjs(),
    users: [USERS.user_1, USERS.user_2, USERS.user_3],
    user: USERS.user_1,
  },
  {
    id: 2,
    image: images.stories.story_2,
    title: "2019 DUB Show at Los Angeles Auto Show",
    description:
      "Hey Designers! I invite the everyone to the new meetup for us. Enjoy!",
    address: {
      city: "Los Angeles",
      state: "California",
      country: "US",
      street: "St. street 23-223",
      gps: {
        lat: 34.037873,
        lng: -118.242847,
      },
    },
    price: 50,
    date: dayjs().add(2, "d"),
    timestamp: dayjs().add(1, "d"),
    users: [USERS.user_4, USERS.user_5, USERS.user_6],
    user: USERS.user_2,
  },
];

const MESSAGES = [
  {
    id: 1,
    from: [USERS.user_1],
    type: "text",
    unread: 1,
    lastMessage: "For today's lesson",
    message: "I found some new spots we could visit",
    timestamp: dayjs().subtract(4, "m"),
  },
  // {
  //   id: 2,
  //   from: [USERS.user_2],
  //   type: "text",
  //   unread: 4,
  //   lastMessage: "Thank you for sharing",
  //   message: "I found some new spots we could visit",
  //   timestamp: dayjs().subtract(5, "m"),
  // },
  // {
  //   id: 3,
  //   from: [USERS.user_3],
  //   type: "text",
  //   unread: 2,
  //   lastMessage: "Thank you for sharing",
  //   timestamp: dayjs().subtract(6, "m"),
  // },
  // {
  //   id: 4,
  //   from: [USERS.user_4],
  //   type: "text",
  //   lastMessage: "Thank you for sharing",
  //   timestamp: dayjs().subtract(8, "m"),
  // },
  // {
  //   id: 5,
  //   from: [USERS.user_5],
  //   type: "text",
  //   lastMessage: "Thank you for sharing",
  //   timestamp: dayjs().subtract(10, "m"),
  // },
  // {
  //   id: 6,
  //   from: [USERS.user_6],
  //   type: "text",
  //   lastMessage: "Thank you for sharing",
  //   timestamp: dayjs().subtract(30, "m"),
  // },
  // {
  //   id: 7,
  //   from: [USERS.user_7],
  //   type: "text",
  //   lastMessage: "Thank you for sharing",
  //   timestamp: dayjs().subtract(45, "m"),
  // },
  // {
  //   id: 8,
  //   from: [USERS.user_3, USERS.user_5, USERS.user_4],
  //   type: "text",
  //   lastMessage: "Thank you for sharing",
  //   timestamp: dayjs().subtract(30, "m"),
  // },
  // {
  //   id: 9,
  //   from: [USERS.user_2, USERS.user_5, USERS.user_3, USERS.user_1],
  //   type: "text",
  //   lastMessage: "Thank you for sharing",
  //   timestamp: dayjs().subtract(45, "m"),
  // },
  // {
  //   id: 10,
  //   from: [
  //     USERS.user_6,
  //     USERS.user_3,
  //     USERS.user_5,
  //     USERS.user_2,
  //     USERS.user_4,
  //   ],
  //   type: "text",
  //   lastMessage: "Thank you for sharing",
  //   timestamp: dayjs().subtract(45, "m"),
  // },
  // {
  //   id: 11,
  //   from: [USERS.user_1, USERS.user_3, USERS.user_5],
  //   type: "text",
  //   archived: true,
  //   lastMessage: "Thank you for sharing",
  //   timestamp: dayjs().subtract(45, "m"),
  // },
];

const CHAT_SIMPLE = [
  {
    id: 1,
    from: USERS.user_3,
    type: "audio",
    file: audios.live,
    timestamp: dayjs().subtract(4, "m"),
  },
  {
    id: 2,
    from: USER,
    type: "text",
    message: "Yes, I saw his post yesterday",
    timestamp: dayjs().subtract(4, "m"),
  },
  {
    id: 3,
    from: USER,
    type: "text",
    message: "Yes, I saw his post yesterday",
    timestamp: dayjs().subtract(4, "m"),
  },
  {
    id: 4,
    from: USERS.user_3,
    type: "audio",
    file: audios.live,
    message: "Yes, I saw his post yesterday",
    timestamp: dayjs().subtract(6, "m"),
  },
];

const CHAT_GROUP = [
  {
    id: 1,
    from: USERS.user_3,
    type: "text",
    message: "I found some new spots we could visit",
    timestamp: dayjs().subtract(1, "m"),
  },
  {
    id: 2,
    from: USERS.user_1,
    type: "text",
    message: "I found some new spots we could visit",
    timestamp: dayjs().subtract(2, "m"),
  },
  {
    id: 3,
    from: USERS.user_2,
    type: "image",
    files: [
      images.stories.story_1,
      images.stories.story_2,
      images.stories.story_3,
    ],
    timestamp: dayjs().subtract(3, "m"),
  },
  {
    id: 4,
    from: USERS.user_3,
    type: "audio",
    file: audios.live,
    message: "Yes, I saw his post yesterday",
    timestamp: dayjs().subtract(4, "m"),
  },
  {
    id: 5,
    from: USERS.user_4,
    type: "text",
    message: "I found some new spots we could visit",
    timestamp: dayjs().subtract(10, "m"),
  },
];

export default {
  NOTIFICATIONS,
  MESSAGES,
  CONTACT_ACTIVITIES,
  CONTACTS,
  USER,
  USERS,
  STORIES,
  EVENTS,
  CHAT_SIMPLE,
  CHAT_GROUP,
  IMAGES,
  AUDIOS,
  VIDEOS,
};
