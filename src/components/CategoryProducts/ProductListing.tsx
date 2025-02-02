import { Key, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductsBySubCategoryApi } from "../../utils/Api/AppService/productApi";
import ProductCard from '../../components/ProductCard';
import Loader from '../../components/shared/Loader';


const ProductListing = ({ is_left_enable = false, products, loading }: any) => {

    if (loading) {
        return <Loader className="bg-lime-100" />;
    }

    return (products.length === 0) ? (
        <div className="flex justify-center items-center w-full">
            <img src="/img404.webp" alt="not found" className="lg:h-70 md:h-67" />
        </div>) : (
        <div className={`justify-items-center grid grid-cols-2 sm:grid-cols-2 ${is_left_enable ? 'mt-10 gap-2 md:grid-cols-3 lg:grid-cols-5' : 'p-3 gap-4 md:grid-cols-4 lg:grid-cols-6'} `}>
            {products.map((product: { id: Key | null | undefined; }) => (
                <div key={product.id} className="w-full">
                    <ProductCard data={product} classname="w-full" />
                </div>
            ))}
        </div>
    )
};

export default ProductListing;