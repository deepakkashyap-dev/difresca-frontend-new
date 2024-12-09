import { useAppSelector } from "../../hooks/useAppSelector";
import { HiLocationMarker } from "react-icons/hi";

const AddressList = () => {
    const { addressList } = useAppSelector((state) => state.account);
    console.log(addressList);
    return (
        <div>
            {
                addressList.length > 0 ?
                    <>
                        {
                            addressList.map((item) => {
                                return (
                                    <div key={item.addressId} className="flex cursor-pointer items-center text-left justify-center mb-3 bg-white shadow-sm border rounded-md p-5">
                                        <span className="ml-5">
                                            <HiLocationMarker />
                                        </span>
                                        <div className="ml-4 w-full mr-5 flex items-center justify-between w-4/5">
                                            <div>
                                                <div className="text-base font-bold">{item.name}</div>
                                                <span className="text-center text-gray-400 mb-2 text-sm font-normal">
                                                    {item.addressLineOne}, {item.addressLineTwo}, {item.locality}, {item.city}, PIN {item.pincode}, Mob:-{item.phoneNo}
                                                </span>
                                            </div>
                                            <div className="ml-5 flex items-end justify-end">
                                                <div className="mr-5 cursor-pointer">

                                                </div>
                                                <div className="mr-5 cursor-pointer">

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