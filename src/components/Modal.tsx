import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { hide as hideModal } from '../store/modal';
import { updateCurrentLocation, } from '../store/commonStates';
import DiscountInfo from './home/DiscountInfo';
import { LoginPage } from '../components/auth';
import AddressPicker from './addAddress';
import LocationPicker from './LocationPicker';

const Modal = () => {
  const { type, data } = useAppSelector((state) => state.modal.modalData);
  const dispatch = useAppDispatch();
  const [shake, setShake] = useState(false);

  const handleClose = () => {
    // if (type === 'locationPicker') {
    //   setShake(true);
    //   setTimeout(() => setShake(false), 2000); // match animation duration
    // } else {
    //   dispatch(hideModal());
    // }
    dispatch(hideModal());
  };

  const saveAddress = (location: any) => {
    if (location) {
      dispatch(updateCurrentLocation(location));
      dispatch(hideModal());
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 2000); // match animation duration
    }
  }

  let output;
  let modalClass = `_modal ${shake ? 'animate-shake' : ''}`;

  switch (type) {
    case 'discount':
      output = <DiscountInfo data={data} onClose={handleClose} />;
      modalClass += " md:max-w-[496px]";
      break;
    case 'login':
      output = <LoginPage onClose={handleClose} />;
      modalClass += " md:max-w-[496px]";
      break;
    case 'addressPicker': // Add address in db
      output = <AddressPicker onClose={handleClose} data={data} />;
      modalClass += " md:max-w-[1000px] md:h-[600px]";
      break;
    case 'locationPicker': //add temp address
      output = <LocationPicker onLocationSelected={saveAddress} />;
      modalClass += " md:max-w-[500px] _modal__location ";
      break;
    default:
      output = null;
  }

  return (
    <div className="fixed inset-0 h-screen w-screen z-50 overflow-hidden">
      <div className="absolute z-10 inset-0 bg-black bg-opacity-[.5]" onClick={handleClose} />
      <div className={modalClass}>
        {output}
      </div>
    </div>
  );
};

export default Modal;
