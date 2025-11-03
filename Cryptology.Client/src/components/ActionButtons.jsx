import React from "react";

function ActionButtons({ onEncrypt, onDecrypt }) {
    return (
        <div className="space-y-3">
            <button
                onClick={onEncrypt}
                className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-200"
            >
                🔒 Şifrele
            </button>

            <button
                onClick={onDecrypt}
                className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition duration-200"
            >
                🔓 Çöz
            </button>
        </div>
    );
}

export default ActionButtons;
