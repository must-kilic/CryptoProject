const algorithmInfo = {
    caesar: {
        title: "Caesar Cipher",
        type: "Klasik",
        key: "Sayı (Shift)",
        flow: "Client Encrypt → Server Decrypt",
    },
    vigenere: {
        title: "Vigenere Cipher",
        type: "Klasik",
        key: "Metin (Anahtar Kelime)",
        flow: "Client Encrypt → Server Decrypt",
    },
    affine: {
        title: "Affine Cipher",
        type: "Klasik",
        key: "a, b (sayısal)",
        flow: "Client Encrypt → Server Decrypt",
    },
    playfair: {
        title: "Playfair Cipher",
        type: "Klasik",
        key: "Metin",
        flow: "Client Encrypt → Server Decrypt",
    },
    substitution: {
        title: "Substitution Cipher",
        type: "Klasik",
        key: "26 Harflik Alfabe",
        flow: "Client Encrypt → Server Decrypt",
    },
    railfence: {
        title: "Rail Fence Cipher",
        type: "Klasik",
        key: "Satır Sayısı (Sayı)",
        flow: "Client Encrypt → Server Decrypt",
    },
    aes: {
        title: "AES-128 (Library)",
        type: "Modern – Simetrik",
        key: "16 byte (128-bit)",
        flow: "Client Encrypt → Server Decrypt",
        extra: "Key dağıtımı RSA ile yapılır",
    },
    des: {
        title: "DES",
        type: "Modern – Simetrik (Legacy)",
        key: "8 byte",
        flow: "Server Encrypt + Decrypt",
        extra: "Güvenli değildir (eğitim amaçlı)",
    },
    "aes-manual": {
        title: "AES (Manual)",
        type: "Eğitim Amaçlı",
        key: "16 byte",
        flow: "Client-side",
        extra: "Round yapısı görselleştirilir",
    },
};

export default function AlgorithmInfo({ algorithm }) {
    const info = algorithmInfo[algorithm];
    if (!info) return null;

    return (
        <div className="bg-yellow-50 border border-yellow-300 rounded-2xl p-5 shadow-md">
            <h3 className="text-lg font-bold text-yellow-800 mb-3">
                ℹ️ Algoritma Bilgisi
            </h3>

            <ul className="text-sm text-gray-800 space-y-1">
                <li><b>Algoritma:</b> {info.title}</li>
                <li><b>Tür:</b> {info.type}</li>
                <li><b>Anahtar:</b> {info.key}</li>
                <li><b>Akış:</b> {info.flow}</li>
                {info.extra && (
                    <li className="text-gray-600 italic">
                        {info.extra}
                    </li>
                )}
            </ul>
        </div>
    );
}
