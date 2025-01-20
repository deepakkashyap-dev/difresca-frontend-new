import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductsBySubCategoryApi } from "../../utils/Api/AppService/productApi";
import ProductCard from '../../components/ProductCard';
import Loader from '../../components/shared/Loader';

interface Product {
    id: string;
    // Add other product properties here
}

const ProductListing = ({ is_left_enable = false }: any) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const { name, catId, id } = useParams();

    useEffect(() => {
        const fetchProducts = async () => {
            if (id) {
                setLoading(true);
                const filtered_prod = await getProductsBySubCategoryApi(id);
                console.log(filtered_prod); // This will be used to set the products in the ProductListing component
                setProducts(filtered_prod);
                setLoading(false);
            }
        };
        fetchProducts();
    }, [name, catId, id]);

    if (loading) {
        return <Loader className="bg-lime-100" />;
    }

    return (products.length === 0) ? (
        <div className="flex justify-center items-center w-full">
            <img src="/img404.webp" alt="" className="lg:h-70 md:h-67" />
        </div>) : (
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
            {products.map((product) => (
                <div key={product.id} className="col-span-1">
                    <ProductCard data={product} />
                </div>
            ))}
        </div>
    )
};

export default ProductListing;