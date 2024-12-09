import React from 'react';
import { Link } from 'react-router-dom';
import { FaBox, FaAddressBook, FaUser } from 'react-icons/fa';

const menuItems = [
    { name: 'My Order', icon: <FaBox />, link: 'order' },
    { name: 'My Address', icon: <FaAddressBook />, link: 'address' },
    { name: 'My Profile', icon: <FaUser />, link: 'profile' },
];

const SideBar: React.FC = () => {
    return (
        <div className="px-4 lg:px-0">
            <h2 className="text-xl font-semibold mb-4">Options</h2>
            <nav>
                <ul>
                    {menuItems.map((item, index) => (
                        <li key={index} className="flex flex-row items-center border-b border-b-skin-muted-lightest last:border-none lg:border-y lg:px-6">
                            {item.icon}
                            <Link to={item.link} className="flex h-full w-full cursor-pointer justify-between overflow-hidden p-5 text-md text-skin-inverted">
                                {item.name}
                            </Link>
                        </li>
                    ))}
                    <li className='mt-4 hidden lg:mt-0 lg:block'>
                        <button className="border-skin-secondry border text-skin-primary border-none flex h-full w-full justify-between p-5 text-md !text-skin-inverted lg:!justify-center lg:p-5 " type="button">
                            <div className="flex items-center justify-center">Log Out</div>
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default SideBar;