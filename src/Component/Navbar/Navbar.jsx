import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { useState } from "react";
import { logOut } from "../../redux/actions/userAction";
import "../Navbar/Navbar.css";
import avatar from "../../Img/admin.svg";
import avatar2 from "../../Img/Employee.svg";
import exit from "../../Img/exit.png";
import CartItem from "../CartItem/CartItem";


const Navbar = () => {
  const user = useSelector((store) => store.users.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(user)

  const [darkMode, setDarkMode] = useState(true);

  const toggleMode = () => {
    setDarkMode(!darkMode);
  };

  const handleLogoutConfirm = () => {
    Swal.fire({
      title: "¿Quieres cerrar la sesión?",
      showDenyButton: true,
      confirmButtonText: "Confirmar",
      denyButtonText: `No quiero`,
      customClass: {
        title: 'my-swal-title'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Sesión cerrada!",
          icon:"success",
          customClass: {
            title: 'my-swal-title' 
          }
        });
        handleLogout();
      } else if (result.isDenied) {
        Swal.fire({
          title: "Sesión activa",
          icon: "info",
          customClass: {
            title: 'my-swal-title' 
          }
        });
      }
    });
  };

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/");
  };

  return (
    <header>
      <nav className="navBar">
        <div className="navBar__sesion">
          {user && (
            <>
              <img src={user.nameUser === "PruebaAdmin" ? avatar : avatar2} alt="" />
              <h3 className="navBar__sesion--name">{user.nameUser}</h3>
            </>
          )}
        </div>

        <ul className="navbar__list">
          <li className="navbar__Close"><a href="">X</a></li>
          {user && user.nameUser === "PruebaAdmin" && (
            <Link to="/employeeRead" className="navbar__item item"><li className="li-item"><i className='bx bxs-user-circle' ></i>Empleados</li></Link>
          )}
           {user && user.nameUser !== "PruebaAdmin" && ( // Condición para mostrar el carrito solo si el usuario no es PruebaAdmin
            <Link to="/cart" className=" item cart"><CartItem /></Link>
          )}
          <Link to="/ClientRead" className="navbar__item item"><li className="li-item"><i className='bx bxs-user' ></i>Clientes</li></Link>
          <Link to="/services" className="navbar__item item"><li className="li-item"><i className='bx bxs-briefcase' ></i>Servicios</li></Link>
        </ul>

        <div onClick={toggleMode} className={darkMode ? "btnMode" : "btnMode2"}>
          <div  className={darkMode ? "btnMode__change" : "btnMode__change2"}>
          </div>
        </div>

        <div className="btnExit" onClick={handleLogoutConfirm}>
          <img src={exit} className="exit-icon" alt="" />
          <h4 className="exit-title">cerrar sesión</h4>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
