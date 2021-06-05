const validFormats = [
    /^\d\d\d-\d\d\d-\d\d\d\d$/, // 555-555-5555
    /^\(\d\d\d\)\d\d\d-\d\d\d\d$/, // (555)555-5555
    /^\(\d\d\d\)\s\d\d\d-\d\d\d\d$/, // (555) 555-5555
    /^\d\d\d\s\d\d\d\s\d\d\d\d$/, // 555 555 5555
    /^\d\d\d\d\d\d\d\d\d\d$/, // 5555555555
    /^1\s\d\d\d\s\d\d\d\s\d\d\d\d$/, // 1 555 555 5555
    /^1\s\d\d\d-\d\d\d-\d\d\d\d$/, // 1 555-555-5555
    /^1\s\(\d\d\d\)\s\d\d\d-\d\d\d\d$/, // 1 (555) 555-5555
    /^1\(\d\d\d\)\d\d\d-\d\d\d\d$/, // 1(555)555-5555
];

function telephoneCheck(str) {
    for (const validFormat of validFormats) {
        if (validFormat.test(str)) {
            console.log(str + " matched regex " + validFormat);
            return true;
        }
    }
    return false;
}

telephoneCheck("555-555-5555");
