import { allFeatures } from '../BrandPromotion';
import { AddToCartButton } from '../shared';
import Breadcrumb from './Breadcrumb';
import ProductGallery from './ProductGallery';
import ProductInfoList from './ProductInfoList';

const ProductDetails = (props: any) => {
  // const allVarients = [product, ...varients];
  // const [itemIndex, setItemIndex] = useState<number>(0);
  // const currentProduct = allVarients[itemIndex];

  return (
    <div className="relative grid lg:grid-cols-2 lg:border-b _border-muted -mt-2">
      <div className="lg:border-r _border-muted">
        <ProductGallery images={[...props.images, { "image": props.image }]} />
        <div className="hidden lg:block px-4 lg:px-0 pt-8">
          <h4 className="text-2xl font-bold _text-default">Product Details</h4>
          <ProductInfoList allAttr={[{ attribute_name: "Description", attribute_value: props.description }, ...props.attributes]} />
        </div>
      </div>
      <div className="static lg:block">
        <div className="relative top-0 lg:sticky lg:top-[100px]">
          <div className="px-4 lg:pl-12 lg:pt-8">
            <Breadcrumb data={{ 'category': props.category, 'subcategory': props.subcategory, "name": props.title }} />
            <h1 className="text-[28px] leading-tight py-3">
              {props.title}
            </h1>
            {/* <Link to="/">
              <div className="cursor-pointer text-[#0c831f] font-semibold text-lg flex items-center">
                {props.brand}{' '}
                <IoCaretForwardSharp size={14} className="ml-0.5" />
              </div>
            </Link> */}
            {/* <div className="mt-4 mb-6">
              <ProductVarients
                data={allVarients}
                onSelect={(e) => setItemIndex(e)}
              />
            </div> */}
            <div className="my-4 h-12 w-[130px]">
              <AddToCartButton size="lg" product_id={props.id.toString()} />
            </div>
            <div className="lg:hidden mt-8">
              <h4 className="text-2xl font-medium _text-muted">
                Product Details
              </h4>
              <ProductInfoList allAttr={[{ attribute_name: "Description", attribute_value: props.description }, ...props.attributes]} />
            </div>
            <div className="pb-4 hidden lg:block">
              <h4 className="font-bold _text-default text-[15px] py-3">
                Why shop from Difresca?
              </h4>
              {allFeatures.map((feat, i) => (
                <div key={i} className="flex items-center gap-3 py-1">
                  <div>
                    <img className="w-12 h-12" src={feat.imgSrc} alt="" />
                  </div>
                  <div className="flex flex-col">
                    <h5 className="text-black text-[13px]">{feat.text}</h5>
                    <p className="text-xs _text-muted">{feat.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
