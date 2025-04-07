// components/Toast.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideToast, showToast } from '../../store/ui';

const Toast = () => {
    const dispatch = useDispatch();
    const { message, type, visible } = useSelector((state: any) => state.ui.toast);

    useEffect(() => {
        if (visible) {
            const timer = setTimeout(() => {
                dispatch(hideToast());
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [visible, dispatch]);

    if (!visible) return null;

    const bgColor = {
        success: 'bg-green-500',
        error: 'bg-red-500',
        warning: 'bg-yellow-500',
        info: 'bg-blue-500',
    }[type as 'success' | 'error' | 'warning' | 'info'];

    return (
        <div className={`fixed top-5 right-5 z-50 min-w-[250px] px-4 py-2 rounded-md text-white shadow-lg ${bgColor}`}>
            {message}
        </div>
    );
};

export default Toast;
