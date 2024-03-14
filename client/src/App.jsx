import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Layout, PublicLayout} from "./pages/Layout";
import Home from "./pages/Home";
import './App.css';
import Explore from "./pages/Explore";
import Plan from "./pages/[Plan]";
import PlanReserve from "./pages/[Plan]reserve";
import AuthPage from "./pages/Auth";
import Dashboard from "./pages/dashboard";
import NotFound from "./pages/notfound";
import Profile from "./pages/Profile";
import ViewerProfile from "./pages/Profile[id]";



function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/plans/:id" element={<Plan/>} />
        <Route path="/plans/:id/reserve" element={<PlanReserve/>} />
        <Route path="/auth" element={<AuthPage/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/profile/:id" element={<ViewerProfile/>} />
        <Route path="*" element={<NotFound/>} />
      </Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
