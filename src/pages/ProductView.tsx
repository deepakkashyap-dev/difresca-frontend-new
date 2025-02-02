import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProductDetails, MoreProducts } from '../components/Products';
import Loader from '../components/shared/Loader';
import { getProductsByIdApi } from '../utils/Api/AppService/productApi';
import NotAvailable from '../components/NotAvailable';

interface ProductData {
  product: any;
  related_products: any[]
}
const ProductView = () => {
  let { id } = useParams();
  const [state, setState] = useState<{ loading: boolean; productData: ProductData; error: string }>({ loading: false, productData: { product: null, related_products: [] }, error: '' });

  useEffect(() => {
    const fetchProducts = async () => {
      if (id) {
        setState(prev => ({ ...prev, loading: true }));
        try {
          const filtered_prod = await getProductsByIdApi(id);
          setState(prev => ({ ...prev, loading: false, productData: filtered_prod }));
        } catch (error: any) {
          setState(prev => ({ ...prev, loading: false, error: error.message }));
        }
      }
    };
    fetchProducts();
  }, [id]);

  if (state.loading) {
    window.scrollTo(0, 0);
    return <Loader className="bg-lime-100" />;
  }
  if (state.error && !state.loading) {
    window.scrollTo(0, 0);
    return <NotAvailable />;
  }
  console.log(state.productData.related_products, "-state.productData.product")
  return (
    <div className="_container">
      {state.productData.product !== null && <ProductDetails {...state.productData.product} />}
      {state.productData.related_products !== null && <MoreProducts title='More Products' products={state.productData.related_products}  />}
    </div>
  );
};

export default ProductView;
