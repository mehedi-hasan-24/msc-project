
const crypto = require("crypto");

//Generating the public key and private key
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
const sign = crypto.createSign('SHA256'); // Declare an algorithm by which the signature will be encrypted
sign.update('some data to sign'); // Enter the data to be signed.
sign.end(); // End the data inserting proecss.
const signature = sign.sign({key: privateKey, format: 'pem', type: 'pkcs8', passphrase: 'joy bangla'}); //create a signature

// verify a valid data..
const verify = crypto.createVerify('SHA256'); //create a verify object
verify.update('some data to sign'); // Enter the data to be verified
verify.end(); // End the data insert process
console.log("The validation result is:: " + verify.verify(publicKey, signature)); //verify.verify(publicKey, signature) function return true if the data is valid...


// Example of an invalid signature and the public key this will return false
const verify2 = crypto.createVerify('SHA256'); //create a verify object
verify2.update('some data to sign with invalid data'); // Enter the data to be verified ## Here I added some extra data so that it fails to be verified
verify2.end(); // End the data insert process
console.log("The validation result is:: " + verify2.verify(publicKey + "some extra data to the public key", signature+"some extra data to the signature")); //verify.verify(publicKey, signature) function return false if the data is invalid...
console.log("Public Key: " + publicKey);
console.log("Private Key: " + privateKey);

