using Microsoft.AspNetCore.Mvc;
using Cryptology.Server.Services;
using Cryptology.Server.Models;

namespace Cryptology.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CryptoController : ControllerBase
    {
        private readonly Dictionary<string, ICryptoService> _services;

        public CryptoController()
        {

            _services = new()
            {
                { "caesar", new CaesarCipher() },
                {"playfair", new PlayfairCipher()},
                {"substitution", new SubstitutionCipher()},
                {"vigenere", new VigenereCipher()},
                {"affine", new AffineCipher()},
            };
        }

        [HttpPost("{algorithm}/encrypt")]
        public IActionResult Encrypt(string algorithm, [FromBody] CryptoRequest request)
        {
            if (!_services.ContainsKey(algorithm.ToLower()))
                return NotFound(new { error = "Geçersiz algoritma" });

            try
            {
                string result = _services[algorithm.ToLower()].Encrypt(request.Text, request.Key);
                return Ok(new { encrypted = result });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        [HttpPost("{algorithm}/decrypt")]
        public IActionResult Decrypt(string algorithm, [FromBody] CryptoRequest request)
        {
            if (!_services.ContainsKey(algorithm.ToLower()))
                return NotFound(new { error = "Geçersiz algoritma" });

            try
            {
                string result = _services[algorithm.ToLower()].Decrypt(request.Text, request.Key);
                return Ok(new { decrypted = result });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }
    }
}
