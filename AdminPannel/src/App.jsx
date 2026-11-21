
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
import AddRooms from "./Components/AddRooms/AddRooms";
import ManageRoom from "./Components/ManageRoom/ManageRoom";
import AddBlog from "./Components/AddBlog/AddBlog";
import ManageBlog from "./Components/ManageBlog/ManageBlog";
import DailyBooking from "./Components/DailyBooking/DailyBooking";
import ReviewManagement from "./Components/ReviewManagement/ReviewManagement";
import Walletmanagement from "./Components/Walletmanagement/Walletmanagement";
import DiscountCoupon from "./Components/DiscountCoupon/DiscountCoupon";
import BookingManagement from "./Components/BookingManagement/BookingManagement";
import Profile from "./Components/Profile/profile";
import Settings from "./Components/Settings/Settings";

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
            <Route path="rooms/add" element={<AddRooms />} />
            <Route path="rooms/manage" element={<ManageRoom />} />
            <Route path="blog/posting" element={<AddBlog />} />
            <Route path="blog/management" element={<ManageBlog/>} />
            <Route path="daily-booking" element={<DailyBooking/>} />
            <Route path="reviews" element={<ReviewManagement/>} />
            <Route path="wallet" element={<Walletmanagement/>} />
            <Route path="discount-coupon" element={<DiscountCoupon/>} />
            <Route path="booking-management" element={<BookingManagement/>} />
            <Route path="profile" element={<Profile/>} />
            <Route path="settings" element={<Settings/>} />

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