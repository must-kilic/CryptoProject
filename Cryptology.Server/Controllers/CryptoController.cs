using Microsoft.AspNetCore.Mvc;
using Cryptology.Server.Models;
using Cryptology.Server.Services;

namespace Cryptology.Server.Controllers
{
    [ApiController]
    [Route("api/crypto")]
    public class CryptoController : ControllerBase
    {
        private readonly RsaCipher _rsa;
        private readonly AesCipher _aes;
        private readonly DesCipher _des;
        private readonly SimpleAesCipher _manualAes;

        private readonly Dictionary<string, ICryptoService> _classical;

        public CryptoController(
            RsaCipher rsa,
            AesCipher aes,
            DesCipher des,
            SimpleAesCipher manualAes)
        {
            _rsa = rsa;
            _aes = aes;
            _des = des;
            _manualAes = manualAes;

            _classical = new()
            {
                { "caesar", new CaesarCipher() },
                { "playfair", new PlayfairCipher() },
                { "vigenere", new VigenereCipher() },
                { "substitution", new SubstitutionCipher() },
                { "affine", new AffineCipher() },
                { "railfence", new RailFenceCipher() }
            };
        }

        [HttpGet("publickey")]
        public IActionResult GetPublicKey()
        {
            return Ok(_rsa.GetPublicKey());
        }

        [HttpPost("setaeskey")]
        public IActionResult SetAesKey([FromBody] string encryptedKey)
        {
            var keyBytes = _rsa.Decrypt(Convert.FromBase64String(encryptedKey));
            _aes.SetKey(keyBytes);
            return Ok();
        }
        [HttpPost("exchange-key")]
        public IActionResult ExchangeKey([FromBody] string encryptedKeyBase64)
        {
            try
            {
                var encryptedKeyBytes = Convert.FromBase64String(encryptedKeyBase64);
                var aesKey = _rsa.Decrypt(encryptedKeyBytes);

                _aes.SetKey(aesKey);

                return Ok("AES key alýndý");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost("process")]
        public IActionResult Process([FromBody] CryptoRequest req)
        {
            return req.Mode switch
            {
                "Library" when req.Algorithm == "aes"
                    => Ok(_aes.Decrypt(req.Text)),

                "Library" when req.Algorithm == "des"
                    => Ok(_des.EncryptAndDecrypt(req.Text, req.Key!)),


                "Manual" when req.Algorithm == "aes"
                    => Ok(_manualAes.Decrypt(req.Text, req.Key!)),

                "Classical"
                    => Ok(_classical[req.Algorithm].Decrypt(req.Text, req.Key)),

                _ => BadRequest("Geçersiz istek")
            };
        }
    }
}
