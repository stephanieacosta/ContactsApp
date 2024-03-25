import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { onOpenDateModal } from "../redux/slices/uiSlice";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import { useState } from "react";

function Nav({ darkMode }: { darkMode: boolean }) {
  const dispatch = useDispatch();
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <header className="headernav">
      <figure className="imgnav">
        <img
          src={darkMode ? "/GlobantLogo2.png" : "/GlobantLogo.png"}
          alt="Logo"
        />
      </figure>
      <nav role="navigation">
        <ul className="nav-links">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "")}
              end
            >
              Overview
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contacts"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Contacts
            </NavLink>
          </li>
          <li style={{ marginRight: "1.2rem" }}>
            <NavLink
              to="/favorites"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Favorites
            </NavLink>
          </li>
        </ul>
      </nav>
      <button
        className="button-nav"
        onClick={() => dispatch(onOpenDateModal())}
      >
        <img
          src="/iconadd.png"
          className="button-content1"
          alt="Add IconS"
        ></img>
        <span className="button-content2">NEW</span>
      </button>

      <div className="navbar-menu">
        {toggleMenu ? (
          <RiCloseLine
            color="black"
            size={27}
            onClick={() => setToggleMenu(false)}
          />
        ) : (
          <RiMenu3Line
            color="black"
            size={27}
            onClick={() => setToggleMenu(true)}
          />
        )}
        {toggleMenu && (
          <div className="navbar-menu_container">
            <div className="navbar-menu_container-links">
              <nav>
                <ul>
                  <li>
                    <NavLink
                      to="/"
                      className={({ isActive }) => (isActive ? "active" : "")}
                      end
                    >
                      Overview
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/contacts"
                      className={({ isActive }) => (isActive ? "active" : "")}
                    >
                      Contacts
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/favorites"
                      className={({ isActive }) => (isActive ? "active" : "")}
                    >
                      Favorites
                    </NavLink>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Nav;
