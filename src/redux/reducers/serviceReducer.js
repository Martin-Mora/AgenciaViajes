import { createReducer } from "@reduxjs/toolkit";
import { service_render } from "../actions/serviceAction.js";


const initialState = {
  allService: [],
  filterService: [],
  service: null,
};

const serviceReducer = createReducer(initialState,(builder)=>{
  builder
  .addCase(service_render.fulfilled, (store,action)=>{
    // console.log(store);
    return {
      ...store,
      allService: action.payload,
      filterService: action.payload
    }
  })

  
})

export default serviceReducer;