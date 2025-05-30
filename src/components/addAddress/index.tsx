import React, { useState, useEffect, useCallback } from 'react';
import { GoogleMap, Autocomplete, useLoadScript } from '@react-google-maps/api';
import { ImSearch } from "react-icons/im";
import { IoMdClose, IoIosHome } from "react-icons/io";
import { useAppDispatch, useAppSelector } from '../../hooks';
import { addAddress } from '../../store/account';
import { addAddressApi, updateAddressApi } from '../../utils/Api/AppService/profileApi';
import { IoClose } from 'react-icons/io5';
import { showToast } from '../../store/ui';


const libraries: ("places" | "drawing" | "geometry" | "visualization")[] = ['places'];
interface Props {
    onClose: (e: React.MouseEvent<HTMLButtonElement>) => void;
    data: any;
}

const AddressPicker: React.FC<Props> = ({ onClose, data = null }) => {
    console.log('AddressPicker data:', Boolean(data));
    // Initialize states with data if available
    const [initialRender, setInitialRender] = useState(true);

    const [address, setAddress] = useState('');
    const [locality, setLocality] = useState<{ street_number?: string; route?: string; locality?: string; postal_code?: string }>({});
    const [manualAddress, setManualAddress] = useState({ name: '', phone: '', building: '', landmark: '' });
    const dispatch = useAppDispatch();

    const { lat, lng } = useAppSelector((state) => state.persistedReducers.commonState.currentCoordinates);
    const [center, setCenter] = useState(() => ({
        lat: lat || -27.424413,
        lng: lng || 53.054364,
    }));

    useEffect(() => {
        if (data && initialRender) {
            setAddress(data.formattedAddress || '');
            setLocality({
                street_number: data.street_no,
                route: data.street_name,
                locality: data.locality,
                postal_code: data.postal_code
            });
            setManualAddress({
                name: data.name,
                phone: data.phone,
                building: data.building,
                landmark: data.landmark || ''
            });
            if (data.coordinates) {
                setCenter({
                    lat: data.coordinates.lat,
                    lng: data.coordinates.lng
                });
            }
            setInitialRender(false);
        }
    }, [data]);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY || '',
        libraries: libraries,
    });

    const autocompleteRef = React.useRef<google.maps.places.Autocomplete | null>(null);
    const mapRef = React.useRef<google.maps.Map | null>(null);

    const formFields = [
        { id: 'name', label: 'Name', value: manualAddress?.name || '', optional: false },
        { id: 'phone', label: 'Phone', value: manualAddress?.phone || '', optional: false },
        { id: 'building', label: 'Building/Flat/House', value: manualAddress?.building || '', optional: false },
        { id: 'landmark', label: 'Landmark', value: manualAddress?.landmark || '', optional: true },
    ];

    const handlePlaceChanged = () => { // when pin point is changed
        if (autocompleteRef.current) {
            const place = autocompleteRef.current.getPlace();
            setAddress(place.formatted_address || '');
            if (place.geometry && place.geometry.location) {
                const newCenter = {
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
                };
                setCenter(newCenter);
            }
        }
    };

    const handleManualAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setManualAddress((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const requiredFields = formFields.filter(field => !field.optional);
        const isFormValid = requiredFields.every(field => manualAddress[field.id as keyof typeof manualAddress]);
        if (isFormValid) {
            const { name, phone, building, landmark } = manualAddress;
            const payload = {
                name: name,
                phone: phone,
                building: building,
                street_no: locality.street_number || '',
                street_name: locality.route || '',
                postal_code: locality.postal_code || '',
                locality: locality.locality || '',
                landmark: landmark || '',
                formattedAddress: address,
                coordinates: center,
            }
            if (Boolean(data)) {// UPDATE ADDRESS
                dispatch(updateAddressApi({ payload, address_id: data.id }))
                    .unwrap()
                    .then((res: { address_id: string }) => {
                        dispatch(showToast({ type: 'success', message: 'Address updated successfully!' }));
                        setLocality({});
                        setManualAddress({ name: '', phone: '', building: '', landmark: '' });
                        onClose({} as React.MouseEvent<HTMLButtonElement>);
                    })
                    .catch((err: Error) => {
                        console.log(err);
                        dispatch(showToast({ type: 'error', message: 'Failed to update address!' }));
                    });

            }
            else { // ADD ADDRESS}
                addAddressApi(payload).then((res) => {
                    dispatch(showToast({ type: 'success', message: 'Address added successfuly !' }));
                    dispatch(addAddress({ ...payload, id: res.address_id }));
                    setLocality({});
                    setManualAddress({ name: '', phone: '', building: '', landmark: '' });
                    onClose({} as React.MouseEvent<HTMLButtonElement>)
                }).catch((err) => {
                    console.log(err);
                    dispatch(showToast({ type: 'error', message: 'Failed to add address!' }));
                })
            }
        } else {
            alert('Please fill in all required fields.');
        }
    };

    const handleMapIdle = useCallback(() => {
        if (mapRef.current) {
            const geocoder = new google.maps.Geocoder();
            const new_center = mapRef.current.getCenter();
            if (new_center) {
                geocoder.geocode({ location: new_center }, (results, status) => {
                    if (status === 'OK' && results && results[0]) {
                        // setAddress(results[0].formatted_address);
                        const addressComponents = results[0].address_components;
                        let street_number = '';
                        let route = '';
                        let locality = '';
                        let postal_code = '';

                        addressComponents.forEach(component => {
                            if (component.types.includes('street_number')) {
                                street_number = component.long_name;
                            }
                            if (component.types.includes('route')) {
                                route = component.long_name;
                            }
                            if (component.types.includes('locality') && component.types.includes('political')) {
                                locality = component.long_name;
                            }
                            if (component.types.includes('postal_code')) {
                                postal_code = component.long_name;
                            }
                        });
                        setLocality({ street_number, route, locality, postal_code })
                        const current_map_center = {
                            lat: new_center.lat(),//results[0].geometry.location.lat(),
                            lng: new_center.lng(),//results[0].geometry.location.lng(),
                        };
                        if (current_map_center.lat !== center.lat || current_map_center.lng !== center.lng) {
                            setAddress(results[0].formatted_address);
                            setCenter(current_map_center);
                        }
                    }
                });
            }
        }
    }, [mapRef, center]);

    const options = {
        // gestureHandling: 'greedy',
        fullscreenControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        zoomControl: true,
        strictBounds: true,
        componentRestrictions: { country: 'au' }, // Australia only
        fields: ['formatted_address', 'geometry', 'name'],
        restriction: {
            latLngBounds: {
                north: -26.5,  // approximate northern limit of Brisbane
                south: -27.7,  // approximate southern limit of Brisbane
                west: 152.5,   // approximate western limit of Brisbane
                east: 153.3    // approximate eastern limit of Brisbane
            },
            strictBounds: true, // set true to enforce bounds strictly
        }
    };

    return (
        <div className='flex md:h-[600px]'>
            <button
                type="button"
                onClick={onClose}
                className="absolute text-gray-400 cursor-pointer p-3 right-1 top-1"
            >
                <IoClose size={24} />
            </button>
            {!isLoaded ? (
                <div className='map-container md:w-1/2'>Loading...</div>
            ) : (
                <GoogleMap
                    mapContainerClassName="map-container md:w-1/2"
                    center={center}
                    zoom={30}
                    onLoad={(map) => { mapRef.current = map; }}
                    onIdle={handleMapIdle}
                    options={options}
                >
                    <div className="relative w-full p-2 pt-3">
                        <Autocomplete onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)} onPlaceChanged={handlePlaceChanged}>
                            <div className='relative'>
                                <input
                                    type="text"
                                    placeholder="Search for places"
                                    className="w-full p-2 pl-10 pr-10 border rounded focus:outline-none focus:ring-1 focus:b-theme-green-400"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                                <div className="absolute top-0 left-0 w-10 h-10 flex items-center justify-center z-10">
                                    <ImSearch className='h-5 w-5 text-green-700' />
                                </div>
                                <button type="button" className="absolute top-0 right-0  w-10 h-10 flex items-center justify-center z-10" onClick={() => setAddress('')}>
                                    <IoMdClose className='h-2 w-2 text-black-200' />
                                </button>
                            </div>
                        </Autocomplete>
                    </div>
                    {
                        locality.street_number &&
                        <div className="absolute flex p-4 pb-4 flex-col rounded-t-2xl bg-white shadow-md z-50 bottom-0 left-0 right-0">
                            <div className='text-black text-sm font-bold'>Delivering your order to </div>
                            <div className='flex p-2 mt-2 border rounded-t-lg items-center bg-gray-100'>
                                <IoIosHome className='w-7 h-7 text-green-700 mr-4' />
                                <div>
                                    {locality.street_number && <div className='text-black text-xs font-bold'>{locality.street_number}</div>}
                                    <div className='text-gray-600 text-xs font-bold'>
                                        {locality.route}, {locality.locality}
                                    </div>
                                </div>
                            </div>
                        </div>
                    }

                    <div
                        className="absolute top-1/2 left-1/2 w-6 h-8 bg-no-repeat"
                        style={{
                            backgroundImage: 'url(https://maps.gstatic.com/mapfiles/markers2/marker.png)',
                            transform: 'translate(-50%, -50%)',
                            pointerEvents: 'none',
                        }}
                    />
                </GoogleMap>
            )
            }
            <div className="md:w-1/2 p-4">
                <h2 className="text-lg font-bold mb-4 text-center">Enter Full Address</h2>
                <form onSubmit={handleSubmitForm}>
                    {formFields.map((field) => (
                        <div key={field.id} className="mb-4 relative">
                            <input
                                type="text"
                                id={field.id}
                                name={field.id}
                                value={field.value}
                                onChange={handleManualAddressChange}
                                className="w-full p-3 pl-5 text-gray-500 border rounded-xl focus:outline-none focus:ring-1 focus:ring-gray-400 peer"
                                required={!field.optional}
                            />
                            <label
                                htmlFor={field.id}
                                className={`absolute left-5 pl-2 pr-2 bg-white text-md text-gray-300 transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:font-bold peer-focus:text-gray-700 ${field.value ? '-top-2 text-xs font-bold text-gray-700' : 'top-3'}`}
                            >
                                {field.label}{!field.optional ? '*' : '   (optional)'}
                            </label>
                        </div>
                    ))}
                    <button type="submit" className="bg-theme-green-400 text-white font-bold p-2 rounded hover:bg-theme-green-600 w-full">
                        {Boolean(data) ? 'Update Address' : 'Save Address'}
                    </button>
                </form>

            </div>
        </div >
    );
};

export default AddressPicker;