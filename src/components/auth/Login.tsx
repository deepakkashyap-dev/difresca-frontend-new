import React, { useState, useEffect } from 'react';
import { IoClose, IoArrowBackSharp } from 'react-icons/io5';
import { useAppDispatch } from '../../hooks';
import { login as authLogin } from '../../store/auth';
// import { sendOtpAPI, verifyOtpAPI } from '../../utils/Api/AppService/authApi';
import { useAuth } from '../../contexts/authContext';
import { showToast } from '../../store/ui';


interface Props {
    onClose: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const LoginPage = ({ onClose }: Props) => {
    const [step, setStep] = useState(1); // Step 1: Mobile Number, Step 2: OTP
    const [mobileNumber, setMobileNumber] = useState('');
    const [timer, setTimer] = useState(8); // Set timer for 8 seconds
    const [otp, setOtp] = useState(new Array(4).fill(''));
    const [isOtpSent, setIsOtpSent] = useState(false);
    const { handleSendOtp, handleVerifyOtp } = useAuth();

    const isOtpComplete = otp.every(value => value.trim() !== '');


    const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const numericValue = e.target.value.replace(/[^0-9]/g, '');
        setMobileNumber(numericValue);
    };

    const dispatch = useAppDispatch();
    const handleMobileSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await handleSendOtp({ mobileNumber });
            setIsOtpSent(true);
            setStep(2); // Move to OTP step
            setTimer(59)
        } catch (err: any) {
            if (err.status === 429) {
                dispatch(showToast({ type: 'error', message: 'Too many requests. Please try again later.' }));
            };
        }
    };

    const handleOtpSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await handleVerifyOtp({ mobileNumber, otp: otp.join('') });
            dispatch(authLogin({ isLoggedIn: true, refreshToken: res?.data?.refreshToken, accessToken: res?.data?.accessToken, mobileNumber: mobileNumber }));
            window.location.reload();
        }
        catch (err: any) {
            console.log(err.response.data);
        }
    };

    // Handle input change
    const handleOTPChange = (element: EventTarget & HTMLInputElement, index: number) => {
        const value = element.value.replace(/\D/g, ''); // Allow only digits
        if (value.length > 1) return; // Ensure only one character is entered

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Focus on the next input field
        const nextElement = element.nextElementSibling as HTMLInputElement; // Use nextElementSibling
        if (value && nextElement) {
            nextElement.focus();
        }
    };

    // Handle backspace
    const handleBackspace = (event: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (event.key === 'Backspace' && !otp[index]) {
            const previousElement = event.target.previousSibling as HTMLInputElement;
            if (previousElement) {
                previousElement.focus();
            }
        }
    };

    // Countdown timer logic
    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [timer]);

    const resendCode = () => {
        setOtp(new Array(4).fill(''));
        setTimer(59);
    };

    const handleBackForm = () => {
        setOtp(new Array(4).fill(''));
        setStep(1);
    }

    return (
        <div className="relative">
            <button
                type="button"
                onClick={onClose}
                className="absolute text-gray-400 cursor-pointer p-3 right-1 top-1"
            >
                <IoClose size={24} />
            </button>
            {
                step === 2 && (
                    <button
                        type="button"
                        onClick={handleBackForm}
                        className="absolute text-gray-400 cursor-pointer p-3 left-1 top-1"
                    >
                        <IoArrowBackSharp size={24} />
                    </button>
                )
            }
            <div className="bg-white p-8 rounded-xl shadow-lg w-100">
                {step === 1 ? (
                    <>
                        <div className='flex flex-col items-center'>
                            <img src="/logo_svg.svg" alt="Logo" className="h-[100px]" />
                            <div className="text-center text-gray-400 mb-2"> Log in or Sign up </div>
                        </div>
                        <form onSubmit={handleMobileSubmit} className='login-form mb-4'>
                            <div className="mb-4 login-phone">
                                <input
                                    type="tel"
                                    id="mobile"
                                    name="mobile"
                                    maxLength={10}
                                    minLength={10}
                                    value={mobileNumber}
                                    onChange={handleMobileChange}
                                    className="w-full p-2 text-gray-600 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
                                    placeholder="Enter mobile number"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className={`w-full py-2 text-white rounded-md ${mobileNumber.length === 10 ? 'bg-theme-green hover:bg-theme-green-600' : 'bg-gray-400'}`}
                                disabled={!(mobileNumber.length === 10)}
                            >
                                Send OTP
                            </button>
                        </form>
                    </>
                ) : (
                    <>
                        <div className='flex flex-col items-center'>
                            <p>We have sent a verification code on your mobile</p>
                            <h3 className='font-cursive'>+91-{mobileNumber}</h3>
                        </div>
                        <form onSubmit={handleOtpSubmit} className='login-form mb-6'>
                            <div className="otp-input-container mb-4">
                                {otp.map((value, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        maxLength={1}
                                        value={value}
                                        onChange={(e) => handleOTPChange(e.target, index)}
                                        onKeyDown={(e) => handleBackspace(e, index)}
                                        className="otp-input focus:border-theme-green-400 focus:shadow-theme-green"
                                    />
                                ))}
                            </div>
                            <button
                                type="submit"
                                className={`w-full py-2 text-white rounded-md ${isOtpComplete ? 'bg-theme-green hover:bg-theme-green-600' : 'bg-gray-400'}`}
                                disabled={!isOtpComplete}
                            >
                                Verify OTP
                            </button>
                        </form>
                        <p className="text-center text-sm text-gray-400">
                            {timer > 0 ?
                                `Resend OTP ( in ${timer} sec )` :
                                <span className="text-theme-green cursor-pointer" onClick={resendCode}> Resend</span>
                            }
                        </p>
                    </>
                )}

            </div>
        </div>
    );
};

export default LoginPage;
