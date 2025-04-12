import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const iconRef = useRef<HTMLSpanElement>(null);
  const menuRef = useRef<HTMLElement>(null);
  const location = useLocation();

  const toggleMenu = () => {
    if (iconRef.current) {
      iconRef.current.classList.remove("rotating", "rotatingback");
      iconRef.current.classList.add(isOpen ? "rotatingback" : "rotating");
    }
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    if (iconRef.current) {
      iconRef.current.classList.remove("rotating", "rotatingback");
      iconRef.current.classList.add("rotatingback");
    }
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    closeMenu();
  }, [location]);

  useEffect(() => {
    return () => {
      if (iconRef.current) {
        iconRef.current.classList.remove("rotating", "rotatingback");
      }
    };
  }, []);

  return (
    <header
      ref={menuRef}
      className={`menu transition-colors duration-300 ${isOpen ? "bg-open" : ""}`}
    >
      <div className="menu-wrapper flex items-center justify-between">
        <div>
            <Link className="brand" to="/">
              blended shapes
            </Link>
        </div>
        <div className="motto">[code, design, vision].forEach(apply)</div>
        <button
          aria-label="Menu"
          className="menu-button md:hidden"
          onClick={toggleMenu}
        >
          <span ref={iconRef} className="menu-icon rotatingback"></span>
        </button>
      </div>

      <nav className={`menu-content ${isOpen ? "open" : ""}`}>
        <ul className="">
          <li className="brand">
            <Link to="/cases" className="hover:underline block">
              cases
            </Link>
          </li>
          <li>
            <Link to="/story" className="hover:underline block">
              story
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Menu;