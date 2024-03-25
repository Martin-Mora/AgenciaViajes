import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../../../Navbar/Navbar.jsx";
import employee2 from "../../../../Img/Employee.svg";
import "../EmployeeInfo/EmployeeInfo.css";
import "../EmployeeCreate/EmployeeCreate.css";
import Swal from 'sweetalert2';

const EmployeeInfo = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchEmployee() {
      try {
        const response = await fetch(`http://149.50.138.150:9090/api/empleados/${id}`);
        const data = await response.json();
        console.log(data);
        setEmployee(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching employee data:", error);
        setLoading(false);
      }
    }

    fetchEmployee();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee({
      ...employee,
      [name]: value
    });
  };

  const handleEdit = async () => {
    try {
      const response = await fetch(`http://149.50.138.150:9090/api/empleados/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(employee)
      });
      if (response.ok) {
        // Redirigir a la página de visualización del empleado después de la edición
        Swal.fire({
          title: "Empleado Editado!",
           icon:"success",
           customClass: {
            title: 'my-swal-title' 
          }
        });
        navigate("/employeeRead");
      } else {
        console.error('Error al editar el empleado');
      }
    } catch (error) {
      console.error('Error al editar el empleado:', error);
    }
  };

  return (
    <div className="containerEmployer">
      <Navbar />

      <Link to="/employeeRead" className="backEmployee"><i className='bx bx-arrow-to-left' ></i></Link> 

      <div className="containerEmployer__create">
        <div className="containerEmployer__create--img">
          <img src={employee2} alt="" />
        </div>

        <div className="employer__create">
          <div>
            <label>Nombre:</label>
            <input type="text" id="nombre" name="nombre" value={loading ? "" : employee?.nombre} onChange={handleInputChange} />
          </div>
          <div>
            <label>Apellido:</label>
            <input type="text" id="apellido" name="apellido" value={loading ? "" : employee?.apellido} onChange={handleInputChange} />
          </div>
          <div>
            <label>Dni:</label>
            <input type="text" id="dni" name="dni" value={loading ? "" : employee?.dni} onChange={handleInputChange} />
          </div>
          <div>
            <label>Direccion:</label>
            <input type="text" id="direccion" name="direccion" value={loading ? "" : employee?.direccion} onChange={handleInputChange} />
          </div>
          <div>
            <label>Fecha nacimiento:</label>
            <input type="text" id="fechaNacimiento" name="fechaNacimiento" value={loading ? "" : employee?.fechaNac} onChange={handleInputChange} />
          </div>
          <div>
            <label>Nacionalidad:</label>
            <input type="text" id="nacionalidad" name="nacionalidad" value={loading ? "" : employee?.nacionalidad} onChange={handleInputChange} />
          </div>
          <div>
            <label>Celular:</label>
            <input type="text" id="celular" name="celular" value={loading ? "" : employee?.celular} onChange={handleInputChange} />
          </div>
          <div>
            <label>Email:</label>
            <input type="text" id="email" name="email" value={loading ? "" : employee?.email} onChange={handleInputChange} />
          </div>
          <div>
            <label>Sueldo:</label>
            <input type="text" id="sueldo" name="sueldo" value={loading ? "" : employee?.sueldo} onChange={handleInputChange} />
          </div>
          <div>
            <label>Cargo:</label>
            <input type="text" id="cargo" name="cargo" value={loading ? "" : employee?.cargo} onChange={handleInputChange} />
          </div>

          <div className="btnForm">
            <button type="submit" onClick={handleEdit} className="save">Editar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeInfo;
