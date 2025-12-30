import {
    keyExpansion, bytesToState, stateToBytes,
    addRoundKey, subBytes, shiftRows, mixColumns
} from "./aesManualCore";

export function aesEncryptManual(plainText, key) {
    const textBytes = new TextEncoder().encode(plainText.padEnd(16, "\x00")).slice(0, 16);
    const keyBytes = new TextEncoder().encode(key.padEnd(16, "\x00")).slice(0, 16);

    const expanded = keyExpansion(keyBytes);
    let state = bytesToState(textBytes);

    const steps = [];

    addRoundKey(state, getRoundKey(expanded, 0));
    steps.push({ title: "Round 0 — AddRoundKey", matrix: copy(state) });

    for (let round = 1; round <= 9; round++) {
        subBytes(state);
        shiftRows(state);
        mixColumns(state);
        addRoundKey(state, getRoundKey(expanded, round));

        steps.push({
            title: `Round ${round}`,
            matrix: copy(state)
        });
    }

    subBytes(state);
    shiftRows(state);
    addRoundKey(state, getRoundKey(expanded, 10));

    steps.push({ title: "Final Round", matrix: copy(state) });

    const resultBytes = stateToBytes(state);
    const base64 = btoa(String.fromCharCode(...resultBytes));

    return { encrypted: base64, steps };
}

function getRoundKey(expanded, round) {
    const key = [
        expanded.slice(round * 4, round * 4 + 1)[0],
        expanded.slice(round * 4 + 1, round * 4 + 2)[0],
        expanded.slice(round * 4 + 2, round * 4 + 3)[0],
        expanded.slice(round * 4 + 3, round * 4 + 4)[0]
    ];
    return key;
}

function copy(obj) {
    return JSON.parse(JSON.stringify(obj));
}
