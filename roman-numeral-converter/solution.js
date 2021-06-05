const symbols = [
    {
        ch: "M",
        val: 1000,
    },
    {
        ch: "D",
        val: 500,
    },
    {
        ch: "C",
        val: 100,
    },
    {
        ch: "L",
        val: 50,
    },
    {
        ch: "X",
        val: 10,
    },
    {
        ch: "V",
        val: 5,
    },
    {
        ch: "I",
        val: 1,
    },
];
Object.freeze(symbols);
for (const obj of symbols) {
    Object.freeze(obj);
}

function helper(num) {
    const arr = [];

    for (let i = 0; i < symbols.length; ++i) {
        console.log(
            "symbols[" + i + "].val: " + symbols[i].val + "  num: " + num
        );

        while (
            (num > 0 && symbols[i].val <= num) ||
            (i <= 4 && symbols[i].val <= num + symbols[i + 2].val) ||
            (i <= 5 && symbols[i].val <= num + symbols[i + 1].val)
        ) {
            if (i <= 4 && symbols[i].val - symbols[i + 2].val === num) {
                console.log("pushing " + symbols[i + 2].ch + symbols[i].ch);
                arr.push(symbols[i + 2].ch);
                arr.push(symbols[i].ch);
                num -= symbols[i].val - symbols[i + 2].val;
                continue;
            }

            if (i <= 5 && symbols[i].val - symbols[i + 1].val === num) {
                if (symbols[i + 1].val === num) {
                    console.log("pushing " + symbols[i + 1].ch);
                    arr.push(symbols[i + 1].ch);
                    num -= symbols[i + 1].val;
                    continue;
                }
                console.log("pushing " + symbols[i + 1].ch + symbols[i].ch);
                arr.push(symbols[i + 1].ch);
                arr.push(symbols[i].ch);
                num -= symbols[i].val - symbols[i + 1].val;
                continue;
            }

            if (num - symbols[i].val >= 0) {
                console.log("pushing " + symbols[i].ch);
                arr.push(symbols[i].ch);
                num -= symbols[i].val;
                continue;
            }

            break;
        }
        console.log(arr);
    }
    return arr.join("");
}

function convertToRoman(num) {
    console.log(num);
    const str = num.toString();
    const arr = [];
    for (let i = 0; i < str.length; ++i) {
        arr.push(parseInt(str[i]) * Math.pow(10, str.length - 1 - i));
    }
    console.log(arr);
    const ans = arr.map((num) => helper(num)).join("");
    console.log(ans);
    return ans;
}

convertToRoman(36);
