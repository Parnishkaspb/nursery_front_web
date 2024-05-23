import React, { useState, useEffect } from 'react';
import api from '../services/api';

interface Payment {
    id: number;
    user_name: string;
    amount: string;
    status: string;
}

const ConfirmPayments: React.FC = () => {
    const [payments, setPayments] = useState<Payment[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const fetchPayments = async () => {
        try {
            const response = await api.get('/api/worker/investition');
            console.log(response.data.data);
            setPayments(response.data.data);
        } catch (error) {
            console.error('Failed to fetch payments', error);
        }
    };

    useEffect(() => {
        fetchPayments();
    }, []);

    const handleConfirm = async (payment: Payment) => {
        setError(null);
        setSuccess(null);

        try {
            const response = await api.post(`/api/worker/workmoney`, {
                id_reason: 1,
                id_user: payment.id, // Используем id платежа вместо id
                money: parseFloat(payment.amount), // Преобразуем строку в число
                numberdoc: 1,
            });

            if (response.data.data.code === 200) {
                setSuccess(response.data.data.message);
                setPayments(payments.filter((p) => p.id !== payment.id));
            } else {
                setError(response.data.data.message);
            }
        } catch (error) {
            setError('An error occurred while confirming the payment.');
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded shadow-md w-4/5">
                <h2 className="text-2xl mb-4 text-center">Подтверждение оплат</h2>
                {error && <p className="text-red-500 text-center">{error}</p>}
                {success && <p className="text-green-500 text-center">{success}</p>}
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="py-2">Клиент</th>
                            <th className="py-2">Сумма</th>
                            <th className="py-2">Статус</th>
                            <th className="py-2">Действие</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment) => (
                            <tr key={payment.id}>
                                <td className="py-2 text-center">{payment.user_name}</td>
                                <td className="py-2 text-center">{payment.amount}</td>
                                <td className="py-2 text-center">Проверка денежных средств на счету</td>
                                <td className="py-2 text-center">
                                    <button
                                        onClick={() => handleConfirm(payment)}
                                        className="bg-blue-500 text-white p-2 rounded"
                                    >
                                        Подтвердить
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ConfirmPayments;