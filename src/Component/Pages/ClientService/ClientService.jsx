import Navbar from "../../Navbar/Navbar.jsx";
import "../ClientService/ClientService.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { service_render } from "../../../redux/actions/serviceAction.js";

const ClientService = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(service_render());
  }, [dispatch]);

  const allServices = useSelector((store) => store.service.allService || []);

  console.log(allServices);

  return (
    <div className="containerService">
      <Navbar />

      <section className="containerService__service">
        <div className="containerService__service--card">
          {allServices.map((service, index) => (
            <div key={index} className="service-container">

              <div className="service-container__img">
              <img src={`http://149.50.138.150:9090/api/servicios/imagen/${service.imagen}`} alt={service.nombre} />

              </div>

              <div className="service-container__info">

              <p>{service.descripcion}</p>
              <p>${service.costo}</p>
              <p>{service.destino}</p>
              </div>

            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ClientService;
