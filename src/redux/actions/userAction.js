import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

export const userRegister = createAction( 'user_register', (user) => {
  return {
      payload : user
  } 
} )


export const signIn = createAsyncThunk( "log_user", async ( body ) => {
  try {
      const response = await axios.post( 'https://mytinerary-back-martinmora-production.up.railway.app/api/verification/signin', body )
      localStorage.setItem( 'token', response.data.token )
      console.log(response.data.token);
      console.log(response);
      return response.data
  } catch (error) {
    console.log(error)
    return error.response.data
   
  }
} )



export const signInToken = createAsyncThunk( "token_login", async (  ) => {
  try {
      const token = localStorage.getItem( 'token' )
      const response = await axios.post( 'https://mytinerary-back-martinmora-production.up.railway.app/api/verification/signin/token',{}, {
          headers: {
              Authorization : "Bearer " + token
            }
      })
      // console.log(response);
      return {
          user : response.data.userData,
          token : token
      }
  } catch (error) {
      console.log( error )
  }
} )

export const logOut = createAction( "log_out", async () => {
  localStorage.removeItem('token')
        return {
            payload : null
        }
} )