import Navbar from "../../Navbar/Navbar"
import "../ServicepackHotel/ServicePackHotel.css"
import { agregarAlCarrito, service_render } from "../../../redux/actions/serviceAction.js";
import { useDispatch, useSelector } from "react-redux";
import { useEffect} from "react";
import { Link } from "react-router-dom";
import imgNot from "../../../Img/imgNot.svg"






const ServicePackHotel = () => {
   const dispatch = useDispatch();

  useEffect(() => {
    dispatch(service_render());
  }, [dispatch]);

  const allServices = useSelector((store) => store.service.allService || []);
  // const user = useSelector((store) => store.user)
 
  const filterHotel = [];

 for (const x of allServices) {
    if(x.nombre=="Hospedaje"){
      filterHotel.push(x)
    }
 }

 const handleAgregarAlCarrito = (servicio) => {
  dispatch(agregarAlCarrito(servicio));
  console.log(dispatch(agregarAlCarrito(servicio)));
};

//  console.log(filterHotel);

  return (
    <div className="container-hotel">
        <Navbar />
        

        <div className="addAndSearch">
          <button className="btnAdd">
            <Link to="hotelCreate" className="btnAdd-link">
              Agregar hotel
            </Link>
            <i className='bx bxs-hotel'></i>
          </button>
          {/* Aquí podrías agregar el filtro por búsqueda si lo deseas */}
          {/* Asegúrate de manejar el estado del input de búsqueda y filtrar los empleados */}
        </div>

      
        <section className="containersCards">
          {filterHotel.map((service,index)=>(
            <div key={index} className="card">
            <div className="cardImg">
              <img src={imgNot} alt="" />
            </div>

            <div className="cardinfo">
              <p className="cardinfo__item"> <b>{service.descripcion}</b> </p>
              <p className="cardinfo__item">{service.destino}</p>
              <p className="cardinfo__item">${service.costo}</p>


            <button className="cardinfo__item btnBuy" onClick={() => handleAgregarAlCarrito(service)}>agregar al carrito</button>
            </div>
          </div>
          ))}

          
        </section>
    </div>
  )
}

export default ServicePackHotel