using System.Text;

namespace Cryptology.Server.Services
{
    public class SimpleAesCipher
    {
        private readonly byte[] sbox =
        {
            0x63, 0x7C, 0x77, 0x7B,
            0xF2, 0x6B, 0x6F, 0xC5,
            0x30, 0x01, 0x67, 0x2B,
            0xFE, 0xD7, 0xAB, 0x76
        };

        private byte Sub(byte b) => sbox[b % 16];

        public string Encrypt(string plainText, string key)
        {
            if (key.Length != 16)
                throw new Exception("Manuel AES için 16 karakterlik anahtar gerekir.");

            var text = Encoding.UTF8.GetBytes(plainText);
            var k = Encoding.UTF8.GetBytes(key);
            var output = new byte[text.Length];

            for (int i = 0; i < text.Length; i++)
                output[i] = Sub((byte)(text[i] ^ k[i % 16]));

            return Convert.ToBase64String(output);
        }

        public string Decrypt(string cipherText, string key)
        {
            if (key.Length != 16)
                throw new Exception("Manuel AES için 16 karakterlik anahtar gerekir.");

            var enc = Convert.FromBase64String(cipherText);
            var k = Encoding.UTF8.GetBytes(key);
            var output = new byte[enc.Length];

            for (int i = 0; i < enc.Length; i++)
            {
                byte reversed = enc[i];
                for (byte j = 0; j < 16; j++)
                    if (sbox[j] == reversed)
                        reversed = j;

                output[i] = (byte)(reversed ^ k[i % 16]);
            }

            return Encoding.UTF8.GetString(output);
        }
    }
}
