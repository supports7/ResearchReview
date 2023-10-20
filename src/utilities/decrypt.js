import CryptoJS from 'crypto-js';
import atob from 'atob';
// import btoa from 'btoa';
import { Buffer } from 'buffer';

function hexToBase64(str) {
    let stringBeforeCharCode = str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" ")
    let tempString = String.fromCharCode.apply(null,stringBeforeCharCode)
    //var x = Buffer.from(tempString)
    //var y = x.toString('base64');
    return Buffer.from(tempString, "binary").toString('base64')
    // // return btoa();
    // return btoa(String.fromCharCode.apply(null,
    //     str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" "))
    // );
}

function base64ToHex(str) {
    for (var i = 0, bin = atob(str.replace(/[ \r\n]+$/, "")), hex = []; i < bin.length; ++i) {
        var tmp = bin.charCodeAt(i).toString(16);
        if (tmp.length === 1) tmp = "0" + tmp;
        hex[hex.length] = tmp;
    }
    return hex.join("");
}

const decrypt = (stringToDecrypt, encryptionKey) => {
    var keySize = 256;
    
    var iterations = 1000;
    var hexResult = base64ToHex(stringToDecrypt)
    console.log("hexResult", hexResult)

    var salt = CryptoJS.enc.Hex.parse(hexResult.substr(0, 64));
    console.log("salt", salt)

    var iv = CryptoJS.enc.Hex.parse(hexResult.substr(64, 32));
    console.log("iv", iv)

    var encrypted = hexToBase64(hexResult.substring(96));
    console.log("encrypted", encrypted)
    var key = CryptoJS.PBKDF2(encryptionKey, salt, {
        keySize: keySize / 32,
        iterations: iterations
    });
    console.log("key", key)

    var decrypted = CryptoJS.AES.decrypt(encrypted.toString(), key, {
        iv: iv,
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC

    })
    console.log("decrypted", decrypted)
    console.log("decrypted.toString(CryptoJS.enc.Utf8)", decrypted.toString(CryptoJS.enc.Utf8))
    
    return decrypted.toString(CryptoJS.enc.Utf8);
}

export default decrypt;