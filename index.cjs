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
    let rangeobj = {
        range300: 79 - (od * 6) + 0.5,
        range100: 139 - (od * 8) + 0.5,
        range50: 199 - (od * 10) + 0.5,
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
    let ogtoms = ar > 5 ? 1200 - (((ar - 5) * 10) * 15) : 1800 - (((ar) * 10) * 12)
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
    if (od > 11) {
        od = 11
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
    let odobj = {
        hitwindow_300: range300,
        hitwindow_100: (139 - (od * 8) + 0.5) * 2 / 3,
        hitwindow_50: (199 - (od * 10) + 0.5) * 2 / 3,
        od_num: Math.abs(((79.5 - range300) / 6).toFixed(2)) > 11 ? 11 : Math.abs(((79.5 - range300) / 6).toFixed(2)),
    }

    return odobj;

}
/**
 * 
 * @param {number} od overall difficulty / accuracy
 * @returns ms values for the od hitwindows and converts to half time
 */
function odHT(od) {
    let range300 = (79 - (od * 6) + 0.5) * 4 / 3
    let odobj = {
        hitwindow_300: range300,
        hitwindow_100: (139 - (od * 8) + 0.5) * 4 / 3,
        hitwindow_50: (199 - (od * 10) + 0.5) * 4 / 3,
        od_num: Math.abs(((79.5 - range300) / 6).toFixed(2)) > 11 ? 11 : Math.abs(((79.5 - range300) / 6).toFixed(2)),
    }

    return odobj;
}
//https://osu.ppy.sh/wiki/en/Gameplay/Accuracy
/**
 * 
 * @param {number} hit300 - hit 300s (100%)
 * @param {number} hit100 - hit 100s (33.33%)
 * @param {number} hit50  - hit 50s (16.66%)
 * @param {number} miss - hit 0s/misses (0%)
 * @returns an array containing grades and accuracy
 */
function calcgrade(hit300, hit100, hit50, miss) {
    let totalhits = hit300 + hit100 + hit50 + miss
    let equation = ((Math.floor((300 * hit300) + (100 * hit100) + (50 * hit50))) / (Math.floor(300 * (hit300 + hit100 + hit50 + miss)))) * 100
    //https://osu.ppy.sh/wiki/en/FAQ#grades
    let grade = 'D';
    if (hit300 / totalhits > 0.6) {
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
        accuracy: equation,
    }

    return finalarr;
}
/**
 * 
 * @param {number} hit300 - hit 300s/greats (100%)
 * @param {number} hit100 - hit 100s/good (50%)
 * @param {number} miss - misses (0%)
 * @returns an array containing grades and accuracy
 */
function calcgradeTaiko(hit300, hit100, miss) {
    let equation = (Math.abs(hit300 + (hit100 / 2))) / (Math.abs(hit300 + hit100 + miss))

    //grade = 'https://osu.ppy.sh/wiki/en/FAQ#grades'
    let grade = 'D';
    if (equation > 0.8) {
        grade = 'B'
    }
    if (equation > 0.9) {
        grade = 'A'
    }
    if (equation > 0.95) {
        grade = 'S'
    }
    if (equation == 1) {
        grade = 'SS'
    }
    let finalarr = {
        grade: grade,
        accuracy: equation * 100,
    }
    return finalarr;

}
/**
 * 
 * @param {number} hit300 - fruits caught
 * @param {number} hit100 - drops caught
 * @param {number} hit50 - droplets caught
 * @param {number} miss - misses
 * @returns an array containing grades and accuracy
 */
function calcgradeCatch(hit300, hit100, hit50, hitkatu, miss) {
    let equation = Math.floor(hit300 + hit100 + hit50) / Math.floor(hit300 + hit100 + hit50 + hitkatu + miss)

    let grade = 'D'
    if (equation > 0.85) {
        grade = 'C'
    }
    if (equation > 0.9) {
        grade = 'B'
    }
    if (equation > 0.94) {
        grade = 'A'
    }
    if (equation > 0.98) {
        grade = 'S'
    }
    if (equation == 1) {
        grade = 'SS'
    }

    let finalarr = {
        grade: grade,
        accuracy: equation * 100,
    }
    return finalarr;
}
/**
 * 
 * @param {number} hit300max - hit max/300+ (100%)
 * @param {number} hit300 - hit 300 (100%)
 * @param {number} hit200 - hit 200 (66.66%)
 * @param {number} hit100 - hit 100 (33.33%)
 * @param {number} hit50 - hit 50 (16.66%)
 * @param {number} miss - miss (0%)
 * @returns an array containing grades and accuracy
 */
function calcgradeMania(hit300max, hit300, hit200, hit100, hit50, miss) {
    let equation = Math.floor((300 * (hit300max + hit300)) + (200 * hit200) + (100 * hit100) + (50 * hit50)) / Math.floor(300 * (hit300max + hit300 + hit200 + hit100 + hit50 + miss))
    let grade = 'D'
    if (equation > 0.7) {
        grade = 'C'
    }
    if (equation > 0.8) {
        grade = 'B'
    }
    if (equation > 0.9) {
        grade = 'A'
    }
    if (equation > 0.95) {
        grade = 'S'
    }
    if (equation == 1) {
        grade = 'SS'
    }
    let finalarr = {
        grade: grade,
        accuracy: equation * 100,
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
        cs: cs / 2 > 10 ? 10 : cs / 2,
        ar: ar / 2 > 10 ? 10 : ar / 2,
        od: od / 2 > 10 ? 10 : od / 2,
        hp: hp / 2 > 10 ? 10 : hp / 2,
    }
    return ezobj;
}
/**
 * 
 * @param {string} mods 
 * @returns {int} converts mods to an integer (HDDTHR = 88)
 */
function ModStringToInt(mods) {
    let modInt = 0;
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
    modInt += mods.toUpperCase().includes('CN') ? 4194304 : 0;
    modInt += mods.toUpperCase().includes('TP') ? 8388608 : 0;
    modInt += mods.toUpperCase().includes('KC') ? 33554432 : 0;
    modInt += mods.toUpperCase().includes('SV2') || mods.toUpperCase().includes('S2') ? 536870912 : 0;
    modInt += mods.toUpperCase().includes('MR') ? 1073741824 : 0;
    return modInt;
}

/**
 * 
 * @param {number} modInt 
 * @returns {string} converts mod integers to a string (88 = HDDTHR)
 */
function ModIntToString(modInt) {
    let modString = '';
    modString += modInt & 1 ? 'NF' : '';
    modString += modInt & 2 ? 'EZ' : '';
    modString += modInt & 4 ? 'TD' : '';
    modString += modInt & 8 ? 'HD' : '';
    modString += modInt & 16 ? 'HR' : '';
    modString += modInt & 32 ? 'SD' : '';
    modString += modInt & 64 ? 'DT' : '';
    modString += modInt & 128 ? 'RX' : '';
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
    modString += modInt & 2097152 ? 'RDM' : '';
    modString += modInt & 4194304 ? 'CN' : '';
    modString += modInt & 8388608 ? 'TP' : '';
    modString += modInt & 33554432 ? 'KC' : '';
    modString += modInt & 536870912 ? 'SV2' : '';
    modString += modInt & 1073741824 ? 'MR' : '';
    if (modString.includes('DT') && modString.includes('NC')) {
        modString = modString.replace('DT', '')
    }
    if (modString.includes('SD') && modString.includes('PF')) {
        modString = modString.replace('SD', '')
    }
    return OrderMods(modString);
}
/**
 * 
 * @param {string} modString 
 * @returns {string} reorders mods to be in the correct order and removes duplicates.
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

/**
 * 
 * @param {number} cs circle size
 * @returns {number} the radius of the circle
 */
function csToRadius(cs) {
    return (0.00005556 * cs ** 2 - 4.483 * cs + 54.42)
}

/**
 * 
 * @param {number} radius the radius of the circle
 * @returns {number} cs circle size
 */

function csFromRadius(radius) {
    return (5000 / 8104533921) * radius ** 2 - (1808448550 / 8104533921) * radius + (8582285633270972 / 706821088118109)
}

module.exports = { DoubleTimeAR, HalfTimeAR, calcgrade, calcgradeTaiko, calcgradeCatch, calcgradeMania, odDT, odHT, ODtoms, ARtoms, msToAR, msToOD, toEZ, toHR, ModStringToInt, ModIntToString, OrderMods, csToRadius, csFromRadius }
