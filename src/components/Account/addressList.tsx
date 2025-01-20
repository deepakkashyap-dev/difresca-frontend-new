import { useAppSelector } from "../../hooks";
import { MdPinDrop } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { show as showModal } from '../../store/modal';
import { useAppDispatch } from '../../hooks';

const AddressList = () => {
    const dispatch = useAppDispatch();
    const { addressList } = useAppSelector((state) => state.account);
    console.log(addressList);
    const showAddressPopup = (): void => {
        dispatch(showModal({ type: 'addressPicker' }));
    };
    return (
        <div>
            <div className="pb-4 lg:block">
                <div className="flex justify-end">
                    <button onClick={showAddressPopup} className="bg-theme-green text-white px-3 py-2 rounded-md font-bold">Add New Address</button>
                </div>
            </div>
            {
                addressList.length > 0 ?
                    <>
                        {
                            addressList.map((item) => {
                                return (
                                    <div key={item.addressId} className="flex items-center cursor-pointer mb-3 bg-white shadow-sm border rounded-md p-3 hover:shadow-lg transition-shadow duration-300">
                                        <div className="w-10 h-10 mr-4 flex items-center justify-center border border-gray-300 rounded-md p-1">
                                            <MdPinDrop className="w-full h-full" />
                                        </div>
                                        <div className="w-full flex items-center justify-between ">
                                            <div>
                                                <div className="flex text-base font-bold">
                                                    {item.name}
                                                    <span className="ml-5 text-gray-400 flex items-center">
                                                        <FaPhoneAlt className="w-7" /> {item.phoneNo}
                                                    </span>
                                                </div>
                                                <div className="text-gray-400 text-sm font-bold">{item.building}</div>
                                                <span className="text-gray-400 text-sm font-bold">
                                                    {item.formattedAddress}
                                                </span>
                                            </div>
                                            <div className="ml-5 flex items-end justify-end">
                                                <div className="mr-5 cursor-pointer w-5 h-5 hover:text-blue-500">
                                                    <BiEdit className="w-full h-full" />
                                                </div>
                                                <div className="mr-5 cursor-pointer w-5 h-5 hover:text-red-500">
                                                    <MdOutlineDelete className="w-full h-full" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </>
                    :
                    <div>No addresses</div>

            }
        </div>
    )
}

export default AddressList;