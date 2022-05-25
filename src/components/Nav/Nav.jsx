import React from "react";
import './Nav.css'
import { NavLink } from "react-router-dom";
import EnterLogo from '../../img/arrowhite.svg'
import LightBulb from '../../img/icons8-bombilla-globo-50.svg'
import GitHubIcon from '../../img/GitHub-Mark-120px-plus.svg'

function Nav() {

  return (
    <nav className="navbar">
      <div className="centered">

          <div className="leftie">
            <img id="lIcon" src={EnterLogo} alt='icono'/>
            <NavLink id="home" className="links" to="/">Tomas Borquez</NavLink>
            <NavLink id="works" className="links" to="/Works">Works</NavLink>
            <img id="mIcon" src={GitHubIcon} alt='icono'/>
            <a id="source" className="links" href="https://github.com/TomasBorquez/PortfolioV1">Source</a>
          </div>

          <div className="rightie">
            <button id="themeswitcher">
              <img id="rIcon" src={LightBulb} alt='icono'/>
            </button>
          </div>

      </div>
    </nav>
  );
};

export default Nav;