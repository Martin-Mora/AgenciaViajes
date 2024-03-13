import Navbar from "../../Navbar/Navbar.jsx";
import "../EmployeeCreate/EmployeeCreate.css";
import employee from "../../../Img/Employee.svg";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';


const EmployeCreate = () => {

  const navigate = useNavigate()

  const nombre = useRef();
  const apellido = useRef();
  const dni = useRef();
  const direccion = useRef();
  const fechaNac = useRef();
  const nacionalidad = useRef();
  const celular = useRef();
  const email = useRef();
  const sueldo = useRef();
  const cargo = useRef();

 

  let bodyEmployee;


  const emptyInputs = () =>{
    email.current.value="";
    apellido.current.value="";
    nombre.current.value="";
    dni.current.value="";
    fechaNac.current.value="";
    direccion.current.value="";
    celular.current.value="";
    nacionalidad.current.value="";
    sueldo.current.value="";
    cargo.current.value="";
  }

   const createEmployee = async (e)=> {
    e.preventDefault();

     bodyEmployee = {
      "email" : email.current.value,
      "apellido" : apellido.current.value,
      "nombre" : nombre.current.value,
      "dni" : dni.current.value,
      "fechaNac" : fechaNac.current.value,
      "direccion":direccion.current.value,
      "celular" : celular.current.value,
      "nacionalidad" : nacionalidad.current.value,
      "sueldo" : sueldo.current.value,
      "cargo" : cargo.current.value,
      
    }

    console.log(bodyEmployee);

    try {

      const response = await fetch("http://149.50.138.150:9090/api/empleados/", {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyEmployee)
      });
      if (response.ok) {
        // Redirigir a la página de visualización del empleado después de la edición
        Swal.fire({
          title: "Empleado Agregado!",
           icon:"success",
           customClass: {
            title: 'my-swal-title' // Clase CSS para aplicar estilos al título
          }
        });
        navigate("/employeeRead");
      } else {
        console.error('Error al agregar el empleado');
      }
    } catch (error) {
      console.error('Error al agregar el empleado:', error);
    }
  }


  return (
    <div className="containerEmployer">
      <Navbar />

      <Link to="/employeeRead" className="backEmployee"><i className='bx bx-arrow-to-left' ></i></Link> 

      <div className="containerEmployer__create">
        <div className="containerEmployer__create--img">
          <img src={employee} alt="" />
        </div>

        <div className="employer__create">
          <div>
            <label>Nombre:</label>
            <input type="text" id="nombre" name="nombre" ref={nombre} required />
          </div>
          <div>
            <label>Apellido:</label>
            <input type="text" id="apellido" name="apellido" ref={apellido} required />
          </div>
          <div>
            <label>Dni:</label>
            <input type="text" id="dni" name="dni" ref={dni} required />
          </div>
          <div>
            <label>Direccion:</label>
            <input type="text" id="direccion" name="direccion" ref={direccion} required />
          </div>
          <div>
            <label>Fecha nacimiento:</label>
            <input type="text" id="fechaNac" name="fechaNac" ref={fechaNac} required />
          </div>
          <div>
            <label>Nacionalidad:</label>
            <input type="text" id="nacionalidad" name="nacionalidad" ref={nacionalidad} required />
          </div>
          <div>
            <label>Celular:</label>
            <input type="number" id="celular" name="celular" ref={celular} required />
          </div>
          <div>
            <label>Email:</label>
            <input type="text" id="email" name="email" ref={email} required />
          </div>
          <div>
            <label>Sueldo:</label>
            <input type="number" id="sueldo" name="sueldo" ref={sueldo} required />
          </div>
          <div>
            <label>Cargo:</label>
            <input type="text" id="cargo"  name="cargo" ref={cargo} required />
          </div>

          <div className="btnForm">
            <button onClick={emptyInputs} className="empty">Limpiar</button>
            <button onClick={createEmployee} type="submit" className="save">Guardar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeCreate;
