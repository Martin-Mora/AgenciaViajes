import { createReducer } from "@reduxjs/toolkit";
import { agregarAlCarrito, empty_cart } from "../actions/serviceAction";

const initialState = {
  elements: JSON.parse(localStorage.getItem('carrito')) || []
};

const carritoReducer = createReducer(initialState, (builder) => {
  builder.addCase(agregarAlCarrito, (state, action) => {
    // Verificar si el elemento ya existe en el array
    const existingIndex = state.elements.findIndex(item => item.id === action.payload.id);

    // Si el elemento no existe, agregarlo al array
    if (existingIndex === -1) {
      state.elements.push(action.payload);
      localStorage.setItem("carrito",JSON.stringify(state.elements));
    }
  });

  builder.addCase('REMOVE_FROM_CART', (state, action) => {
    state.elements = state.elements.filter(item => item.id !== action.payload);
    localStorage.setItem("carrito", JSON.stringify(state.elements));
  });

  builder.addCase(empty_cart, (state)=>{
    state.elements = [];
  })

});

export default carritoReducer;
