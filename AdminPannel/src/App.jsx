
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Layout
import MainLayout from "./Layout/MainLayout/MainLayout";

// Admin Pages
import Dashboard from "./Pages/Dashboard/Dashboard";

// =================================================
// APP ROUTES
// =================================================

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Admin Layout */}
        <Route path="/admin" element={<MainLayout />}>

          {/* Default Dashboard Page */}
          <Route index element={<Dashboard />} />

          {/* Dashboard Route */}
          <Route path="dashboard" element={<Dashboard />} />

        </Route>

        {/* Redirect Root URL */}
        <Route
          path="/"
          element={<Navigate to="/admin" replace />}
        />

        {/* Invalid Route */}
        <Route
          path="*"
          element={<Navigate to="/admin" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
