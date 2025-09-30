import React, { useState } from "react";

function App() {
    const [text, setText] = useState("");
    const [response, setResponse] = useState("");

    const sendMessage = async () => {
        try {
            const res = await fetch("https://localhost:7134/api/crypto/echo", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text })
            });

            if (!res.ok) {
                throw new Error(`Server error: ${res.status}`);
            }

            const data = await res.json();
            setResponse(JSON.stringify(data));
        } catch (err) {
            setResponse("Hata: " + err.message);
        }
    };

    return (
        <div style={{ padding: 20 }}>
            <h1>Crypto Client</h1>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type Message..."
            />
            <button onClick={sendMessage}>Send</button>

            <p>Sunucudan gelen: {response}</p>
        </div>
    );
}

export default App;
