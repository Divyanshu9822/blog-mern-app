import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import LoggedInUser from './LoggedInUser';

const Navbar = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const { isLoggedIn } = useContext(AuthContext)

  const closeMenu = () => {
    setIsMenuActive(false);
  };

  const toggle = () => {
    setIsMenuActive((prevIsMenuActive) => !prevIsMenuActive);
  };

  return (
    <header className="bg-white text-black border-b sticky top-0 z-10">
      <nav className="flex items-center gap-5 justify-between p-6 relative">
        <div
          id="menu-btn"
          className='hidden max-[1050px]:block max-[1050px]:order-1 text-3xl cursor-pointer'
          onClick={toggle}
        >
          ☰
        </div>
        <ul className="max-[1050px]:order-2">
          <li className="font-bold text-2xl">Bloggify</li>
        </ul>
        <ul id="menu" className={`menu ${isMenuActive ? 'active' : ''}`}>
          <li >
            <i className="fas fa-times close-btn mb-12 cursor-pointer text-2xl" onClick={closeMenu}></i>
          </li>
          <li >

            <Link to="/">
              <span className="px-2 py-3 cursor-pointer" onClick={closeMenu}>Home</span>
            </Link>
          </li>
          <li >

            <Link to="/blogs">
              <span className="px-2 py-3 cursor-pointer" onClick={closeMenu}>Blogs</span>
            </Link>
          </li>
        </ul>
        <ul className="flex gap-2 items-center ml-auto max-[1050px]:ml-0 max-[1050px]:order-3">
          <li >
            <Link to="/write">
              <span className="py-2 px-3 cursor-pointer border border-black rounded-md hover:text-white hover:bg-black">

                <i class="fa-regular fa-pen-to-square"></i> <span className='max-[1050px]:hidden'>Write</span>
              </span>
            </Link>
          </li>
          <li >
            {isLoggedIn ? <LoggedInUser /> :
              <Link to="/login"><span className="px-6 py-2 cursor-pointer border border-black rounded-md hover:text-white hover:bg-black">Login</span></Link>}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
