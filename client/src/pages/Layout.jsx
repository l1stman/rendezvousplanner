import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

const Layout = () => {
  return (
    <>
        <NavBar/>
        <Outlet />
    </>
  )
};

const PublicLayout = () => {  // layout without navbar
  return (
    <>
        <Outlet />
    </>
  )
};
export {Layout, PublicLayout};
