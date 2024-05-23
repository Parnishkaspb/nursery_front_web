import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import api from '../services/api';

interface AccessToken {
    token: string;
    name: string;
    id_role: number;
}

interface AuthContextType {
    token: AccessToken | null;
    setToken: React.Dispatch<React.SetStateAction<AccessToken | null>>;
    login: (login: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<AccessToken | null>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('access_token');
        const storedName = localStorage.getItem('name');
        const storedIdRole = localStorage.getItem('id_role');

        if (storedToken && storedName && storedIdRole) {
            const accessToken: AccessToken = {
                token: storedToken,
                name: storedName,
                id_role: Number(storedIdRole)
            };
            setToken(accessToken);
            api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        }
    }, []);

    const login = async (login: string, password: string) => {
        try {
            const response = await api.post('/api/worker/login', { login, password });

            if (response.data.data.code === 200) {
                const access_token = response.data.data.access_token;
                const name = response.data.data.name;
                const id_role = response.data.data.role;

                localStorage.setItem('access_token', access_token);
                localStorage.setItem('name', name);
                localStorage.setItem('id_role', id_role);

                const accessToken: AccessToken = {
                    token: access_token,
                    name: name,
                    id_role: id_role
                };
                setToken(accessToken);
                api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
            } else if (response.data.data.code === 401) {
                throw new Error(response.data.data.message);
            }
        } catch (error) {
            throw error;
        }
    };

    const logout = async () => {
        try {
            const response = await api.post('/api/worker/logout');

            if (response.data.data.code === 200) {
                setToken(null);
                localStorage.removeItem('access_token');
                localStorage.removeItem('name');
                localStorage.removeItem('id_role');
                delete api.defaults.headers.common['Authorization'];
            } else if (response.data.data.code === 401) {
                throw new Error(response.data.data.message);
            }

        } catch (error) {
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ token, setToken, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
