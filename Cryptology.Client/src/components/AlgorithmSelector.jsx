import React from "react";

function AlgorithmSelector({ algorithm, setAlgorithm }) {
    return (
        <div>
            <label className="block text-gray-700 font-medium mb-2">
                Algoritma:
            </label>
            <select
                value={algorithm}
                onChange={(e) => setAlgorithm(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            >
                <optgroup label="Klasik Kripto Şifreleme">
                    <option value="caesar">Sezar Şifreleme</option>
                    <option value="playfair">Playfair Şifreleme</option>
                    <option value="vigenere">Vigenere Cipher</option>
                    <option value="substitution">Substitution Cipher</option>
                    <option value="affine">Affine Cipher</option>
                </optgroup>
            </select>
        </div>
    );
}

export default AlgorithmSelector;
