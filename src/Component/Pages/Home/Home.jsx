import  { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../Home/Home.css";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import NavBar from "../../Navbar/Navbar.jsx";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

const Home = () => {
  const user = useSelector((store) => store.users.user);
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    if (user) {
      showToast();
    }
  }, [user]); 

  const showToast = () => {
    Toastify({
      text: "Bienvenido, " + user.nameUser,
      position: "center",
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
    }).showToast();
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("https://rickandmortyapi.com/api/character");
        const datosJson = await response.json();
        setDatos(datosJson.results);
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  console.log(datos);

  // Calcular porcentaje de personajes por género
  const calcularPorcentajes = () => {
    const genderCount = {
      male: 0,
      female: 0,
      unknown: 0
    };

    datos.forEach((personaje) => {
      if (personaje.gender === "Male") {
        genderCount.male++;
      } else if (personaje.gender === "Female") {
        genderCount.female++;
      } else {
        genderCount.unknown++;
      }
    });

    const total = datos.length;
    const porcentajeMale = (genderCount.male / total) * 100 ;
    const porcentajeFemale = (genderCount.female / total) * 100;
    const porcentajeUnknown = (genderCount.unknown / total) * 100;

    return {
      male: porcentajeMale,
      female: porcentajeFemale,
      unknown: porcentajeUnknown
    };
  };

  const porcentajes = calcularPorcentajes();

  return (
    <>
    <NavBar />
    <h2>Porcentajes de Mujeres y hombres en Rick and Morty:</h2>
    <ResponsiveContainer width="50%" aspect={2}>
      <BarChart className="bar" data={[porcentajes]} aspect={2}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="gender" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="male" fill="#6b48ff" />
        <Bar dataKey="female" fill="#1ee3cf" />
        <Bar dataKey="unknown" fill="#c9ab57" />
      </BarChart>
    </ResponsiveContainer>
  </>

    // <>
    //   {user.nameUser === "PruebaAdmin" ? (
    //     alert("eres el admin! (inserte el otro componente)")
    //   ) : (
    //     <>
    //       <NavBar />
    //       <h2>Porcentajes de Mujeres y hombres en Rick and Morty:</h2>
    //       <ResponsiveContainer width="50%" aspect={2}>
    //         <BarChart className="bar" data={[porcentajes]} aspect={2}>
    //           <CartesianGrid strokeDasharray="3 3" />
    //           <XAxis dataKey="gender" />
    //           <YAxis />
    //           <Tooltip />
    //           <Legend />
    //           <Bar dataKey="male" fill="#6b48ff" />
    //           <Bar dataKey="female" fill="#1ee3cf" />
    //           <Bar dataKey="unknown" fill="#c9ab57" />
    //         </BarChart>
    //       </ResponsiveContainer>
    //     </>
    //   )}
    // </>
  );
      }

export default Home;
