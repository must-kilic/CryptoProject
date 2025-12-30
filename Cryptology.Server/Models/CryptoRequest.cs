namespace Cryptology.Server.Models
{
    public class CryptoRequest
    {
        public string Algorithm { get; set; } = string.Empty;
        public string Mode { get; set; } = string.Empty; // Library | Manual | Classical
        public string Text { get; set; } = string.Empty;
        public string? Key { get; set; }
    }
}
