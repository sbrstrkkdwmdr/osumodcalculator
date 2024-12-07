import osumodcalc = require('./index');

const speedMult = 1;
const foo = osumodcalc.ARtoms(9.3);
const bar = osumodcalc.msToAR(foo.ms / speedMult);
const baz = osumodcalc.msToAR(foo.ms);
const qux = osumodcalc.calcValuesAlt(1, 9.3, 1, 1, 1, 1, 1);
console.log(bar);
console.log(baz);
console.log(qux);