import { IoClose, IoChevronBackSharp } from 'react-icons/io5';
import { FiChevronRight, FiPlus } from 'react-icons/fi';
import { MdLocationOn } from 'react-icons/md';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { hideCart } from '../../store/ui';
import { CartItem, ProductItem } from '../../utils/types';
import { AddToCartButton } from '../shared';
import { useEffect, useState } from 'react';
import { show as showModal } from '../../store/modal';
import { AddressCard } from '../shared';
import { updateDefaultAddressId, updateCurrentLocation } from '../../store/commonStates';
import { Address as AddressType } from '../../utils/types';
import { getDeliveryCharges } from '../../utils/Api/AppService/shippingApi';

const CartPanelItem = (props: CartItem) => {
  if (!props.product) return null;
  const { image, title, unit, unit_type, discounted_rate, unit_price } = props.product;
  return (
    <div className="flex p-4 gap-4 border-t _border-muted items-center">
      <div>
        <div className="h-[60px] w-[60px] border rounded-[10px] overflow-hidden">
          <img src={image} alt={title} className="h-full w-full" />
        </div>
      </div>
      <div className="text-left flex flex-col flex-1">
        <div className="flex justify-between items-center">
          <div className="_text-default text-[15px] leading-tight font-semibold truncate capitalize">
            {title}
          </div>
          <span className="text-[15px] text-black font-semibold leading-none">
            ${props.total_price}
          </span>
        </div>
        <div className="text-sm text-black truncate">{unit} {unit_type}</div>
        <div className="flex items-center justify-between mt-auto">
          {discounted_rate ? (
            <div className="flex gap-2 items-center">
              <span className="text-[13px] text-black leading-none antialiased font-semibold">
                ${discounted_rate}
              </span>
              <del className="text-[11px] text-gray-400">${unit_price}</del>
            </div>
          ) : (
            <div>
              <span className="text-[14px] _text-default">${unit_price}</span>
            </div>
          )}
          <div className="h-8 w-[70px]">
            <AddToCartButton product_id={props.product.id} />
          </div>
        </div>
      </div>
    </div >
  );
};

const CartPanel = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isShowSelectAddress, setShowSelectAddress] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  const { cartItems, cartId, totalQuantity, discount, distance, deliveryCharge } = useAppSelector((state) => state.cart);
  const { defaultAddressId } = useAppSelector((state) => state.persistedReducers.commonState);
  const { addressList } = useAppSelector((state) => state.account);

  const item_total = cartItems.reduce((sum: number, item: CartItem) => sum + (item.total_price || 0), 0);
  const grand_total = item_total + (deliveryCharge || 0);
  useEffect(() => {
    setIsAnimating(true);
    return () => setIsAnimating(false);
  }, []);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => dispatch(hideCart()), 300); // Match transition duration
  };

  const showAddressPopup = (): void => {
    dispatch(showModal({ type: 'addressPicker' }));
  };

  // when user select address from address list to checkout
  const updatePrimaryAddress = (address: AddressType): void => {
    setLoading(true);
    const lat = address?.coordinates?.lat || 0
    const lng = address?.coordinates?.lng || 0
    setShowSelectAddress(false);
    dispatch(updateCurrentLocation({
      lat,
      lng,
      address: address.formattedAddress,
      defaultAddressId: address.id,
    }));
    dispatch(getDeliveryCharges({ lat, lng }));
    setLoading(false);
  };

  const checkOut = (): void => {
    console.log('checkout', defaultAddressId);
    if (defaultAddressId) {
      dispatch(hideCart());
      window.location.href = '/checkout';
    }
    else setShowSelectAddress(true);
  }

  return (
    <div className="fixed inset-0 h-screen w-screen z-50 overflow-hidden p-4">
      <div
        className={`absolute z-10 inset-0 bg-black transition-opacity duration-300 ease-in-out
          ${isAnimating ? 'bg-opacity-[.65]' : 'bg-opacity-0'}`}
        onClick={handleClose}
      />
      <aside
        className={`_drawer flex flex-col overflow-y-auto overflow-x-hidden
          transform transition-transform duration-300 ease-in-out
          ${isAnimating ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {
          isShowSelectAddress ? (
            <>
              <div className="sticky top-0 bg-white flex items-center justify-between px-4 py-1 _shadow_sticky">
                <h2 className="font-extrabold text-xl _text-default">Select Address</h2>
                <IoChevronBackSharp
                  size={24}
                  className="cursor-pointer"
                  onClick={() => setShowSelectAddress(false)}
                />
              </div>

              <div className="flex-1 bg-white">
                <div className="space-y-3 my-3">
                  <div className="bg-white _border-muted">
                    <div className="pb-4 lg:block">
                      <div className="flex justify-center items-center">
                        <button
                          onClick={showAddressPopup}
                          className="bg-theme-green text-white px-3 py-2 rounded-md font-bold">
                          <FiPlus size={18} className="mr-2 inline-block " /> Add New Address
                        </button>
                      </div>
                    </div>
                    <div className="divide-y-1">
                      {addressList.length > 0 ? (
                        addressList.map((item) => <div onClick={() => updatePrimaryAddress(item)}><AddressCard address={item} key={String(item.id)} /></div>)
                      ) : (
                        <div className="flex flex-col items-center justify-center text-center py-6">
                          <img src="/no_address.png" alt="No Address" className="h-40 w-40 mb-4" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="sticky bottom-0 bg-white px-4 pt-2 pb-4 min-h-[68px] _shadow_sticky">
                <div onClick={() => console.log("0---")} className="bg-theme-green cursor-pointer text-white flex items-center px-3 py-3 rounded-[4px] font-medium text-[14px]" >
                  <div className="ml-auto flex items-center font-bold">
                    Proceed <FiChevronRight size={18} className="ml-2" />
                  </div>
                </div>
              </div>
            </>
          )
            :
            <>
              <div className="sticky top-0 bg-white flex items-center justify-between px-4 py-1 _shadow_sticky">
                <h2 className="font-extrabold text-xl _text-default">My Cart</h2>
                <IoClose
                  size={24}
                  className="cursor-pointer"
                  onClick={handleClose}
                />
              </div>
              {totalQuantity === 0 ? (
                <div className="flex-1 bg-white p-6">
                  <div className="flex flex-col gap-3 justify-center items-center text-center">
                    <img src="empty-cart.webp" alt="" className="h-36 w-36" />
                    <h3 className="font-bold text-lg leading-tight">
                      You don't have any items in your cart
                    </h3>
                    <p className="text-sm _text-default mb-2">
                      Your favourite items are just a click away
                    </p>
                    <button
                      type="button"
                      onClick={() => dispatch(hideCart())}
                      className="bg-theme-green text-white rounded-[8px] px-4 py-3 leading-none text-[13px] font-medium cursor-pointer"
                    >
                      Start Shopping
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex-1">
                    <div className="space-y-3 my-3">
                      <div className="bg-white border-y _border-muted">
                        <div className="divide-y-1">
                          {cartItems.map((item) => (
                            <CartPanelItem key={item.product_id} {...item} />
                          ))}
                        </div>
                      </div>
                      {/* <div className="bg-white">
                  <div className="font-bold text-xl text-black pt-5 px-4">
                    Before you checkout
                  </div>
                  <div className="relative px-3 my-2">
                    <SuggestedItems topItems={topProducts} />
                  </div>
                </div> */}
                      <div className="bg-white">
                        <div className="font-bold text-sm text-black pt-5 px-4">
                          Charges Summary
                        </div>
                        <div className="px-4 text-xs space-y-2 py-2">
                          <div className="flex items-start justify-between _text-default">
                            <span>Items Total</span>
                            <span>₹{item_total}</span>
                          </div>
                          <div className="flex items-start justify-between _text-default">
                            <span>Product Discount</span>
                            <span>- ₹{discount}</span>
                          </div>
                          {distance !== 0 && deliveryCharge !== 0 &&
                            <>
                              <div className="flex items-start justify-between _text-default">
                                <span>Total distance</span>
                                <span>
                                  {distance} Km
                                </span>
                              </div>
                              <div className="flex items-start justify-between _text-default">
                                <span>Delivery Charge</span>
                                <span>
                                  ₹{deliveryCharge}
                                </span>
                              </div>
                            </>
                          }
                          {/* <div className="flex items-start justify-between _text-default">
                      <span>Tax (GST)</span>
                      <span>₹{(billAmount * 0.05).toFixed(2)}</span>
                    </div> */}
                          <div className="flex items-start justify-between text-[14px] text-black font-bold py-2">
                            <span>Grand Total</span>
                            <span>₹{grand_total}</span>
                          </div>
                        </div>
                        <div className="px-4 py-2 border-t-2 bg-neutral-100 text-xs _text-muted border-b _border-muted">
                          Promo code can be applied on the payments screen
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="sticky bottom-0 bg-white  _shadow_sticky rounded-t-2xl">
                    {
                      defaultAddressId &&
                      <div className="flex items-center justify-between p-4 rounded-lg shadow-sm">
                        <div className="flex items-start gap-2 rounded-[4px] ">
                          <MdLocationOn size={24} className="text-gray-700 mt-1" />
                          <div>
                            <p className="text-sm font-semibold text-gray-900">Delivering to</p>
                            <p className="text-sm text-gray-600 truncate max-w-[17rem]">
                              {addressList.find((item) => item.id === defaultAddressId)?.formattedAddress || ""}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => setShowSelectAddress(true)}
                          className="text-theme-green-600 text-sm font-semibold"
                        >
                          Change
                        </button>
                      </div>
                    }


                    <div className='px-4 pt-2 pb-2'>
                      <div onClick={checkOut} className="bg-theme-green cursor-pointer text-white flex items-center px-3 py-3 rounded-[4px] font-medium text-[14px]">
                        <div className="font-bold">{totalQuantity} Items</div>
                        <div className="font-bold">&nbsp; &middot; &nbsp;</div>
                        <div>
                          <span className="font-extrabold">₹{grand_total}</span>
                        </div>
                        <div className="ml-auto flex items-center font-bold">
                          Proceed <FiChevronRight size={18} className="ml-2" />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </>
        }
      </aside>
    </div >
  );
};

export default CartPanel;
