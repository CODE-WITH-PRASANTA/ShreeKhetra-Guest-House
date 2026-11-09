
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./Pages/Navbar/Navbar";
import Footer from "./Pages/Footer/Footer";
import About from "./Pages/About/About";
import RoomAndSuits from "./Pages/RoomAndSuits/RoomAndSuits";
import Gallary from "./Pages/Gallary/Gallary";
import OurTeam from "./Pages/OurHappyClients/OurHappyClients";

import News from "./Pages/News/News";
import Service from "./Pages/Service/Service";
import OurHappyClients from "./Pages/OurHappyClients/OurHappyClients";
import FandQ from "./Pages/FandQ/FandQ";



const App = () => {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        
        <Route path="/about" element={<About/>} />
         <Route path="/rooms" element={<RoomAndSuits/>} />
         <Route path="/gallery" element={<Gallary/>} />
         <Route path="/clients" element={<OurHappyClients/>}/>
        <Route path="/faq" element={<FandQ/> }/>
         <Route path="news" element={<News/>}/>
         <Route path="services" element={<Service/>}/>
      </Routes>

      <Footer />
    </BrowserRouter>
  );
};

export default App;
