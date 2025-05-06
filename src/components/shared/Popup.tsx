import React from 'react';

interface PopupProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    primaryButtonText?: string;
    secondaryButtonText?: string;
    onPrimaryClick?: () => void;
    onSecondaryClick?: () => void;
    children: React.ReactNode;
}

const Popup: React.FC<PopupProps> = ({
    isOpen,
    onClose,
    title,
    primaryButtonText = 'Confirm',
    secondaryButtonText = 'Cancel',
    onPrimaryClick,
    onSecondaryClick,
    children
}) => {
    if (!isOpen) return null;

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 h-screen w-screen z-50 overflow-hidden p-4" >
            <div
                className="absolute z-10 inset-0 bg-black bg-opacity-60 transition-opacity duration-300 ease-in-out"
                onClick={handleOverlayClick}
            />
            <div className="_modal bg-white md:rounded-lg w-full md:max-w-[496px] transform transition-all">
                {title && (
                    <div className="px-6 py-2 border-b border-gray-200">
                        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
                    </div>
                )}

                <div className="px-6 py-4">
                    {children}
                </div>

                <div className="px-6 py-4 bg-gray-50 flex justify-end gap-3">
                    <button
                        onClick={onSecondaryClick || onClose}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        {secondaryButtonText}
                    </button>
                    <button
                        onClick={onPrimaryClick}
                        className="px-4 py-2 bg-red-400 text-white rounded-md hover:bg-opacity-90 transition-colors"
                    >
                        {primaryButtonText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Popup;