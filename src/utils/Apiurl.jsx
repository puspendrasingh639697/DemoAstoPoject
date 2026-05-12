// // Backend Base URL
const BASE_URL = import.meta.env.VITE_BACKEND_URL || "https://astrologer-backendcoll-chaat.onrender.com";

export const API_ENDPOINTS = {
    // --- Auth & Onboarding ---
    LOGIN: `${BASE_URL}api/login`,
    REGISTER: `${BASE_URL}api/register`,
    USER_REGISTER_BASIC: `${BASE_URL}api/user-register`,
    VERIFY_OTP: `${BASE_URL}api/otp-verification`,
    SEND_OTP: `${BASE_URL}api/sendOtp`,

    // --- User Profile ---
    GET_USER_DATA: `${BASE_URL}api/userDetails`,
    UPDATE_USER_DATA: `${BASE_URL}api/updateUserdata`,
    DELETE_USER: `${BASE_URL}api/deleteUserdata`,
    UPDATE_PROFILE_AFTER_LOGIN: `${BASE_URL}api/update-user-profile`,
    CHECK_LOGIN_STATUS: `${BASE_URL}api/issloggedin`,

    // --- Wallet & Money ---
    RECHARGE_WALLET: `${BASE_URL}api/recharge-wallet`,
    WALLET_HISTORY: `${BASE_URL}api/wallet-history`,

    // --- Services & Bookings ---
    LIST_POOJAS: `${BASE_URL}api/allpooja`,
    GET_BOOKINGS: `${BASE_URL}api/getbookings`,
    GIVE_PANDIT_RATING: `${BASE_URL}api/give-ratting-pandit`,
    ALL_USERS: `${BASE_URL}api/all-users`, // Admin/Internal use के लिए
};

export default BASE_URL;