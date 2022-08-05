const osumodcalc = require('./index');


console.log(
    osumodcalc.calcValues(
        5, 5, 5, 5,
        220, 120,
        'HRHT'
    )
)
console.log(
    osumodcalc.calcValues(
        5, 5, 5, 5,
        235, 235,
        'HRDT'
    )
)