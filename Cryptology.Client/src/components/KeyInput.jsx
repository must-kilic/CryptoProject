import React from "react";

function KeyInput({ keyValue, setKeyValue }) {
    return (
        <div>
            <label className="block text-gray-700 font-medium mb-2">
                Anahtar (Key):
            </label>
            <input
                value={keyValue}
                onChange={(e) => setKeyValue(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder="Örn: 3 veya ABC"
            />
        </div>
    );
}

export default KeyInput;
