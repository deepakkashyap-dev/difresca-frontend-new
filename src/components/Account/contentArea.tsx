import { Outlet } from 'react-router-dom';

const ContentArea: React.FC = () => {
    return (
        <div className="w-3/4 p-8">
            <Outlet />
        </div>
    )
}

export default ContentArea;