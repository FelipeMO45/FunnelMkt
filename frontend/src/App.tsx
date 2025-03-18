import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./layouts/Dashboardlayout";
import Login from "./auth/Login";
import Register from './auth/Register';
import Analytics from "./pages/Analytics";
import CRM from "./pages/CRM";
import CMS from "./pages/CMS";

function App() {
  return (

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="analytics" element={<Analytics />} />
          <Route path="crm" element={<CRM />} />
          <Route path="cms" element={<CMS />} />
      </Routes>
  );
}

export default App;
