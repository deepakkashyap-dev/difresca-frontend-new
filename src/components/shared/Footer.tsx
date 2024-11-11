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
    link: getCategoryLink(cat),
  }));

  const allBrands: BrandLink[] = Brands.map((brand) => ({
    text: brand,
    link: convertTextToURLSlug(brand),
  }));

  return (
    <footer className="bg-gray-100 py-10">
      <div className="_container space-y-6">
        <footer className="bg-gray-100 py-10">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap -mx-4">
              {/* Company Info Section */}
              <div className="w-full lg:w-3/12 md:w-6/12 sm:w-full px-4 mb-6 lg:mb-0">
                <div className="flex items-center mb-4">
                  <Link to="/" className="flex items-center">
                    <img
                      className="w-8 h-8 mr-2"
                      src="/assets/images/logo.png"
                      alt="diFresca"
                    />
                    <span className="text-lg font-semibold text-gray-800">diFresca</span>
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
                <form className="flex items-center">
                  <span className="text-gray-500 mr-2">
                    <svg
                      width="18"
                      height="18"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                    >
                      {/* SVG Path */}
                    </svg>
                  </span>
                  <input
                    id="subscription-email"
                    placeholder="Write your email here"
                    className="flex-1 py-2 px-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="email"
                    name="email"
                  />
                  <button
                    type="button"
                    aria-label="Subscribe Button"
                    className="bg-green-500 text-white px-4 py-2 rounded-r-md hover:bg-green-600 focus:outline-none"
                  >
                    <svg
                      width="20"
                      height="20"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                    >
                      {/* SVG Path */}
                    </svg>
                  </button>
                </form>
              </div>
            </div>

            {/* Copyright & Social Links */}
            <div className="border-t border-gray-200 mt-10 pt-6 flex flex-wrap items-center justify-between">
               {/*<span className="text-gray-600 text-sm">
                &copy; 2024 diFresca, Inc.
              </span>
              <div className="flex space-x-4">
                <a
                  className="text-gray-600 hover:text-blue-600"
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a
                  className="text-gray-600 hover:text-blue-500"
                  href="https://twitter.com/?lang=en"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-twitter"></i>
                </a>
                <a
                  className="text-gray-600 hover:text-pink-600"
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
             */}

            <div className="_container">
              <div className="flex flex-col sm:flex-row flex-wrap gap-4 items-center">
                <div className="text-xs flex-1 _text-muted lg:max-w-md pr-6">
                  &copy; Bring Commerce Private Limited (formerly known as Loafers
                  Inc Private Limited), 2016-2022
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
      <div className="bg-[#fcfcfc] py-6 mt-2 min-h-[60px]">
      </div>
    </footer>
  );
};

export default Footer;
