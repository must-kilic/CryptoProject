using System;
using System.Text;

namespace Cryptology.Server.Services
{
    public class AffineCipher : ICryptoService
    {
        public string Encrypt(string text, string? key)
        {
            if (string.IsNullOrWhiteSpace(key))
                throw new ArgumentException("Affine Cipher için 'a,b' formatında bir anahtar girilmelidir. Örnek: 5,8");

            var parts = key.Split(',');
            if (parts.Length != 2 ||
                !int.TryParse(parts[0], out int a) ||
                !int.TryParse(parts[1], out int b))
                throw new ArgumentException("Affine Cipher için geçerli bir anahtar girilmelidir. Örnek: 5,8");

            if (GCD(a, 26) != 1)
                throw new ArgumentException("a değeri ile 26 aralarında asal olmalıdır.");

            StringBuilder result = new();

            foreach (char c in text)
            {
                if (char.IsLetter(c))
                {
                    bool isUpper = char.IsUpper(c);
                    char baseChar = isUpper ? 'A' : 'a';
                    int x = c - baseChar;
                    char encryptedChar = (char)(((a * x + b) % 26) + baseChar);
                    result.Append(encryptedChar);
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
                throw new ArgumentException("Affine Cipher için 'a,b' formatında bir anahtar girilmelidir.");

            var parts = key.Split(',');
            if (parts.Length != 2 ||
                !int.TryParse(parts[0], out int a) ||
                !int.TryParse(parts[1], out int b))
                throw new ArgumentException("Affine Cipher için geçerli bir anahtar girilmelidir.");

            int a_inv = ModularInverse(a, 26);
            StringBuilder result = new();

            foreach (char c in text)
            {
                if (char.IsLetter(c))
                {
                    bool isUpper = char.IsUpper(c);
                    char baseChar = isUpper ? 'A' : 'a';
                    int y = c - baseChar;
                    char decryptedChar = (char)(((a_inv * (y - b + 26)) % 26) + baseChar);
                    result.Append(decryptedChar);
                }
                else
                {
                    result.Append(c);
                }
            }

            return result.ToString();
        }

        // --- Yardımcı metodlar ---
        private static int GCD(int a, int b)
        {
            while (b != 0)
            {
                int temp = b;
                b = a % b;
                a = temp;
            }
            return a;
        }

        private static int ModularInverse(int a, int m)
        {
            a %= m;
            for (int x = 1; x < m; x++)
                if ((a * x) % m == 1)
                    return x;
            throw new ArgumentException("a değeri için modüler ters yok (26 ile asal değil).");
        }
    }
}
