
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./Pages/Navbar/Navbar";
import Footer from "./Pages/Footer/Footer";



const App = () => {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        
      </Routes>

      <Footer />
    </BrowserRouter>
  );
};

export default App;
