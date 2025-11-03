import React from "react";

function ResultBox({ result }) {
    return (
        <div className="mt-8">
            <h2 className="text-gray-700 font-semibold mb-2">Sonuç:</h2>
            <div className="bg-gray-50 border border-gray-300 rounded-lg p-3 h-28 overflow-auto text-gray-800 shadow-inner">
                {result || "Henüz bir işlem yapılmadı."}
            </div>
        </div>
    );
}

export default ResultBox;
