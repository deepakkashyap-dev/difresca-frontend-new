import { useEffect, useState } from 'react';
import { FaRegUser, FaCaretDown } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { CartButton } from '../cart';
import LocationPicker from '../LocationPicker';
import SearchBox from '../SearchBox';
import { show as showModal } from '../../store/modal';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getHomepageBlock, fetchCategoryData } from '../../utils/Api/AppService/dashboardApi';
import { HeaderCategory } from '../CategoryProducts';

const Header = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [isSearchActive, setSearchActive] = useState(false);

  const { homepageData: blocks = [], homepageLoading, homepageError } = useAppSelector((state) => state.homepage);
  const { categoryData, categoryLoading, categoryError } = useAppSelector((state) => state.homepage);
  const data = useAppSelector((state) => state?.persistedReducers?.auth)

  useEffect(() => {
    if (!blocks && !homepageLoading && !homepageError) {
      dispatch(getHomepageBlock());
    }
    if (!categoryData && !categoryLoading && !categoryError) {
      dispatch(fetchCategoryData());
    }
  }, [blocks, categoryData, dispatch, homepageLoading, categoryLoading]);

  useEffect(() => {
    if (location.pathname.includes("/search")) {
      setSearchActive(true)
    }
    else {
      setSearchActive(false)
    }
  }, [location.pathname])

  const showLoginPopup = (): void => {
    dispatch(showModal({ type: 'login' }));
  };

  return (
    <header className={`_nav px-2 sm:px-0 ${isSearchActive && 'shadow-header-inset'}`}>
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
        <div onClick={showLoginPopup} className="flex items-center _header_login justify-center cursor-pointer max-w-[80px] lg:max-w-[160px] w-full">
          {data?.isLoggedIn ?
            <>
              <span className="flex items-center rounded-[6px] h-[50px] py-2 px-3 font-normal text-[21px] text-sm cursor-pointer text-slate-500 hover:text-slate-700">
                Account
                <FaCaretDown size={22} className='mr-1' />
              </span>
              <span className="sm:hidden _text-default">
                <FaCaretDown size={22} />
              </span>
            </>
            :
            <>
              <span className="flex items-center rounded-[6px] h-[50px] py-2 px-3 font-bold text-[14px] text-sm bg-theme-green cursor-pointer text-white">
                <FaRegUser size={24} className='mr-1' />
                Login
              </span>
              <span className="sm:hidden _text-default">
                <FaRegUser size={22} />
              </span>
            </>
          }

        </div>
        <div className="py-2 hidden md:flex h-full items-center mr-8 ml-3">
          <CartButton />
        </div>
      </div>
      {location.pathname.includes("/cat") &&
        <HeaderCategory data={categoryData || []} />
      }
    </header>
  );
};

export default Header;
