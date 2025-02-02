import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductListing from '../components/CategoryProducts/ProductListing';
import { getProductsByDealApi } from '../utils/Api/AppService/productApi';

interface Product {
    id: string;
}
const DealProductView = () => {
    const { id, name } = useParams<{ id: string, name: string }>();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            if (id) {
                setLoading(true);
                const filtered_prod = await getProductsByDealApi(id);
                setProducts(filtered_prod);
                setLoading(false);
            }
        };
        fetchProducts();
    }, [name, id]);

    return (
        <div className="_container bg-lime-100">
            {/* <h1>{data.name}</h1> */}
            <ProductListing is_left_enable={false} products={products} loading={loading} />
        </div>
    );
};

export default DealProductView;