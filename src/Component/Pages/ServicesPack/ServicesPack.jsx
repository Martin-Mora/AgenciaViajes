import Navbar from "../../Navbar/Navbar.jsx";
import "../ServicesPack/Servicespack.css";
import servicios from "../../../../data.js";
import { Link } from "react-router-dom";
// import { service_render } from "../../../redux/actions/serviceAction.js";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect} from "react";






const ServicesPack = () => {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(service_render());
  // }, [dispatch]);

  // const allServices = useSelector((store) => store.service.allService || []);
  // console.log(allServices);

  function handleClick(service){
    console.log(service.title);
  }

  return (
    <div className="container-service">
      <Navbar />

      <section className="containerService__pack">
      {servicios.map((service, index) => (
        <div key={index} className="containerService__pack--card">
          <div className="containerService--img">
            <img src={service.img} alt="" />
          </div>
          <div className="containerService--info">
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <div className="button-wrapper">
          <Link to={`/services/${service.title}`}><button onClick={() => handleClick(service)}>Ver más</button></Link>
        </div>
          </div>
        </div>
      ))}

      </section>
    </div>
  );
};

export default ServicesPack;
