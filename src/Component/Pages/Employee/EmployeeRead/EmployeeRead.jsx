
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../../Navbar/Navbar";
import "../EmployeeRead/EmployeeRead.css";
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from "react-redux";
import { employee_render, delete_employee } from "../../../../redux/actions/employeeAction.js";

const EmployeeRead = () => {
  const dispatch = useDispatch();
  let [searchInput, setSearchInput] = useState("");
  
  console.log(searchInput);
  // Dispatch de la acción para obtener empleados al montar el componente
  useEffect(() => {
    dispatch(employee_render());
    
  }, [dispatch]);

  const handleInput = (e) => {
        setSearchInput(e.target.value);
        
      };
  
      
  // Obtener el estado de los empleados desde el store
  const allEmployee = useSelector((store) => store.employee.allEmployee || []);

  // console.log(typeof allEmployee[0].sueldo);

    // Filtrar empleados basado en el criterio de búsqueda
    const filteredEmployees = searchInput.length > 0 ? allEmployee.filter((employee) =>
    employee.nombre.toLowerCase().includes(searchInput.toLowerCase()) ||
    employee.apellido.toLowerCase().includes(searchInput.toLowerCase())
) : allEmployee;

  // Eliminar empleado
  const deleteEmployee = (id,nombre) => {
    Swal.fire({
      title: `¿Quieres borrar al empleado ${nombre}?`,
      showDenyButton: true,
      confirmButtonText: "Confirmar",
      denyButtonText: `No quiero`,
      customClass: {
        title: 'my-swal-title'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Empleado Eliminado!",
          icon:"success",
          customClass: {
            title: 'my-swal-title'
          }
        });
        // Despacha la acción delete_employee con el id del empleado como argumento
        dispatch(delete_employee(id));
        // Actualiza manualmente el estado de allEmployee para reflejar el empleado eliminado
        const updatedEmployees = allEmployee.filter(employee => employee.id !== id);
        dispatch({ type: 'UPDATE_EMPLOYEES', payload: updatedEmployees });
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
      <Navbar />
      <div className="containerEmployer__read">
        <div className="addAndSearchClient">
          <button className="btnAdd">
            <Link to="employeeCreate" className="btnAdd-link">
              Agregar Empleado
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
            placeholder="Buscar Empleado..."
          />

        <div className="employeeList">
          <ul>
          {filteredEmployees.map((employee) => (
              <li key={employee.id} className="employeeList__item">
                {employee.nombre} {employee.apellido} 
                <div className="btnInfos">
                  <Link to={`/employeeInfo/${employee.id}`}>
                    <i className='bx bxs-show'></i>
                  </Link>
                  {/* Botón para eliminar el empleado */}
                  <i onClick={() => deleteEmployee(employee.id, `${employee.nombre} ${employee.apellido}`)} className='bx bx-x'></i>
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
