import axios from "axios";

const clientQueries = axios.create( {
    baseURL: 'http://149.50.138.150:9090/api/clientes',
  } );


  export const getAllClients = async (queryParams="") => {
    try {
        const response = await clientQueries .get(queryParams)
        // console.log(response.data);
        return response.data
    } catch (error) {
        console.log(error);
    }
  }

  export const getOneClient = async ( id ) => {
    try {
        const response = await clientQueries ('/'+id)
        return response.data
    } catch (error) {
        console.log(error);
    }
  }

  export const deleteOneClient = async (id) => {
    try {
      const response = await clientQueries.delete(`/${id}`);
      return response.data; // Opcional: Devuelve cualquier dato adicional necesario
    } catch (error) {
      console.error("Error deleting employee:", error);
      throw error;
    }
  };