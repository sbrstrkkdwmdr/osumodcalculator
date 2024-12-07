import osumodcalc = require('./index');

const speedMult = 1;
const foo = osumodcalc.ARtoms(9.3)
const bar = osumodcalc.msToAR(foo.ms / speedMult);
const baz = osumodcalc.msToAR(foo.ms);
console.log(bar)
console.log(baz)