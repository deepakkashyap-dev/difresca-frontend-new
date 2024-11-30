import React from 'react';
import { SideBar, ContentArea } from '../components/Account';

const AccountPage: React.FC = () => {
    return (
        <div className="flex h-screen bg-gray-100">
            <SideBar />
            <ContentArea />
        </div>
    );
};

export default AccountPage;
