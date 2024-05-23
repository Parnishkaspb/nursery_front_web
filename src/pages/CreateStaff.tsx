import React, { useState, useEffect } from 'react';
import api from '../services/api';

interface Role {
    id: number;
    name: string;
}

const CreateStaff: React.FC = () => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [telephone, setPhone] = useState('');
    const [id_role, setRole] = useState<number | ''>('');
    const [roles, setRoles] = useState<Role[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const fetchRoles = async () => {
        try {
            const response = await api.get('/api/worker/roles');
            console.log(response.data.data);
            setRoles(response.data.data);
        } catch (error) {
            console.error('Failed to fetch roles', error);
        }
    };

    useEffect(() => {
        fetchRoles();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            const response = await api.post('/api/worker/register', { name, surname, login, password, telephone, id_role });
            if (response.data.data.code === 200) {
                setSuccess(response.data.data.message);
                setName('');
                setSurname('');
                setLogin('');
                setPassword('');
                setPhone('');
                setRole('');
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
                <h2 className="text-2xl mb-4 text-center">Добавить сотрудника</h2>
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
                    <label className="block text-sm font-bold mb-2">Фамилия</label>
                    <input
                        type="text"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Логин</label>
                    <input
                        type="text"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Пароль</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Телефон</label>
                    <input
                        type="tel"
                        value={telephone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Роль</label>
                    <select
                        value={id_role}
                        onChange={(e) => setRole(Number(e.target.value))}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    >
                        <option value="" disabled>Выберите роль</option>
                        {roles.map((role) => (
                            <option key={role.id} value={role.id}>{role.name}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                    Создать
                </button>
            </form>
        </div>
    );
};

export default CreateStaff;
