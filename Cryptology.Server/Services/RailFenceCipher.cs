using System;
using System.Text;

namespace Cryptology.Server.Services
{
    public class RailFenceCipher : ICryptoService
    {
        public string Encrypt(string text, string? key)
        {
            if (string.IsNullOrWhiteSpace(key) || !int.TryParse(key, out int rails))
                throw new ArgumentException("Rail Fence Cipher için sayısal bir key girilmelidir.");

            if (rails < 2)
                throw new ArgumentException("Rail sayısı 2 veya daha büyük olmalıdır.");

            StringBuilder[] railBuilders = new StringBuilder[rails];
            for (int i = 0; i < rails; i++)
                railBuilders[i] = new StringBuilder();

            int currentRail = 0;
            bool goingDown = true;

            foreach (char c in text)
            {
                if (!char.IsLetterOrDigit(c) && !char.IsWhiteSpace(c))
                {
                    continue;
                }

                railBuilders[currentRail].Append(c);

                if (goingDown)
                {
                    currentRail++;
                    if (currentRail == rails - 1)
                        goingDown = false;
                }
                else
                {
                    currentRail--;
                    if (currentRail == 0)
                        goingDown = true;
                }
            }

            StringBuilder result = new();
            foreach (var sb in railBuilders)
                result.Append(sb);

            return result.ToString();
        }

        public string Decrypt(string text, string? key)
        {
            if (string.IsNullOrWhiteSpace(key) || !int.TryParse(key, out int rails))
                throw new ArgumentException("Rail Fence Cipher için sayısal bir key girilmelidir.");

            if (rails < 2)
                throw new ArgumentException("Rail sayısı 2 veya daha büyük olmalıdır.");

            bool[,] pattern = new bool[rails, text.Length];
            bool down = false;
            int row = 0;

            for (int col = 0; col < text.Length; col++)
            {
                pattern[row, col] = true;
                if (row == 0 || row == rails - 1)
                    down = !down;
                row += down ? 1 : -1;
            }

            int index = 0;
            char[,] railMatrix = new char[rails, text.Length];
            for (int i = 0; i < rails; i++)
            {
                for (int j = 0; j < text.Length; j++)
                {
                    if (pattern[i, j] && index < text.Length)
                    {
                        railMatrix[i, j] = text[index++];
                    }
                }
            }

            StringBuilder result = new();
            down = false;
            row = 0;
            for (int col = 0; col < text.Length; col++)
            {
                result.Append(railMatrix[row, col]);
                if (row == 0 || row == rails - 1)
                    down = !down;
                row += down ? 1 : -1;
            }

            return result.ToString();
        }
    }
}
