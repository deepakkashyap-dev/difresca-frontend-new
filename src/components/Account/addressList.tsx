import { useAppSelector } from "../../hooks";

import { show as showModal } from '../../store/modal';
import { useAppDispatch } from '../../hooks';
import { Loader, Popup, AddressCard } from '../shared';
import { useState } from 'react';
import { deleteAddressApi } from '../../utils/Api/AppService/profileApi';
import { Address as AddressType } from "../../utils/types";

const AddressList = () => {
    const dispatch = useAppDispatch();
    const { addressList, addressLoading } = useAppSelector((state) => state.account);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [selectedAddressId, setSelectedAddressId] = useState<any>(null);

    const showAddressPopup = (address?: AddressType): void => {
        dispatch(showModal({ type: 'addressPicker', data: address }));
    };

    const handleDeleteClick = (addressId: any) => {
        setSelectedAddressId(addressId);
        setShowDeletePopup(true);
    };

    const handleDeleteConfirm = () => {
        setShowDeletePopup(false);
        dispatch(deleteAddressApi({ address_id: selectedAddressId }));
        setSelectedAddressId(null);
    };

    return (
        <div className="relative h-fill">
            <div className="pb-4 lg:block">
                <div className="flex justify-end">
                    <button onClick={() => showAddressPopup()} className="bg-theme-green text-white px-3 py-2 rounded-md font-bold">Add New Address</button>
                </div>
            </div>
            {
                addressLoading ?
                    <Loader className='' />
                    :
                    (
                        addressList.length > 0 ?
                            <>
                                {
                                    addressList.map((item) =>
                                        <AddressCard
                                            address={item}
                                            showAddressPopup={showAddressPopup}
                                            handleDeleteClick={handleDeleteClick}
                                            key={String(item.id)}
                                        />
                                    )
                                }
                            </>
                            :
                            <div className="flex flex-col items-center justify-center text-center py-6">
                                <img src="/no_address.png" alt="No Address" className="h-64 w-64 mb-4" />
                            </div>
                    )
            }

            {showDeletePopup && (
                <Popup
                    isOpen={showDeletePopup}
                    onClose={() => setShowDeletePopup(false)}
                    title="Delete Address"
                    secondaryButtonText="Cancel"
                    primaryButtonText="Delete"
                    onPrimaryClick={handleDeleteConfirm}
                    onSecondaryClick={() => setShowDeletePopup(false)}
                >
                    <div className="p-4">
                        <p className="mb-4">Are you sure you want to delete this address?</p>
                    </div>
                </Popup>
            )}
        </div>
    )
}

export default AddressList;