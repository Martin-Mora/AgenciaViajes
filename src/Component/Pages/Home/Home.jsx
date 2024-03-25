import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../Home/Home.css";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import NavBar from "../../Navbar/Navbar.jsx";



const Home = () => {
  const user = useSelector((store) => store.users.user);
  const [totalSales, setTotalSales] = useState(0);
  const [todaySales, setTodaySales] = useState(0);
  const [employees, setEmployees] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  

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
        const response = await fetch("http://149.50.138.150:9090/api/ventas");
        const ventas = await response.json();
        console.log(ventas);
        
        
        
       // Obtener la fecha de hoy
       const today = new Date();
       // Convertir la fecha a formato de fecha corta (sin la hora)
       const todayDateString = today.toISOString().split('T')[0];

       // Filtrar las ventas que ocurrieron hoy
       const todayVentas = ventas.filter(venta => {
         // Obtener la fecha de venta del objeto y convertirla a formato de fecha corta
         const ventaDate = new Date(venta.fechaVenta);
         const ventaDateString = ventaDate.toISOString().split('T')[0];
         // Comparar si la fecha de venta es igual a la fecha de hoy
         return ventaDateString === todayDateString;
       });

       // Contar el número total de ventas y el número de ventas de hoy
       const totalVentas = ventas.length;
       const todayVentasCount = todayVentas.length;

        // Obtener todos los empleados de las ventas
        const allEmployees = ventas.map(venta => ({
          nombre: venta.empleado.nombre,
          apellido: venta.empleado.apellido
        }));

        // Eliminar duplicados de empleados
        const uniqueEmployees = allEmployees.filter((employee, index, self) =>
          index === self.findIndex(e => (
            e.nombre === employee.nombre && e.apellido === employee.apellido
          ))
        );

           // Calcular el costo total de las ventas
           const totalCost = ventas.reduce((accumulator, venta) => {
            return accumulator + venta.producto.costoPack;
          }, 0);
  

       // Actualizar el estado de totalSales y todaySales
       setTotalSales(totalVentas);
       setTodaySales(todayVentasCount);
       setEmployees(uniqueEmployees);
       setTotalCost(totalCost);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);



  return (
    <>
      <NavBar />

      <div className="container-home">
        <section className="total-sales">
      <h3>Ventas totales: {totalSales} </h3>

        </section>

        <section className="day-sales">
      <h3>Ventas del dia:{todaySales} </h3>

        </section>

        <section className="day-sales">
      <h3>Empleados: </h3>
      <ul>
            {employees.map((employee, index) => (
              <li key={index}>{employee.nombre} {employee.apellido}</li>
            ))}
          </ul>
        </section>

        <section className="day-sales">
          <h3>Costo total de ventas: ${totalCost}</h3>
        </section>
      </div>

     

    </>
  );
};

export default Home;

