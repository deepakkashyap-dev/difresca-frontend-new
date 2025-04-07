import React from 'react';
import { IoAddSharp, IoRemoveSharp } from 'react-icons/io5';
import { useAppDispatch, useAppSelector } from '../../hooks';
// import { addItemToGuestCart, removeItemFromGuestCart } from '../../store/cart';
import { addToCart, removeFromCart } from '../../utils/Api/AppService/cartApi';
import { CartProduct } from '../../utils/types';
import { isTokenExpired } from '../../utils/helper';
import { show as showModal } from '../../store/modal';


type ButtonProps = {
  product_id: number | string,//CartProduct;
  size?: 'sm' | 'lg';
};

const AddToCartButton = ({ product_id, size }: ButtonProps) => {
  const { cartItems } = useAppSelector((state) => state.cart);
  const { isLoggedIn, refreshToken, accessToken } = useAppSelector((state) => state?.persistedReducers?.auth);

  const dispatch = useAppDispatch();

  const reduxItemCount = React.useMemo(() => {
    const item = cartItems.find(
      (item) => item.product_id === Number(product_id)
    );
    return item ? item.quantity : 0;
  }, [cartItems, product_id]);

  const [localItemCount, setLocalItemCount] = React.useState(reduxItemCount);

  React.useEffect(() => {
    setLocalItemCount(reduxItemCount);
  }, [reduxItemCount]);

  const add = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (isLoggedIn && !isTokenExpired(accessToken)) {
      setLocalItemCount(prev => prev + 1);
      dispatch(addToCart({ productId: product_id, quantity: 1 }));
    }
    else {
      dispatch(showModal({ type: 'login' }));
    }
  };

  const remove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const item = cartItems.find((item) => item.product_id === Number(product_id));
    if (!item) return;
    setLocalItemCount(prev => prev - 1);
    dispatch(removeFromCart({ cartItemId: item?.id, quantity: 1 })); 
  };
  return localItemCount > 0 ? (
    <div
      className={`flex h-full w-full justify-around rounded-lg uppercase font-bold text-sm bg-theme-green cursor-pointer ${size === 'lg' ? 'text-lg' : 'text-normal'
        }`}
    >
      <button
        onClick={(e) => remove(e)}
        type="button"
        className="flex items-center justify-center w-8"
      >
        <IoRemoveSharp size={18} className="text-white" />
      </button>
      <span className="flex items-center justify-center text-white">
        {localItemCount}
      </span>
      <button
        onClick={(e) => add(e)}
        type="button"
        className="flex items-center justify-center w-8"
      >
        <IoAddSharp size={18} className="text-white" />
      </button>
    </div>
  ) : (
    <button
      type="button"
      className={`_add_to_cart ${size === 'lg' ? 'text-md' : 'text-sm'}`}
      onClick={(e) => add(e)}
    >
      Add
    </button>
  );
};

export default AddToCartButton;
