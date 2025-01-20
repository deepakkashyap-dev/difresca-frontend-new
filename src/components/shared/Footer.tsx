import { Link } from 'react-router-dom';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from 'react-icons/fa';
import { convertTextToURLSlug, getCategoryLink } from '../../utils/helper';
import AppStoreLogo from '../../assets/images/app-store.webp';
import PlayStoreLogo from '../../assets/images/play-store.webp';
import Brands from '../../lib/data/brandsList.json';
import Categories from '../../lib/data/categories.json';

type BrandLink = {
  text: string;
  link: string;
};

const UsefulLinks: string[] = [
  'About',
  'Careers',
  'Blog',
  'Press',
  'Lead',
  'Value',
  'Privacy',
  'Terms',
  'FAQs',
  'Security',
  'Mobile',
  'Contact',
  'Partner',
  'Express',
  'Local',
  'Spotlight',
  'Warehouse',
  'Deliver',
];


const Footer = () => {
  const allCategories = Categories.map((cat) => ({
    id: cat.id,
    text: cat.title,
    link: ""//getCategoryLink(cat),
  }));

  const allBrands: BrandLink[] = Brands.map((brand) => ({
    text: brand,
    link: convertTextToURLSlug(brand),
  }));

  return (
    <footer className="bg-gray-100 py-5">
      <div className="_container space-y-6">
        <footer className="bg-gray-100 py-5">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap -mx-4">
              {/* Company Info Section */}
              <div className="w-full lg:w-3/12 md:w-6/12 sm:w-full px-4 mb-6 lg:mb-0">
                <div className="flex items-center mb-4">
                  <Link to="/" className="flex items-center">
                    <img src="/logo_svg.svg" alt="Logo" className="h-[100px]" />
                  </Link>
                </div>
                <p className="text-gray-600">
                  We offer high-quality foods and the best delivery service, and the
                  food market you can blindly trust.
                </p>
              </div>

              {/* About Us Section */}
              <div className="w-full lg:w-2/12 md:w-3/12 sm:w-6/12 px-4 mb-6 lg:mb-0">
                <h5 className="text-lg font-semibold text-gray-800 mb-4">About Us</h5>
                <div className="text-gray-600 space-y-2">
                  <div>About us</div>
                  <div>Contact us</div>
                  <div>About team</div>
                  <div>Customer Support</div>
                </div>
              </div>

              {/* Our Information Section */}
              <div className="w-full lg:w-2/12 md:w-3/12 sm:w-6/12 px-4 mb-6 lg:mb-0">
                <h5 className="text-lg font-semibold text-gray-800 mb-4">Our Information</h5>
                <div className="text-gray-600 space-y-2">
                  <div>Privacy policy update</div>
                  <div>Terms & conditions</div>
                  <div>Return Policy</div>
                  <div>Site Map</div>
                </div>
              </div>

              {/* Community Section */}
              <div className="w-full lg:w-2/12 md:w-3/12 sm:w-6/12 px-4 mb-6 lg:mb-0">
                <h5 className="text-lg font-semibold text-gray-800 mb-4">Community</h5>
                <div className="text-gray-600 space-y-2">
                  <div>Announcements</div>
                  <div>Answer center</div>
                  <div>Discussion boards</div>
                  <div>Giving works</div>
                </div>
              </div>

              {/* Subscribe Section */}
              <div className="w-full lg:w-3/12 md:w-6/12 sm:w-full px-4">
                <h5 className="text-lg font-semibold text-gray-800 mb-4">Subscribe Now</h5>
                <p className="text-gray-600 mb-4">
                  Subscribe your email for newsletter and featured news based on your interest.
                </p>
                <form className="_subs-form">
                  <span className="text-gray-500 mr-2">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 2xl:w-[18px] h-4 2xl:h-[18px]"><g clipPath="url(#clip0)"><path d="M16.3125 2.25H1.68751C0.75696 2.25 0 3.00696 0 3.93751V14.0625C0 14.9931 0.75696 15.75 1.68751 15.75H16.3125C17.243 15.75 18 14.9931 18 14.0625V3.93751C18 3.00696 17.243 2.25 16.3125 2.25ZM16.3125 3.375C16.3889 3.375 16.4616 3.39085 16.5281 3.41854L9 9.94319L1.47188 3.41854C1.53834 3.39089 1.61105 3.375 1.68747 3.375H16.3125ZM16.3125 14.625H1.68751C1.37715 14.625 1.125 14.3729 1.125 14.0625V4.60711L8.6314 11.1127C8.73743 11.2044 8.86872 11.25 9 11.25C9.13128 11.25 9.26256 11.2044 9.3686 11.1127L16.875 4.60711V14.0625C16.875 14.3729 16.6228 14.625 16.3125 14.625Z" fill="#B3B3B3"></path></g></svg>
                  </span>
                  <div>
                    <input
                      id="subscription-email"
                      placeholder="Write your email here"
                      className="py-2 px-10 border rounded"
                      type="email"
                      name="email"
                    />
                  </div>
                  <button aria-label="Subscribe Button">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[18px] 2xl:w-5 h-[18px] 2xl:h-5 rtl:rotate-180"><g clipPath="url(#clip0)"><path d="M18.809 8.21633L2.67252 1.52062C1.99272 1.23851 1.22471 1.36262 0.668264 1.84434C0.111818 2.32613 -0.120916 3.06848 0.0609589 3.78164L1.49725 9.41414H8.52951C8.85311 9.41414 9.11549 9.67648 9.11549 10.0001C9.11549 10.3237 8.85315 10.5861 8.52951 10.5861H1.49725L0.0609589 16.2186C-0.120916 16.9318 0.111779 17.6741 0.668264 18.1559C1.22584 18.6386 1.99393 18.7611 2.67256 18.4796L18.809 11.7839C19.5437 11.4791 20.0001 10.7955 20.0001 10.0001C20.0001 9.20469 19.5437 8.52113 18.809 8.21633Z" fill="#7ED957"></path></g><defs><clipPath id="clip0"><rect width="20" height="20" fill="white"></rect></clipPath></defs></svg>
                  </button>
                </form>
              </div>
            </div>

            {/* Copyright & Social Links */}
            <div className="border-t border-gray-200 mt-10 pt-6 flex flex-wrap items-center justify-between">
              <div className="_container">
                <div className="flex flex-col sm:flex-row flex-wrap gap-4 items-center">
                  <div className="text-xs flex-1 _text-muted lg:max-w-md pr-6">
                    &copy; Difresca Commerce Private Limited, 2023-2024
                  </div>
                  <div className="flex flex-1 md:flex-row items-center gap-2">
                    <h4 className="font-bold text-md leading-none lg:mr-4 _text-default">
                      Download App
                    </h4>
                    <div className="h-8 w-24 rounded-[3px] cursor-pointer overflow-hidden">
                      <img
                        src={AppStoreLogo}
                        alt="App store"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="h-8 w-24 rounded-[3px] cursor-pointer overflow-hidden">
                      <img
                        src={PlayStoreLogo}
                        alt="Play store"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex-1 flex items-center md:justify-end gap-4 lg:gap-6">
                    <div className="cursor-pointer w-10 h-10 rounded-full bg-neutral-900 text-white flex items-center justify-center">
                      <FaFacebookF />
                    </div>
                    <div className="cursor-pointer w-10 h-10 rounded-full bg-neutral-900 text-white flex items-center justify-center">
                      <FaTwitter />
                    </div>
                    <div className="cursor-pointer w-10 h-10 rounded-full bg-neutral-900 text-white flex items-center justify-center">
                      <FaInstagram />
                    </div>
                    <div className="cursor-pointer w-10 h-10 rounded-full bg-neutral-900 text-white flex items-center justify-center">
                      <FaLinkedinIn />
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </footer>
      </div>
    </footer>
  );
};

export default Footer;
