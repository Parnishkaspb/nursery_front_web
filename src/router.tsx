import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import CreatePosition from './pages/CreatePosition';
import CreateStaff from './pages/CreateStaff';
import ProtectedLayout from './components/ProtectedLayout';
import GuestLayout from './components/GuestLayout';
import RoleProtectedRoute from './components/RoleProtectedRoute';
import CreatePlant from './pages/CreatePlant';
import ViewPlants from './pages/ViewPlants';
import PurchasePlants from './pages/PurchasePlants';
import ConfirmReceipt from './pages/ConfirmReceipt';


const PurchaseSupplies = () => <div>Закупка расходных материалов</div>;
const SellFlowers = () => <div>Продажа цветов</div>;

const router = createBrowserRouter([
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/',
                element: <Login />,
            },
            // {
            //     path: '/register',
            //     element: <Register />,
            // },
        ],
    },
    {
        path: '/',
        element: <ProtectedLayout />,
        children: [
            {
                path: 'home',
                element: <Home />,
            },
            {
                element: <RoleProtectedRoute allowedRoles={[1]} />,
                children: [
                    {
                        path: 'create-position',
                        element: <CreatePosition />,
                    },
                    {
                        path: 'create-staff',
                        element: <CreateStaff />,
                    },
                    {
                        path: 'purchase-plants',
                        element: <PurchasePlants />,
                    },
                    {
                        path: 'purchase-supplies',
                        element: <PurchaseSupplies />,
                    },
                    {
                        path: 'sell-flowers',
                        element: <SellFlowers />,
                    },
                    {
                        path: 'confirm-receipt',
                        element: <ConfirmReceipt />,
                    },
                    {
                        path: 'view-plants',
                        element: <ViewPlants />,
                    },
                    {
                        path: 'create-plant',
                        element: <CreatePlant />,
                    },
                ],
            },
        ],
    },
]);

const AppRouter: React.FC = () => {
    return <RouterProvider router={router} />;
};

export default AppRouter;
