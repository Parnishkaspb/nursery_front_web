import React, { useState } from 'react';
import api from '../services/api';

const CreatePosition: React.FC = () => {
    const [name_role, setName] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            const response = await api.post('/api/worker/roles', { name_role });
            if (response.data.data.code === 200) {
                setSuccess(response.data.data.message);
                setName('');
            } else {
                setError(response.data.data.message);
            }
        } catch (error) {
            setError('An error occurred.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
                <h2 className="text-2xl mb-4 text-center">Создание новой должности</h2>
                {error && <p className="text-red-500 text-center">{error}</p>}
                {success && <p className="text-green-500 text-center">{success}</p>}
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Название</label>
                    <input
                        type="text"
                        value={name_role}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                    Создать должность
                </button>
            </form>
        </div>
    );
};

export default CreatePosition;
