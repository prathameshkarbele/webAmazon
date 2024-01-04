// const products = [];

// export const getProductsReducer = (state=(products),action) =>{
//  switch(action.type){
//     case "SUCCESS_GET_PRODUCTS":
//         return {products:action.payload}

//     case "FAIL_GET_PRODUCTS":
//         return {products:action.payload}
    
//     default : return state
//  }
// }

const initialState = {
    data: [],
    loading: false,
    error: null,
  };
  
  export const getProductsReducer = (state = initialState, action) => {
    switch (action.type) {
      case "FETCHING_PRODUCTS":
        return { ...state, loading: true, error: null };
      case "SUCCESS_GET_PRODUCTS":
        return { ...state, data: action.payload, loading: false, error: null };
      case "FAIL_GET_PRODUCTS":
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };