export function caesarEncrypt(text, key) {
    const shift = parseInt(key);
    if (isNaN(shift)) return "";

    return text
        .split("")
        .map((char) => {
            if (!char.match(/[a-z]/i)) return char;
            const code = char.charCodeAt(0);
            const offset = char === char.toUpperCase() ? 65 : 97;
            return String.fromCharCode(((code - offset + shift) % 26) + offset);
        })
        .join("");
}
