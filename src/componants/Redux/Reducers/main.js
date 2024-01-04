// import { getProductsReducer } from "./ProductsReducers.js";
// import {combineReducers} from "redux";

// export const rootreducers = combineReducers({
//     getproductsdata:getProductsReducer
// })

import { getProductsReducer } from "./ProductsReducers.js";
import { combineReducers } from "redux";

export const rootReducers = combineReducers({
  getproductsdata: getProductsReducer,
})