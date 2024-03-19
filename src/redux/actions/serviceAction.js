import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllServices } from "../service/serviceService.js";



export const service_render= createAsyncThunk("service/render", async()=>{
  const services = await getAllServices();
  // console.log(services);
  return services;
})

export const agregarAlCarrito = createAction('AGREGAR_AL_CARRITO');

export const removeFromCart = (itemId) => {
  return {
    type: 'REMOVE_FROM_CART',
    payload: itemId
  };
};

export const empty_cart = createAction("emptyCart");