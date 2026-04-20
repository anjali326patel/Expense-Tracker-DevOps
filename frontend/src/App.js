import React from "react";
import AllRoutes from "./AllRoutes";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-900 px-2 py-4">
  <div className="w-full max-w-md bg-white min-h-screen shadow-xl rounded-lg overflow-hidden border border-gray-100">
    
    <AllRoutes />

    <ToastContainer
      className={"toast_custom_design"}
      position="top-right"
      autoClose={1500}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />

  </div>
</div>
  );
};

export default App;