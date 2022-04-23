import * as crypto from "crypto";
import cacheManager from "cache-manager";
import { Decipher } from "crypto";
import * as fs from "fs";

const cache = cacheManager.caching({
  store: "memory",
  ttl: 60*60*48,
});

const salt = crypto.randomBytes(128);

export const encryptFile = async (passphrase: string): Promise<string> => {
  const derivedKey = crypto.pbkdf2Sync(passphrase, salt, 10000, 32, "sha256");
  const inputFile = fs.readFileSync("massi-alone-rt.png");
  const iv = crypto.randomBytes(16);
  console.log("iv " + iv.toString("hex"));

  const cipher = crypto.createCipheriv("aes-256-gcm", derivedKey, iv);
  let encrypted = Buffer.concat([iv, cipher.update(inputFile), cipher.final()]);
  fs.writeFileSync("massi-alone-rt.2.png", encrypted);
  return iv.toString("hex");
};

export const decryptFile = async (encryptedFile: Buffer, key: string): Promise<Buffer> => {
  try {
    const decipher = await cache.get(key) as Decipher;
    if (!decipher) throw {error: "key not found"}
    console.log("decrypting ... ")
    let decrypted = decipher.update(encryptedFile);
    return decrypted;
  } catch (e: any) {
    console.log("error "+e.message);
    return encryptedFile;
  }
}

export const generateUrl = async (path: string, passphrase: string, iv: string): Promise<string> => {
  const key = crypto.randomBytes(16).toString("hex");
  const derivedKey = crypto.pbkdf2Sync(passphrase, salt, 10000, 32, "sha256");
  const decipher = crypto.createDecipheriv('aes-256-cbc', derivedKey, Buffer.from(iv, "hex"));
  await cache.set(key, decipher);
  return `${path}?key=${key}`
}
