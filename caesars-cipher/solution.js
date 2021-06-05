function isAlphabetic(ch) {
    const code = ch.toUpperCase().charCodeAt(0);
    return 65 <= code && code <= 90;
}

function decodeROT13(ch) {
    if (!isAlphabetic(ch)) {
        return ch;
    }
    let code = ch.charCodeAt(0) - 13;
    if (code < 65) {
        // wrap around
        code += 26;
    }
    return String.fromCharCode(code);
}

function rot13(str) {
    let arr = str.split("");
    arr = arr.map((ch) => decodeROT13(ch));
    return arr.join("");
}

rot13("SERR PBQR PNZC");
