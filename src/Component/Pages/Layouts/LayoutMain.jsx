import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import NavBarLogin from "../../NavBarLogin/NavBarLogin.jsx";
import NavBar from "../../Navbar/Navbar.jsx";

const LayoutMain = () => {
    const { pathname } = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Aquí podrías tener lógica para verificar si hay un usuario conectado
    useEffect(() => {
        // Ejemplo de lógica simple: comprobar si hay un usuario en el localStorage
        const user = localStorage.getItem("user");
        setIsLoggedIn(!!user); // Establece isLoggedIn como true si hay un usuario en localStorage
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <div className='app-main'>
            <NavBarLogin />
            {isLoggedIn && <NavBar />} {/* Muestra NavBar solo si el usuario está conectado */}
            <Outlet />
        </div>
    );
};

export default LayoutMain;

