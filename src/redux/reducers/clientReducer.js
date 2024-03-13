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
  // .addCase(get_employee.fulfilled, (store, action) => {
  //   console.log("Get Employee fulfilled. Store:", store);
  //   return {
  //     ...store,
  //     employee: action.payload,
  //   };
  // })
  // .addCase(resetEmployee.fulfilled, (store, action) => {
  //   console.log("Reset Employee fulfilled. Store:", store);
  //   return {
  //     ...store,
  //     employee: action.payload,
  //   };
  // })
  // .addCase(resetSearch, (stateActual) => {
  //   console.log("Reset Search. Store:", stateActual);
  //   return {
  //     ...stateActual,
  //     input: "",
  //   };
  // })
  // .addCase(employee_input, (store, action) => {
  //   console.log("Employee Input. Store:", store);
  //   return {
  //     ...store,
  //     selectedValue: action.payload.selectedValue,
  //     input: action.payload.input,
  //   };
  // })
  .addCase(delete_client.fulfilled, (state, action) => {
    // Actualiza allEmployee eliminando el empleado con el id proporcionado
    state.allClient = state.allClient.filter(client => client.id !== action.payload.id);
  })
);


export default clientReducer