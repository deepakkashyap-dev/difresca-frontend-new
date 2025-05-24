import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IoBagHandleSharp, IoLocationSharp, IoPersonCircleOutline } from "react-icons/io5";
import { GiExitDoor } from "react-icons/gi";
import { useAppSelector } from '../../hooks';
import { useAuth } from '../../contexts/authContext';
import { Loader, Popup } from '../shared';

const menuItems = [
    { name: 'My Order', icon: <IoBagHandleSharp className="w-5 h-5" />, link: 'order' },
    { name: 'My Address', icon: <IoLocationSharp className="w-5 h-5" />, link: 'address' },
    { name: 'My Profile', icon: <IoPersonCircleOutline className="w-5 h-5" />, link: 'profile' },
];

const SideBar: React.FC = () => {
    const [showLogoutPopup, setShowLogoutPopup] = useState(false);

    const location = useLocation();
    const { mobileNumber } = useAppSelector((state) => state.persistedReducers.auth);
    const { logout: authLogout } = useAuth();
    return (
        <div className="px-4 lg:px-0 h-full flex flex-col">
            <header className="flex items-center justify-between p-4">
                <h3 className='p-4 font-bold text-lg leading-tight'> +61 {mobileNumber.slice(1, 10)}</h3>
            </header>
            <nav className="flex flex-col justify-between flex-grow">
                <ul>
                    {menuItems.map((item, index) => (
                        <li key={index} className={`flex flex-row items-center border-b border-b-skin-muted-lightest lg:border-y lg:px-6 ${location.pathname.includes(item.link) ? 'bg-theme-green' : ''}`}  >
                            <Link to={item.link} className={`flex h-full w-full cursor-pointer justify-between overflow-hidden p-5 ${location.pathname.includes(item.link) ? 'font-bold text-lg leading-tight text-white' : 'font-bold'}`} >
                                <span className="flex items-center">
                                    {item.icon}
                                    <span className="ml-3">{item.name}</span>
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
                <div className="mt-4 lg:mt-0 lg:block bg-red-500">
                    <button
                        onClick={() => setShowLogoutPopup(true)}
                        className="font-bold text-gray-100 border-skin-secondry border flex h-full w-full justify-between p-5 text-md !text-skin-inverted lg:!justify-center lg:p-5" type="button"  >
                        <GiExitDoor className='w-6 h-6 mr-3' />
                        <div className="flex items-center justify-center">Log Out</div>
                    </button>
                </div>
                {showLogoutPopup && (
                    <Popup
                        isOpen={showLogoutPopup}
                        onClose={() => setShowLogoutPopup(false)}
                        title="Logout Confirmation"
                        secondaryButtonText="Cancel"
                        primaryButtonText="Logout"
                        onPrimaryClick={authLogout}
                        onSecondaryClick={() => setShowLogoutPopup(false)}
                    >
                        <div className="p-4">
                            <p className="mb-4">Are you sure you want to log out?</p>
                        </div>
                    </Popup>
                )}
            </nav>
        </div>
    );
};

export default SideBar;