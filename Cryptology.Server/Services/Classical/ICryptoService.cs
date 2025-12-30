namespace Cryptology.Server.Services
{
    public interface ICryptoService
    {
        string Encrypt(string text, string? key);
        string Decrypt(string text, string? key);
    }
}
