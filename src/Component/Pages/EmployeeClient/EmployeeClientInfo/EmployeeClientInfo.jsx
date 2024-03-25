import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import clientImg from "../../../../Img/client.svg";
import "../../Employee/EmployeeInfo/EmployeeInfo.css";
import "../../Employee/EmployeeCreate/EmployeeCreate.css";
import Swal from 'sweetalert2';
import Navbar from "../../../Navbar/Navbar";

const EmployeeClientInfo = () => {
  const { id } = useParams();
  const [client, setClient] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchEmployee() {
      try {
        const response = await fetch(`http://149.50.138.150:9090/api/clientes/${id}`);
        const data = await response.json();
        console.log(data.cliente);
        setClient(data.cliente);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
      finally {
        setLoading(false); // Establecer loading en false independientemente de si hay un error o no
      }
    }

    fetchEmployee();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    
    setClient({
      ...client,
      [name]: value
    });
  };

  const handleEdit = async () => {
    try {
      const response = await fetch(`http://149.50.138.150:9090/api/clientes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({cliente:client}),
      
      });
      if (response.ok) {
        // Redirigir a la página de visualización del empleado después de la edición
        Swal.fire({
          title: "Empleado Editado!",
           icon:"success",
           customClass: {
            title: 'my-swal-title' // Clase CSS para aplicar estilos al título
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

  console.log({cliente:client});

  return (
    <div className="containerEmployer">
      <Navbar />

      <Link to="/clientRead" className="backEmployee"><i className='bx bx-arrow-to-left' ></i></Link> 

      <div className="containerEmployer__create">
        <div className="containerEmployer__create--img">
          <img src={clientImg} alt="" />
        </div>

        <div className="employer__create">
          <div>
            <label>Nombre:</label>
            <input type="text" id="nombre" name="nombre" value={loading ? "" : client.cliente?.nombre || ""} onChange={handleInputChange} />
          </div>
          <div>
            <label>Apellido:</label>
            <input type="text" id="apellido" name="apellido" value={loading ? "" : client?.apellido || ""} onChange={handleInputChange} />
          </div>
          <div>
            <label>Dni:</label>
            <input type="text" id="dni" name="dni" value={loading ? "" : client?.dni || ""} onChange={handleInputChange} />
          </div>
          <div>
            <label>Direccion:</label>
            <input type="text" id="direccion" name="direccion" value={loading ? "" : client?.direccion || ""} onChange={handleInputChange} />
          </div>
          <div>
            <label>Fecha nacimiento:</label>
            <input type="text" id="fechaNac" name="fechaNac" value={loading ? "" : client?.fechaNac || ""} onChange={handleInputChange} />
          </div>
          <div>
            <label>Nacionalidad:</label>
            <input type="text" id="nacionalidad" name="nacionalidad" value={loading ? "" : client?.nacionalidad || ""} onChange={handleInputChange} />
          </div>
          <div>
            <label>Celular:</label>
            <input type="text" id="celular" name="celular" value={loading ? "" : client?.celular || ""} onChange={handleInputChange} />
          </div>
          <div>
            <label>Email:</label>
            <input type="text" id="email" name="email" value={loading ? "" : client?.email || ""} onChange={handleInputChange} />
          </div>
         

          <div className="btnForm">
            <button type="submit" onClick={handleEdit} className="save">Editar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeClientInfo