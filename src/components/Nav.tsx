import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { onOpenDateModal } from "../context/slices/uiSlice";

function Nav() {
  const dispatch = useDispatch();

  return (
    <header className="headernav">
      <figure className="imgnav">
        <img src="\GlobantLogo.png" />
      </figure>
      <nav role="navigation">
        <ul className="nav-links">
          <li>
            <Link to="/">Overview</Link>
          </li>
          <li>
            <Link to="/contacts">Contacts</Link>
          </li>
          <li>
            <Link to="/favorites">Favorites</Link>
          </li>
        </ul>
      </nav>
      <button className="imgnav2" onClick={() => dispatch(onOpenDateModal())}>
        <img src="\globantbutton.png" />
      </button>
    </header>
  );
}

export default Nav;
