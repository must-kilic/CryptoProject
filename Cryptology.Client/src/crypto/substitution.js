export function substitutionEncrypt(text, key) {
    if (!key || key.length !== 26) return text;

    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    key = key.toUpperCase();

    let result = "";

    for (let char of text.toUpperCase()) {
        const index = alphabet.indexOf(char);
        if (index !== -1) {
            result += key[index];
        } else {
            result += char;
        }
    }

    return result;
}
