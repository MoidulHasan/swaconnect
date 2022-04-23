// // Dependencies
// const crypto = require('crypto');


// // module scafolding
// const crpyto = {};

// const algorithm = 'aes-256-ctr';
// const secretKey = process.env.SECRET_KEY;
// const iv = crypto.randomBytes(16);

// crpyto.encrypt = async (text) => {


//     try {
//         console.log("text1: ", text);
//         const cipher = crypto.createCipheriv(algorithm, secretKey, iv);


//         const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);


//         const data = {
//             iv: iv.toString('hex'),
//             content: encrypted.toString('hex')
//         };
//         console.log(data);
//         return data.content;
//     } catch (error) {
//         console.log("error : ", error);
//     }

// };

// crpyto.decrypt = (hash) => {

//     const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(hash.iv, 'hex'));

//     const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()]);

//     return decrpyted.toString();
// };

// module.exports = crpyto;


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
        // console.log(decipher.update(encrypted, "hex", "utf8") + decipher.final("utf8"));

        return decipher.update(encrypted, "hex", "utf8") + decipher.final("utf8");
    }
}


// module export
module.exports = Encrypter;