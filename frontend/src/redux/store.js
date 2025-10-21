import {configureStore} from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import userReducer from "./userSlice.js";
import messageReducer from "./messageSlice";
import socketReducer from "./socketSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        message:messageReducer,
        socket:socketReducer,
      },
      middleware: (getDefalutMiddleware) => getDefalutMiddleware().concat(thunk),
    
});

export default store;