const coinvals = [0.01, 0.05, 0.1, 0.25, 1, 5, 10, 20, 100];
Object.freeze(coinvals);

function roundedTo2Decimal(num) {
    return Math.round(num * 100) / 100;
}

function coinTypeExists(type, cid) {
    return cid.some((elem) => elem[0] === type);
}

function getStatusAndChangeArr(change, cid) {
    const cid2 = [];
    // do this instead of cid2 = cid.slice(), since cid contains objects and not value types
    for (const obj of cid) {
        cid2.push(obj.slice());
    }
    const cid3 = [];
    for (let i = cid2.length - 1; i > -1; --i) {
        if (coinvals[i] > change) {
            continue;
        }
        while (coinvals[i] <= change && cid2[i][1] - coinvals[i] >= 0) {
            if (coinTypeExists(cid[i][0], cid3)) {
                cid3[cid3.length - 1][1] += coinvals[i];
            } else {
                cid3.push([cid[i][0], coinvals[i]]);
            }
            change -= coinvals[i];
            change = roundedTo2Decimal(change); // decimal arithmetic is inaccurate so round
            cid2[i][1] -= coinvals[i];
        }
    }
    return {
        status: "OPEN",
        change: cid3,
    };
}

function cannotExact(change, cid) {
    const cid2 = [];
    // do this instead of cid2 = cid.slice(), since cid contains objects and not value types
    for (const obj of cid) {
        cid2.push(obj.slice());
    }
    for (let i = cid2.length - 1; i > -1; --i) {
        while (coinvals[i] <= change && cid2[i][1] - coinvals[i] >= 0) {
            change -= coinvals[i];
            change = roundedTo2Decimal(change); // decimal arithmetic is inaccurate so round
            cid2[i][1] -= coinvals[i];
        }
    }
    return change !== 0;
}

function checkCashRegister(price, cash, cid) {
    Object.freeze(cid);
    for (const obj of cid) {
        Object.freeze(obj);
    }

    let change = cash - price;

    if (change < 0) {
        return {
            status: "INSUFFICIENT_FUNDS",
            change: [],
        };
    }

    const cidTotalCash = roundedTo2Decimal(
        cid.reduce((acc, cur) => acc + cur[1], 0)
    ); // decimal arithmetic is inaccurate so round
    if (cidTotalCash < change) {
        return {
            status: "INSUFFICIENT_FUNDS",
            change: [],
        };
    }
    if (cidTotalCash === change) {
        return {
            status: "CLOSED",
            change: cid,
        };
    }

    if (cannotExact(change, cid)) {
        return {
            status: "INSUFFICIENT_FUNDS",
            change: [],
        };
    }

    return getStatusAndChangeArr(change, cid);
}

checkCashRegister(19.5, 20, [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100],
]);
