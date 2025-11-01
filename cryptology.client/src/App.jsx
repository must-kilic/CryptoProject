import React, { useState } from "react";

function App() {
    const [text, setText] = useState("");
    const [key, setKey] = useState("");
    const [result, setResult] = useState("");
    const [algorithm, setAlgorithm] = useState("caesar");

    const sendRequest = async (mode) => {
        try {
            const res = await fetch(
                `https://localhost:7134/api/crypto/${algorithm}/${mode}`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ text, key }),
                }
            );

            const data = await res.json();
            setResult(data.encrypted || data.decrypted || data.error || "Sonuç alınamadı.");
        } catch (err) {
            setResult("Bağlantı hatası!");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex justify-center items-center p-6">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl p-10">
                <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
                    🔐 Cryptology Tool
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col space-y-4">
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                                Metin:
                            </label>
                            <textarea
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                className="w-full h-28 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none resize-none"
                                placeholder="Şifrelenecek veya çözülecek metni girin..."
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                                Anahtar (Key):
                            </label>
                            <input
                                value={key}
                                onChange={(e) => setKey(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                                placeholder="Örn: 3 veya ABC"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                                Algoritma:
                            </label>
                            <select
                                value={algorithm}
                                onChange={(e) => setAlgorithm(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                            >
                                <option value="caesar">Caesar Cipher</option>
                                <option value="vigenere" disabled>
                                    Vigenere Cipher (yakında)
                                </option>
                                <option value="hill" disabled>
                                    Hill Cipher (yakında)
                                </option>
                                <option value="aes" disabled>
                                    AES (yakında)
                                </option>
                                <option value="rsa" disabled>
                                    RSA (yakında)
                                </option>
                            </select>
                        </div>
                    </div>

                    <div className="flex flex-col justify-between">
                        <div className="space-y-3">
                            <button
                                onClick={() => sendRequest("encrypt")}
                                className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-200"
                            >
                                🔒 Şifrele
                            </button>

                            <button
                                onClick={() => sendRequest("decrypt")}
                                className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition duration-200"
                            >
                                🔓 Çöz
                            </button>
                        </div>

                        <div className="mt-8">
                            <h2 className="text-gray-700 font-semibold mb-2">Sonuç:</h2>
                            <div className="bg-gray-50 border border-gray-300 rounded-lg p-3 h-28 overflow-auto text-gray-800 shadow-inner">
                                {result || "Henüz bir işlem yapılmadı."}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-center text-sm text-gray-500 mt-6">
                    <div>
                        <br /><br /> <br /><br /> <br/><br/>
                        © 2025 Cryptology Project | React + .NET Core
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

export default App;
