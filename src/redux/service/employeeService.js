import axios from "axios";

const employeeQueries = axios.create( {
    baseURL: 'http://149.50.138.150:9090/api/empleados',
  } );


  export const getAllEmployee = async (queryParams="") => {
    try {
        const response = await employeeQueries.get(queryParams)
        // console.log(response.data);
        return response.data
    } catch (error) {
        console.log(error);
    }
  }

  export const getOneEmployee = async ( id ) => {
    try {
        const response = await employeeQueries('/'+id)
        return response.data
    } catch (error) {
        console.log(error);
    }
  }

  export const deleteOneEmployee = async (id) => {
    try {
      const response = await employeeQueries.delete(`/${id}`);
      return response.data; // Opcional: Devuelve cualquier dato adicional necesario
    } catch (error) {
      console.error("Error deleting employee:", error);
      throw error;
    }
  };