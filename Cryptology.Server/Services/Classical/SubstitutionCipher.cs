using System;
using System.Text;

namespace Cryptology.Server.Services
{
    public class SubstitutionCipher : ICryptoService
    {
        private const string Alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        public string Encrypt(string text, string? key)
        {
            key = ValidateKey(key);
            StringBuilder result = new();

            foreach (char c in text.ToUpper())
            {
                int index = Alphabet.IndexOf(c);
                result.Append(index >= 0 ? key[index] : c);
            }

            return result.ToString();
        }

        public string Decrypt(string text, string? key)
        {
            key = ValidateKey(key);
            StringBuilder result = new();

            foreach (char c in text.ToUpper())
            {
                int index = key.IndexOf(c);
                result.Append(index >= 0 ? Alphabet[index] : c);
            }

            return result.ToString();
        }

        private string ValidateKey(string? key)
        {
            if (string.IsNullOrWhiteSpace(key))
                throw new ArgumentException("Substitution Cipher için 26 karakterlik bir key girilmelidir.");

            key = key.ToUpper();

            if (key.Length != 26)
                throw new ArgumentException("Anahtar tam olarak 26 harf olmalıdır.");

            if (HasDuplicates(key))
                throw new ArgumentException("Anahtardaki tüm harfler benzersiz olmalıdır.");

            return key;
        }

        private bool HasDuplicates(string key)
        {
            foreach (char c in key)
                if (key.IndexOf(c) != key.LastIndexOf(c))
                    return true;
            return false;
        }
    }
}
