import * as Buffer from "buffer";
import MD5 from "crypto-js/md5";
export const decryptFile = async (encryptedFile: Buffer, key: string): Promise<Buffer> => {
  return encryptedFile;
}

export const generateUrl = async (path: string, passphrase: string): Promise<string> => {
  return `${path}?key=${MD5(passphrase).toString()}`
}
