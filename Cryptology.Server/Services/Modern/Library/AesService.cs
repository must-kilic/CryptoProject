using System.Security.Cryptography;
using System.Text;

namespace Cryptology.Server.Services
{
    public class AesCipher
    {
        private byte[]? _aesKey;

        public void SetKey(byte[] key)
        {
            if (key.Length != 16)
                throw new Exception("AES-128 için key 16 byte olmalıdır!");

            _aesKey = key;
        }

        public string Decrypt(string cipherTextBase64)
        {
            if (_aesKey == null)
                throw new Exception("AES anahtarı hazır değil!");

            var fullCipher = Convert.FromBase64String(cipherTextBase64);

            if (fullCipher.Length < 17)
                throw new Exception("Geçersiz AES verisi");

            // İlk 16 byte = IV
            var iv = new byte[16];
            var cipher = new byte[fullCipher.Length - 16];

            Buffer.BlockCopy(fullCipher, 0, iv, 0, 16);
            Buffer.BlockCopy(fullCipher, 16, cipher, 0, cipher.Length);

            using var aes = Aes.Create();
            aes.Key = _aesKey;
            aes.IV = iv;
            aes.Mode = CipherMode.CBC;
            aes.Padding = PaddingMode.PKCS7;

            var decryptor = aes.CreateDecryptor();
            var plainBytes = decryptor.TransformFinalBlock(cipher, 0, cipher.Length);

            return Encoding.UTF8.GetString(plainBytes);
        }
    }
}
