import axios from "axios";

const serviceQueries = axios.create( {
  baseURL: 'http://149.50.138.150:9090/api/servicios',
} );

export const getAllServices = async (queryparams="")=>{
  try {
    const response = await serviceQueries.get(queryparams)
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}