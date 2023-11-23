import { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

const useToken = () => {
    const [token, setToken] = useState(null);

    // Load the token from SecureStore when the hook initializes
    useEffect(() => {
        const loadToken = async () => {
            const storedToken = await SecureStore.getItemAsync('user_token');
            if (storedToken) {
                setToken(storedToken);
            }
        };

        loadToken();
    }, []);

    const saveToken = async (newToken) => {
        await SecureStore.setItemAsync('user_token', newToken);
        setToken(newToken);
    };

    const deleteToken = async () => {
        await SecureStore.deleteItemAsync('user_token');
        setToken(null);
    };

    return { token, saveToken, deleteToken };
};

export default useToken;
