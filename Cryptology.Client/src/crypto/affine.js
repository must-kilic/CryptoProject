export function affineEncrypt(text, key) {
    if (!key || !key.includes(",")) return text;

    const [a, b] = key.split(",").map(Number);

    if (isNaN(a) || isNaN(b)) return text;

    let result = "";

    for (let char of text) {
        if (/[A-Za-z]/.test(char)) {
            const base = char === char.toUpperCase() ? 65 : 97;
            const x = char.charCodeAt(0) - base;
            const encrypted = (a * x + b) % 26;
            result += String.fromCharCode(encrypted + base);
        } else {
            result += char;
        }
    }

    return result;
}
