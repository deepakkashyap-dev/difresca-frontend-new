import { createContext, useContext, ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { logout as authLogout } from "../store/auth";
import { sendOtpAPI, verifyOtpAPI } from "../utils/Api/AppService/authApi";
import { isTokenExpired } from '../utils/helper';

interface LoginData {
    mobileNumber?: string;
    otp?: string;
}

interface AuthContextType {
    isAuthenticated: () => boolean;
    handleSendOtp: (data: LoginData) => Promise<any>;
    handleVerifyOtp: (data: LoginData) => Promise<any>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const dispatch = useAppDispatch();

    const { isLoggedIn, accessToken } = useAppSelector(
        (state) => state.persistedReducers.auth
    );

    const isAuthenticated = () => isLoggedIn && !isTokenExpired(accessToken);

    const logout = () => {
        dispatch(authLogout());
        // window.location.href = "/"; // Redirect to home page after logout
        window.location.reload(); // Reload the page to reset the state
    };

    const handleSendOtp = async (data: LoginData) => {
        if (!data.mobileNumber) {
            throw new Error("Phone number is required");
        }
        try {
            const response = await sendOtpAPI(data.mobileNumber);
            return response;
        } catch (error) {
            throw error; // Re-throw to handle in the component
        }

    };
    const handleVerifyOtp = async (data: LoginData) => {
        if (!data.mobileNumber || !data.otp) {
            throw new Error("Phone number and OTP are required");
        }
        try {
            const response = await verifyOtpAPI(data.mobileNumber, data.otp);
            return response; // Return the API response
        } catch (error: any) {
            throw error; // Re-throw to handle in the component
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, handleSendOtp, handleVerifyOtp, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
