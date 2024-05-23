import React, { useState, useEffect } from 'react';
import api from '../services/api';

interface Plant {
    id: number;
    name: string;
    notes: string;
    money: number;
}

const ViewPlants: React.FC = () => {
    const [plants, setPlants] = useState<Plant[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [editPlantId, setEditPlantId] = useState<number | null>(null);
    const [editValues, setEditValues] = useState<{ name: string; notes: string; money: string }>({
        name: '',
        notes: '',
        money: ''
    });

    useEffect(() => {
        fetchPlants();
    }, []);

    const fetchPlants = async () => {
        try {
            const response = await api.get('/api/worker/plant');
            setPlants(response.data.data);
            setLoading(false);
        } catch (error) {
            setError('Failed to fetch plants');
            setLoading(false);
        }
    };

    const handleEdit = (plant: Plant) => {
        setEditPlantId(plant.id);
        setEditValues({
            name: plant.name,
            notes: plant.notes,
            money: plant.money.toString()
        });
    };

    const handleEditCancel = () => {
        setEditPlantId(null);
        // setEditValues({
        //     name: plant.name,
        //     notes: plant.notes,
        //     money: plant.money.toString()
        // });
    };

    const handleSave = async (id: number) => {
        try {
            const response = await api.patch(`/api/worker/plant/${id}`, {
                name: editValues.name,
                notes: editValues.notes,
                money: parseInt(editValues.money)
            });
            if (response.data.data.code === 200) {
                setEditPlantId(null);
                fetchPlants();
            } else {
                setError(response.data.data.message);
            }
        } catch (error) {
            setError('An error occurred while updating the plant');
        }
    };

    const handleDelete = async (id: number) => {
        try {
            const response = await api.delete(`/api/worker/plant/${id}`);
            if (response.data.data.code === 200) {
                fetchPlants();
            } else {
                setError(response.data.data.message);
            }
        } catch (error) {
            setError('An error occurred while deleting the plant');
        }
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center bg-gray-100">Loading...</div>;
    }

    if (error) {
        return <div className="min-h-screen flex items-center justify-center bg-gray-100">{error}</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <h2 className="text-2xl mb-4 text-center">Все растения</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {plants.map((plant) => (
                    <div key={plant.id} className="bg-white p-4 rounded shadow-md">
                        {editPlantId === plant.id ? (
                            <>
                                <input
                                    type="text"
                                    value={editValues.name}
                                    onChange={(e) => setEditValues({ ...editValues, name: e.target.value })}
                                    className="w-full p-2 border border-gray-300 rounded mb-2"
                                />
                                <textarea
                                    value={editValues.notes}
                                    onChange={(e) => setEditValues({ ...editValues, notes: e.target.value })}
                                    className="w-full p-2 border border-gray-300 rounded mb-2"
                                />
                                <input
                                    type="number"
                                    value={editValues.money}
                                    onChange={(e) => setEditValues({ ...editValues, money: e.target.value })}
                                    className="w-full p-2 border border-gray-300 rounded mb-2"
                                />
                                <button
                                    onClick={() => handleSave(plant.id)}
                                    className="w-full bg-green-500 text-white p-2 rounded mb-2"
                                >
                                    Сохранить
                                </button>
                                <button
                                    onClick={() => handleEditCancel()}
                                    className="w-full bg-red-500 text-white p-2 rounded mb-2"
                                >
                                    Назад
                                </button>
                            </>
                        ) : (
                            <>
                                <h3 className="text-xl font-bold mb-2">{plant.name}</h3>
                                <p className="mb-2">Заметки: {plant.notes}</p>
                                <p>Стоимость: {plant.money} руб.</p>
                                <div className="flex justify-between mt-4">
                                    <button
                                        onClick={() => handleEdit(plant)}
                                        className="text-blue-500 hover:text-blue-700"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M15.232 5.232l3.536 3.536m.488-6.196a2.121 2.121 0 00-3 0l-12 12a2.121 2.121 0 000 3l3 3a2.121 2.121 0 003 0l12-12a2.121 2.121 0 000-3z"
                                            />
                                        </svg>

                                    </button>
                                    <button
                                        onClick={() => handleDelete(plant.id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ViewPlants;
