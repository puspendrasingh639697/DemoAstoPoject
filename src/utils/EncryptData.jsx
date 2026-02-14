import CryptoJS from 'crypto-js';

const SECRET_KEY = import.meta.env.VITE_ENCRYPTION_KEY ;

if (!SECRET_KEY) {
  throw new Error("SECRET_KEY is not defined in environment variables.");
}

export const setSecureItem = async (key, value) => {
  try {
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(value), SECRET_KEY).toString();
    sessionStorage.setItem(key, encrypted);
    return true;
  } catch (error) {
    console.error('Encryption failed:', error);
    throw error;
  }
};

export const getSecureItem = async (key) => {
  try {
    const encrypted = sessionStorage.getItem(key);
    if (!encrypted) return null;

    const bytes = CryptoJS.AES.decrypt(encrypted, SECRET_KEY);
    const decryptedString = bytes.toString(CryptoJS.enc.Utf8);

    if (!decryptedString) {
      throw new Error('Decryption failed or invalid SECRET_KEY.');
    }

    return JSON.parse(decryptedString);
  } catch (error) {
    console.error('Decryption failed:', error);
    throw error;
  }
};

export const removeSecureItem = async (key) => {
  sessionStorage.removeItem(key);
  return true;
};
