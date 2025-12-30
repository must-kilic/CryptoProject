export function railFenceEncrypt(text, key) {
    const rails = parseInt(key);
    if (isNaN(rails) || rails < 2) return text;

    const fence = Array.from({ length: rails }, () => []);
    let rail = 0;
    let direction = 1;

    for (let char of text) {
        fence[rail].push(char);

        rail += direction;
        if (rail === 0 || rail === rails - 1) direction *= -1;
    }

    return fence.map(row => row.join("")).join("");
}
