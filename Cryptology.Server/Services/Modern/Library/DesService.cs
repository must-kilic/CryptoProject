using System.Security.Cryptography;
using System.Text;

namespace Cryptology.Server.Services
{
    public class DesCipher
    {
        public string EncryptAndDecrypt(string plainText, string key)
        {
            var keyBytes = Encoding.UTF8.GetBytes(key);
            if (keyBytes.Length != 8)
                return "❌ DES anahtarı 8 byte olmalıdır!";

            try
            {
                using var des = DES.Create();
                des.Key = keyBytes;
                des.Mode = CipherMode.ECB;
                des.Padding = PaddingMode.PKCS7;

                var plainBytes = Encoding.UTF8.GetBytes(plainText);

                var encryptor = des.CreateEncryptor();
                var cipherBytes = encryptor.TransformFinalBlock(
                    plainBytes, 0, plainBytes.Length
                );

                var decryptor = des.CreateDecryptor();
                var decryptedBytes = decryptor.TransformFinalBlock(
                    cipherBytes, 0, cipherBytes.Length
                );

                return Encoding.UTF8.GetString(decryptedBytes);
            }
            catch
            {
                return "❌ DES işlem hatası";
            }
        }
    }
}
