import React, { useState } from 'react';
import { BsBuilding } from "react-icons/bs";
const LocationPicker = () => {
  const [location, setLocation] = useState<any>({});
  return (
    <div>
      {!location ? (
        <span className="font-medium _text-default">Select Location <BsBuilding size={22}/></span>
      ) : (
        <div className="flex flex-col">
          {/* <p className="font-semibold text-lg leading-tight">
            Delivery in Sometimes
          </p> */}
          <span className="text-sm _text-default flex items-center"> <BsBuilding size={22} className='mr-1'/> Your address will show here </span>
        </div>
      )}
    </div>
  );
};

export default LocationPicker;
