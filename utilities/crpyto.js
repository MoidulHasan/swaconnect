// Dependencies
const crypto = require('crypto');
const dotenv = require("dotenv");
dotenv.config();


// module scafolding
const crpyto = {};

const algorithm = 'aes-256-ctr';
const secretKey = process.env.SECRET_KEY;
const iv = crypto.randomBytes(16);

crpyto.encrypt = (text) => {

    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

    return {
        iv: iv.toString('hex'),
        content: encrypted.toString('hex')
    };
};

crpyto.decrypt = (hash) => {

    const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(hash.iv, 'hex'));

    const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()]);

    return decrpyted.toString();
};

module.exports = crpyto