import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import NavBarLogin from "../../NavBarLogin/NavBarLogin.jsx";
import NavBar from "../../Navbar/Navbar.jsx";

const LayoutMain = () => {
    const { pathname } = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

   
    useEffect(() => {
       
        const user = localStorage.getItem("user");
        setIsLoggedIn(!!user); 
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <div className='app-main'>
            <NavBarLogin />
            {isLoggedIn && <NavBar />} 
            <Outlet />
        </div>
    );
};

export default LayoutMain;

