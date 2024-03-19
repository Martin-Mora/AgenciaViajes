
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../../../Navbar/Navbar.jsx"
import "../../Employee/EmployeeRead/EmployeeRead.css";
import "../EmployeeClientRead/EmployeeClientRead.css"
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from "react-redux";
import { client_render, delete_client } from "../../../../redux/actions/clientAction.js";


const EmployeeRead = () => {
  const dispatch = useDispatch();
  let [searchInput, setSearchInput] = useState("");
  
  console.log(searchInput);
  // Dispatch de la acción para obtener empleados al montar el componente
  useEffect(() => {
    dispatch(client_render());
    
  }, [dispatch]);

  const handleInput = (e) => {
        setSearchInput(e.target.value);
        
      };
  
      
  // Obtener el estado de los empleados desde el store
  const allClients = useSelector((store) => store.client.allClient || []);
  console.log(allClients);

  // console.log(typeof allEmployee[0].sueldo);

    // Filtrar empleados basado en el criterio de búsqueda
    const filteredClients = searchInput.length > 0 ? allClients.filter((client) =>
    client.nombre.toLowerCase().includes(searchInput.toLowerCase()) ||
    client.apellido.toLowerCase().includes(searchInput.toLowerCase())
) : allClients;

  // Eliminar empleado
  const delete_cli = (id,nombre) => {
    Swal.fire({
      title: `¿Quieres borrar al cliente ${nombre}?` ,
      showDenyButton: true,
      confirmButtonText: "Confirmar",
      denyButtonText: `No quiero`,
      customClass: {
        title: 'my-swal-title'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Cliente Eliminado!",
          icon:"success",
          customClass: {
            title: 'my-swal-title'
          }
        });
        // Despacha la acción delete_employee con el id del empleado como argumento
        dispatch(delete_client(id));
        // Actualiza manualmente el estado de allEmployee para reflejar el empleado eliminado
        const updatedClients = allClients.filter(client => client.id !== id);
        dispatch({ type: 'UPDATE_EMPLOYEES', payload: updatedClients });
      } else if (result.isDenied) {
        Swal.fire({
          title: "Eliminacion cancelada",
          icon: "info",
          customClass: {
            title: 'my-swal-title'
          }
        });
      }
    });
  };


  return (
    <div className="containerEmployer">
      <NavBar />
      <div className="containerEmployer__read">
        <div className="addAndSearchClient">
          <button className="btnAdd">
            <Link to="employeeCreate" className="btnAdd-link">
              Agregar Cliente
            </Link>
            <i className='bx bxs-user-plus'></i>
          </button>
          {/* Aquí podrías agregar el filtro por búsqueda si lo deseas */}
          {/* Asegúrate de manejar el estado del input de búsqueda y filtrar los empleados */}
        </div>

        <input
            value={searchInput}
            onChange={handleInput}
            className="inputSearch"
            type="text"
            placeholder="Buscar Cliente..."
          />

        <div className="employeeList">
          <ul>
          {filteredClients.map((client) => (
              <li key={client.id} className="employeeList__item">
                {client.nombre} {client.apellido} 
                <div className="btnInfos">
                  <Link to={`/clientInfo/${client.id}`}>
                    <i className='bx bxs-show'></i>
                  </Link>
                  {/* Botón para eliminar el empleado */}
                  <i onClick={() => delete_cli(client.id, `${client.nombre} ${client.apellido}`)} className='bx bx-x'></i>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EmployeeRead;
