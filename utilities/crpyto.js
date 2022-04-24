const crypto = require("crypto");

class Encrypter {
    constructor(encryptionKey) {
        this.algorithm = "aes-192-cbc";
        this.key = crypto.scryptSync(encryptionKey, "salt", 24);
    }

    async encrypt(clearText) {
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv(this.algorithm, this.key, iv);
        const encrypted = cipher.update(clearText, "utf8", "hex");
        return [
            encrypted + cipher.final("hex"),
            Buffer.from(iv).toString("hex"),
        ].join("|");
    }

    async dencrypt(encryptedText) {

        const splitedData = encryptedText.split("|");
        const [encrypted, iv] = splitedData;

        if (!iv) throw new Error("IV not found");

        const decipher = crypto.createDecipheriv(
            this.algorithm,
            this.key,
            Buffer.from(iv, "hex")
        );

        return decipher.update(encrypted, "hex", "utf8") + decipher.final("utf8");
    }
}


// module export
module.exports = Encrypter;