import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Route Guard
import ProtectedRoutes from "./Components/ProtectedRoutes/ProtectedRoutes";

// Layout
import MainLayout from "./Layout/MainLayout/MainLayout";

// Admin Pages
import Dashboard from "./Pages/Dashboard/Dashboard";
import Hotelbooking from "./Components/Hotelbooking/Hotelbooking";
import Login from "./Components/Login/Login";
import ColdLead from "./Components/ColdLead/ColdLead";
import Enquiry from "./Components/Enquiry/Enquiry";
import Gallery from "./Components/Gallery/Gallery";

// =================================================
// APP ROUTES
// =================================================

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Login Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Admin Routes */}
        <Route element={<ProtectedRoutes />}>
          <Route path="/admin" element={<MainLayout />}>
            {/* Default Dashboard Page (/admin) */}
            <Route index element={<Dashboard />} />

            {/* Nested Admin Pages */}
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="hotel-booking" element={<Hotelbooking />} />
            <Route path="codeleads" element={<ColdLead />} />
            <Route path="enquiry" element={<Enquiry />} />
            <Route path="gallery" element={<Gallery />} />
          </Route>
        </Route>

        {/* Redirect Root URL */}
        <Route path="/" element={<Navigate to="/admin" replace />} />

        {/* Catch-All Invalid Routes */}
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;