import { useState } from "react";

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="menu">
      <div className="menu-wrapper">
        <div>
          <h1><a href="/" className="hover:underline">
            blended shapes</a></h1>
        </div>
        <div className="motto">
          [code, design, vision].forEach(apply)
        </div>
        <button
          aria-label="Menu"
          className="menu-button md:hidden"
          onClick={toggleMenu}
        >
          <span className="menu-icon"></span>
        </button>
      </div>

      {isOpen && (
        <nav>
          <ul>
            <li>
              <a href="/cases" className="hover:underline">
                cases
              </a>
            </li>
            <li>
              <a href="/story" className="hover:underline">
                story
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Menu;