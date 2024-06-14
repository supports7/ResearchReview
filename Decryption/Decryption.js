const CryptoJS = require('crypto-js');
const atob = require('atob');
const btoa = require('btoa');
const stringToDecrypt = '10Ts83V7mjr2zmfsannsEjzwPGzgyR3tdhNdxSJY05K0zJi2bAVvsHcSt8d54uL7WBh5lBGHy3lNhZd8zxJV6I4WJOEyVNA408RMDj862VMBuKKoTzXA9Fr3eBk1fQqb1IF8JJSNohaRtIZGiALdMSYGjzfKmFxfCcdoQZzNqJmCWd/3w5g7gFli4+6lXCdBZEpWu0tT4y7POmeSHeOu/fy3BEsc73sQpqk01QdRdZ6YUUD3tMIWkwqZxuM/nLMjLlZq0ieSiilbssc9W5Ic+RMmwkqzuXO/KXXrcMJcrJj6a3+NnfuPJeGtZIRHVmofy55v4rGcZJtWjUvcMXedubv1Q3+GSlGVi4H5+Y2V891hZmBr1mLStqtqy/nP/k40PhoDVnFPaq3+QIrpTgTgyW4B72ONby5Kuz1pnZrelM7WRxR0rX/F0MuenlTWa0RojjWIjJbv+4j4RcuOhbwE7ecx3xHNhYTjO4J7Wy2Y3iaY05CspuE9y5Xk+SWW90X1Rd7U5OJjbdxTpEcaYEP+3K7KOpri9r5aqgXCm1vTUNptODfGvd8vS1Ey8BVurLJjMlBB5CzGDtrKKIyYhinkoheTO13x1i0oitrKLXO1hjXC7zF0Kyv9tvGV3mZMlkq2AP4VlvsMFk8wneMg+tsl9AMepJyjvQF3ab5Za6fviyGs0jPde93tc1v4+jZtc8RZeyJ+GVo1vyE8An/RyKe1zM9AH4dXfKWKIr0ds1WmWCRzhcxRYEkPOo/xDJRRzm9mnzp09PsknA/+LPaFjkmHKwq4THW/Y9OB4jK/gCi+d0Lx0Sh7af60XAOAOt1KSoJoy1laMVsB9JvFi+5ucSclG+3f2A0hT5lvOBZfwjDoMWvk0M+ca81/1hKSn3GSkqOdUVyl5W/WoQczPYIzuBwFANe+Aof92eh0y4vSx2LMDRz3aYpRug92OkebHwKpEemr2N43js0efRiQLGdYa7yshSKCy+3ND48mHgWP3CLrc5HZfc95T/fWlllCJy/0/sDRHBYE8fmLdAQR3s4BDwfiw1kIUwyMnfQrC0no4Q5kdos=';
const encryptionKey = '665c762c3d484fb4a9c71db8435e6127';

function decrypt(transitmessage, pass) {
    var keySize = 256;
    
    var iterations = 1000;
    var hexResult = base64ToHex(transitmessage)

    var salt = CryptoJS.enc.Hex.parse(hexResult.substr(0, 64));
    var iv = CryptoJS.enc.Hex.parse(hexResult.substr(64, 32));
    var encrypted = hexToBase64(hexResult.substring(96));

    var key = CryptoJS.PBKDF2(pass, salt, {
        keySize: keySize / 32,
        iterations: iterations
    });

    var decrypted = CryptoJS.AES.decrypt(encrypted, key, {
        iv: iv,
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC

    })

    return decrypted.toString(CryptoJS.enc.Utf8);
}

function hexToBase64(str) {
    return btoa(String.fromCharCode.apply(null,
        str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" "))
    );
}

function base64ToHex(str) {
    for (var i = 0, bin = atob(str.replace(/[ \r\n]+$/, "")), hex = []; i < bin.length; ++i) {
        var tmp = bin.charCodeAt(i).toString(16);
        if (tmp.length === 1) tmp = "0" + tmp;
        hex[hex.length] = tmp;
    }
    return hex.join("");
}


// console.log(decrypt(stringToDecrypt, encryptionKey));
// let decrypted = CryptoJS.AES.decrypt("f98ntVf9Hg62sjGE2qA72g==", "encryptionkey123");
// let decrypted = CryptoJS.AES.decrypt("U2FsdGVkX1/gbavXGv0rvcZfh6iBcMGpsd83nJfaPSuqV2hFGMk0GWv8r7nwVB+8", "encryptionkey123");
// console.log(decrypted);
// decrypted = decrypted.toString(CryptoJS.enc.Utf8);
// console.log(decrypted);


// let encrypted = CryptoJS.AES.encrypt("message to encrypt", "encryptionkey123");
// console.log(encrypted.toString());