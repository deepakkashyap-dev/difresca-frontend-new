import { useNavigate } from 'react-router-dom';
import AddToCartButton from './shared/AddToCartButton';
import { CartProduct, ProductItem } from '../utils/types';
import { getProductLink, getDiscountPercent } from '../utils/helper';

const ProductCard = ({ data, classname }: any) => {
  const navigate = useNavigate();
  const { id: product_id, title, unit, unit_price, unit_type } = data;
  const { discounted_rate, offer_label: offer, thumbnail } = data;

  const handleProductClick = () => {
    const link = getProductLink({ title, id: product_id });
    navigate(`/${link}`);
  };
  return (
    <div
      className={`_card h-[270px] relative flex cursor-pointer mb-2 mx-auto sm:mx-0 ${classname ? classname : 'w-[180px]'}`}
      onClick={handleProductClick}
    >
      {offer && (
        <div className="absolute bg-blue-600 text-white px-3 py-1 text-xs font-medium -left-[1px] top-4 rounded-tr-xl rounded-br-xl uppercase">
          {getDiscountPercent(unit_price, discounted_rate)}% OFF
        </div>
      )}
      <div className="h-[154px] w-154px">
        <img src={thumbnail} alt={title} className="h-full w-full p-2" />
      </div>
      <div className="overflow-hidden text-left flex flex-col mt-auto">
        <div className="_text-default text-[13px] font-medium leading-tight line-clamp-2 mb-0.5">
          {title}
        </div>
        <div className="text-sm _text-muted truncate mb-3">{unit} {unit_type}</div>
        <div className="flex items-center justify-between mt-auto">
          {discounted_rate ? (
            <div className="flex flex-col">
              <span className="text-[14px] _text-default font-semibold leading-none">
                $ {discounted_rate}
              </span>
              <del className="text-xs text-gray-400">{unit_price}</del>
            </div>
          ) : (
            <div>
              <span className="text-[14px] _text-default">$ {unit_price}</span>
            </div>
          )}
          <div className="h-9 w-[90px] shadow-md shadow-slate-400 bottom-[10px] right-[4px] absolute rounded-lg">
            <AddToCartButton product_id={product_id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
