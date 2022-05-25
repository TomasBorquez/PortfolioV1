import React from "react";
import './Nav.css'
import { NavLink } from "react-router-dom";

function Nav() {

  return (
    <nav className="navbar">
      <div className="centered">
          <NavLink className="Home space" to="/">Tomas Borquez</NavLink>
          <NavLink className="Works space" to="/Works">Works</NavLink>
          <a className="space" href="https://github.com/TomasBorquez/PortfolioV1">Source</a>
          {/* <p>might add the dark/light switch</p> */}
      </div>
    </nav>
  );
};

export default Nav;