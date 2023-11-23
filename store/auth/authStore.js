import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';

const useAuthStore = create((set) => ({
    token: null,
    setToken: async (newToken) => {
        await SecureStore.setItemAsync('user_token', newToken);
        set({ token: newToken });
    },
    removeToken: async () => {
        await SecureStore.deleteItemAsync('user_token');
        set({ token: null });
    },
    initializeToken: async () => {
        const storedToken = await SecureStore.getItemAsync('user_token');
        if (storedToken) {
            set({ token: storedToken });
        }
    },
    isSignedIn: () => {
        return set(state => {
            console.log("token =========", state.token);
            return Boolean(state.token);
        });
    },
}));

export default useAuthStore;
