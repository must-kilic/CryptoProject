using System;
using System.Text;

namespace Cryptology.Server.Services
{
    public class CaesarCipher : ICryptoService
    {
        public string Encrypt(string text, string? key)
        {
            if (!int.TryParse(key, out int shift))
                throw new ArgumentException("Caesar Cipher için sayısal bir key girilmelidir.");

            StringBuilder result = new();
            foreach (char c in text)
            {
                if (char.IsLetter(c))
                {
                    char baseChar = char.IsUpper(c) ? 'A' : 'a';
                    result.Append((char)((c - baseChar + shift) % 26 + baseChar));
                }
                else result.Append(c);
            }
            return result.ToString();
        }

        public string Decrypt(string text, string? key)
        {
            if (!int.TryParse(key, out int shift))
                throw new ArgumentException("Caesar Cipher için sayısal bir key girilmelidir.");

            return Encrypt(text, (26 - shift % 26).ToString());
        }
    }
}
