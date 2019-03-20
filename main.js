const crypto = require('crypto');
const alice = crypto.createECDH('secp521r1');
const sign = crypto.createSign('SHA256');

const {
    privateKey,
    publicKey
} = crypto.generateKeyPairSync('ec', {
    namedCurve: 'secp521r1',
    publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
    },
    privateKeyEncoding: {
        type: 'sec1',
        format: 'pem',
    }
});

// This is a shortcut way of specifying one of Alice's previous private
// keys. It would be unwise to use such a predictable private key in a real
// application.
console.log(privateKey.toString('utf8'))

const sign2 = crypto.createSign('SHA256');
sign2.update('{type: jwt, curve: secp521r1}');
sign2.end();
const signature2 = sign2.sign(privateKey);
console.log("Signed data", signature2.toString('hex'));

const verify = crypto.createVerify('SHA256');
verify.update('some data to sign');
verify.end();
console.log(verify.verify(publicKey, signature2));
console.log(`JWT: {header: type: jwt, curve: secp521r1}, signature: 0x${signature2.toString('hex')}}`)