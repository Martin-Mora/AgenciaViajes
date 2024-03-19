

import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LayoutMain from './Component/Pages/Layouts/LayoutMain.jsx';
import Home from './Component/Pages/Home/Home';
import Login from './Component/Pages/Login/Login.jsx';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { signInToken } from './redux/actions/userAction.js';
import EmployeeRead from './Component//Pages/Employee/EmployeeRead/EmployeeRead.jsx';
import EmployeCreate from './Component/Pages/Employee/EmployeeCreate/EmployeeCreate.jsx';
import EmployeeInfo from './Component/Pages/Employee/EmployeeInfo/EmployeeInfo.jsx';
import EmployeeClientRead from './Component/Pages/EmployeeClient/EmployeeClientRead/EmployeeClientRead.jsx';
import EmployeeClientInfo from './Component/Pages/EmployeeClient/EmployeeClientInfo/EmployeeClientInfo.jsx';
// import ClientService from './Component/ClientService/ClientService.jsx';
import ServicesPack from './Component/Pages/ServicesPack/ServicesPack.jsx';
import Cart from './Component/Pages/cart/cart.jsx';
import ServicePackHotel from './Component/Pages/ServicepackHotel/ServicePackHotel.jsx';
import ServicePackAuto from './Component/Pages/ServicePackAuto/ServicePackAuto.jsx';
import Payment from './Component/Pages/Payment/Payment.jsx';
import ServiceAdd from './Component/Pages/ServiceAdd/ServiceAdd.jsx';











const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutMain />,
    children: [

      {
        path: "/home",
        element: <Home />,
      },

      {
        path: "/services",
        element: <ServicesPack />,
      },

      {
        path: "/servicesAdd",
        element: <ServiceAdd />,
      },

      {
        path: "/services/Hotel",
        element: <ServicePackHotel />,
      },

      {
        path: "/services/Autos",
        element: <ServicePackAuto  />,
      },

      {
        path: "/employeeRead",
        element: <EmployeeRead />,
      },

      {
        path: "/clientRead",
        element: <EmployeeClientRead  />,
      },

      {
        path: "/employeeRead/employeeCreate",
        element: <EmployeCreate />,
      },

      {
        path: "/employeeInfo/:id",
        element: <EmployeeInfo />,
      },

      {
        path: "/clientInfo/:id",
        element: <EmployeeClientInfo />,
      },

      
      {
        path: "/cart",
        element: <Cart />,
      },

      {
        path: "/payment",
        element: <Payment />,
      },

      {
        path: "/",
        element: <Login />,
      },

     
    ],
  },
])

function App() {

  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(signInToken());
    }
  }, []);


  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
