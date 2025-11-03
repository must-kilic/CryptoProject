import React from "react";

function TextInput({ text, setText }) {
    return (
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
    );
}

export default TextInput;
