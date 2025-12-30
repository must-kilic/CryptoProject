export function vigenereEncrypt(text, key) {
    if (!key) return text;

    let result = "";
    key = key.toLowerCase();
    let keyIndex = 0;

    for (let i = 0; i < text.length; i++) {
        const char = text[i];

        if (char.match(/[a-z]/i)) {
            const keyChar = key[keyIndex % key.length];
            const shift = keyChar.charCodeAt(0) - 97;

            const code = char.charCodeAt(0);
            const offset = char === char.toUpperCase() ? 65 : 97;

            result += String.fromCharCode(((code - offset + shift) % 26) + offset);
            keyIndex++;
        } else {
            result += char;
        }
    }

    return result;
}
