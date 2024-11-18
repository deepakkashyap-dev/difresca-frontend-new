import { useEffect, useState } from "react"
import { useLocation } from 'react-router-dom';
import Misc from '../lib/data/layout.json';
import { ProductItem } from '../utils/types';
import ProductCard from '../components/ProductCard';

const SearchView = () => {
    const location = useLocation();
    const [searchQuery, setSearchQuery] = useState("");
    const [product, setProduct] = useState<ProductItem[]>([]);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const query = params.get("q") || "";
        setSearchQuery(query);
        const filteredProducts = filterByName(Misc, "d");
        setProduct(filteredProducts);
    }, [location]);

    const filterByName = (data: any[], searchName: any) => {
        const lowerCaseSearchString = searchName.toLowerCase();
        return data.flatMap(item => {
            if (Array.isArray(item.objects)) {
                return item.objects.flatMap((subItem: { data?: { products?: any[] } }) => {
                    if (subItem?.data?.products) {
                        return subItem.data.products.flat().filter((product: { name?: string }) =>
                            product.name?.toLowerCase().includes(lowerCaseSearchString)
                        );
                    }
                    return [];
                });
            }
            return [];
        });
    };


    const suggestions = ["maggie", "maggie noodels", "maggie sunji masala"]

    return (
        <div className="_container">
            <div className="flex-1" >
                {suggestions.map(item =>
                    <div className='_search-container'>
                        <span className='_search-sugg'>
                            <div className='_text'>{item}</div>
                        </span>
                    </div>
                )}
            </div>
            {
                searchQuery &&
                <div className="my-2">
                    <div>Showing results for <strong>{searchQuery}</strong></div>
                </div>
            }

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10">
                {product?.map((item, i) => (
                    <div className="col-span-1">
                        <ProductCard key={i} data={item} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchView;
