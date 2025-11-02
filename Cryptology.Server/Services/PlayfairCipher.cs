using System;
using System.Collections.Generic;
using System.Text;

namespace Cryptology.Server.Services
{
    public class PlayfairCipher : ICryptoService
    {
        private char[,] matrix = new char[5, 5];
        private Dictionary<char, (int row, int col)> positions = new();

        public string Encrypt(string text, string? key)
        {
            if (string.IsNullOrWhiteSpace(key))
                throw new ArgumentException("Playfair Cipher için bir anahtar girilmelidir.");

            GenerateMatrix(key);
            string prepared = PrepareText(text);
            StringBuilder result = new();

            for (int i = 0; i < prepared.Length; i += 2)
            {
                char a = prepared[i];
                char b = prepared[i + 1];
                (int rowA, int colA) = positions[a];
                (int rowB, int colB) = positions[b];

                if (rowA == rowB)
                {
                    result.Append(matrix[rowA, (colA + 1) % 5]);
                    result.Append(matrix[rowB, (colB + 1) % 5]);
                }
                else if (colA == colB)
                {
                    result.Append(matrix[(rowA + 1) % 5, colA]);
                    result.Append(matrix[(rowB + 1) % 5, colB]);
                }
                else
                {
                    result.Append(matrix[rowA, colB]);
                    result.Append(matrix[rowB, colA]);
                }
            }

            return result.ToString();
        }

        public string Decrypt(string text, string? key)
        {
            if (string.IsNullOrWhiteSpace(key))
                throw new ArgumentException("Playfair Cipher için bir anahtar girilmelidir.");

            GenerateMatrix(key);
            text = text.ToUpper().Replace("J", "I");
            StringBuilder result = new();

            for (int i = 0; i < text.Length; i += 2)
            {
                char a = text[i];
                char b = text[i + 1];
                (int rowA, int colA) = positions[a];
                (int rowB, int colB) = positions[b];

                if (rowA == rowB)
                {
                    result.Append(matrix[rowA, (colA + 4) % 5]);
                    result.Append(matrix[rowB, (colB + 4) % 5]);
                }
                else if (colA == colB)
                {
                    result.Append(matrix[(rowA + 4) % 5, colA]);
                    result.Append(matrix[(rowB + 4) % 5, colB]);
                }
                else
                {
                    result.Append(matrix[rowA, colB]);
                    result.Append(matrix[rowB, colA]);
                }
            }

            return result.ToString();
        }


        private void GenerateMatrix(string key)
        {
            key = key.ToUpper().Replace("J", "I");
            HashSet<char> used = new();
            StringBuilder fullKey = new();

            foreach (char c in key)
            {
                if (char.IsLetter(c) && !used.Contains(c))
                {
                    used.Add(c);
                    fullKey.Append(c);
                }
            }

            for (char c = 'A'; c <= 'Z'; c++)
            {
                if (c == 'J') continue;
                if (!used.Contains(c))
                {
                    used.Add(c);
                    fullKey.Append(c);
                }
            }

            positions.Clear();
            int index = 0;
            for (int i = 0; i < 5; i++)
            {
                for (int j = 0; j < 5; j++)
                {
                    matrix[i, j] = fullKey[index];
                    positions[matrix[i, j]] = (i, j);
                    index++;
                }
            }
        }

        private string PrepareText(string text)
        {
            text = text.ToUpper().Replace("J", "I");
            StringBuilder sb = new();

            for (int i = 0; i < text.Length; i++)
            {
                char a = text[i];
                if (!char.IsLetter(a)) continue;

                char b = (i + 1 < text.Length && char.IsLetter(text[i + 1])) ? text[i + 1] : 'X';

                if (a == b)
                {
                    sb.Append(a).Append('X');
                }
                else
                {
                    sb.Append(a).Append(b);
                    i++;
                }
            }

            if (sb.Length % 2 != 0)
                sb.Append('X');

            return sb.ToString();
        }
    }
}
