import React from "react";

function AlgorithmSelector({ algorithm, setAlgorithm }) {
    return (
        <div>
            <label className="block font-medium mb-2">Algoritma</label>
            <select
                value={algorithm}
                onChange={(e) => setAlgorithm(e.target.value)}
                className="w-full p-3 border rounded"
            >
                <optgroup label="Klasik Şifreleme">
                    <option value="caesar">Caesar</option>
                    <option value="affine">Affine</option>
                    <option value="vigenere">Vigenere</option>
                    <option value="playfair">Playfair</option>
                    <option value="substitution">Substitution</option>
                    <option value="railfence">Rail Fence</option>
                </optgroup>

                <optgroup label="Modern - Library">
                    <option value="aes">AES-128</option>
                    <option value="des">DES</option>
                </optgroup>

                <optgroup label="Modern - Manual">
                    <option value="aes-manual">AES (Manual)</option>
                </optgroup>
            </select>
        </div>
    );
}

export default AlgorithmSelector;
