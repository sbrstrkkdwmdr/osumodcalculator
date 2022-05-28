/**
 * 
 * @param {number} ar approach rate
 * @returns approach rate if the double time mod is applied
 */
function doubletimear(ar) {
    let ms;

    if (ar > 5) {
        ms = 200 + (11 - ar) * 100;
    }
    else {
        ms = 800 + (5 - ar) * 80;
    }

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
        ar_old: ar,
    }
    return arobj;
}
/**
 * 
 * @param {number} ar approach rate
 * @returns approach rate if the half time mod is applied
 */
function halftimear(ar) {
    let ms;
    if (ar > 5) {
        ogtoms = 1200 - (((ar - 5) * 10) * 15)
    }
    else {
        ogtoms = 1800 - (((ar) * 10) * 12)
    }
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
        ar_old: ar,
        ms_old: ogtoms
    }
    return arobj;
}
/**
 * 
 * @param {number} od overall difficulty / accuracy
 * @returns hitwindow values in milliseconds
 */
function odtoms(od) {
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
function artoms(ar) {
    if (ar > 5) {
        ogtoms = 1200 - (((ar - 5) * 10) * 15)
    }
    else {
        ogtoms = 1800 - (((ar) * 10) * 12)
    }
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
function mstood(hitwindow300, hitwindow100, hitwindow50) {
    let od;
    if(!isNaN(hitwindow300)){
    od = Math.abs(((79.5 - hitwindow300) / 6).toFixed(2))
    }
    else if (!isNaN(hitwindow100)){
        od = Math.abs(((139.5 - hitwindow100) / 8).toFixed(2))
    }
    else if (!isNaN(hitwindow50)){
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
function mstoar(ms) {
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
function oddt(od) {
    let oldrange300 = 79 - (od * 6) + 0.5
    let oldrange100 = 139 - (od * 8) + 0.5
    let oldrange50 = 199 - (od * 10) + 0.5

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
        hitwin_300_old: oldrange300,
        hitwin_100_old: oldrange100,
        hitwin_50_old: oldrange50,
        od_old: od
    }

    return odobj;

}
/**
 * 
 * @param {number} od overall difficulty / accuracy
 * @returns ms values for the od hitwindows and converts to half time
 */
function odht(od) {
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
    topequation = Math.floor((300 * hit300) + (100 * hit100) + (50 * hit50) )
    bottomequation = Math.floor(300 * (hit300 + hit100 + hit50 + miss))
    fullequation = (Math.abs((topequation / bottomequation) * 100)).toString() + '%'
    shortequation = ((Math.abs((topequation / bottomequation) * 100)).toFixed(2)).toString() + '%'
    //https://osu.ppy.sh/wiki/en/FAQ#grades
    grade = 'D'
    if (hit300 / totalhits > 0.6 && miss == 0) {
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
function calcgradetaiko(hit300, hit100, miss) {
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
function calcgradecatch(hit300, hit100, hit50, hitkatu, miss) {
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
function calcgrademania(hit300max, hit300, hit200, hit100, hit50, miss) {
    topequation = Math.floor((300 * (hit300max + hit300)) + (200 * hit200) + (100 * hit100) + (50 * hit50))
    bottomequation = Math.floor(300 * (hit300max + hit300 + hit200 + hit100 + hit50 + miss))
    fullequation = (Math.abs((topequation / bottomequation) * 100)).toString() + '%'
    shortequation = ((Math.abs((topequation / bottomequation) * 100)).toFixed(2)).toString() + '%'
    grade = 'D'
    if (topequation / bottomequation == 0.7) {
        grade = 'C'
    }
    if (topequation / bottomequation == 0.8) {
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

module.exports = { doubletimear, halftimear, calcgrade, calcgradetaiko, calcgradecatch, calcgrademania, oddt, odht, odtoms, artoms, mstoar, mstood }