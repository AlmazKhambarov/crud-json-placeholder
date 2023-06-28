import React from "react";
import "./Sidebar.scss";
import { NavLink } from "react-router-dom";
const Sidebar = () => {
  const navLinks = [
    { id: 1, name: "Posts", path: "/" },
    { id: 2, name: "Photos", path: "/photos" },
    { id: 3, name: "Todos", path: "/todos" },
  ];
  return (
    <div className="sidebar">
      <ul>
        {navLinks.map((link) => (
          <li key={link.id}>
            <NavLink
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
              }
              to={link.path}
            >
              {link.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
