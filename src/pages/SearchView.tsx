import { useEffect, useState, useCallback } from "react"
import { ProductItem } from '../utils/types';
import ProductCard from '../components/ProductCard';
import { useAppSelector, useAppDispatch } from '../hooks';
import { updateSearch } from '../store/commonStates';
import { Loader } from '../components/shared';
import { debounce } from "../utils/helper";
import { searchProductApi } from "../utils/Api/AppService/productApi";

const SearchView = () => {
    const [product, setProduct] = useState<ProductItem[]>([]);
    const [isLoading, setLoading] = useState(false);
    const { searchVal } = useAppSelector((state) => state.persistedReducers.commonState);
    const dispatch = useAppDispatch();

    const fetchResults = async (searchVal: string) => {
        const filteredProducts = await searchProductApi(searchVal)
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

    useEffect(() => {// Cleanup  function
        const cleanup = () => {
            dispatch(updateSearch(''));
        };
        return cleanup;
    }, [dispatch]);

    const suggestions = ["maggie", "maggie noodels", "maggie sunji masala"]

    return (
        <div className="_container">
            {isLoading && <Loader className="" />}
            <div className="flex-1" >
                {suggestions.map(item =>
                    <div className='_search-container' key={item}>
                        <span className='_search-sugg'>
                            <div className='_text'>{item}</div>
                        </span>
                    </div>
                )}
            </div>
            {
                searchVal &&
                <div className="my-2">
                    <div>Showing results for <strong>"{searchVal}"</strong></div>
                </div>
            }

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10">
                {product?.map((item, i) => (
                    <div className="col-span-1" key={i} >
                        <ProductCard data={item} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchView;
