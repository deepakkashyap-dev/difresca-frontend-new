import { Link } from 'react-router-dom';
import { getCategoryLink } from "../../utils/helper";

const Breadcrumb = ({ data }: any) => {
  const { category, subcategory, name } = data;
  const link = getCategoryLink({ title: name, category_id: category.id, id: subcategory.id });
  return (
    <div className="text-xs flex flex-wrap text-black font-medium">
      <span className="cursor-pointer hover:text-[#0c831f]">
        <Link to="/">Home</Link>
      </span>
      <span>&nbsp; / &nbsp;</span>
      <span className="cursor-pointer hover:text-[#0c831f]">
        <Link to={`/${link}`}>{category.name}</Link>
      </span>
      {subcategory && (
        <>
          <span>&nbsp; / &nbsp;</span>
          <span className="cursor-pointer hover:text-[#0c831f]">
            <Link to={`/${link}`}>{subcategory.name}</Link>
          </span>
        </>
      )}
      <span>&nbsp; / &nbsp;</span>
      <span className="_text-muted">{name}</span>
    </div>
  );
};

export default Breadcrumb;
