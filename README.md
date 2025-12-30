# 🔐 Cryptology Project

This project demonstrates a secure client–server communication system using classical and modern cryptographic algorithms.

## 🚀 Technologies
- React (Client)
- ASP.NET Core Web API (Server)
- Web Crypto API
- Wireshark (Network Analysis)

## 🔑 Supported Algorithms

### Classical Ciphers
- Caesar
- Vigenere
- Affine
- Rail Fence
- Playfair
- Substitution

### Modern Cryptography
- AES-128 (Library & Manual)
- DES
- RSA (Key Exchange)

## 🧠 Key Exchange
RSA is used only for secure AES key distribution.  
AES encryption is performed on the client side, while decryption is handled by the server.

## 🔍 Wireshark Analysis
Network traffic was captured and analyzed using Wireshark:
- Classical cipher data is readable over the network.
- AES and DES encrypted data is unreadable.
- AES packets are larger than DES packets due to IV usage.

## 📂 Project Structure
- `Cryptology.Client` → React frontend
- `Cryptology.Server` → ASP.NET Core backend
- `crypto/` → Classical and manual encryption algorithms

## ▶️ How to Run
1. Start the backend (`dotnet run`)
2. Start the frontend (`npm run dev`)
3. Open the client and select an algorithm
4. Capture traffic with Wireshark

## 📄 Author
**Name:** Mustafa Kılıç
**Student Number:** 436537 
**Course:** Cryptology
