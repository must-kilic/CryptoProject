export function playfairEncrypt(text, key) {
    if (!key) return text;

    text = text.toUpperCase().replace(/J/g, "I").replace(/[^A-Z]/g, "");
    key = key.toUpperCase().replace(/J/g, "I");

    let prepared = "";
    for (let i = 0; i < text.length; i++) {
        let a = text[i];
        let b = text[i + 1] || "X";

        if (a === b) {
            prepared += a + "X";
        } else {
            prepared += a + b;
            i++;
        }
    }
    if (prepared.length % 2 !== 0) prepared += "X";

    let keyString = key + "ABCDEFGHIKLMNOPQRSTUVWXYZ";
    let matrixKey = [...new Set(keyString.split(""))];
    let matrix = [];
    let positions = {};

    while (matrixKey.length) matrix.push(matrixKey.splice(0, 5));

    for (let r = 0; r < 5; r++)
        for (let c = 0; c < 5; c++)
            positions[matrix[r][c]] = { r, c };

    let result = "";
    for (let i = 0; i < prepared.length; i += 2) {
        let a = prepared[i];
        let b = prepared[i + 1];

        let { r: ar, c: ac } = positions[a];
        let { r: br, c: bc } = positions[b];

        if (ar === br) {
            result += matrix[ar][(ac + 1) % 5];
            result += matrix[br][(bc + 1) % 5];
        } else if (ac === bc) {
            result += matrix[(ar + 1) % 5][ac];
            result += matrix[(br + 1) % 5][bc];
        } else {
            result += matrix[ar][bc];
            result += matrix[br][ac];
        }
    }

    return result;
}
