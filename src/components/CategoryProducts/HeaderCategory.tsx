import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getCategoryLink } from "../../utils/helper";
// import { useAppSelector } from "../../hooks";

const HeaderCategories = ({ data }: any) => {
    const [visibleCategories, setVisibleCategories] = useState<string[]>([]);
    const [hiddenCategories, setHiddenCategories] = useState<string[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    // const { categoryData: data = [], categoryLoading: loading, categoryError: error } = useAppSelector((state) => state.homepage);


    useEffect(() => {
        const calculateVisibleCategories = () => {
            if (!containerRef.current) return;
            const containerWidth = containerRef.current.offsetWidth;
            if (!data) return;

            let totalWidth = 0;
            const visible: string[] = [];
            const hidden: string[] = [];

            // Dynamically check each category's width
            const items = containerRef.current.querySelectorAll<HTMLDivElement>(".category-item");
            items.forEach((item, index) => {
                totalWidth += item.offsetWidth;
                if (totalWidth < containerWidth - 100) {
                    visible.push(data[index]);
                } else {
                    hidden.push(data[index]);
                }
            });

            setVisibleCategories(visible);
            setHiddenCategories(hidden);
        };

        // Calculate on load and window resize
        calculateVisibleCategories();
        window.addEventListener("resize", calculateVisibleCategories);

        return () => {
            window.removeEventListener("resize", calculateVisibleCategories);
        };
    }, [data]);

    const handleHeaderClick = (e: any) => {
        if (e.subcategories[0]) {
            const link = getCategoryLink({ title: e.subcategories[0].title, category_id: e.id, id: e.subcategories[0].id });
            navigate(`/${link}`);
        }
    };
    if (!data || data.length === 0) return <div></div>;
    return (
        <div className={`flex items-center bg-white border-b border-t shadow `} ref={containerRef}>
            <div className="_container items-center overflow-hidden whitespace-nowrap ">
                <nav className="flex text-gray-500 text-sm h-[40px] ml-[40px] !important">
                    {visibleCategories.length === 0 && data?.map((category: any) => (
                        <div
                            key={category.id}
                            className="px-4 py-2 cursor-pointer whitespace-nowrap category-item"
                        >
                            {category.title}
                        </div>
                    ))}
                    {visibleCategories.map((category: any) => (
                        <div onClick={() => handleHeaderClick(category)} key={category.id} className="px-4 py-2 cursor-pointer whitespace-nowrap align-self-center">
                            {category.title}
                        </div>
                    ))}

                    {hiddenCategories.length > 0 && (
                        <div className="relative group bg-gray-50 border border-gray-300 px-4 py-2 cursor-pointer more-dropdown">
                            More
                            <div className="hidden group-hover:block absolute top-full left-0 bg-white shadow-lg z-10 min-w-[150px]">
                                {hiddenCategories.map((category: any) => (
                                    <div key={category.id} className="px-4 py-2 cursor-pointer whitespace-nowrap hover:bg-gray-200">
                                        {category.title}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </nav>
            </div>
        </div>
    );
};

export default HeaderCategories;
