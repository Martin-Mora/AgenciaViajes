import Navbar from "../../Navbar/Navbar";
import "../ServicepackHotel/ServicePackHotel.css";
import { agregarAlCarrito, service_render } from "../../../redux/actions/serviceAction.js";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";


const ServicePackHotel = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(service_render());
  }, [dispatch]);

  const allServices = useSelector((store) => store.service.allService || []);
  const user = useSelector((store) => store.users.user);

  const filterHotel = allServices.filter((service) => service.nombre === "Hospedaje");

  const handleAgregarAlCarrito = (servicio) => {
    dispatch(agregarAlCarrito(servicio));
  };

  return (
    <div className="container-hotel">
      <Navbar />

     <h2 className="title">Hoteles</h2>

      <section className="containersCards">
        {filterHotel.map((service, index) => (
          <div key={index} className="card">
            <div className="cardImg">
              {/* Utiliza la URL de la imagen del servicio en lugar de imgNot */}
              <img src={`http://149.50.138.150:9090/api/servicios/imagen/${service.imagen}`} alt="" />
            </div>

            <div className="cardinfo">
              <p className="cardinfo__item"><b>{service.descripcion}</b></p>
              <p className="cardinfo__item">{service.destino}</p>
              <p className="cardinfo__item">${service.costo}</p>

              {/* Si el usuario no es un administrador, muestra el botón */}
              {user && user.nameUser === "PruebaAdmin" ? null : (
                <button className="cardinfo__item btnBuy" onClick={() => handleAgregarAlCarrito(service)}>Agregar al carrito</button>
              )}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default ServicePackHotel;
