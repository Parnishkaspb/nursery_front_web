import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NavBar: React.FC = () => {
    const { token, logout } = useAuth();
    const navigate = useNavigate();
    const [dropdownStaffOpen, setDropdownStaffOpen] = useState(false);
    const [dropdownTransactionsOpen, setDropdownTransactionsOpen] = useState(false);
    const [dropdownPlantsOpen, setDropdownPlantsOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const toggleDropdownStaff = () => {
        setDropdownStaffOpen(!dropdownStaffOpen);
    };

    const toggleDropdownTransactions = () => {
        setDropdownTransactionsOpen(!dropdownTransactionsOpen);
    };

    const toggleDropdownPlants = () => {
        setDropdownPlantsOpen(!dropdownPlantsOpen);
    };

    return (
        <nav className="bg-blue-600 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex space-x-4">
                    <Link to="/home" className="text-white text-lg font-bold">Домой</Link>
                    {token?.id_role === 1 && (
                        <>
                            <div className="relative">
                                <button
                                    onClick={toggleDropdownStaff}
                                    className="text-white text-lg focus:outline-none">
                                    Сотрудники
                                </button>
                                {dropdownStaffOpen && (
                                    <div className="absolute mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                                        <Link
                                            to="/create-position"
                                            className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                            Новая позиция
                                        </Link>
                                        <Link
                                            to="/create-staff"
                                            className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                            Новый сотрудник
                                        </Link>
                                    </div>
                                )}
                            </div>

                            <div className="relative">
                                <button
                                    onClick={toggleDropdownTransactions}
                                    className="text-white text-lg focus:outline-none">
                                    Транзакции
                                </button>
                                {dropdownTransactionsOpen && (
                                    <div className="absolute mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                                        <Link
                                            to="/purchase-plants"
                                            className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                            Закупка растениями
                                        </Link>
                                        <Link
                                            to="/purchase-supplies"
                                            className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                            Закупка расходных материалов
                                        </Link>
                                        <Link
                                            to="/sell-flowers"
                                            className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                            Продажа цветов
                                        </Link>
                                        <Link
                                            to="/confirm-receipt"
                                            className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                            Подтверждение принятия денежных средств от клиента
                                        </Link>
                                    </div>
                                )}
                            </div>

                            <div className="relative">
                                <button
                                    onClick={toggleDropdownPlants}
                                    className="text-white text-lg focus:outline-none">
                                    Растения
                                </button>
                                {dropdownPlantsOpen && (
                                    <div className="absolute mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                                        <Link
                                            to="/view-plants"
                                            className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                            Просмотр всех растений
                                        </Link>
                                        <Link
                                            to="/create-plant"
                                            className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                            Создание растения
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
                <div className="flex items-center space-x-4">
                    <button onClick={handleLogout} className="text-white">Выйти</button>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
