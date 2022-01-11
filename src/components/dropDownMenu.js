import { ReactComponent as CogIcon } from "../Image/Shop/icon/cog.svg";
import { ReactComponent as ChevronIcon } from "../Image/Shop/icon/chevron.svg";
import { ReactComponent as ArrowIcon } from "../Image/Shop/icon/arrow.svg";
import { ReactComponent as BoltIcon } from "../Image/Shop/icon/bolt.svg";
import React, { useState, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import "./index.css";

let account = localStorage.getItem("account");

function DropdownMenu() {
  const [activeMenu, setActiveMenu] = useState("main");
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMenuHeight(
      dropdownRef.current && dropdownRef.current.firstChild.offsetHeight
    );
  }, []);

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  function DropdownItem(props) {
    return (
      <a
        href="#"
        className="menu-item"
        onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}
      >
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
        <span className="icon-right">{props.rightIcon}</span>
      </a>
    );
  }

  return (
    <div className="dropdown" style={{ height: "170px" }} ref={dropdownRef}>
      <CSSTransition
        in={activeMenu === "main"}
        timeout={500}
        classNames="menu-primary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <span style={{ color: "#FFF", padding: "10px" }}>
            <b>Your Profile</b>
          </span>
          <DropdownItem
            leftIcon={<BoltIcon height="17" style={{ color: "#fff" }} />}
          >
            {account.substr(0, 6).concat(" . . . ") + account.substr(36, 6)}
          </DropdownItem>
          <DropdownItem
            leftIcon={<CogIcon height="20" style={{ color: "#fff" }} />}
            rightIcon={<ChevronIcon height="20" style={{ color: "#fff" }} />}
            goToMenu="settings"
          >
            Settings
          </DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === "settings"}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem
            goToMenu="main"
            leftIcon={<ArrowIcon height="20" style={{ color: "#fff" }} />}
          >
            <h2>My Wallet</h2>
          </DropdownItem>
          <DropdownItem
            leftIcon={<BoltIcon height="20" style={{ color: "#fff" }} />}
          >
            Awesome!
          </DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
}

export default DropdownMenu;
