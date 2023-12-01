import 'dotenv/config';


export default {
    expo: {
        name: "Chingu Mobile",
        slug: "chingu-mobile",
        description: "An Ai app",
        privacy: "public",
        platforms: ["ios", "android"],
        version: "1.0.1",
        orientation: "portrait",
        icon: "./assets/icon.png",
        splash: {
            image: "./assets/splash.png",
            resizeMode: "cover",
            backgroundColor: "#000000"
        },
        updates: {
            fallbackToCacheTimeout: 0
        },
        assetBundlePatterns: ["**/*"],
        ios: {
            supportsTablet: true
        },
        android: {
            package: "com.zeff01.chingumobile"
        },
        extra: {
            TRANSCRIPTION_API_ENDPOINT: "https://api.openai.com/v1/audio/transcriptions",
            SPEECH_API_ENDPOINT: "https://api.openai.com/v1/audio/speech",
            COMPLETIONS_API_ENDPOINT: "https://api.openai.com/v1/chat/completions",
            OPENAI_API_KEY: process.env.OPENAI_API_KEY,
            CHINGU_BASE_ENDPOINT: "https://api-uat.chingu.fun",
            eas: {
                projectId: "e89d2712-659b-44fd-99d6-fbf8b7e2a736"
            }
        }
    }
};
