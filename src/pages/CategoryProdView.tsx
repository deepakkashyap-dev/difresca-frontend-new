import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SubCategoryPanel, ProductListing } from "../components/CategoryProducts";
import { getProductsBySubCategoryApi } from "../utils/Api/AppService/productApi";
import { useAppSelector } from "../hooks";

interface Category {
  id: string;
  subcategories: any[];
}

interface Product {
  id: string;
}

const CategoryProductView = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const { name, catId, id } = useParams();

  const { categoryData: catData = [] as Category[], categoryLoading, categoryError } = useAppSelector((state) => state.homepage);
  const availableSubcat = catData?.filter((category: Category) => category.id == catId)[0]?.subcategories || []

  useEffect(() => {
    const fetchProducts = async () => {
      if (id) {
        setLoading(true);
        const filtered_prod = await getProductsBySubCategoryApi(id);
        setProducts(filtered_prod);
        setLoading(false);
      }
    };
    fetchProducts();
  }, [name, catId, id]);

  return (
    <div className="flex _container">
      {/* Left Panel: Subcategories */}
      <div className="w-1/4 border-r border-l sticky top-[100px] h-screen bg-white">
        <SubCategoryPanel data={availableSubcat} selected_id={id} />
      </div>

      {/* Right Panel: Products */}
      <div className="w-3/4 relative bg-lime-100 p-3">
        <ProductListing is_left_enable={true} products={products} loading={loading} />
      </div>
    </div>
  );
};

export default CategoryProductView;