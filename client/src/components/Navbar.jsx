import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import LoggedInUser from './LoggedInUser';

const Navbar = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);
  const location = useLocation();

  const closeMenu = () => {
    setIsMenuActive(false);
  };

  const toggle = () => {
    setIsMenuActive((prevIsMenuActive) => !prevIsMenuActive);
  };

  return (
    <header className="bg-white text-black border-b sticky top-0 z-50">
      <nav className="flex items-center gap-5 justify-between px-6 py-4 relative">
        <div id="menu-btn" className="hidden max-[1050px]:block max-[1050px]:order-1 text-3xl cursor-pointer" onClick={toggle}>
          ☰
        </div>
        <ul className="max-[1050px]:order-2">
          <li className="font-bold text-2xl">Bloggify</li>
        </ul>
        <ul id="menu" className={`menu ${isMenuActive ? 'active' : ''}`}>
          <li>
            <i className="fas fa-times close-btn mb-12 cursor-pointer text-2xl" onClick={closeMenu}></i>
          </li>
          <li>
            <Link to="/" onClick={closeMenu}>
              <span className={`px-2 py-3 cursor-pointer ${location.pathname === '/' ? 'font-bold' : ''}`}>Home</span>
            </Link>
          </li>
          <li>
            <Link to="/blogs" onClick={closeMenu}>
              <span className={`px-2 py-3 cursor-pointer ${location.pathname.startsWith('/blogs') ? 'font-bold' : ''}`}>Blogs</span>
            </Link>
          </li>
        </ul>
        <ul className="ml-auto max-[1050px]:ml-0 max-[1050px]:order-3">
          <li>
            {isLoggedIn ? (
              <LoggedInUser />
            ) : (
              <Link to="/login">
                <span className="px-6 py-2 cursor-pointer border border-black rounded-md hover:text-white hover:bg-black">
                  Login
                </span>
              </Link>
            )}
          </li>
        </ul>
        <div className={`overlay ${isMenuActive ? 'active' : ''}`} onClick={closeMenu}></div>
      </nav>
    </header>
  );
};

export default Navbar;
