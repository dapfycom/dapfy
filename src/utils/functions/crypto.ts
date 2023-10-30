import {
  createCipheriv,
  createDecipheriv,
  createHash,
  pbkdf2Sync,
  randomBytes,
} from "crypto";

// Function to encrypt private key
export function encryptPrivateKey(
  privateKey: string,
  password: string
): string {
  const iv = randomBytes(16); // generate a new IV every time
  const hash = createHash("sha256").update(password).digest(); // hash the password to get a 256-bit key
  const cipher = createCipheriv("aes-256-cbc", hash, iv); // use the hash as the key
  let encrypted = cipher.update(privateKey, "utf-8", "hex");
  encrypted += cipher.final("hex");
  return iv.toString("hex") + ":" + encrypted;
}

// Function to decrypt private key
export function decryptPrivateKey(
  encryptedPrivateKey: string,
  password: string
): string {
  const [iv, encrypted] = encryptedPrivateKey.split(":");
  const hash = createHash("sha256").update(password).digest(); // hash the password to get a 256-bit key
  const decipher = createDecipheriv(
    "aes-256-cbc",
    hash,
    Buffer.from(iv, "hex")
  ); // use the hash as the key
  let decrypted = decipher.update(encrypted, "hex", "utf-8");
  decrypted += decipher.final("utf-8");
  return decrypted;
}
export function generateEncryptionPassword(secret: string): string {
  // Salt should be generated and stored securely
  const salt = "unique-salt"; // Replace with a securely generated salt
  const iterations = 10000; // Adjust iteration count for desired computational cost
  const keyLength = 32; // 256 bits for AES-256
  const derivedKey = pbkdf2Sync(secret, salt, iterations, keyLength, "sha512");
  return derivedKey.toString("hex");
}
