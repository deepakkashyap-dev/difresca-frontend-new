import { ProductRow } from '../../utils/types';
import ItemsCarousel from '../shared/ItemsCarousel';

const ProductsRow = ({ data }: any) => {
  // const products = objects.map((obj) =>
  //   obj.data.products.map((product: any) => product[0])
  // )[0];
  console.log(data, '-data');
  return (
    <section>
      <div className="flex items-center justify-between h-16">
        <h2 className="font-bold text-[26px] _text-default">{data.heading}</h2>
        <span className="text-green-700 font-bold cursor-pointer text-lg">
          See All
        </span>
      </div>
      <ItemsCarousel topItems={data.products} />
    </section>
  );
};

export default ProductsRow;
