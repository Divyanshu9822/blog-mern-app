import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const LoggedInUser = () => {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const { handleLogout, user } = useContext(AuthContext);

    const toggleDropdown = () => {
        setIsDropdownVisible(prevState => !prevState);
    };

    const handleClick = () => {
        handleLogout();
    };

    return (
        <div className='relative'>
            <div
                id="avatarButton"
                type="button"
                onClick={toggleDropdown}
                className="h-10 w-10 text-md flex items-center justify-center text-white font-bold uppercase rounded-full cursor-pointer bg-gray-500"
            >
                {user?.fullName.substring(0,1)}
            </div>

            {isDropdownVisible && (
                <div id="userDropdown" className="z-10 absolute right-0 top-11 bg-white divide-y divide-gray-100 rounded-lg shadow-xl w-44">
                    <div className="px-4 py-3 text-sm text-gray-900">
                        <div>{user?.fullName}</div>
                        <div className="font-medium truncate">{user?.email}</div>
                    </div>
                    <ul className="py-2 text-sm text-gray-700" aria-labelledby="avatarButton">
                        <li>
                            <Link to="/my-blogs" className="block px-4 py-2 hover:bg-gray-100">My Blogs</Link>
                        </li>
                    </ul>
                    <div className="py-1">
                        <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" onClick={handleClick}>Sign out</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LoggedInUser;
