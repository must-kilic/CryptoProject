function TextInput({ text, setText }) {
    return (
        <div>
            <label className="block font-medium mb-2">Metin</label>
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full p-3 border rounded"
                rows={4}
            />
        </div>
    );
}

export default TextInput;
