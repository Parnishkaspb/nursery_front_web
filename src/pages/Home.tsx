import React from 'react';
import { useAuth } from '../context/AuthContext';

const Home: React.FC = () => {
    const { token } = useAuth();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded shadow-md w-80">
                <h2 className="text-2xl mb-4">Home</h2>
                <p>Welcome, {token?.name}!</p>
            </div>
        </div>
    );
};

export default Home;
