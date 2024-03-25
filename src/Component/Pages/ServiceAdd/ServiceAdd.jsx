import { useRef, useState } from "react"
import Navbar from "../../Navbar/Navbar"
import Swal from "sweetalert2"
import "../ServiceAdd/ServiceAdd.css"




const ServiceAdd = () => {
  const [categoria, setCategoria] = useState("");


  
  const descripcion = useRef();
  const destino = useRef();
  const costo = useRef();
  const imagen = useRef();
 

  let bodyService;

  const emptyInputs = () =>{
    descripcion.current.value="";
    destino.current.value="";
    costo.current.value="";
    imagen.current.value="";
    
  }



  const createService = async (e)=> {
    e.preventDefault();

    

     bodyService = {
      nombre: categoria,
      "descripcion" : descripcion.current.value,
      "costo" : costo.current.value,
      "destino":destino.current.value,
      "imagen" : imagen.current.value,
      
    }

    console.log(bodyService);

    try {

      const response = await fetch("http://149.50.138.150:9090/api/servicios", {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyService)
      });
      if (response.ok) {
        // Redirigir a la página de visualización del empleado después de la edición
        Swal.fire({
          title: "Servicio Agregado!",
           icon:"success",
           customClass: {
            title: 'my-swal-title' 
          }
        });
        // navigate("/employeeRead");
      } else {
        console.error('Error al agregar servicio');
      }
    } catch (error) {
      console.error('Error al agregar servicio:', error);
    }
  }

  return (
    <div className="container-serviceAdd">

      <Navbar />

      <h2>aca agregas servicios</h2>


      <div className="service__create">
          <div>
            <label>Categoria:</label>
            <select value={categoria} onChange={(e) => setCategoria(e.target.value)} required>
            <option value="">Selecciona una categoría</option>
            <option value="Hotel">Hotel</option>
            <option value="Auto">Auto</option>
            <option value="Pasaje de colectivo">Pasaje de colectivo</option>
            <option value="Pasaje de avión">Pasaje de avión</option>
            <option value="Pasaje de tren">Pasaje de tren</option>
            <option value="Excursion">Excursión</option>
            <option value="Entrada evento">Entrada evento</option>
          </select>
          </div>
          <div>
            <label>Descripcion:</label>
            <input type="text" id="descripcion" name="descripcion" ref={descripcion} required />
          </div>
          <div>
            <label>Destino:</label>
            <input type="text" id="destino" name="destino" ref={destino} required />
          </div>
          <div>
            <label>Costo:</label>
            <input type="number" id="costo" name="costo" ref={costo} required />
          </div>
          <div>
            <label>Imagen:</label>
            <input type="file" id="imagen" name="imagen" ref={imagen} accept="image/png, image/jpeg , image/jpg" required />
          </div>
        
        

          <div className="btnForm">
            <button onClick={emptyInputs} className="empty">Limpiar</button>
            <button onClick={createService} type="submit" className="save">Guardar</button>
          </div>
        </div>

    </div>
  )
}

export default ServiceAdd