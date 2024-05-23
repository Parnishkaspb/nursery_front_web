import React, { useState, useEffect } from 'react';
import api from '../services/api';

interface Plant {
    id: number;
    name: string;
    money: string;
}

const PurchasePlants: React.FC = () => {
    const [plants, setPlants] = useState<Plant[]>([]);
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [plantId, setPlantId] = useState<number | ''>('');
    const [selectedPlantPrice, setSelectedPlantPrice] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const fetchPlants = async () => {
        try {
            const response = await api.get('/api/worker/plant');
            console.log(response.data.data);
            setPlants(response.data.data);
        } catch (error) {
            console.error('Failed to fetch plants', error);
        }
    };

    useEffect(() => {
        fetchPlants();
    }, []);

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuantity = e.target.value;
        setQuantity(newQuantity);

        // Пересчитываем общую цену
        const totalPrice = parseFloat(selectedPlantPrice) * parseInt(newQuantity, 10);
        setPrice(totalPrice.toFixed(0));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        const totalPrice = parseFloat(selectedPlantPrice) * parseInt(quantity, 10);
        console.log(totalPrice);

        try {
            const totalPrice = parseFloat(selectedPlantPrice) * parseInt(quantity, 10);
            const response = await api.post('/api/purchases', {
                plant_id: plantId,
                quantity,
                price: totalPrice.toFixed(0),
                what: 1
            });

            if (response.data.data.code === 200) {
                setSuccess(response.data.data.message);
                setQuantity('');
                setPrice('');
                setPlantId('');
                setSelectedPlantPrice('');
            } else {
                setError(response.data.data.message);
            }
        } catch (error) {
            setError('An error occurred while creating the purchase.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
                <h2 className="text-2xl mb-4 text-center">Создание закупки</h2>
                {error && <p className="text-red-500 text-center">{error}</p>}
                {success && <p className="text-green-500 text-center">{success}</p>}
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Цветок</label>
                    <select
                        value={plantId}
                        onChange={(e) => {
                            const selectedPlant = plants.find((plant) => plant.id === Number(e.target.value));
                            setPlantId(Number(e.target.value));
                            setSelectedPlantPrice(selectedPlant?.money || '');
                            setPrice(selectedPlant?.money || '');
                        }}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    >
                        <option value="" disabled>
                            Выберите цветок
                        </option>
                        {plants.map((plant) => (
                            <option key={plant.id} value={plant.id}>
                                {plant.name} (Цена за 1 ед.: {plant.money})
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Количество</label>
                    <input
                        type="number"
                        value={quantity}
                        onChange={handleQuantityChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Общая цена</label>
                    <input
                        type="text"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                        disabled
                    />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                    Создать закупку
                </button>
            </form>
        </div>
    );
};

export default PurchasePlants;