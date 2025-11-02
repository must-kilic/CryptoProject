using System;
using System.Collections.Generic;
using System.Text;

namespace Cryptology.Server.Services
{
    public class SubstitutionCipher : ICryptoService
    {
        private const string Alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        public string Encrypt(string text, string? key)
        {
            if (string.IsNullOrWhiteSpace(key))
                throw new ArgumentException("Substitution Cipher için bir anahtar girilmelidir.");

            key = key.ToUpper();

            if (key.Length != 26 || !IsValidKey(key))
                throw new ArgumentException("Anahtar 26 farklı harften oluşmalıdır (A-Z).");

            StringBuilder result = new();

            foreach (char c in text)
            {
                if (char.IsLetter(c))
                {
                    bool isUpper = char.IsUpper(c);
                    char upperChar = char.ToUpper(c);
                    int index = Alphabet.IndexOf(upperChar);
                    char cipherChar = key[index];

                    result.Append(isUpper ? cipherChar : char.ToLower(cipherChar));
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
                throw new ArgumentException("Substitution Cipher için bir anahtar girilmelidir.");

            key = key.ToUpper();

            if (key.Length != 26 || !IsValidKey(key))
                throw new ArgumentException("Anahtar 26 farklı harften oluşmalıdır (A-Z).");

            StringBuilder result = new();

            foreach (char c in text)
            {
                if (char.IsLetter(c))
                {
                    bool isUpper = char.IsUpper(c);
                    char upperChar = char.ToUpper(c);
                    int index = key.IndexOf(upperChar);
                    char plainChar = Alphabet[index];

                    result.Append(isUpper ? plainChar : char.ToLower(plainChar));
                }
                else
                {
                    result.Append(c);
                }
            }

            return result.ToString();
        }

        private bool IsValidKey(string key)
        {
            HashSet<char> uniqueLetters = new();
            foreach (char c in key)
            {
                if (!char.IsLetter(c)) return false;
                if (!uniqueLetters.Add(c)) return false;
            }
            return uniqueLetters.Count == 26;
        }
    }
}
