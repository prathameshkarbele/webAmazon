import React from "react";
import ReactDOM from "react-dom/client";
import store from "./Store.js"; // import as default
import App from "./App";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import ContextProvider from "./componants/Context/ContextProvider.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ContextProvider>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
   </ContextProvider>
);
