import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { SubCategoryPanel, ProductListing } from "../components/CategoryProducts";
import { useAppSelector } from "../hooks";

interface Category {
  id: string;
  subcategories: any[];
}

const CategoryProductView = () => {
  const { catId, id } = useParams();

  const { categoryData: catData = [] as Category[], categoryLoading: loading, categoryError: error } = useAppSelector((state) => state.homepage);
  const availableSubcat = catData?.filter((category: Category) => category.id == catId)[0]?.subcategories || []

  return (
    <div className="flex _container">
      {/* Left Panel: Subcategories */}
      <div className="w-1/4 border-r border-l sticky top-[100px] h-screen bg-white">
        <SubCategoryPanel data={availableSubcat} selected_id={id} />
      </div>

      {/* Right Panel: Products */}
      <div className="w-3/4 relative  bg-lime-100 p-2">
        <ProductListing is_left_enable={true} />
      </div>
    </div>
  );
};

export default CategoryProductView;