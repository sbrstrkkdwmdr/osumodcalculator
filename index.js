"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModShort = exports.ModsEnum = void 0;
exports.modHandler = modHandler;
exports.calcValuesAlt = calcValuesAlt;
exports.ARtoms = ARtoms;
exports.DoubleTimeAR = DoubleTimeAR;
exports.HalfTimeAR = HalfTimeAR;
exports.ModIntToString = ModIntToString;
exports.ModStringToInt = ModStringToInt;
exports.ModeIntToName = ModeIntToName;
exports.ModeNameToInt = ModeNameToInt;
exports.ODtoms = ODtoms;
exports.OrderMods = OrderMods;
exports.calcValues = calcValues;
exports.calcgrade = calcgrade;
exports.calcgradeCatch = calcgradeCatch;
exports.calcgradeMania = calcgradeMania;
exports.calcgradeTaiko = calcgradeTaiko;
exports.checkGrade = checkGrade;
exports.csFromRadius = csFromRadius;
exports.csToRadius = csToRadius;
exports.longModName = longModName;
exports.msToAR = msToAR;
exports.msToOD = msToOD;
exports.odDT = odDT;
exports.odHT = odHT;
exports.shortModName = shortModName;
exports.toEZ = toEZ;
exports.toHR = toHR;
exports.unrankedMods_lazer = unrankedMods_lazer;
exports.unrankedMods_stable = unrankedMods_stable;
exports.bws = bws;
exports.recdiff = recdiff;
/**
 *
 * @param ar approach rate
 * @returns approach rate if the double time mod is applied
 */
function DoubleTimeAR(ar) {
    /*     if (ar > 5) {
            ms = 200 + (11 - ar) * 100;
        }
        else {
            ms = 800 + (5 - ar) * 80;
        } */
    var ms = ar > 5 ? 200 + (11 - ar) * 100 : 800 + (5 - ar) * 80;
    var newAR;
    if (ms < 300) {
        newAR = 11;
    }
    else if (ms < 1200) {
        newAR = Math.round((11 - (ms - 300) / 150) * 100) / 100;
    }
    else {
        newAR = Math.round((5 - (ms - 1200) / 120) * 100) / 100;
    }
    var arobj = {
        ar: newAR,
        ms: ms,
    };
    return arobj;
}
/**
 *
 * @param ar approach rate
 * @returns approach rate if the half time mod is applied
 */
function HalfTimeAR(ar) {
    var newAR;
    /*     if (ar > 5) {
            ogtoms = 1200 - (((ar - 5) * 10) * 15)
        }
        else {
            ogtoms = 1800 - (((ar) * 10) * 12j)
        } */
    var ogtoms = ar > 5 ? 1200 - ((ar - 5) * 10 * 15) : 1800 - ((ar * 10) * 12);
    var ms = ogtoms * (4 / 3);
    if (ms < 300) {
        newAR = 11;
    }
    else if (ms < 1200) {
        newAR = Math.round((11 - (ms - 300) / 150) * 100) / 100;
    }
    else {
        newAR = Math.round((5 - (ms - 1200) / 120) * 100) / 100;
    }
    var arobj = {
        ar: newAR,
        ms: ms,
    };
    return arobj;
}
/**
 *
 * @param od overall difficulty / accuracy
 * @returns hitwindow values in milliseconds
 */
function ODtoms(od) {
    var rangeobj = {
        hitwindow_300: 79 - (od * 6) + 0.5,
        hitwindow_100: 139 - (od * 8) + 0.5,
        hitwindow_50: 199 - (od * 10) + 0.5,
        od_num: od,
    };
    return rangeobj;
}
/**
 *
 * @param ar approach rate
 * @returns approach rate converted to milliseconds
 */
function ARtoms(ar) {
    var ogtoms = ar > 5 ? 1200 - (((ar - 5) * 10) * 15) : 1800 - (((ar) * 10) * 12);
    return {
        ar: ar,
        ms: ogtoms,
    };
}
/**
 *
 * @param hitwindow300 300 hit window in milliseconds
 * @param hitwindow100 100 hit window in milliseconds
 * @param hitwindow50 50 hit window in milliseconds
 * @info set a value to a string to ignore
 * @returns od (overall difficulty)
 */
function msToOD(hitwindow300, hitwindow100, hitwindow50) {
    var od = 'NaN';
    if (!isNaN(hitwindow300)) {
        od = ((79.5 - hitwindow300) / 6).toFixed(2);
    }
    else if (hitwindow100 && !isNaN(hitwindow100)) {
        od = ((139.5 - hitwindow100) / 8).toFixed(2);
    }
    else if (hitwindow50 && !isNaN(hitwindow50)) {
        od = ((199.5 - hitwindow50) / 10).toFixed(2);
    }
    if (+od > 11) {
        od = '11';
    }
    return ODtoms(+od);
}
/**
 *
 * @param ms milliseconds
 * @returns ar (approach rate)
 */
function msToAR(ms) {
    var ar;
    if (ms < 300) {
        ar = 11;
    }
    else if (ms < 1200) {
        ar = Math.round((11 - (ms - 300) / 150) * 100) / 100;
    }
    else {
        ar = Math.round((5 - (ms - 1200) / 120) * 100) / 100;
    }
    return {
        ar: ar,
        ms: ms,
    };
}
/**
 *
 * @param od overall difficulty / accuracy
 * @returns ms values for the od hitwindows and converts to double time
 */
function odDT(od) {
    var range300 = ((79 - (od * 6) + 0.5) * 2 / 3) + 0.33;
    var odobj = {
        hitwindow_300: range300,
        hitwindow_100: ((139 - (od * 8) + 0.5) * 2 / 3) + 0.33,
        hitwindow_50: ((199 - (od * 10) + 0.5) * 2 / 3) + 0.33,
        od_num: +((79.5 - range300) / 6).toFixed(2) > 11 ? 11 : +((79.5 - range300) / 6).toFixed(2),
    };
    return odobj;
}
/**
 *
 * @param od overall difficulty / accuracy
 * @returns ms values for the od hitwindows and converts to half time
 */
function odHT(od) {
    var range300 = ((79 - (od * 6) + 0.5) * 4 / 3) + 0.66;
    var odobj = {
        hitwindow_300: range300,
        hitwindow_100: ((139 - (od * 8) + 0.5) * 4 / 3) + 0.66,
        hitwindow_50: ((199 - (od * 10) + 0.5) * 4 / 3) + 0.66,
        od_num: +((79.5 - range300) / 6).toFixed(2) > 11 ? 11 : +((79.5 - range300) / 6).toFixed(2),
    };
    return odobj;
}
//https://osu.ppy.sh/wiki/en/Gameplay/Accuracy
/**
 *
 * @param hit300 - hit 300s (100%)
 * @param hit100 - hit 100s (33.33%)
 * @param hit50  - hit 50s (16.66%)
 * @param miss - hit 0s/misses (0%)
 * @returns an array containing grades and accuracy
 */
function calcgrade(hit300, hit100, hit50, miss) {
    var totalhits = hit300 + hit100 + hit50 + miss;
    var equation = ((Math.floor((300 * hit300) + (100 * hit100) + (50 * hit50))) / (Math.floor(300 * (hit300 + hit100 + hit50 + miss)))) * 100;
    //https://osu.ppy.sh/wiki/en/FAQ#grades
    var _a = ['D', 'D'], grade = _a[0], gradeLazer = _a[1];
    if (hit300 / totalhits > 0.6) {
        grade = 'C';
    }
    if ((hit300 / totalhits > 0.7 && miss == 0) || (hit300 / totalhits > 0.8)) {
        grade = 'B';
    }
    if ((hit300 / totalhits > 0.8 && miss == 0) || (hit300 / totalhits > 0.9)) {
        grade = 'A';
    }
    if (Math.abs(hit300 / totalhits) > 0.9 && miss == 0 && Math.abs(hit50 / totalhits) < 0.01) {
        grade = 'S';
    }
    if (hit100 < 1 && hit50 < 1 && miss == 0) {
        grade = 'SS';
        gradeLazer = 'SS';
    }
    if (equation >= 70) {
        grade = 'C';
    }
    if (equation >= 80) {
        grade = 'B';
    }
    if (equation >= 90) {
        grade = 'A';
    }
    if (equation >= 95 && miss == 0) {
        gradeLazer = 'S';
    }
    var finalarr = {
        grade: grade,
        gradeLazer: gradeLazer,
        accuracy: equation,
    };
    return finalarr;
}
/**
 *
 * @param hit300 - hit 300s/greats (100%)
 * @param hit100 - hit 100s/good (50%)
 * @param miss - misses (0%)
 * @returns an array containing grades and accuracy
 */
function calcgradeTaiko(hit300, hit100, miss) {
    var _a, _b, _c;
    var equation = (Math.abs(hit300 + (hit100 / 2))) / (Math.abs(hit300 + hit100 + miss));
    //grade = 'https://osu.ppy.sh/wiki/en/FAQ#grades'
    var _d = ['D', 'D'], grade = _d[0], gradeLazer = _d[1];
    if (equation >= 0.8) {
        _a = ['B', 'B'], grade = _a[0], gradeLazer = _a[1];
    }
    if (equation >= 0.9) {
        _b = ['A', 'B'], grade = _b[0], gradeLazer = _b[1];
    }
    if (equation >= 0.95) {
        grade = 'S';
    }
    if (equation >= 0.95 && miss == 0) {
        gradeLazer = 'S';
    }
    if (equation == 1) {
        _c = ['SS', 'SS'], grade = _c[0], gradeLazer = _c[1];
    }
    var finalarr = {
        grade: grade,
        gradeLazer: gradeLazer,
        accuracy: equation * 100,
    };
    return finalarr;
}
/**
 *
 * @param hit300 - fruits caught
 * @param hit100 - drops caught
 * @param hit50 - droplets caught
 * @param miss - misses
 * @param hitkatu - droplets missed
 * @returns an array containing grades and accuracy
 */
function calcgradeCatch(hit300, hit100, hit50, hitkatu, miss) {
    var _a, _b, _c, _d, _e;
    var equation = Math.floor(hit300 + hit100 + hit50) / Math.floor(hit300 + hit100 + hit50 + hitkatu + miss);
    var _f = ['D', 'D'], grade = _f[0], gradeLazer = _f[1];
    if (equation >= 0.85) {
        _a = ['C', 'C'], grade = _a[0], gradeLazer = _a[1];
    }
    if (equation >= 0.9) {
        _b = ['B', 'B'], grade = _b[0], gradeLazer = _b[1];
    }
    if (equation >= 0.94) {
        _c = ['A', 'A'], grade = _c[0], gradeLazer = _c[1];
    }
    if (equation >= 0.98) {
        _d = ['S', 'S'], grade = _d[0], gradeLazer = _d[1];
    }
    if (equation == 1) {
        _e = ['SS', 'SS'], grade = _e[0], gradeLazer = _e[1];
    }
    var finalarr = {
        grade: grade,
        gradeLazer: gradeLazer,
        accuracy: equation * 100,
    };
    return finalarr;
}
/**
 *
 * @param hit300max - hit max/300+ (100%)
 * @param hit300 - hit 300 (100%)
 * @param hit200 - hit 200 (66.66%)
 * @param hit100 - hit 100 (33.33%)
 * @param hit50 - hit 50 (16.66%)
 * @param miss - miss (0%)
 * @returns an array containing grades and accuracy
 */
function calcgradeMania(hit300max, hit300, hit200, hit100, hit50, miss) {
    var _a, _b, _c, _d, _e;
    var equation = Math.floor((300 * (hit300max + hit300)) + (200 * hit200) + (100 * hit100) + (50 * hit50)) / Math.floor(300 * (hit300max + hit300 + hit200 + hit100 + hit50 + miss));
    var _f = ['D', 'D'], grade = _f[0], gradeLazer = _f[1];
    if (equation >= 0.7) {
        _a = ['C', 'C'], grade = _a[0], gradeLazer = _a[1];
    }
    if (equation >= 0.8) {
        _b = ['B', 'B'], grade = _b[0], gradeLazer = _b[1];
    }
    if (equation >= 0.9) {
        _c = ['A', 'A'], grade = _c[0], gradeLazer = _c[1];
    }
    if (equation >= 0.95) {
        _d = ['S', 'S'], grade = _d[0], gradeLazer = _d[1];
    }
    if (equation == 1) {
        _e = ['SS', 'SS'], grade = _e[0], gradeLazer = _e[1];
    }
    var finalarr = {
        grade: grade,
        gradeLazer: gradeLazer,
        accuracy: equation * 100,
    };
    return finalarr;
}
/**
 *
 * @param cs circle size
 * @param ar approach rate
 * @param od overall difficulty
 * @param hp health
 * @returns values converted to HR
 */
function toHR(cs, ar, od, hp) {
    var hrobj = {
        cs: cs * 1.3 > 10 ? 10 : cs * 1.3,
        ar: ar * 1.4 > 10 ? 10 : ar * 1.4,
        od: od * 1.4 > 10 ? 10 : od * 1.4,
        hp: hp * 1.4 > 10 ? 10 : hp * 1.4,
    };
    return hrobj;
}
/**
 *
 * @param cs circle size
 * @param ar approach rate
 * @param od overall difficulty
 * @param hp health
 * @returns values converted to EZ
 */
function toEZ(cs, ar, od, hp) {
    var ezobj = {
        cs: cs / 2 > 10 ? 10 : cs / 2,
        ar: ar / 2 > 10 ? 10 : ar / 2,
        od: od / 2 > 10 ? 10 : od / 2,
        hp: hp / 2 > 10 ? 10 : hp / 2,
    };
    return ezobj;
}
var ModsEnum;
(function (ModsEnum) {
    ModsEnum[ModsEnum["None"] = 0] = "None";
    ModsEnum[ModsEnum["NoFail"] = 1] = "NoFail";
    ModsEnum[ModsEnum["Easy"] = 2] = "Easy";
    ModsEnum[ModsEnum["TouchDevice"] = 4] = "TouchDevice";
    ModsEnum[ModsEnum["Hidden"] = 8] = "Hidden";
    ModsEnum[ModsEnum["HardRock"] = 16] = "HardRock";
    ModsEnum[ModsEnum["SuddenDeath"] = 32] = "SuddenDeath";
    ModsEnum[ModsEnum["DoubleTime"] = 64] = "DoubleTime";
    ModsEnum[ModsEnum["Relax"] = 128] = "Relax";
    ModsEnum[ModsEnum["HalfTime"] = 256] = "HalfTime";
    ModsEnum[ModsEnum["Nightcore"] = 512] = "Nightcore";
    ModsEnum[ModsEnum["Flashlight"] = 1024] = "Flashlight";
    ModsEnum[ModsEnum["Autoplay"] = 2048] = "Autoplay";
    ModsEnum[ModsEnum["SpunOut"] = 4096] = "SpunOut";
    ModsEnum[ModsEnum["AutoPilot"] = 8192] = "AutoPilot";
    ModsEnum[ModsEnum["Perfect"] = 16384] = "Perfect";
    ModsEnum[ModsEnum["Key4"] = 32768] = "Key4";
    ModsEnum[ModsEnum["Key5"] = 65536] = "Key5";
    ModsEnum[ModsEnum["Key6"] = 131072] = "Key6";
    ModsEnum[ModsEnum["Key7"] = 262144] = "Key7";
    ModsEnum[ModsEnum["Key8"] = 524288] = "Key8";
    ModsEnum[ModsEnum["FadeIn"] = 1048576] = "FadeIn";
    ModsEnum[ModsEnum["Random"] = 2097152] = "Random";
    ModsEnum[ModsEnum["Cinema"] = 4194304] = "Cinema";
    ModsEnum[ModsEnum["Target"] = 8388608] = "Target";
    ModsEnum[ModsEnum["Key9"] = 16777216] = "Key9";
    ModsEnum[ModsEnum["KeyCoop"] = 33554432] = "KeyCoop";
    ModsEnum[ModsEnum["Key1"] = 67108864] = "Key1";
    ModsEnum[ModsEnum["Key3"] = 134217728] = "Key3";
    ModsEnum[ModsEnum["Key2"] = 268435456] = "Key2";
    ModsEnum[ModsEnum["ScoreV2"] = 536870912] = "ScoreV2";
    ModsEnum[ModsEnum["Mirror"] = 1073741824] = "Mirror";
})(ModsEnum || (exports.ModsEnum = ModsEnum = {}));
var ModShort;
(function (ModShort) {
    ModShort[ModShort["NM"] = 0] = "NM";
    ModShort[ModShort["NF"] = 1] = "NF";
    ModShort[ModShort["EZ"] = 2] = "EZ";
    ModShort[ModShort["TD"] = 4] = "TD";
    ModShort[ModShort["HD"] = 8] = "HD";
    ModShort[ModShort["HR"] = 16] = "HR";
    ModShort[ModShort["SD"] = 32] = "SD";
    ModShort[ModShort["DT"] = 64] = "DT";
    ModShort[ModShort["RL"] = 128] = "RL";
    ModShort[ModShort["HT"] = 256] = "HT";
    ModShort[ModShort["NC"] = 512] = "NC";
    ModShort[ModShort["FL"] = 1024] = "FL";
    ModShort[ModShort["AT"] = 2048] = "AT";
    ModShort[ModShort["SO"] = 4096] = "SO";
    ModShort[ModShort["AP"] = 8192] = "AP";
    ModShort[ModShort["PF"] = 16384] = "PF";
    ModShort[ModShort["4K"] = 32768] = "4K";
    ModShort[ModShort["5K"] = 65536] = "5K";
    ModShort[ModShort["6K"] = 131072] = "6K";
    ModShort[ModShort["7K"] = 262144] = "7K";
    ModShort[ModShort["8K"] = 524288] = "8K";
    ModShort[ModShort["FI"] = 1048576] = "FI";
    ModShort[ModShort["RD"] = 2097152] = "RD";
    ModShort[ModShort["CM"] = 4194304] = "CM";
    ModShort[ModShort["TP"] = 8388608] = "TP";
    ModShort[ModShort["9K"] = 16777216] = "9K";
    ModShort[ModShort["CP"] = 33554432] = "CP";
    ModShort[ModShort["1K"] = 67108864] = "1K";
    ModShort[ModShort["3K"] = 134217728] = "3K";
    ModShort[ModShort["2K"] = 268435456] = "2K";
    ModShort[ModShort["SV2"] = 536870912] = "SV2";
    ModShort[ModShort["MR"] = 1073741824] = "MR";
})(ModShort || (exports.ModShort = ModShort = {}));
/**
 *
 * @param mods
 * @returns {int} converts mods to an integer (HDDTHR = 88)
 */
function ModStringToInt(mods) {
    var modInt = 0;
    modInt += mods.toUpperCase().includes('NF') ? 1 : 0;
    modInt += mods.toUpperCase().includes('EZ') ? 2 : 0;
    modInt += mods.toUpperCase().includes('TD') ? 4 : 0;
    modInt += mods.toUpperCase().includes('HD') ? 8 : 0;
    modInt += mods.toUpperCase().includes('HR') ? 16 : 0;
    modInt += mods.toUpperCase().includes('SD') ? 32 : 0;
    modInt += mods.toUpperCase().includes('DT') ? 64 : 0;
    modInt += mods.toUpperCase().includes('RX') || mods.toUpperCase().includes('RL') || mods.toUpperCase().includes('RLX') ? 128 : 0;
    modInt += mods.toUpperCase().includes('HT') ? 256 : 0;
    modInt += mods.toUpperCase().includes('NC') ? 512 + 64 : 0;
    modInt += mods.toUpperCase().includes('FL') ? 1024 : 0;
    modInt += mods.toUpperCase().includes('AT') ? 2048 : 0;
    modInt += mods.toUpperCase().includes('SO') ? 4096 : 0;
    modInt += mods.toUpperCase().includes('AP') || mods.toUpperCase().includes('RX2') ? 8192 : 0;
    modInt += mods.toUpperCase().includes('PF') ? 16384 + 32 : 0;
    modInt += mods.toUpperCase().includes('1K') ? 67108864 : 0;
    modInt += mods.toUpperCase().includes('2K') ? 268435456 : 0;
    modInt += mods.toUpperCase().includes('3K') ? 134217728 : 0;
    modInt += mods.toUpperCase().includes('4K') ? 32768 : 0;
    modInt += mods.toUpperCase().includes('5K') ? 65536 : 0;
    modInt += mods.toUpperCase().includes('6K') ? 131072 : 0;
    modInt += mods.toUpperCase().includes('7K') ? 262144 : 0;
    modInt += mods.toUpperCase().includes('8K') ? 524288 : 0;
    modInt += mods.toUpperCase().includes('9K') ? 16777216 : 0;
    modInt += mods.toUpperCase().includes('FI') ? 1048576 : 0;
    modInt += mods.toUpperCase().includes('RDM') ? 2097152 : 0;
    modInt += mods.toUpperCase().includes('CM') ? 4194304 : 0;
    modInt += mods.toUpperCase().includes('TP') ? 8388608 : 0;
    modInt += mods.toUpperCase().includes('KC') ? 33554432 : 0;
    modInt += mods.toUpperCase().includes('SV2') || mods.toUpperCase().includes('S2') ? 536870912 : 0;
    modInt += mods.toUpperCase().includes('MR') ? 1073741824 : 0;
    return modInt;
}
/**
 *
 * @param modInt
 * @returns converts mod integers to a string (88 = HDDTHR)
 */
function ModIntToString(modInt) {
    var modString = '';
    modString += modInt & 1 ? 'NF' : '';
    modString += modInt & 2 ? 'EZ' : '';
    modString += modInt & 4 ? 'TD' : '';
    modString += modInt & 8 ? 'HD' : '';
    modString += modInt & 16 ? 'HR' : '';
    modString += modInt & 32 ? 'SD' : '';
    modString += modInt & 64 ? 'DT' : '';
    modString += modInt & 128 ? 'RL' : '';
    modString += modInt & 256 ? 'HT' : '';
    modString += modInt & 512 ? 'NC' : '';
    modString += modInt & 1024 ? 'FL' : '';
    modString += modInt & 2048 ? 'AT' : '';
    modString += modInt & 4096 ? 'SO' : '';
    modString += modInt & 8192 ? 'AP' : '';
    modString += modInt & 16384 ? 'PF' : '';
    modString += modInt & 67108864 ? '1K' : '';
    modString += modInt & 268435456 ? '2K' : '';
    modString += modInt & 134217728 ? '3K' : '';
    modString += modInt & 32768 ? '4K' : '';
    modString += modInt & 65536 ? '5K' : '';
    modString += modInt & 131072 ? '6K' : '';
    modString += modInt & 262144 ? '7K' : '';
    modString += modInt & 524288 ? '8K' : '';
    modString += modInt & 16777216 ? '9K' : '';
    modString += modInt & 1048576 ? 'FI' : '';
    modString += modInt & 2097152 ? 'RD' : '';
    modString += modInt & 4194304 ? 'CN' : '';
    modString += modInt & 8388608 ? 'TP' : '';
    modString += modInt & 33554432 ? 'KC' : '';
    modString += modInt & 536870912 ? 'SV2' : '';
    modString += modInt & 1073741824 ? 'MR' : '';
    if (modString.includes('DT') && modString.includes('NC')) {
        modString = modString.replace('DT', '');
    }
    if (modString.includes('SD') && modString.includes('PF')) {
        modString = modString.replace('SD', '');
    }
    return OrderMods(modString).string;
}
function getOrderedMods() {
    return ['EZ', 'HD', 'FI', 'HT', 'DC', 'DT', 'NC', 'HR', 'FL', 'SD', 'PF', 'NF', 'AT', 'CM', 'RL', 'AP', 'TP', 'SO', 'TD', '1K', '2K', '3K', '4K', '5K', '6K', '7K', '8K', '9K', 'CP', 'RD', 'MR', 'V2',
        'BL', 'ST', 'DA', 'CL', 'AL', 'ST', 'TR', 'WI', 'SI', 'GR', 'DF', 'WU', 'WD', 'TR', 'BR', 'AD', 'MU', 'NS', 'MG', 'RP', 'AS', 'FF'
    ];
}
/**
 *
 * @param modString
 * @returns reorders mods to be in the correct order and removes duplicates.
 */
function OrderMods(modString) {
    var ModsOrder = getOrderedMods();
    var modStringArray = modString.toUpperCase().replaceAll(' ', '').replaceAll(',', '').replace(/(.{2})/g, "$1 ")
        .replaceAll('RLX', 'RL')
        .replaceAll('RX', 'RL')
        .replaceAll('AU', 'AT')
        .replaceAll('CN', 'CM')
        .replaceAll('S2', 'V2')
        .split(' ');
    var modStringArrayOrdered = [];
    var modStringArrayOrderedtest = [];
    for (var i = 0; i < ModsOrder.length; i++) {
        for (var j = 0; j < modStringArray.length; j++) {
            if (ModsOrder[i] === modStringArray[j]) {
                modStringArrayOrderedtest.push(modStringArray[j]);
            }
        }
    }
    for (var i = 0; i < modStringArrayOrderedtest.length; i++) {
        if (modStringArrayOrderedtest.indexOf(modStringArrayOrderedtest[i]) === i) {
            modStringArrayOrdered.push(modStringArrayOrderedtest[i]);
        }
    }
    if (modStringArrayOrdered.includes('DT') && modStringArrayOrdered.includes('NC')) {
        modStringArrayOrdered.splice(modStringArrayOrdered.indexOf('DT'), 1);
    }
    if (modStringArrayOrdered.includes('HT') && modStringArrayOrdered.includes('DC')) {
        modStringArrayOrdered.splice(modStringArrayOrdered.indexOf('HT'), 1);
    }
    return {
        string: modStringArrayOrdered.join(''),
        array: modStringArrayOrdered
    };
}
/**
 *
 * @param modstring
 * @returns converts mod strings to their shorthand name ie nightcore -> NC
 */
function shortModName(modstring) {
    return OrderMods(modstring.toLowerCase()
        .replaceAll(' ', '')
        .replaceAll('-', '')
        .replaceAll('nofail', 'NF')
        .replaceAll('easy', 'EZ')
        .replaceAll('touchdevice', 'TD')
        .replaceAll('touchscreen', 'TD')
        .replaceAll('touch', 'TD')
        .replaceAll('hidden', 'HD')
        .replaceAll('hardrock', 'HR')
        .replaceAll('suddendeath', 'SD')
        .replaceAll('doubletime', 'DT')
        .replaceAll('relax', 'RX')
        .replaceAll('halftime', 'HT')
        .replaceAll('nightcore', 'NC')
        .replaceAll('flashlight', 'FL')
        .replaceAll('auto', 'AT')
        .replaceAll('spunout', 'SO')
        .replaceAll('autopilot', 'AP')
        .replaceAll('perfect', 'PF')
        .replaceAll('key1', '1K')
        .replaceAll('key2', '2K')
        .replaceAll('key3', '3K')
        .replaceAll('key4', '4K')
        .replaceAll('key5', '5K')
        .replaceAll('key6', '6K')
        .replaceAll('key7', '7K')
        .replaceAll('key8', '8K')
        .replaceAll('key9', '9K')
        .replaceAll('fadein', 'FI')
        .replaceAll('random', 'RD')
        .replaceAll('cinema', 'CN')
        .replaceAll('targetpractice', 'TP')
        .replaceAll('keycoop', 'KC')
        .replaceAll('coop', 'KC')
        .replaceAll('co-op', 'KC')
        .replaceAll('scorev2', 'S2')
        .replaceAll('mirror', 'MR')).string;
    ;
}
/**
 *
 * @param modstring
 * @returns converts mod strings to their full name ie NC -> nightcore
 */
// do the opposite of above
function longModName(modstring) {
    return (OrderMods(modstring).string)
        .replaceAll(' ', '')
        .replaceAll('-', '')
        .replaceAll('NF', 'NoFail ')
        .replaceAll('EZ', 'Easy ')
        .replaceAll('TD', 'TouchDevice ')
        .replaceAll('HD', 'Hidden ')
        .replaceAll('HR', 'HardRock ')
        .replaceAll('SD', 'SuddenDeath ')
        .replaceAll('DT', 'DoubleTime ')
        .replaceAll('RX', 'Relax ')
        .replaceAll('HT', 'HalfTime ')
        .replaceAll('NC', 'Nightcore ')
        .replaceAll('FL', 'Flashlight ')
        .replaceAll('AT', 'Auto ')
        .replaceAll('SO', 'SpunOut ')
        .replaceAll('AP', 'AutoPilot ')
        .replaceAll('PF', 'Perfect ')
        .replaceAll('1K', 'Key1 ')
        .replaceAll('2K', 'Key2 ')
        .replaceAll('3K', 'Key3 ')
        .replaceAll('4K', 'Key4 ')
        .replaceAll('5K', 'Key5 ')
        .replaceAll('6K', 'Key6 ')
        .replaceAll('7K', 'Key7 ')
        .replaceAll('8K', 'Key8 ')
        .replaceAll('9K', 'Key9 ')
        .replaceAll('FI', 'FadeIn ')
        .replaceAll('RD', 'Random ')
        .replaceAll('CN', 'Cinema ')
        .replaceAll('TP', 'TargetPractice ')
        .replaceAll('KC', 'Co-op ')
        .replaceAll('S2', 'ScoreV2 ')
        .replaceAll('MR', 'Mirror ');
}
/**
 * checks if any of the mods given are "unranked" (unsubmitted on stable)
 * @param mods shorthand mods name to verify (ie HDDT not hidden double time or 72)
 */
function unrankedMods_stable(mods) {
    var val = false;
    var unverifiable = [
        'AT', 'CM', 'RL', 'AP', 'V2', 'TP'
    ];
    val = unverifiable.some(function (x) { return mods.includes(x); });
    return val;
}
/**
 * checks if any of the mods given are "unranked" (unsubmitted on stable)
 * @param mods shorthand mods name to verify (ie HDDT not hidden double time or 72)
 */
function unrankedMods_lazer(mods) {
    var val = false;
    var unverifiable = [
        'AT', 'CM'
    ];
    return val;
}
/**
 * reorders mods to be in the correct order, removes duplicates and mods that don't fit the mode
 * NOTE LAZER MODS ARE IGNORED
 */
function modHandler(mods, mode) {
    var ModsOrder = getOrderedMods();
    var modStringArray = mods.toUpperCase().replaceAll(' ', '').replaceAll(',', '').replace(/(.{2})/g, "$1 ")
        .replaceAll('RLX', 'RL')
        .replaceAll('RX', 'RL')
        .replaceAll('AU', 'AT')
        .replaceAll('CN', 'CM')
        .replaceAll('S2', 'V2')
        .split(' ');
    var modStringArrayOrdered = [];
    var modStringArrayOrderedtest = [];
    for (var i = 0; i < ModsOrder.length; i++) {
        for (var j = 0; j < modStringArray.length; j++) {
            if (ModsOrder[i] === modStringArray[j]) {
                modStringArrayOrderedtest.push(modStringArray[j]);
            }
        }
    }
    var maniaOnlyMods = ['FI', '1K', '2K', '3K', '4K', '5K', '6K', '7K', '8K', '9K', 'CP', 'RD', 'MR',];
    var standardMods = ['AP', 'TP', 'SO', 'TD',];
    var ignoreMods = [];
    switch (mode) {
        default:
        case 'osu':
            ignoreMods = maniaOnlyMods;
            break;
        case 'taiko':
        case 'fruits':
            ignoreMods = maniaOnlyMods.concat(standardMods);
            break;
        case 'mania':
            ignoreMods = standardMods;
            break;
    }
    for (var _i = 0, modStringArrayOrderedtest_1 = modStringArrayOrderedtest; _i < modStringArrayOrderedtest_1.length; _i++) {
        var elem = modStringArrayOrderedtest_1[_i];
        if (ignoreMods.includes(elem)) {
            var index = modStringArrayOrderedtest.indexOf(elem);
            modStringArrayOrderedtest.splice(index, 1);
        }
    }
    for (var i = 0; i < modStringArrayOrderedtest.length; i++) {
        if (modStringArrayOrderedtest.indexOf(modStringArrayOrderedtest[i]) === i) {
            modStringArrayOrdered.push(modStringArrayOrderedtest[i]);
        }
    }
    if (modStringArrayOrdered.includes('DT') && modStringArrayOrdered.includes('NC')) {
        modStringArrayOrdered.splice(modStringArrayOrdered.indexOf('DT'), 1);
    }
    if (modStringArrayOrdered.includes('HT') && modStringArrayOrdered.includes('DC')) {
        modStringArrayOrdered.splice(modStringArrayOrdered.indexOf('HT'), 1);
    }
    return modStringArrayOrdered;
}
/**
 * get the radius of the circle (in pixels)
 */
function csToRadius(cs) {
    return (0.00005556 * Math.pow(cs, 2) - 4.483 * cs + 54.42);
}
/**
 *
 * @param radius the radius of the circle
 * @returns cs circle size
 */
function csFromRadius(radius) {
    return (5000 / 8104533921) * Math.pow(radius, 2) - (1808448550 / 8104533921) * radius + (8582285633270972 / 706821088118109);
}
/**
 * calculate values after mods are applied
 */
function calcValues(cs, ar, od, hp, bpm, length, mods) {
    var ncs = cs;
    var nar = ar;
    var nod = od;
    var nhp = hp;
    var nbpm = bpm;
    var nlength = length;
    var error = false;
    var nmods = mods.includes('NC') ? mods.toUpperCase().replace('NC', 'DT') : mods.toUpperCase();
    switch (true) {
        case ((nmods.includes('HR') && nmods.includes('EZ')) || (nmods.includes('DT') && nmods.includes('HT'))):
            ncs = cs;
            nar = ar;
            nod = od;
            nhp = hp;
            nbpm = bpm;
            nlength = length;
            if (nmods.includes('HR') && nmods.includes('EZ')) {
                error = 'HR and EZ are not compatible';
            }
            else if (nmods.includes('DT') && nmods.includes('HT')) {
                error = 'DT and HT are not compatible';
            }
            else {
                error = 'Invalid mod combination';
            }
            break;
        case (nmods.includes('HR') && !nmods.includes('DT') && !nmods.includes('HT')):
            ncs = cs * 1.3 > 10 ? 10 : cs * 1.3;
            nar = ar * 1.4 > 10 ? 10 : ar * 1.4;
            nod = od * 1.4 > 10 ? 10 : od * 1.4;
            nhp = hp * 1.4 > 10 ? 10 : hp * 1.4;
            break;
        case (nmods.includes('EZ') && !nmods.includes('DT') && !nmods.includes('HT')):
            ncs = cs * 0.5 > 10 ? 10 : cs * 0.5;
            nar = ar * 0.5 > 10 ? 10 : ar * 0.5;
            nod = od * 0.5 > 10 ? 10 : od * 0.5;
            nhp = hp * 0.5 > 10 ? 10 : hp * 0.5;
            break;
        case (nmods.includes('DT') && !nmods.includes('HR') && !nmods.includes('EZ')):
            ncs = cs;
            nar = DoubleTimeAR(ar).ar;
            nod = odDT(od).od_num;
            nhp = hp;
            nbpm = bpm * 1.5;
            nlength = length / 1.5;
            break;
        case (nmods.includes('HT') && !nmods.includes('HR') && !nmods.includes('EZ')):
            ncs = cs;
            nar = HalfTimeAR(ar).ar;
            nod = odHT(od).od_num;
            nhp = hp;
            nbpm = bpm * 0.75;
            nlength = length / 0.75;
            break;
        case (nmods.includes('DT') && nmods.includes('EZ')):
            ncs = cs * 0.5;
            nar = DoubleTimeAR(ar * 0.5).ar;
            nod = odDT(od * 0.5).od_num;
            nhp = hp * 0.5;
            nbpm = bpm * 1.5;
            nlength = length / 1.5;
            break;
        case (nmods.includes('DT') && nmods.includes('HR')):
            ncs = cs * 1.3 > 10 ? 10 : cs * 1.3;
            nar = DoubleTimeAR(ar * 1.4 > 10 ? 10 : ar * 1.4).ar;
            nod = odDT(od * 1.4 > 10 ? 10 : od * 1.4).od_num;
            nhp = hp * 1.4 > 10 ? 10 : hp * 1.4;
            nbpm = bpm * 1.5;
            nlength = length / 1.5;
            break;
        case (nmods.includes('HT') && nmods.includes('EZ')):
            ncs = cs * 0.5;
            nar = HalfTimeAR(ar * 0.5).ar;
            nod = odHT(od * 0.5).od_num;
            nhp = hp * 0.5;
            nbpm = bpm * 0.75;
            nlength = length / 0.75;
            break;
        case (nmods.includes('HT') && nmods.includes('HR')):
            ncs = cs * 1.3 > 10 ? 10 : cs * 1.3;
            nar = HalfTimeAR(ar * 1.4 > 10 ? 10 : ar * 1.4).ar;
            nod = odHT(od * 1.4 > 10 ? 10 : od * 1.4).od_num;
            nhp = hp * 1.4 > 10 ? 10 : hp * 1.4;
            nbpm = bpm * 0.75;
            nlength = length / 0.75;
            break;
        default:
            ncs = cs;
            nar = ar;
            nod = od;
            nhp = hp;
            nbpm = bpm;
            nlength = length;
            break;
    }
    var obj = {
        cs: +ncs.toFixed(2),
        ar: +nar.toFixed(2),
        od: +nod.toFixed(2),
        hp: +nhp.toFixed(2),
        bpm: +nbpm.toFixed(2),
        length: +nlength.toFixed(2),
        mods: mods,
        error: error,
        details: {
            csRadius: csToRadius(ncs),
            arMs: ARtoms(nar).ms,
            odMs: ODtoms(nod),
            //mm:ss
            lengthFull: nlength > 60 ?
                nlength % 60 < 10 ?
                    Math.floor(nlength / 60) + ':0' + Math.floor(nlength % 60) :
                    Math.floor(nlength / 60) + ':' + Math.floor(nlength % 60)
                :
                    nlength % 60 < 10 ?
                        Math.floor(nlength / 60) + ':0' + Math.floor(nlength % 60) :
                        Math.floor(nlength / 60) + ':' + Math.floor(nlength % 60)
        }
    };
    return obj;
}
/**
 * calculate all values after a speed multiplier is applied
 */
function calcValuesAlt(cs, ar, od, hp, bpm, length, speedMult) {
    speedMult = (speedMult !== null && speedMult !== void 0 ? speedMult : 1);
    var arMs = ARtoms(ar).ms;
    var odMs = ODtoms(od);
    var nar = msToAR(arMs / speedMult).ar;
    var nod = msToOD(odMs.hitwindow_300 / speedMult).od_num;
    var nbpm = bpm / speedMult;
    var nlength = length / speedMult;
    var obj = {
        cs: +cs.toFixed(2),
        ar: +nar.toFixed(2),
        od: +nod.toFixed(2),
        hp: +hp.toFixed(2),
        bpm: +nbpm.toFixed(2),
        length: +nlength.toFixed(2),
        speedMult: speedMult,
        details: {
            csRadius: csToRadius(cs),
            arMs: arMs,
            odMs: odMs,
            //mm:ss
            lengthFull: nlength > 60 ?
                nlength % 60 < 10 ?
                    Math.floor(nlength / 60) + ':0' + Math.floor(nlength % 60) :
                    Math.floor(nlength / 60) + ':' + Math.floor(nlength % 60)
                :
                    nlength % 60 < 10 ?
                        Math.floor(nlength / 60) + ':0' + Math.floor(nlength % 60) :
                        Math.floor(nlength / 60) + ':' + Math.floor(nlength % 60)
        }
    };
    return obj;
}
/**
 * convert a mode name into it's corresponding integer value
 */
function ModeNameToInt(mode) {
    switch (mode) {
        case 'osu!std':
        case 'std':
        case 'osu':
        case 'o':
        case 'standard':
            return 0;
        case 'osu!taiko':
        case 'taiko':
        case 't':
            return 1;
        case 'osu!catch':
        case 'catch':
        case 'c':
        case 'fruits':
        case 'ctb':
        case 'catch the beat':
            return 2;
        case 'osu!mania':
        case 'mania':
        case 'm':
            return 3;
        default:
            return 0;
    }
}
/**
 * convert an integer into it's corresponding mode name
 */
function ModeIntToName(mode) {
    switch (mode) {
        case 0:
            return 'osu';
        case 1:
            return 'taiko';
        case 2:
            return 'fruits';
        case 3:
            return 'mania';
        default:
            return 'osu';
    }
}
/**
 * convert a string into an osu! rank/grade
 */
function checkGrade(string, defaultRank) {
    var grade;
    if (!defaultRank) {
        defaultRank = 'A';
    }
    switch (true) {
        case string.toUpperCase().includes('SSH'):
            grade = 'XH';
            break;
        case string.toUpperCase().includes('SS'):
            grade = 'X';
            break;
        case string.toUpperCase().includes('SH'):
            grade = 'SH';
            break;
        case string.toUpperCase().includes('S'):
            grade = 'S';
            break;
        case string.toUpperCase().includes('A'):
            grade = 'A';
            break;
        case string.toUpperCase().includes('B'):
            grade = 'B';
            break;
        case string.toUpperCase().includes('C'):
            grade = 'C';
            break;
        case string.toUpperCase().includes('D'):
            grade = 'D';
            break;
        case string.toUpperCase().includes('F'):
            grade = 'F';
            break;
        default:
            grade = defaultRank;
            break;
    }
    return grade;
}
/**
 * convert a player's rank into their badge weight seeding rank
 */
function bws(badges, rank) {
    return badges > 0 ?
        Math.pow(rank, (Math.pow(0.9937, (Math.pow(badges, 2))))) :
        rank;
}
/**
 * find a player's recommended map difficulty
 * @param pp the player's total performance
 */
function recdiff(pp) {
    return (Math.pow(pp, 0.4)) * 0.195;
}
