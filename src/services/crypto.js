import CryptoJS from 'crypto-js';

const cryptoSecretPass = process.env.NEXT_PUBLIC_CRYPTOPASS;


export const encryptPhrase =( message ) => {
    return CryptoJS.AES.encrypt(message, cryptoSecretPass ).toString();
}

export const decryptPhrase = ( encrypted ) => {
        // Decrypt the data
        const bytes  = CryptoJS.AES.decrypt( encrypted, cryptoSecretPass );
        const originalText = bytes.toString(CryptoJS.enc.Utf8);
        console.log( encrypted, originalText, cryptoSecretPass );
        return originalText;
}

