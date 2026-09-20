import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Events from "./pages/events";
import AddEvent from "./pages/addevent";
import Dashboard from "./pages/dashboard";
import EditEvent from "./pages/editevent";
import MyRegistrations from "./pages/myregistrations";

import Navbar from "./components/navbar";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/events" element={<Events />} />
        <Route path="/addevent" element={<AddEvent />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/editevent/:id" element={<EditEvent />} />
        <Route path="/myregistrations" element={<MyRegistrations />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;