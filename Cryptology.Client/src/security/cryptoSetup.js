const API_URL = "http://192.168.1.34:5000/api/crypto";


let aesKey = null;

/* =========================
   RSA → AES KEY EXCHANGE
========================= */
export async function initializeKeyExchange() {
    const pubRes = await fetch(`${API_URL}/publickey`);
    const publicKeyBase64 = await pubRes.text();

    const publicKeyBuffer = Uint8Array.from(
        atob(publicKeyBase64),
        c => c.charCodeAt(0)
    );

    const rsaPublicKey = await crypto.subtle.importKey(
        "spki",
        publicKeyBuffer,
        { name: "RSA-OAEP", hash: "SHA-256" },
        false,
        ["encrypt"]
    );

    aesKey = await crypto.subtle.generateKey(
        { name: "AES-CBC", length: 128 },
        true,
        ["encrypt", "decrypt"]
    );

    const rawKey = await crypto.subtle.exportKey("raw", aesKey);

    const encryptedKey = await crypto.subtle.encrypt(
        { name: "RSA-OAEP" },
        rsaPublicKey,
        rawKey
    );

    const encryptedKeyBase64 = uint8ToBase64(new Uint8Array(encryptedKey));

    await fetch(`${API_URL}/exchange-key`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(encryptedKeyBase64),
    });
}

/* =========================
   AES ENCRYPT (IV + DATA)
========================= */
export async function encryptWithAes(text) {
    if (!aesKey)
        throw new Error("AES key hazır değil!");

    // 🔑 HER ŞİFRELEMEDE YENİ IV
    const iv = crypto.getRandomValues(new Uint8Array(16));
    const encoded = new TextEncoder().encode(text);

    const encrypted = await crypto.subtle.encrypt(
        { name: "AES-CBC", iv },
        aesKey,
        encoded
    );

    const combined = new Uint8Array(iv.length + encrypted.byteLength);
    combined.set(iv, 0);
    combined.set(new Uint8Array(encrypted), iv.length);

    return uint8ToBase64(combined);
}

/* =========================
   BASE64 HELPER (ÇOK ÖNEMLİ)
========================= */
function uint8ToBase64(u8) {
    let binary = "";
    const chunkSize = 0x8000;

    for (let i = 0; i < u8.length; i += chunkSize) {
        binary += String.fromCharCode(...u8.subarray(i, i + chunkSize));
    }

    return btoa(binary);
}

/* =========================
   BACKEND PROCESS
========================= */
export async function processCrypto(payload) {
    const res = await fetch(`${API_URL}/process`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        const err = await res.text();
        throw new Error(err);
    }

    return await res.text();
}
