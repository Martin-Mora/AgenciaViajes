import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteOneClient, getAllClients, getOneClient } from "../service/clientService";

export const client_render = createAsyncThunk("clients/render", async () => {
  const clients = await getAllClients();
  console.log(clients);
  return clients;
});

export const get_client = createAsyncThunk("employee/get_client", async () => {
  const client = await getOneClient();
  return client;
});

export const delete_client = createAsyncThunk("employee/delete_client", async (id) => {
  // Eliminar el empleado con el id proporcionado
  await deleteOneClient(id);
  // Devolver el id eliminado como parte del payload
  return { id };
});
