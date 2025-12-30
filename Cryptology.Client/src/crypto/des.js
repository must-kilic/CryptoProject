import CryptoJS from "crypto-js";

export function encrypt(text, key) {
    if (!key || key.length !== 8) {
        throw new Error("DES key 8 karakter olmalıdır");
    }

    const encrypted = CryptoJS.DES.encrypt(
        text,
        CryptoJS.enc.Utf8.parse(key),
        {
            mode: CryptoJS.mode.ECB,   // 🔴 ECB
            padding: CryptoJS.pad.Pkcs7
        }
    );

    return encrypted.toString(); // Base64
}

export default { encrypt };
