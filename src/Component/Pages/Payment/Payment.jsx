import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../Navbar/Navbar"
import "../Payment/Payment.css"
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "../Employee/EmployeeRead/EmployeeRead.css";
import { client_render } from "../../../redux/actions/clientAction";








const Payment = () => {

  const dispatch = useDispatch();

  let [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    dispatch(client_render());
    
  }, [dispatch]);
  
  // Obtener el estado de los clientes desde el store
  const allClients = useSelector((store) => store.client.allClient || []);
  

  // Filtrar clientes basado en el criterio de búsqueda
  const filteredClients = searchInput.length > 0 ? allClients.filter((client) =>
    client.nombre.toLowerCase().includes(searchInput.toLowerCase()) ||
    client.apellido.toLowerCase().includes(searchInput.toLowerCase())
  ) : allClients;

  const handleInput = (e) => {
    setSearchInput(e.target.value);
  };

  const addServices = (client) => {
    Swal.fire({
      title: `¿Quieres agregar los servicios a ${client.nombre} ${client.apellido}?`,
      showDenyButton: true,
      confirmButtonText: "Confirmar",
      denyButtonText: `No quiero`,
      customClass: {
        title: 'my-swal-title'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        // Aquí puedes manejar la lógica para agregar los servicios al cliente seleccionado
        // Por ejemplo, puedes redirigir a una página donde se agreguen los servicios
      } else if (result.isDenied) {
        Swal.fire({
          title: "Acción cancelada",
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
        <div className="addAndSearch">
          <input
            value={searchInput}
            onChange={handleInput}
            className="inputSearch"
            type="text"
            placeholder="Buscar Cliente..."
          />
        </div>

        <div className="employeeList">
          <ul>
            {filteredClients.map((client) => (
              <li key={client.id} className="employeeList__item">
                <span>{client.nombre} {client.apellido}</span>
                <div className="btnInfos">
                 
                  {/* Aquí puedes agregar un icono de selección para cada cliente */}
                  <i className='bx bx-chevrons-right btnPayment' onClick={()=> addServices(client)}></i>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <button className="btnConfirmPayment" >confirmar el pago</button>
      </div>
    </div>
  );
};

export default Payment