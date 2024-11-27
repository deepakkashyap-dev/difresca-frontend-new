import { useEffect, useState } from 'react';
import { FaRegUser } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { CartButton } from '../cart';
import LocationPicker from '../LocationPicker';
import SearchBox from '../SearchBox';
import { show as showModal } from '../../store/modal';
import { useAppDispatch } from '../../hooks/useAppDispatch';

const Header = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [isSearchActive, setSearchActive] = useState(false);

  useEffect(() => {
    if (location.pathname.includes("/search")) {
      setSearchActive(true)
    }
    else {
      setSearchActive(false)
    }
  }, [location.pathname])

  const showDiscountInfo = (): void => {
    dispatch(showModal({ type: 'login' }));
  };

  return (
    <header className="_nav px-2 sm:px-0">
      <div className="_header sm:flex h-full">
        <div className="hidden sm:flex max-w-[150px] md:max-w-[178px] w-full cursor-pointer justify-center border-r _border-light">
          <Link to={'/'}>
            <img src="/logo_svg.svg" alt="Logo" className="h-[100px]" />
          </Link>
        </div>
        {
          !isSearchActive &&
          <div className="w-full sm:w-[240px] xl:w-[320px] py-4 px-1 sm:p-0 _header_loc flex items-center sm:justify-center cursor-pointer sm:hover:bg-gray-50">
            <LocationPicker />
          </div>
        }
        <div className="flex-1 relative _header_search">
          <SearchBox active={isSearchActive} />
        </div>
        <div onClick={showDiscountInfo} className="flex items-center _header_login justify-center cursor-pointer max-w-[80px] lg:max-w-[160px] w-full">
          <span className="flex items-center rounded-[6px] h-[50px] py-2 px-3 font-bold text-[14px] text-sm bg-theme-green cursor-pointer text-white">
            <FaRegUser size={24} className='mr-1' /> Login
          </span>
          <span className="sm:hidden _text-default">
            <FaRegUser size={22} />
          </span>
        </div>
        <div className="py-2 hidden md:flex h-full items-center mr-8 ml-3">
          <CartButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
