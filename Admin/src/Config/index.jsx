// src/Config/index.jsx
import COMPANYLOGO from "../assets/images/companylogo.png";
import PROFILEIMAGE from "../assets/images/profile.png";
import ARTLOGIN from "../assets/images/Loginart.png";

// Use destructuring for better readability
export const CONFIG = {
    SECRET_KEY: import.meta.env.VITE_REACT_APP_REMEMBER_SECRET || 'default_secret',
    BASE_URL: import.meta.env.VITE_REACT_APP_BASE_URL || 'http://localhost:3000',
};

export const IMAGES = {
    companyLogo: COMPANYLOGO,
    profileImage: PROFILEIMAGE,
    artLogin: ARTLOGIN,
};
