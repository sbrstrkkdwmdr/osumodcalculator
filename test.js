"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var osumodcalc = require("./index");
var speedMult = 1;
var foo = osumodcalc.ARtoms(9.3);
var bar = osumodcalc.msToAR(foo.ms / speedMult);
var baz = osumodcalc.msToAR(foo.ms);
console.log(bar);
console.log(baz);
