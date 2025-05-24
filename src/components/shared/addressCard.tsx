import { MdPinDrop } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";
// import { FaPhoneAlt } from "react-icons/fa";
import { MdPhoneIphone as FaPhoneAlt } from "react-icons/md";
import { Address as AddressType } from "../../utils/types";

interface AddressCardProps {
    address: AddressType;
    showAddressPopup?: (address: AddressType) => void;
    handleDeleteClick?: (id: string) => void;
}


const AddressCard = ({ address, showAddressPopup, handleDeleteClick }: AddressCardProps) => {
    return (
        <div className="flex items-center cursor-pointer mb-3 bg-white shadow-sm border rounded-md p-3 hover:shadow-lg transition-shadow duration-300">
            <div className="bg-yellow-100 p-2 rounded-full">
                <span role="img" aria-label="home">🏠</span>
            </div>
            <div className="w-full flex items-center justify-between pl-3">
                <div>
                    <div className="flex text-black font-bold">
                        {address.name.charAt(0).toUpperCase() + address.name.slice(1)}
                        <span className="ml-10 flex items-center">
                            <FaPhoneAlt className="w-7" /> {address.phone}
                        </span>
                    </div>
                    <div className="flex-1">
                        <div className="font-semibold text-sm">{address.building}</div>
                        <div className="text-sm text-gray-600 leading-tight"> {address.formattedAddress}</div>
                    </div>
                </div>
                {showAddressPopup && handleDeleteClick && (
                    <div className="ml-5 flex items-end justify-end">
                        <div
                            className="mr-5 cursor-pointer w-5 h-5 hover:text-blue-500"
                            onClick={() => showAddressPopup(address)}
                        >
                            <BiEdit className="w-full h-full" />
                        </div>
                        <div
                            className="mr-5 cursor-pointer w-5 h-5 hover:text-red-500"
                            onClick={() => handleDeleteClick(String(address.id))}
                        >
                            <MdOutlineDelete className="w-full h-full" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddressCard;