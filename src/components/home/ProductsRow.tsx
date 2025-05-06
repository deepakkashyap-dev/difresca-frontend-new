import { ItemsCarousel } from '../shared';
import { Link } from 'react-router-dom';
import { getDealLink } from '../../utils/helper'

const ProductsRow = ({ data }: any) => {
  // const products = objects.map((obj) =>
  //   obj.data.products.map((product: any) => product[0])
  // )[0];
  // console.log(data, '-data');
  return (
    <section>
      <div className="flex items-center justify-between h-16">
        <h2 className="font-bold text-[26px] _text-default">{data.heading}</h2>
        <Link to={getDealLink({ heading: data.heading, id: data.id })} className="text-green-700 font-bold cursor-pointer text-lg">
          See All
        </Link>
      </div>
      <ItemsCarousel topItems={data.products} />
    </section>
  );
};

export default ProductsRow;
