import { useEffect, useState, useCallback } from "react"
import Misc from '../lib/data/layout.json';
import { ProductItem } from '../utils/types';
import ProductCard from '../components/ProductCard';
import { useAppSelector } from '../hooks/useAppSelector';
import { Loader } from '../components/shared';
import { debounce } from "../utils/helper";

const SearchView = () => {
    const [product, setProduct] = useState<ProductItem[]>([]);
    const [isLoading, setLoading] = useState(false);
    const { searchVal } = useAppSelector((state) => state.commonState);

    const fetchResults = async (searchVal: string) => {
        const filteredProducts = filterByName(Misc, searchVal);
        setProduct(filteredProducts);
    };

    const debouncedFetchResults = useCallback(
        debounce(async (searchVal: string, onComplete: () => void) => {
            await fetchResults(searchVal); // Wait for fetchResults to complete
            onComplete(); // Notify when the debounced function completes
        }, 1000),
        []
    );


    useEffect(() => {
        if (searchVal) {
            setLoading(true);
            debouncedFetchResults(searchVal, () => setLoading(false)); // Pass a callback to update loading
        } else {
            setLoading(false);
        }
    }, [searchVal, debouncedFetchResults]);

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
            {isLoading && <Loader fullscreen />}
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
                searchVal &&
                <div className="my-2">
                    <div>Showing results for <strong>{searchVal}</strong></div>
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
