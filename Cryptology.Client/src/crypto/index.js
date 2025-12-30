import { caesarEncrypt } from "./caesar";
import { vigenereEncrypt } from "./vigenere";
import { playfairEncrypt } from "./playfair";
import { affineEncrypt } from "./affine";
import { railFenceEncrypt } from "./railfence";
import { substitutionEncrypt } from "./substitution";
import des from "./des";
export const encryptFunctions = {
    caesar: caesarEncrypt,
    vigenere: vigenereEncrypt,
    playfair: playfairEncrypt,
    affine: affineEncrypt,
    railfence: railFenceEncrypt,
    substitution: substitutionEncrypt,
    des: des.encrypt

};
