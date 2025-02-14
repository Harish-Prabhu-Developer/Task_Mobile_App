import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store/index.jsx";
import { ToastContainer } from "react-toastify";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
    <div>
    <ToastContainer 
              position="bottom-right" 
              autoClose={2000} 
              hideProgressBar={false} 
              closeOnClick 
              pauseOnHover={false} 
              draggable 
              theme="colored" 
            />
    </div>
  </StrictMode>
);
