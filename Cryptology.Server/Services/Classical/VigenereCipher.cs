using System;
using System.Text;

namespace Cryptology.Server.Services
{
    public class VigenereCipher : ICryptoService
    {
        public string Encrypt(string text, string? key)
        {
            if (string.IsNullOrWhiteSpace(key))
                throw new ArgumentException("Vigenere Cipher için bir anahtar girilmelidir.");

            key = key.ToUpper();
            StringBuilder result = new();
            int keyIndex = 0;

            foreach (char c in text)
            {
                if (char.IsLetter(c))
                {
                    bool isUpper = char.IsUpper(c);
                    char baseChar = isUpper ? 'A' : 'a';
                    int shift = key[keyIndex % key.Length] - 'A';
                    char encryptedChar = (char)(((c - baseChar + shift) % 26) + baseChar);

                    result.Append(encryptedChar);
                    keyIndex++;
                }
                else
                {
                    result.Append(c);
                }
            }

            return result.ToString();
        }

        public string Decrypt(string text, string? key)
        {
            if (string.IsNullOrWhiteSpace(key))
                throw new ArgumentException("Vigenere Cipher için bir anahtar girilmelidir.");

            key = key.ToUpper();
            StringBuilder result = new();
            int keyIndex = 0;

            foreach (char c in text)
            {
                if (char.IsLetter(c))
                {
                    bool isUpper = char.IsUpper(c);
                    char baseChar = isUpper ? 'A' : 'a';
                    int shift = key[keyIndex % key.Length] - 'A';
                    char decryptedChar = (char)(((c - baseChar - shift + 26) % 26) + baseChar);

                    result.Append(decryptedChar);
                    keyIndex++;
                }
                else
                {
                    result.Append(c);
                }
            }

            return result.ToString();
        }
    }
}
