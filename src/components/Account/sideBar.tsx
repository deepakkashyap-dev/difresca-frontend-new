import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const SideBar: React.FC = () => {
    return (
        <div className="w-1/4 bg-white shadow-md p-4" >
            <h2 className="text-xl font-semibold mb-4">Options</h2>
            <ul>
                <li className="py-2 px-4 cursor-pointer hover:bg-gray-200 rounded">
                    <Link to="order" className="text-gray-700">
                        My Order
                    </Link>
                </li>
                <li className="py-2 px-4 cursor-pointer hover:bg-gray-200 rounded">
                    <Link to="address" className="text-gray-700">
                        My Address
                    </Link>
                </li>
                <li className="py-2 px-4 cursor-pointer hover:bg-gray-200 rounded">
                    <Link to="profile" className="text-gray-700">
                        My Profile
                    </Link>
                </li>
            </ul>
        </div>
    );
}
export default SideBar; 