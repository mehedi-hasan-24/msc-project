
const crypto = require("crypto");

const {
    publicKey,
    privateKey,
} =crypto.generateKeyPairSync('rsa', {
    modulusLength: 600,
    publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
    },
    privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
        cipher: 'aes-256-cbc',
        passphrase: 'joy bangla'
    }
});

//sign some data
const sign = crypto.createSign('SHA256');
sign.update('some data to sign');
sign.end();
const signature = sign.sign({key: privateKey, format: 'pem', type: 'pkcs8', passphrase: 'joy bangla'});

// verify the data..
const verify = crypto.createVerify('SHA256');
verify.update('some data to sign');
verify.end();
console.log(verify.verify(publicKey.toString('hex'), signature));
console.log(publicKey.toString('hex'), signature);
