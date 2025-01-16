import { useAppDispatch, useAppSelector } from '../hooks';
import { hide as hideModal } from '../store/modal';
import DiscountInfo from './home/DiscountInfo';
import { LoginPage } from '../components/auth';
import AddressPicker from './addAddress';

const Modal = () => {
  const { type, data } = useAppSelector((state) => state.modal.modalData);
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(hideModal());
  };

  let output;
  let modalClass = "_modal"; // Default modal class

  switch (type) {
    case 'discount':
      output = <DiscountInfo data={data} onClose={handleClose} />;
      modalClass += " md:max-w-[496px]"; // Add specific class for DiscountInfo
      break;
    case 'login':
      output = <LoginPage onClose={handleClose} />;
      modalClass += " md:max-w-[496px]"; // Add specific class for LoginPage
      break;
    case 'addressPicker':
      output = <AddressPicker onClose={handleClose} />;
      modalClass += " md:max-w-[1000px] md:h-[600px]"; // Add specific class for AddressPicker
      break;
    default:
      output = null;
  }

  return (
    <div className="fixed inset-0 h-screen w-screen z-50 overflow-hidden p-4">
      <div
        className="absolute z-10 inset-0 bg-black bg-opacity-[.65]"
        onClick={handleClose}
      />
      <div className={modalClass}>{output}</div>
    </div>
  );
};

export default Modal;
