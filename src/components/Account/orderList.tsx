import { useEffect, useState } from "react";
import { getOrderListApi } from '../../utils/Api/AppService/orderApi'
import { Loader } from '../shared';
import Lottie from 'lottie-react';
import emptyBoxAni from '../../assets/animations/animation_empty_box.json';

const statusColors = {
  "delivered": "text-green-600",
  "cancelled": "text-red-500",
  "returned": "text-yellow-600",
  "out for delivery": "text-blue-600",
  "failed": "text-red-500",// "text-gray-500",
  "pending": "text-yellow-600",
  "processing": "text-gray-500",
} as const;

type StatusColorKey = keyof typeof statusColors;


const OrderList = () => {
  const [isLoading, setLoading] = useState<boolean>(false)
  const [orderList, setOrderList] = useState<any[]>([])
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true)
      const res = await getOrderListApi();
      setOrderList(res)
      setLoading(false)
    };
    fetchOrders();
  }, []);

  return (
    <div className="relative h-fill">
      {
        isLoading ?
          <Loader className='' />
          : (
            orderList.length > 0 ?
              <>
                <div className="p-4 space-y-4">
                  {
                    orderList.map((order) => {
                      const created_at = new Date(order.created_at).toLocaleString('en-GB', {
                        weekday: 'short', day: '2-digit', month: 'short', year: '2-digit',
                        hour: '2-digit', minute: '2-digit', hour12: true
                      }).replace(',', '').replace(/(\w{3}) (\d{2}) (\w{3}) (\d{2})/, (_, day, date, month, year) => `${day.toLowerCase()}, ${date} ${month.toLowerCase()}'${year}`);
                      const orderStatus = order.order_status.split("_").join(" ")
                      return (
                        <div key={order.id} className="bg-white p-4 rounded-xl shadow flex flex-col gap-3" >
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-semibold text-lg">Order ID: #{order.order_id}</p>
                              <p className="text-sm text-gray-500">Placed on {created_at}</p>
                            </div>

                            <div className={`font-semibold ${order.payment_status === 'failed' ? statusColors["failed"] : (statusColors[order.order_status as StatusColorKey] ?? "")}`}>
                              {order.payment_status === 'failed'
                                ? "Failed"
                                : orderStatus.charAt(0).toUpperCase() + orderStatus.slice(1)}
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="flex space-x-3 text-3xl">
                              {order.product_images.slice(0, 4).map((prod_img: string, i: number) => (
                                <div key={i} className="w-14 h-14  bg-gray-50 border flex items-center justify-center text-2xl">
                                  <img src={prod_img} alt={prod_img} />
                                </div>
                              ))}
                              {order.product_images.length > 4 && (
                                <span className="text-base bg-gray-200 rounded px-2 py-1">
                                  +{order.product_images.length - 4}
                                </span>
                              )}
                            </div>
                            <p className="font-medium">${order.total_price}</p>
                          </div>
                        </div>
                      )
                    })}
                </div>
              </>
              :
              <div className="flex-1 p-2 lg:min-h-full">
                <div className="flex flex-col gap-3 justify-center items-center text-center">
                  <div className={"w-40 h-40 mb-4"}>
                    <Lottie
                      animationData={emptyBoxAni}
                      loop={true}
                      autoplay
                    />
                  </div>
                  <h3 className="font-bold text-lg leading-tight">
                    Since you haven't placed any orders yet, we don't have any order history for you.
                  </h3>
                  <p className="text-sm _text-default mb-2">
                    Why not start shopping now and purchase some healthy vegetables to kick things off?
                  </p>
                </div>
              </div>
          )
      }
    </div>
  )
};

export default OrderList;