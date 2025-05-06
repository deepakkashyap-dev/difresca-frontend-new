import { Header } from './shared';
import { Outlet } from 'react-router-dom';
import CartButtonBig from './cart/CartButtonBig';
import Modal from './Modal';
import { CartPanel } from './cart';
import { useAppSelector } from '../hooks';

const RootLayout = () => {
    const modalShown = useAppSelector((state) => state.modal.visible);
    const cartShown = useAppSelector((state) => state.ui.cartPanel);

    return (
        <>
            <div>
                <Header />
                <main className="pt-24 sm:pt-20">
                    <Outlet />
                </main>
                <CartButtonBig />
            </div>
            {cartShown && <CartPanel />}
            {modalShown && <Modal />}
        </>
    );
};

export default RootLayout;
