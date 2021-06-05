function palindrome(str) {
    str = str.toLowerCase();
    str = str.replace(/[^0-9a-z]/gi, "");
    if (str.length <= 1) {
        return true;
    }
    for (let i = 0; i < Math.floor(str.length / 2); ++i) {
        if (str[i] !== str[str.length - 1 - i]) {
            return false;
        }
    }
    return true;
}

palindrome("eye");
