import { Outlet } from 'react-router-dom';

const ContentArea: React.FC = () => {
    return (
        <div className="bg-gray-100 hidden flex-col lg:block lg:h-[80vh] lg:w-3/4 lg:overflow-y-scroll lg:border-l p-8">
            <Outlet />
        </div>
    )
}

export default ContentArea;