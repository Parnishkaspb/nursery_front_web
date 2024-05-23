import React, { useState } from 'react';
import api from '../services/api';

const CreatePlant: React.FC = () => {
    const [name, setName] = useState('');
    const [notes, setNotes] = useState('');
    const [money, setMoney] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        console.log(money);

        try {
            const response = await api.post('/api/worker/plant', { name, notes, money });
            if (response.data.data.code === 200) {
                setSuccess(response.data.data.message);
                setName('');
                setNotes('');
                setMoney('');
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
                <h2 className="text-2xl mb-4 text-center">Создать растение</h2>
                {error && <p className="text-red-500 text-center">{error}</p>}
                {success && <p className="text-green-500 text-center">{success}</p>}
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Имя</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Заметки</label>
                    <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Сумма за 1 ед. товара</label>
                    <input
                        type="number"
                        value={money}
                        onChange={(e) => setMoney(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                    Создать
                </button>
            </form>
        </div>
    );
};

export default CreatePlant;
