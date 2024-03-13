import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import {getAllEmployee,getOneEmployee,deleteOneEmployee} from "../service/employeeService.js";

export const employee_render = createAsyncThunk("employees/render", async () => {
  const employees = await getAllEmployee();
  // console.log(employees);
  return employees;
});

export const get_employee = createAsyncThunk("employee/get_employee", async () => {
  const employee = await getOneEmployee();
  return employee;
});

export const delete_employee = createAsyncThunk("employee/delete_employee", async (id) => {
  // Eliminar el empleado con el id proporcionado
  await deleteOneEmployee(id);
  // Devolver el id eliminado como parte del payload
  return { id };
});

export const employee_input = createAction(
  "employee/input",
  (selectedValue, input) => {
    return {
      payload: {
        selectedValue,
        input,
      },
    };
  }
);

export const resetEmployee = createAction("employee/resetEmployee", () => {
  return {
    payload: null,
  };
});

export const resetSearch = createAction("employee/resetSearch", () => {
  return {
    payload: null,
  };
});
