function KeyInput({ keyValue, setKeyValue, disabled }) {
    return (
        <div>
            <label className="block font-medium mb-2">Anahtar</label>
            <input
                value={keyValue}
                onChange={(e) => setKeyValue(e.target.value)}
                disabled={disabled}
                className="w-full p-3 border rounded"
                placeholder="Anahtar giriniz"
            />
        </div>
    );
}

export default KeyInput;
