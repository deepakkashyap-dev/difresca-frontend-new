// AddressPage.tsx
import React from 'react';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import { LatLngExpression } from 'leaflet';

const AddressPage: React.FC = () => {
  // Default map center and zoom level
//   const center: LatLngExpression = [28.6448, 77.216721]; // New Delhi, India
//   const zoom = 12;

  return (
    <div className="flex max-w-7xl mx-auto p-8 space-x-10">
      {/* Left column: Map UI */}
      <div className="w-1/2 h-[500px] bg-gray-200 rounded-lg shadow-lg">
        {/* <MapContainer center={center} zoom={zoom} scrollWheelZoom={false} className="h-full w-full rounded-lg">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={center}>
            <Popup>Current location</Popup>
          </Marker>
        </MapContainer> */}
      </div>

      {/* Right column: Address form */}
      <div className="w-1/2">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Add Address</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-600">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-600">Address</label>
            <textarea
              id="address"
              name="address"
              rows={3}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your address"
            />
          </div>

          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-600">City</label>
            <input
              type="text"
              id="city"
              name="city"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your city"
            />
          </div>

          <div>
            <label htmlFor="postalCode" className="block text-sm font-medium text-gray-600">Postal Code</label>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your postal code"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          >
            Save Address
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddressPage;
