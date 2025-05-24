import React, { useState } from 'react';
import { getLocationApi, getAddressSuggestionsApi, getAddressCordinatedApi } from '../utils/Api/AppService/shippingApi';
import { Loader } from '../components/shared';
import { useAppSelector } from '../hooks';
import emptyCart from '../assets/animations/animation_sad_face.json';
import Lottie from 'lottie-react';

interface Address {
  address_type?: string;
  formattedAddress?: string;
  // add other properties as needed
}

interface LocationData {
  lat: number;
  lng: number;
  address: string;
}

const LocationPicker = ({ onLocationSelected }: { onLocationSelected?: (location: LocationData) => void }) => {
  const [searchBox, setSearchBox] = useState<string>('');
  const [suggestions, setSugggestions] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [showSavedAddresses, setShowSavedAddresses] = useState(true);
  const [hasSearched, setHasSearched] = useState(false);

  const { addressList } = useAppSelector((state: { account: { addressList: Address[] } }) => state.account);


  const detectLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    if (window.isSecureContext === false && !window.location.hostname.includes('localhost')) {
      alert("Geolocation requires a secure context (HTTPS). Please ensure your site is served over HTTPS.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        const res = await getLocationApi(lat, lng)
        const { address } = res;
        onLocationSelected && onLocationSelected({ lat, lng, address });
      },
      (err) => {
        console.error(err);
        if (err.code === 1) {
          alert("Location access denied. Please enable location access in your browser settings or use the search box to enter your location manually.");
        } else {
          alert("Unable to fetch location. Please try using the search box instead.");
        }
      }
      ,
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );
  };

  const fetchAddressSuggestions = async (keyword: string) => {
    if (!keyword) return;
    try {
      setLoading(true);
      setHasSearched(false);  // reset hasSearched state
      const res = await getAddressSuggestionsApi(keyword);
      const { suggestions } = res;
      setSugggestions(suggestions);
      setHasSearched(true);  // only true after suggestions fetched
    } catch (error) {
      setSugggestions([]);
      setHasSearched(true); // still true if error
      console.error("Error fetching address suggestions:", error);
    }
    finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchBox.trim() !== "") {
        fetchAddressSuggestions(searchBox);
      }
    }, 500); // Debounce API calls by 500ms

    return () => clearTimeout(delayDebounceFn);
  }, [searchBox]);

  const handleInputChange = (e: any) => {
    setSearchBox(e.target.value);
    if (e.target.value.trim() !== "") {
      setShowSavedAddresses(false); // Immediately hide saved addresses
    }
  }

  const handleSuggestionClick = (suggestion: any) => {
    getAddressCordinatedApi(suggestion.place_id).then((res) => {
      const { lat, lng } = res.location;
      onLocationSelected && onLocationSelected({ lat, lng, address: suggestion.address });
    });
    setSugggestions([]);
  };

  const handleSavedAddressClick = (suggestion: any) => {
    const { coordinates, formattedAddress } = suggestion
    const { lat, lng } = coordinates;
    onLocationSelected && onLocationSelected({ lat, lng, address: formattedAddress });
  };

  return (
    <div className="bg-white w-full max-w-2xl max-h-2xl rounded shadow-xl">
      {/* Top Flex Row */}
      <div className='p-6'>
        <h3 className="text-lg font-semibold mb-1">Change Location</h3>
        <div className="flex items-center gap-3 ">
          <button onClick={detectLocation} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700" >
            Detect my location
          </button>
          <div className="flex items-center text-gray-500 font-medium">OR</div>
          <input
            type="text"
            placeholder="search delivery location"
            onChange={handleInputChange}
            className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none"
          />
        </div>
      </div>

      <div>
        <div className="flex flex-col">
          {searchBox.trim() !== "" ? (
            isLoading ? (
              <ul className="z-10 bg-white border rounded shadow-lg mt-1 w-full overflow-y-auto left-0 right-0" style={{ maxHeight: '15rem' }}>
                <Loader className='relative' />
              </ul>
            ) : suggestions.length > 0 ? (
              <ul className="z-10 bg-white border rounded shadow-lg mt-1 w-full overflow-y-auto left-0 right-0" style={{ maxHeight: '15rem' }}>
                {suggestions.map((suggestion: any, index: number) => (
                  <li key={index} className=" flex align-center text-sm subpixel-antialiased font-stretch-condensed pl-4 py-2 cursor-pointer hover:bg-gray-100 " onClick={() => handleSuggestionClick(suggestion)} >
                    <span role="img" aria-label="home">🏠</span> &nbsp;  &nbsp;
                    <span>{suggestion.address}</span>
                  </li>
                ))}
              </ul>
            ) : hasSearched ? (
              <div className="mt-2 flex flex-col justify-center items-center text-center p-4">
                <div className="flex justify-center items-center">
                  <Lottie
                    animationData={emptyCart}
                    loop={true}
                    autoplay
                    // style={{ width: 200, height: 200 }}
                    className='w-48 h-48'
                  />
                </div>
                <p>No suggestions found</p>
              </div>
            ) : null
          ) : (
            (((showSavedAddresses && addressList.length > 0) || (searchBox.trim() === "" && addressList.length > 0)) &&
              <div className='p-6 pt-0'>
                <h3 className="text-sm font-medium text-gray-700 mb-3">Your saved addresses</h3>
                {addressList.map((addr, idx) => (
                  <AddressItem addr={addr} key={idx} onClick={handleSavedAddressClick} />
                ))}
              </div>)
          )}

        </div>
      </div>
    </div >
  );
};

export default LocationPicker;

const AddressItem = ({ addr, onClick }: { addr: any; onClick: (addr: any) => void }) => {
  return (
    <div className="cursor-pointer flex items-start gap-3 p-4 border border-gray-200 rounded bg-gray-50" onClick={() => onClick(addr)} >
      <div className="bg-yellow-100 p-2 rounded-full">
        <span role="img" aria-label="home">🏠</span>
      </div>
      <div className="flex-1">
        <div className="font-semibold text-sm">{addr.address_type}</div>
        <div className="text-sm text-gray-600 leading-tight">{addr.formattedAddress}</div>
      </div>
      {/* <button className="text-gray-500 hover:text-gray-700">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15.232 5.232l3.536 3.536M9 11l6 6m2-2l-6-6M4 20h4l10-10"
          />
        </svg>
      </button> */}
    </div>
  );
}
