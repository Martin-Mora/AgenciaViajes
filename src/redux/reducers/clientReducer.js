import { createReducer } from "@reduxjs/toolkit";
import { client_render, delete_client } from "../actions/clientAction";

const initialState = {
  allClient: [],
  filterClient: [],
  client: null,
  selectedValue: "",
  input: "",
};


const clientReducer = createReducer(initialState, (builder) =>
builder
  .addCase(client_render.fulfilled, (store, action) => {
    // console.log("Employee Render fulfilled. Store:", store.allEmployee);
    return {
      ...store,
      allClient: action.payload,
      filterClient: action.payload, 
    };
  })

  .addCase(delete_client.fulfilled, (state, action) => {
    // Actualiza allEmployee eliminando el empleado con el id proporcionado
    state.allClient = state.allClient.filter(client => client.id !== action.payload.id);
  })
);


export default clientReducer