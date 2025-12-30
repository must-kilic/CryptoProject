import React, { useState, useEffect } from "react";
import TextInput from "./components/TextInput";
import KeyInput from "./components/KeyInput";
import AlgorithmSelector from "./components/AlgorithmSelector";
import ActionButtons from "./components/ActionButtons";
import { encryptFunctions } from "./crypto";
import { processCrypto } from "./security/cryptoSetup";
import { ManualAESPanel } from "./components/ManualAESPanel";
import { initializeKeyExchange, encryptWithAes } from "./security/cryptoSetup";
import { aesEncryptManual } from "./crypto/aesManual"
import AlgorithmInfo from "./components/AlgorithmInfo";

function App() {
    const [text, setText] = useState("");
    const [key, setKey] = useState("");
    const [algorithm, setAlgorithm] = useState("caesar");
    const [encryptedText, setEncryptedText] = useState("");
    const [decryptedText, setDecryptedText] = useState("");
    const [steps, setSteps] = useState([]);
    const [keyReady, setKeyReady] = useState(false);
    useEffect(() => {
        initializeKeyExchange().then(() => setKeyReady(true));
    }, []);

    const sendRequest = async (mode) => {
        try {
            setEncryptedText("");
            setDecryptedText("");
            setSteps([]);

            /* =========================
               MANUAL AES (SERVER SIDE)
            ========================= */
            if (algorithm === "aes-manual") {
                if (!key || key.length !== 16) {
                    setEncryptedText("");
                    setDecryptedText("❌ Manuel AES için 16 karakterlik anahtar gerekir");
                    setSteps([]);
                    return;
                }

                // 🔐 Manual AES tamamen CLIENT-SIDE
                const { encrypted, steps } = aesEncryptManual(text, key);

                setEncryptedText(encrypted);
                setDecryptedText(text);   // 👈 Bilinçli olarak plaintext
                setSteps(steps);          // 👈 ADIMLAR GERİ GELİR

                return;
            }



            /* =========================
               MODERN – LIBRARY (AES)
            ========================= */
            if (algorithm === "aes") {
                if (algorithm === "aes" && !keyReady) {
                    setDecryptedText("❌ AES key henüz hazır değil");
                    return;
                }
                const encrypted = await encryptWithAes(text);
                setEncryptedText(encrypted);

                const res = await processCrypto({
                    algorithm: "aes",
                    mode: "Library",
                    text: encrypted,
                });

                setDecryptedText(res);
                return;
            }

            /* =========================
               MODERN – LIBRARY (DES)
            ========================= */
            if (algorithm === "des") {
                if (!key || key.length !== 8) {
                    setDecryptedText("❌ DES key 8 karakter olmalıdır");
                    return;
                }

                const res = await processCrypto({
                    algorithm: "des",
                    mode: "Library",
                    text,   // 🔴 PLAINTEXT
                    key,
                });

                setEncryptedText("(DES işlemi sunucu tarafında yapıldı)");
                setDecryptedText(res);
                return;
            }




            /* =========================
               KLASİK ALGORİTMALAR
            ========================= */
            if (mode === "encrypt") {
                const encryptFn = encryptFunctions[algorithm];
                if (!encryptFn)
                    return setDecryptedText("Algoritma bulunamadı!");

                const cipher = encryptFn(text, key);
                setEncryptedText(cipher);

                const res = await processCrypto({
                    algorithm,
                    mode: "Classical",
                    text: cipher,
                    key,
                });

                setDecryptedText(res);
                return;
            }

            if (mode === "decrypt") {
                const res = await processCrypto({
                    algorithm,
                    mode: "Classical",
                    text,
                    key,
                });

                setDecryptedText(res);
                return;
            }
        } catch (err) {
            setDecryptedText("❌ Hata: " + err.message);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl p-10 mx-auto pl-14 pr-14">

                <h1 className="text-4xl font-extrabold text-center text-indigo-700 mb-10">
                    🔐 Cryptology Tool
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

                    <div className="space-y-6">
                        <TextInput text={text} setText={setText} />

                        {algorithm !== "aes" && (
                            <KeyInput keyValue={key} setKeyValue={setKey} />
                        )}

                        <AlgorithmSelector
                            algorithm={algorithm}
                            setAlgorithm={setAlgorithm}
                        />

                        <ActionButtons
                            onEncrypt={() => sendRequest("encrypt")}
                            onDecrypt={() => sendRequest("decrypt")}
                        />
                    </div>

                    <div className="space-y-6 min-w-0">
                        <div className="bg-indigo-50 p-5 rounded">
                            <strong>🔒 Şifreli Mesaj</strong>
                            <p className="break-all">{encryptedText || "—"}</p>
                        </div>

                        <div className="bg-green-50 p-5 rounded">
                            <strong>🟢 Çözülmüş Mesaj</strong>
                            <p className="break-all">{decryptedText || "—"}</p>
                        </div>

                        <AlgorithmInfo algorithm={algorithm} />


                        {algorithm === "aes-manual" && steps.length > 0 && (

                            <div className="mt-8 border-2 border-indigo-400 rounded-2xl p-4 overflow-x-auto">
                                <ManualAESPanel steps={steps} />
                            </div>

                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
