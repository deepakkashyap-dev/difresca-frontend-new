import axiosInstance from '../config';
import { auth } from '../collections';

interface SendOtpResponse {
    success: boolean;
    message: string;
}

interface VerifyOtpResponse {
    data?: any;
    success?: boolean;
    message?: string;
    token?: string;
}


const sendOtpAPI = async (phoneNumber: string): Promise<SendOtpResponse> => {
    try {
        const response = await axiosInstance.get(`${auth['GENERATE_OTP']}?mobile=${phoneNumber}`, { loader: true });
        return response.data;
    } catch (error) {
        throw error;
    }
}

// Verify OTP
const verifyOtpAPI = async (mobile: string, otp: string): Promise<any> => {
    try {
        const response = await axiosInstance.post(auth['VERIFY_OTP'], {
            mobile,
            otp,
        }, { loader: true });
        return response;
    } catch (error) {
        throw error;
    }
}

const refreshAccessToken = async (refreshToken: string): Promise<string | null> => {
    try {
        const response = await axiosInstance.post(auth['REFRESH_TOKEN'], { refresh: refreshToken });
        return response.data.access;
    } catch (error) {
        console.error('Failed to refresh access token:', error);
        return null;
    }
};


export { sendOtpAPI, verifyOtpAPI, refreshAccessToken };
