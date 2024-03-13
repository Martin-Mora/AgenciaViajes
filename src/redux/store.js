import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './reducers/userReducer.js';
import employeeReducer from './reducers/employeeReducer.js';
import clientReducer from './reducers/clientReducer.js';
import serviceReducer from './reducers/serviceReducer.js';
import carritoReducer from './reducers/cartReducer.js';

const store = configureStore({
    reducer: {
        users: userReducer,
        employee: employeeReducer,
        client: clientReducer,
        service: serviceReducer,
        cart: carritoReducer, 
    }
});



export default store;
