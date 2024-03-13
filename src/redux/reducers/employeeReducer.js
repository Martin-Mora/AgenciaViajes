import { createReducer } from "@reduxjs/toolkit";
import { employee_render,delete_employee,employee_input} from "../actions/employeeAction.js";

const initialState = {
  allEmployee: [],
  filterEmployee: [],
  employee: null,
  selectedValue: "",
  input: "",
};

 const employeeReducer = createReducer(initialState, (builder) =>
  builder
    .addCase(employee_render.fulfilled, (store, action) => {
      // console.log("Employee Render fulfilled. Store:", store.allEmployee);
      return {
        ...store,
        allEmployee: action.payload,
        filterEmployee: action.payload, 
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
    .addCase(employee_input, (store, action) => {
      console.log("Employee Input. Store:", store);
      return {
        ...store,
        selectedValue: action.payload.selectedValue,
        input: action.payload.input,
      };
    })
    .addCase(delete_employee.fulfilled, (state, action) => {
      // Actualiza allEmployee eliminando el empleado con el id proporcionado
      state.allEmployee = state.allEmployee.filter(employee => employee.id !== action.payload.id);
    })
);


export default employeeReducer