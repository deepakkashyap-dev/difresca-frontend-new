import React, { useState } from 'react';
import { getLocationApi, getAddressSuggestionsApi, getAddressCordinatedApi } from '../utils/Api/AppService/shippingApi';
import { Loader } from '../components/shared';


interface LocationData {
  lat: number;
  lng: number;
  address: string;
}

const LocationPicker = ({ onLocationSelected }: { onLocationSelected?: (location: LocationData) => void }) => {
  const [searchBox, setSearchBox] = useState<string | null>(null);
  const [suggestions, setSugggestions] = useState([]);
  const [isLoading, setLoading] = useState(false);


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
      const res = await getAddressSuggestionsApi(keyword);
      const { suggestions } = res;
      setSugggestions(suggestions);
      setLoading(false);
    } catch (error) {
      setSugggestions([]);
      setLoading(false);
      console.error("Error fetching address suggestions:", error);
    }
  };

  React.useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchBox) {
        fetchAddressSuggestions(searchBox);
      }
    }, 500); // Debounce API calls by 500ms

    return () => clearTimeout(delayDebounceFn);
  }, [searchBox]);

  const handleSuggestionClick = (suggestion: any) => {
    getAddressCordinatedApi(suggestion.place_id).then((res) => {
      const { lat, lng } = res.location;
      onLocationSelected && onLocationSelected({ lat, lng, address: suggestion.address });
    });
    setSugggestions([]);
    // onLocationSelected && onLocationSelected({ lat: 0, lng: 0, address: suggestion });
  };

  return (
    <div className="bg-white p-4 rounded shadow w-full mx-auto">
      <h2 className="text-xl font-semibold mb-2">Welcome!</h2>
      <p className="mb-4">Please select your delivery location:</p>

      <div className="flex items-center mb-3">
        <button onClick={detectLocation} className="bg-green-500 text-white px-4 py-2 rounded mr-2">
          Detect my location
        </button>
        <span className="text-gray-500 px-5">OR</span>
        <input
          type="text"
          placeholder="Search your location"
          className="px-3 py-2 border rounded"
          onChange={(e) => setSearchBox(e.target.value)}
        />
      </div>

      {suggestions.length > 0 && (
        <ul
          className="z-10 bg-white border rounded shadow-lg mt-1 w-full overflow-y-auto"
          style={{ maxHeight: suggestions.length > 1 ? '15rem' : `${suggestions.length * 3}rem` }}
        >
          {!isLoading ?
            suggestions.map((suggestion: any, index: number) => (
              <li key={index} className="px-3 py-2 cursor-pointer hover:bg-gray-200" onClick={() => handleSuggestionClick(suggestion)} >
                📍 {suggestion.address}
              </li>
            ))
            :
            <Loader className='relative' />
          }
        </ul>
      )}
    </div>
  );
};

export default LocationPicker;
