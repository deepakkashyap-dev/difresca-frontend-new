import { useAppSelector } from "../../hooks/useAppSelector";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { IoCloseCircleSharp } from "react-icons/io5";
import { GoIssueOpened } from "react-icons/go";

// import { GoIssueClosed } from "react-icons/go";
// import { IoCloseCircleOutline } from "react-icons/io5";

const status: { [key: number]: string } = {
  0: "Not Delivered",
  1: "Order Delivered",
  2: "Cancelled",
  3: "Returned",
  4: "Refunded",
  5: "On The Way",
}

const geticon = (status: string) => {
  switch (status) {
    case '1':
      return <IoCheckmarkCircleSharp className="w-5 h-5 text-green-500" />
    case '2':
      return <IoCloseCircleSharp className="w-5 h-5 text-gray-500" />
    case '3':
      return <IoCloseCircleSharp className="w-5 h-5 text-gray-500" />
    case '4':
      return <IoCloseCircleSharp className="w-5 h-5 text-gray-500" />
    case '5':
      return <IoCloseCircleSharp className="w-5 h-5 text-gray-500" />
    default:
      return <IoCloseCircleSharp className="w-5 h-5 text-gray-500" />
  }
}

const OrderList = () => {
  const { orderList } = useAppSelector((state) => state.account);
  console.log(orderList);

  return (
    <div>
      {
        orderList.length > 0 ?
          <>
            {
              orderList.map((item: { id: string, status: string, product_images: string[], checkout_time: string, order_amount: string }) => {
                return (
                  <div key={item.id} className="mb-3 bg-white shadow-sm border rounded-md p-5">
                    <div className="relative">
                      <div className="no-scrollbar flex w-full space-x-3">
                        {item.product_images.map((image) => (
                          <img
                            src={image}
                            alt=""
                            width={"50px"}
                            height={"auto"}
                            className="rounded object-cover p-1 border"
                          />
                        ))}
                      </div>
                      <div className="flex items-center space-x-2 mt-4">
                        <p className="text-500">{status[Number(item.status)]}</p>
                        <span>{geticon(item.status)}</span>
                      </div>
                      <div className="flex justify-between w-full">
                        <p className="text-sm text-gray-500">{item.checkout_time}</p>
                        <p className="font-semibold">{item.order_amount}</p>
                      </div>
                    </div>
                    {/* <div className="text-lg font-semibold text-gray-800">{item.name}</div>
                    <span className="text-center text-gray-400 mb-2">{item.addressLineOne}, {item.addressLineTwo}, {item.locality}, {item.city}, PIN {item.pincode}, Mob:-{item.phoneNo}</span> */}
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
};

export default OrderList;