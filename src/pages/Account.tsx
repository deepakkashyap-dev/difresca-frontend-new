import React from 'react';
import { SideBar, ContentArea } from '../components/Account';

const AccountPage: React.FC = () => {
    return (
        <div className='m-auto max-w-7xl'>
            <div className='flex flex-col items-center justify-center lg:py-10'>
                {/* <div className="flex h-screen bg-gray-100 px-4"> */}
                <div className='flex h-full w-screen flex-col rounded-lg lg:w-[90%] lg:flex-row lg:border'>
                    <aside className='w-full bg-skin-base lg:flex lg:min-h-full lg:w-1/3 lg:flex-col lg:justify-between lg:rounded-l-lg lg:bg-white'>
                        <SideBar />
                    </aside>
                    <ContentArea />
                </div>
            </div>
        </div>
    );
};

export default AccountPage;
