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
          <h1><a href="/dev/" className="hover:underline">
          blended shapes</a></h1>
        </div>
        <div className="motto">
          we code, we design, we give art direction
        </div>
        <button
          aria-label="Menu"
          className="menu-button md:hidden"
          onClick={toggleMenu}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="icon w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <nav>
          <ul>
            <li>
              <a href="/dev/cases" className="hover:underline">
                cases
              </a>
            </li>
            <li>
              <a href="/dev/story" className="hover:underline">
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