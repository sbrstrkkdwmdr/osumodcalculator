/**
 * 
 * @param {number} ar approach rate
 * @returns approach rate if the double time mod is applied
 */
function DoubleTimeAR(ar) {
    let ms;

    /*     if (ar > 5) {
            ms = 200 + (11 - ar) * 100;
        }
        else {
            ms = 800 + (5 - ar) * 80;
        } */
    ms = ar > 5 ? 200 + (11 - ar) * 100 : 800 + (5 - ar) * 80;

    if (ms < 300) {
        newAR = 11
    }
    else if (ms < 1200) {
        newAR = Math.round((11 - (ms - 300) / 150) * 100) / 100;
    }
    else {
        newAR = Math.round((5 - (ms - 1200) / 120) * 100) / 100;
    }
    let arobj = {
        ar: newAR,
        ms: ms,
    }
    return arobj;
}
/**
 * 
 * @param {number} ar approach rate
 * @returns approach rate if the half time mod is applied
 */
function HalfTimeAR(ar) {
    let ms;
/*     if (ar > 5) {
        ogtoms = 1200 - (((ar - 5) * 10) * 15)
    }
    else {
        ogtoms = 1800 - (((ar) * 10) * 12)
    } */
    let ogtoms = ar > 5 ? 200 + (11 - ar) * 100 : 800 + (5 - ar) * 80;
    ms = ogtoms * (4 / 3);

    if (ms < 300) {
        newAR = 11
    }
    else if (ms < 1200) {
        newAR = Math.round((11 - (ms - 300) / 150) * 100) / 100;
    }
    else {
        newAR = Math.round((5 - (ms - 1200) / 120) * 100) / 100;
    }
    let arobj = {
        ar: newAR,
        ms: ms,
    }
    return arobj;
}
/**
 * 
 * @param {number} od overall difficulty / accuracy
 * @returns hitwindow values in milliseconds
 */
function ODtoms(od) {
    let range300 = 79 - (od * 6) + 0.5
    let range100 = 139 - (od * 8) + 0.5
    let range50 = 199 - (od * 10) + 0.5

    let rangeobj = {
        range300: range300,
        range100: range100,
        range50: range50,
    }
    return rangeobj;
}
/**
 * 
 * @param {number} ar approach rate
 * @returns approach rate converted to milliseconds
 */
function ARtoms(ar) {
    /*     if (ar > 5) {
            ogtoms = 1200 - (((ar - 5) * 10) * 15)
        }
        else {
            ogtoms = 1800 - (((ar) * 10) * 12)
        } */
    ogtoms = ar > 5 ? 1200 - (((ar - 5) * 10) * 15) : 1800 - (((ar) * 10) * 12)
    return ogtoms;
}
/**
 * 
 * @param {number} hitwindow300 300 hit window in milliseconds
 * @param {number} hitwindow100 100 hit window in milliseconds
 * @param {number} hitwindow50 50 hit window in milliseconds
 * @info set a value to a string to ignore
 * @returns od (overall difficulty)
 */
function msToOD(hitwindow300, hitwindow100, hitwindow50) {
    let od;
    if (!isNaN(hitwindow300)) {
        od = Math.abs(((79.5 - hitwindow300) / 6).toFixed(2))
    }
    else if (!isNaN(hitwindow100)) {
        od = Math.abs(((139.5 - hitwindow100) / 8).toFixed(2))
    }
    else if (!isNaN(hitwindow50)) {
        od = Math.abs(((199.5 - hitwindow50) / 10).toFixed(2))
    } else {
        od = '???'
    }

    ;
    return od;
}
/**
 * 
 * @param {number} ms milliseconds
 * @returns ar (approach rate)
 */
function msToAR(ms) {
    let ar
    if (ms < 300) {
        ar = 11
    }
    else if (ms < 1200) {
        ar = Math.round((11 - (ms - 300) / 150) * 100) / 100;
    }
    else {
        ar = Math.round((5 - (ms - 1200) / 120) * 100) / 100;
    }
    return ar
}



/**
 * 
 * @param {number} od overall difficulty / accuracy
 * @returns ms values for the od hitwindows and converts to double time
 */
function odDT(od) {
    let range300 = (79 - (od * 6) + 0.5) * 2 / 3
    let range100 = (139 - (od * 8) + 0.5) * 2 / 3
    let range50 = (199 - (od * 10) + 0.5) * 2 / 3
    let odnew = od * 4 / 3

    odnew = Math.abs(((79.5 - range300) / 6).toFixed(2))

    let odobj = {
        hitwindow_300: range300,
        hitwindow_100: range100,
        hitwindow_50: range50,
        od_num: odnew,
    }

    return odobj;

}
/**
 * 
 * @param {number} od overall difficulty / accuracy
 * @returns ms values for the od hitwindows and converts to half time
 */
function odHT(od) {
    let oldrange300 = 79 - (od * 6) + 0.5
    let oldrange100 = 139 - (od * 8) + 0.5
    let oldrange50 = 199 - (od * 10) + 0.5

    let range300 = (79 - (od * 6) + 0.5) * 4 / 3
    let range100 = (139 - (od * 8) + 0.5) * 4 / 3
    let range50 = (199 - (od * 10) + 0.5) * 4 / 3
    let odnew = od * 2 / 3

        ;
    odnew = Math.abs(((79.5 - range300) / 6).toFixed(2))



    let odobj = {
        hitwindow_300: range300,
        hitwindow_100: range100,
        hitwindow_50: range50,
        od_num: odnew,
        hitwin_300_old: oldrange300,
        hitwin_100_old: oldrange100,
        hitwin_50_old: oldrange50,
        od_old: od
    }

    return odobj;
}
//https://osu.ppy.sh/wiki/en/Gameplay/Accuracy
/**
 * 
 * @param {*} hit300 - hit 300s (100%)
 * @param {*} hit100 - hit 100s (33.33%)
 * @param {*} hit50  - hit 50s (16.66%)
 * @param {*} miss - hit 0s/misses (0%)
 * @returns an array containing grades and accuracy
 */
function calcgrade(hit300, hit100, hit50, miss) {
    totalhits = hit300 + hit100 + hit50 + miss
    topequation = Math.floor((300 * hit300) + (100 * hit100) + (50 * hit50))
    bottomequation = Math.floor(300 * (hit300 + hit100 + hit50 + miss))
    fullequation = (Math.abs((topequation / bottomequation) * 100)).toString() + '%'
    shortequation = ((Math.abs((topequation / bottomequation) * 100)).toFixed(2)).toString() + '%'
    //https://osu.ppy.sh/wiki/en/FAQ#grades
    grade = 'D';
    if ((hit300 / totalhits > 0.6 && miss == 0) || (hit300 / totalhits > 0.7)) {
        grade = 'C'
    }
    if ((hit300 / totalhits > 0.7 && miss == 0) || (hit300 / totalhits > 0.8)) {
        grade = 'B'
    }
    if ((hit300 / totalhits > 0.8 && miss == 0) || (hit300 / totalhits > 0.9)) {
        grade = 'A'
    }
    if (Math.abs(hit300 / totalhits) > 0.9 && miss == 0 && Math.abs(hit50 / totalhits) < 0.01) {
        grade = 'S'
    }
    if (hit100 < 1 && hit50 < 1 && miss == 0) {
        grade = 'SS'
    }
    let finalarr = {
        grade: grade,
        accuracy: shortequation,
        fullacc: fullequation
    }

    return finalarr;
}
/**
 * 
 * @param {*} hit300 - hit 300s/greats (100%)
 * @param {*} hit100 - hit 100s/good (50%)
 * @param {*} miss - misses (0%)
 * @returns an array containing grades and accuracy
 */
function calcgradeTaiko(hit300, hit100, miss) {
    topequation = Math.abs(hit300 + (hit100 / 2))
    bottomequation = Math.abs(hit300 + hit100 + miss)
    fullequation = (Math.abs((topequation / bottomequation) * 100)).toString() + '%'
    shortequation = ((Math.abs((topequation / bottomequation) * 100)).toFixed(2)).toString() + '%'
    grade = 'https://osu.ppy.sh/wiki/en/FAQ#grades'
    if (topequation / bottomequation > 0.8) {
        grade = 'B'
    }
    if (topequation / bottomequation > 0.9) {
        grade = 'A'
    }
    if (topequation / bottomequation > 0.95) {
        grade = 'S'
    }
    if (topequation / bottomequation == 1) {
        grade = 'SS'
    }
    let finalarr = {
        grade: grade,
        accuracy: shortequation,
        fullacc: fullequation
    }
    return finalarr;

}
/**
 * 
 * @param {*} hit300 - fruits caught
 * @param {*} hit100 - drops caught
 * @param {*} hit50 - droplets caught
 * @param {*} miss - misses
 * @returns an array containing grades and accuracy
 */
function calcgradeCatch(hit300, hit100, hit50, hitkatu, miss) {
    let hits = hit300 + hit100 + hit50 + miss + hitkatu

    topequation = Math.floor(hit300 + hit100 + hit50)
    bottomequation = Math.floor(Math.abs(hits))
    fullequation = (Math.abs((topequation / bottomequation) * 100)).toString() + '%'
    shortequation = ((Math.abs((topequation / bottomequation) * 100)).toFixed(2)).toString() + '%'

    grade = 'D'
    if (topequation / bottomequation > 0.85) {
        grade = 'C'
    }
    if (topequation / bottomequation > 0.9) {
        grade = 'B'
    }
    if (topequation / bottomequation > 0.94) {
        grade = 'A'
    }
    if (topequation / bottomequation > 0.98) {
        grade = 'S'
    }
    if (topequation / bottomequation == 1) {
        grade = 'SS'
    }

    let finalarr = {
        grade: grade,
        accuracy: shortequation,
        fullacc: fullequation
    }
    return finalarr;
}
/**
 * 
 * @param {*} hit300max - hit max/300+ (100%)
 * @param {*} hit300 - hit 300 (100%)
 * @param {*} hit200 - hit 200 (66.66%)
 * @param {*} hit100 - hit 100 (33.33%)
 * @param {*} hit50 - hit 50 (16.66%)
 * @param {*} miss - miss (0%)
 * @returns an array containing grades and accuracy
 */
function calcgradeMania(hit300max, hit300, hit200, hit100, hit50, miss) {
    topequation = Math.floor((300 * (hit300max + hit300)) + (200 * hit200) + (100 * hit100) + (50 * hit50))
    bottomequation = Math.floor(300 * (hit300max + hit300 + hit200 + hit100 + hit50 + miss))
    fullequation = (Math.abs((topequation / bottomequation) * 100)).toString() + '%'
    shortequation = ((Math.abs((topequation / bottomequation) * 100)).toFixed(2)).toString() + '%'
    grade = 'D'
    if (topequation / bottomequation > 0.7) {
        grade = 'C'
    }
    if (topequation / bottomequation > 0.8) {
        grade = 'B'
    }
    if (topequation / bottomequation > 0.9) {
        grade = 'A'
    }
    if (topequation / bottomequation > 0.95) {
        grade = 'S'
    }
    if (topequation / bottomequation == 1) {
        grade = 'SS'
    }
    let finalarr = {
        grade: grade,
        accuracy: shortequation,
        fullacc: fullequation
    }
    return finalarr;


}
/**
 * 
 * @param {number} cs circle size
 * @param {number} ar approach rate
 * @param {number} od overall difficulty
 * @param {number} hp health
 * @returns values converted to HR
 */
function toHR(cs, ar, od, hp) {

    let hrobj = {
        cs: cs * 1.3 > 10 ? 10 : cs * 1.3,
        ar: ar * 1.4 > 10 ? 10 : ar * 1.4,
        od: od * 1.4 > 10 ? 10 : od * 1.4,
        hp: hp * 1.4 > 10 ? 10 : hp * 1.4,
    }
    return hrobj;
}
/**
 * 
 * @param {number} cs circle size
 * @param {number} ar approach rate
 * @param {number} od overall difficulty
 * @param {number} hp health
 * @returns values converted to EZ
 */
function toEZ(cs, ar, od, hp) {

    let ezobj = {
        cs: cs / 2,
        ar: ar / 2,
        od: od / 2,
        hp: hp / 2,
    }
    return ezobj;
}
/**
 * 
 * @param {*} mods 
 * @returns converts mods to an integer (HDDTHR = 88)
 */
function ModStringToInt(mods) {
    let modInt = 0;

    if (mods.toUpperCase().includes('NF')) {
        modInt += 1
    }
    if (mods.toUpperCase().includes('EZ')) {
        modInt += 2
    }
    if (mods.toUpperCase().includes('TD')) {
        modInt += 4
    }
    if (mods.toUpperCase().includes('HD')) {
        modInt += 8
    }
    if (mods.toUpperCase().includes('HR')) {
        modInt += 16
    }
    if (mods.toUpperCase().includes('SD')) {
        modInt += 32
    }
    if (mods.toUpperCase().includes('DT')) {
        modInt += 64
    }
    if (mods.toUpperCase().includes('RX') || mods.toUpperCase().includes('RL') || mods.toUpperCase().includes('RLX')) {
        modInt += 128
    }
    if (mods.toUpperCase().includes('HT')) {
        modInt += 256
    }
    if (mods.toUpperCase().includes('NC')) {
        modInt += 512
    }
    if (mods.toUpperCase().includes('FL')) {
        modInt += 1024
    }
    if (mods.toUpperCase().includes('AT')) {
        modInt += 2048
    }
    if (mods.toUpperCase().includes('SO')) {
        modInt += 4096
    }
    if (mods.toUpperCase().includes('AP') || mods.toUpperCase().includes('RX2')) {
        modInt += 8192
    }
    if (mods.toUpperCase().includes('PF')) {
        modInt += 16384
    }
    if (mods.toUpperCase().includes('1K')) {
        modInt += 67108864
    }
    if (mods.toUpperCase().includes('2K')) {
        modInt += 268435456
    }
    if (mods.toUpperCase().includes('3K')) {
        modInt += 134217728
    }
    if (mods.toUpperCase().includes('4K')) {
        modInt += 32768
    }
    if (mods.toUpperCase().includes('5K')) {
        modInt += 65536
    }
    if (mods.toUpperCase().includes('6K')) {
        modInt += 131072
    }
    if (mods.toUpperCase().includes('7K')) {
        modInt += 262144
    }
    if (mods.toUpperCase().includes('8K')) {
        modInt += 524288
    }
    if (mods.toUpperCase().includes('9K')) {
        modInt += 16777216
    }
    if (mods.toUpperCase().includes('FI')) {
        modInt += 1048576
    }
    if (mods.toUpperCase().includes('RDM')) {
        modInt += 2097152
    }
    if (mods.toUpperCase().includes('CN')) {
        modInt += 4194304
    }
    if (mods.toUpperCase().includes('TP')) {
        modInt += 8388608
    }
    if (mods.toUpperCase().includes('KC')) {
        modInt += 33554432
    }
    if (mods.toUpperCase().includes('SV2') || mods.toUpperCase().includes('S2')) {
        modInt += 536870912
    }
    if (mods.toUpperCase().includes('MR')) {
        modInt += 1073741824
    }
    return modInt;
}

/**
 * 
 * @param {*} modInt 
 * @returns converts mod integers to a string (88 = HDDTHR)
 */
function ModIntToString(modInt) {
    let modString = '';
    if (modInt & 1) {
        modString += 'NF'
    }
    if (modInt & 2) {
        modString += 'EZ'
    }
    if (modInt & 4) {
        modString += 'TD'
    }
    if (modInt & 8) {
        modString += 'HD'
    }
    if (modInt & 16) {
        modString += 'HR'
    }
    if (modInt & 32) {
        modString += 'SD'
    }
    if (modInt & 64) {
        modString += 'DT'
    }
    if (modInt & 128) {
        modString += 'RX'
    }
    if (modInt & 256) {
        modString += 'HT'
    }
    if (modInt & 512) {
        modString += 'NC'
    }
    if (modInt & 1024) {
        modString += 'FL'
    }
    if (modInt & 2048) {
        modString += 'AT'
    }
    if (modInt & 4096) {
        modString += 'SO'
    }
    if (modInt & 8192) {
        modString += 'AP'
    }
    if (modInt & 16384) {
        modString += 'PF'
    }
    if (modInt & 67108864) {
        modString += '1K'
    }

    if (modInt & 268435456) {
        modString += '2K'
    }
    if (modInt & 134217728) {
        modString += '3K'
    }
    if (modInt & 32768) {
        modString += '4K'
    }
    if (modInt & 65536) {
        modString += '5K'
    }
    if (modInt & 131072) {
        modString += '6K'
    }
    if (modInt & 262144) {
        modString += '7K'
    }
    if (modInt & 524288) {
        modString += '8K'
    }
    if (modInt & 16777216) {
        modString += '9K'
    }
    if (modInt & 1048576) {
        modString += 'FI'
    }
    if (modInt & 2097152) {

        modString += 'RDM'
    }
    if (modInt & 4194304) {
        modString += 'CN'
    }
    if (modInt & 8388608) {
        modString += 'TP'
    }
    if (modInt & 33554432) {
        modString += 'KC'
    }
    if (modInt & 536870912) {
        modString += 'SV2'
    }
    if (modInt & 1073741824) {
        modString += 'MR'
    }
    if (modString.includes('DT') && modString.includes('NC')) {
        modString = modString.replace('DT', '')
    }
    if (modString.includes('SD') && modString.includes('PF')) {
        modString = modString.replace('SD', '')
    }

    return modString;
}
/**
 * 
 * @param {*} modString 
 * @returns reorders mods to be in the correct order and removes duplicates.
 */
function OrderMods(modString) {
    let ModsOrder = ['AT', 'RX', 'AP', 'TP', 'SO', 'EZ', 'HD', 'HT', 'DT', 'NC', 'HR', 'SD', 'PF', 'FL', 'NF']
    let modStringArray = modString.toUpperCase().replace(/(.{2})/g, "$1 ").split(' ')
    let modStringArrayOrdered = []
    let modStringArrayOrderedtest = []
    for (let i = 0; i < ModsOrder.length; i++) {
        for (let j = 0; j < modStringArray.length; j++) {
            if (ModsOrder[i] === modStringArray[j]) {
                modStringArrayOrderedtest.push(modStringArray[j])
            }
        }
    }
    for (let i = 0; i < modStringArrayOrderedtest.length; i++) {
        if (modStringArrayOrderedtest.indexOf(modStringArrayOrderedtest[i]) === i) {
            modStringArrayOrdered.push(modStringArrayOrderedtest[i])
        }
    }

    return modStringArrayOrdered.join('')
}


module.exports = { DoubleTimeAR, HalfTimeAR, calcgrade, calcgradeTaiko, calcgradeCatch, calcgradeMania, odDT, odHT, ODtoms, ARtoms, msToAR, msToOD, toEZ, toHR, ModStringToInt, ModIntToString, OrderMods }
