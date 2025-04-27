import { NavLink, Outlet } from "react-router";

const SidebarLayout = () => {
  return (
    <>
      <NavLink to="/"> home page </NavLink>
      <NavLink to="/test"> testpage </NavLink>
      <Outlet />
    </>
  );
};

export default SidebarLayout;
