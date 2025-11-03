import React, { useState } from "react";
import TextInput from "./components/TextInput";
import KeyInput from "./components/KeyInput";
import AlgorithmSelector from "./components/AlgorithmSelector";
import ActionButtons from "./components/ActionButtons";
import ResultBox from "./components/ResultBox";

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
            setResult("Bağlantı hatası!: ", err);
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
                        <TextInput text={text} setText={setText} />
                        <KeyInput keyValue={key} setKeyValue={setKey} />
                        <AlgorithmSelector algorithm={algorithm} setAlgorithm={setAlgorithm} />
                    </div>

                    <div className="flex flex-col justify-between">
                        <ActionButtons
                            onEncrypt={() => sendRequest("encrypt")}
                            onDecrypt={() => sendRequest("decrypt")}
                        />
                        <ResultBox result={result} />
                    </div>
                </div>

                <div className="text-center text-sm text-gray-500 mt-6">
                    <div>
                        <br /><br /><br /><br /><br /><br />
                        © 2025 Cryptology Project | React + .NET Core
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
