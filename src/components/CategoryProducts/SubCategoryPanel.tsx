import { useNavigate } from "react-router-dom";
import { getCategoryLink } from "../../utils/helper";

const SubCategoryPanel = ({ data, selected_id }: any) => {
    const navigate = useNavigate();
    const handleHeaderClick = (e: any) => {
        const link = getCategoryLink({ title: e.title, category_id: e.category_id, id: e.id });
        navigate(`/${link}`);
    };
    return (
        <div className="mt-2 relative z-10 ">
            <ul className="mt-8 mx-auto max-w-xs text-left font-normal text-base leading-none border-blue-200 divide-y divide-blue-200 list-none">
                {
                    data.map((subcat: any) => (
                        <li key={subcat.id}>
                            <div onClick={() => handleHeaderClick(subcat)} className={`py-3.5 w-full flex items-center cursor-pointer ${selected_id == subcat.id && 'bg-theme-green-200 text-theme-green-600'}`}>
                                <span className={`ml-5 mr-2.5 w-1 h-10 ${selected_id == subcat.id ? 'bg-theme-green-600' : 'bg-gray-200'} rounded-r-md`}></span>
                                <div className="flex items-center gap-3">
                                    <div className="h-12 w-12 bg-gray-50 rounded-xl flex items-center justify-center ">
                                        <img
                                            src={subcat.image}
                                            className={`w-8 h-8 object-contain ${selected_id == subcat.id && 'transition-all scale-110 -translate-y-1'}`}
                                            alt={subcat.title}
                                            style={{ transitionDuration: '0.2s' }}
                                        />
                                    </div>
                                    {subcat.title}
                                </div>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};
export default SubCategoryPanel;
