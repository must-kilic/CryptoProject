using System.Security.Cryptography;

namespace Cryptology.Server.Services
{
    public class RsaCipher
    {
        private readonly RSA _rsa;

        public RsaCipher()
        {
            _rsa = RSA.Create(2048);
        }

        public string GetPublicKey()
        {
            return Convert.ToBase64String(_rsa.ExportSubjectPublicKeyInfo());
        }

        public byte[] Decrypt(byte[] encryptedData)
        {
            return _rsa.Decrypt(encryptedData, RSAEncryptionPadding.OaepSHA256);
        }
    }
}
