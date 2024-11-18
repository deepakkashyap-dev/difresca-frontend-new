import { SetStateAction, useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

interface SearchBoxProps {
  active: boolean;
}

const SearchBox: React.FC<SearchBoxProps> = ({ active}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [searchQuery, setSearchQuery] = useState("");
  // is isSearchActive is true ,means it is searchable 


  useEffect(() => {
    if (location.pathname.includes("/search")) {
      const params = new URLSearchParams(location.search);
      const query = params.get("q") || "";
      setSearchQuery(query);
    }
  }, [location]);

  // Update the URL when the input value changes
  useEffect(() => {
    if (location.pathname.includes("/search")) {
      const params = new URLSearchParams();
      if (searchQuery) params.set("q", searchQuery);
      else params.delete("q"); // Remove query param if empty
      const newUrl = `/search/?${params.toString()}`;
      window.history.pushState({}, "", newUrl);
    }
  }, [searchQuery]);

  const handleInputChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setSearchQuery(e.target.value);
  };


  return (
    <div className="_searchbox" onClick={() => !active ? navigate({ pathname: "/search/" }) : {}} >
      <FiSearch
        className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400"
        size={24}
      />
      <input
        type="text"
        placeholder="Search for products"
        className="outline-none w-full text-[14px]"
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchBox;
