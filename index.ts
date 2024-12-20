import types = require("./types");


export type OverallDifficulty = {
    hitwindow_300: number,
    hitwindow_100: number,
    hitwindow_50: number,
    od_num: number,
};
export type ApproachRate = {
    ar: number,
    ms: number,
};
export type AccGrade = {
    grade: string,
    gradeLazer: string,
    accuracy: number;
};
export type Values = {
    cs: number,
    ar: number,
    od: number,
    hp: number,
    bpm?: number,
    length?: number,
    mods?: string,
    speedMult?: number,
    error?: string | boolean,
    details?: {
        csRadius: number,
        arMs: number,
        odMs: OverallDifficulty,
        lengthFull: string,
    };
};

export type Mods =
    'EZ' | 'HD' | 'FI' | 'HT' | 'DT' | 'NC' | 'HR' | 'FL' | 'SD' | 'PF' | 'NF' | 'AT' | 'CM' | 'RL' | 'AP' | 'TP' | 'SO' | 'TD' | '1K' | '2K' | '3K' | '4K' | '5K' | '6K' | '7K' | '8K' | '9K' | 'CP' | 'RD' | 'MR' | 'V2';

export type ModsLazer = Mods | 'DC' | 'BL' | 'ST' /**strict tracking */ | 'DA' | 'CL' | 'AL' | 'ST' /**single tap */ | 'TR' /**transform */ | 'WI' | 'SI' | 'GR' | 'DF' | 'WU' | 'WD' | 'TR' /**traceable */ | 'BR' | 'AD' | 'MU' | 'NS' | 'MG' | 'RP' | 'AS' | 'FF';

export type ModsLong = 'Easy' | 'Hidden' | 'Fade in' | 'Half Time' | 'Double Time' | 'Nightcore' | 'Hard Rock' | 'Flashlight' | 'Sudden Death' | 'Perfect' | 'No Fail' | 'Auto' | 'Cinema' | 'Relax' | 'Autopilot' | 'Target Practice' | 'Spun Out' | 'Touch device' | '1K' | '2K' | '3K' | '4K' | '5K' | '6K' | '7K' | '8K' | '9K' | 'Co-op' | 'Random' | 'Mirror' | 'ScoreV2';

export type ModsLazerLong = ModsLong | 'Daycore' | 'Blinds' | 'Strict Tracking' | 'Difficulty Adjust' | 'Classic' | 'Alternate' | 'Single Tap' | 'Transform' | 'Wiggle' | 'Spin In' | 'Grow' | 'Deflate' | 'Wind Up' | 'Wind Down' | 'Traceable' | 'Barrel Roll' | 'Approach Different' | 'Muted' | 'No Scope' | 'Magnetised' | 'Repel' | 'Adaptive Speed' | 'Freeze Frame';

/**
 * 
 * @param ar approach rate
 * @returns approach rate if the double time mod is applied
 */
function DoubleTimeAR(ar: number) {
    /*     if (ar > 5) {
            ms = 200 + (11 - ar) * 100;
        }
        else {
            ms = 800 + (5 - ar) * 80;
        } */
    const ms = ar > 5 ? 200 + (11 - ar) * 100 : 800 + (5 - ar) * 80;
    let newAR: number;
    if (ms < 300) {
        newAR = 11;
    }
    else if (ms < 1200) {
        newAR = Math.round((11 - (ms - 300) / 150) * 100) / 100;
    }
    else {
        newAR = Math.round((5 - (ms - 1200) / 120) * 100) / 100;
    }
    const arobj: ApproachRate = {
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
function HalfTimeAR(ar: number) {
    let newAR: number;
    /*     if (ar > 5) {
            ogtoms = 1200 - (((ar - 5) * 10) * 15)
        }
        else {
            ogtoms = 1800 - (((ar) * 10) * 12j)
        } */
    const ogtoms = ar > 5 ? 1200 - ((ar - 5) * 10 * 15) : 1800 - ((ar * 10) * 12);
    const ms = ogtoms * (4 / 3);

    if (ms < 300) {
        newAR = 11;
    }
    else if (ms < 1200) {
        newAR = Math.round((11 - (ms - 300) / 150) * 100) / 100;
    }
    else {
        newAR = Math.round((5 - (ms - 1200) / 120) * 100) / 100;
    }
    const arobj: ApproachRate = {
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
function ODtoms(od: number) {
    const rangeobj: OverallDifficulty = {
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
function ARtoms(ar: number): ApproachRate {
    const ogtoms = ar > 5 ? 1200 - (((ar - 5) * 10) * 15) : 1800 - (((ar) * 10) * 12);
    return {
        ar,
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
function msToOD(hitwindow300: number, hitwindow100?: number, hitwindow50?: number): OverallDifficulty {
    let od: string = 'NaN';
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
function msToAR(ms: number): ApproachRate {
    let ar: number;
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
        ar,
        ms,
    };
}



/**
 * 
 * @param od overall difficulty / accuracy
 * @returns ms values for the od hitwindows and converts to double time
 */
function odDT(od: number) {
    const range300 = ((79 - (od * 6) + 0.5) * 2 / 3) + 0.33;
    const odobj: OverallDifficulty = {
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
function odHT(od: number) {
    const range300 = ((79 - (od * 6) + 0.5) * 4 / 3) + 0.66;
    const odobj = {
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
function calcgrade(hit300: number, hit100: number, hit50: number, miss: number) {
    const totalhits = hit300 + hit100 + hit50 + miss;
    const equation = ((Math.floor((300 * hit300) + (100 * hit100) + (50 * hit50))) / (Math.floor(300 * (hit300 + hit100 + hit50 + miss)))) * 100;
    //https://osu.ppy.sh/wiki/en/FAQ#grades
    let [grade, gradeLazer] = ['D', 'D'];
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

    const finalarr: AccGrade = {
        grade,
        gradeLazer,
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
function calcgradeTaiko(hit300: number, hit100: number, miss: number) {
    const equation = (Math.abs(hit300 + (hit100 / 2))) / (Math.abs(hit300 + hit100 + miss));
    //grade = 'https://osu.ppy.sh/wiki/en/FAQ#grades'
    let [grade, gradeLazer] = ['D', 'D'];
    if (equation >= 0.8) {
        [grade, gradeLazer] = ['B', 'B'];
    }
    if (equation >= 0.9) {
        [grade, gradeLazer] = ['A', 'B'];
    }
    if (equation >= 0.95) {
        grade = 'S';
    }
    if (equation >= 0.95 && miss == 0) {
        gradeLazer = 'S';
    }
    if (equation == 1) {
        [grade, gradeLazer] = ['SS', 'SS'];
    }
    const finalarr: AccGrade = {
        grade,
        gradeLazer,
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
function calcgradeCatch(hit300: number, hit100: number, hit50: number, hitkatu: number, miss: number) {
    const equation = Math.floor(hit300 + hit100 + hit50) / Math.floor(hit300 + hit100 + hit50 + hitkatu + miss);
    let [grade, gradeLazer] = ['D', 'D'];
    if (equation >= 0.85) {
        [grade, gradeLazer] = ['C', 'C'];
    }
    if (equation >= 0.9) {
        [grade, gradeLazer] = ['B', 'B'];
    }
    if (equation >= 0.94) {
        [grade, gradeLazer] = ['A', 'A'];
    }
    if (equation >= 0.98) {
        [grade, gradeLazer] = ['S', 'S'];
    }
    if (equation == 1) {
        [grade, gradeLazer] = ['SS', 'SS'];
    }

    const finalarr: AccGrade = {
        grade,
        gradeLazer,
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
function calcgradeMania(hit300max: number, hit300: number, hit200: number, hit100: number, hit50: number, miss: number) {
    const equation = Math.floor((300 * (hit300max + hit300)) + (200 * hit200) + (100 * hit100) + (50 * hit50)) / Math.floor(300 * (hit300max + hit300 + hit200 + hit100 + hit50 + miss));
    let [grade, gradeLazer] = ['D', 'D'];
    if (equation >= 0.7) {
        [grade, gradeLazer] = ['C', 'C'];
    }
    if (equation >= 0.8) {
        [grade, gradeLazer] = ['B', 'B'];
    }
    if (equation >= 0.9) {
        [grade, gradeLazer] = ['A', 'A'];
    }
    if (equation >= 0.95) {
        [grade, gradeLazer] = ['S', 'S'];
    }
    if (equation == 1) {
        [grade, gradeLazer] = ['SS', 'SS'];
    }
    const finalarr: AccGrade = {
        grade,
        gradeLazer,
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
function toHR(cs: number, ar: number, od: number, hp: number) {

    const hrobj: Values = {
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
function toEZ(cs: number, ar: number, od: number, hp: number) {

    const ezobj: Values = {
        cs: cs / 2 > 10 ? 10 : cs / 2,
        ar: ar / 2 > 10 ? 10 : ar / 2,
        od: od / 2 > 10 ? 10 : od / 2,
        hp: hp / 2 > 10 ? 10 : hp / 2,
    };
    return ezobj;
}

export enum ModsEnum {
    None = 0,
    NoFail = 1,
    Easy = 2,
    TouchDevice = 4,
    Hidden = 8,
    HardRock = 16,
    SuddenDeath = 32,
    DoubleTime = 64,
    Relax = 128,
    HalfTime = 256,
    Nightcore = 512, // Only set along with DoubleTime. i.e: NC only gives 576
    Flashlight = 1024,
    Autoplay = 2048,
    SpunOut = 4096,
    AutoPilot = 8192,
    Perfect = 16384, // Only set along with SuddenDeath. i.e: PF only gives 16416
    Key4 = 32768,
    Key5 = 65536,
    Key6 = 131072,
    Key7 = 262144,
    Key8 = 524288,
    FadeIn = 1048576,
    Random = 2097152,
    Cinema = 4194304,
    Target = 8388608,
    Key9 = 16777216,
    KeyCoop = 33554432,
    Key1 = 67108864,
    Key3 = 134217728,
    Key2 = 268435456,
    ScoreV2 = 536870912,
    Mirror = 1073741824
}
export enum ModShort {
    NM = 0,
    NF = 1,
    EZ = 2,
    TD = 4,
    HD = 8,
    HR = 16,
    SD = 32,
    DT = 64,
    RL = 128,
    HT = 256,
    NC = 512,
    FL = 1024,
    AT = 2048,
    SO = 4096,
    AP = 8192,
    PF = 16384,
    '4K' = 32768,
    '5K' = 65536,
    '6K' = 131072,
    '7K' = 262144,
    '8K' = 524288,
    FI = 1048576,
    RD = 2097152,
    CM = 4194304,
    TP = 8388608,
    '9K' = 16777216,
    CP = 33554432,
    '1K' = 67108864,
    '3K' = 134217728,
    '2K' = 268435456,
    SV2 = 536870912,
    MR = 1073741824
}

/**
 * 
 * @param mods 
 * @returns {int} converts mods to an integer (HDDTHR = 88)
 */
function ModStringToInt(mods: string) {
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
function ModIntToString(modInt: number) {
    let modString = '';
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

function getOrderedMods(): ModsLazer[] {
    return ['EZ', 'HD', 'FI', 'HT', 'DC', 'DT', 'NC', 'HR', 'FL', 'SD', 'PF', 'NF', 'AT', 'CM', 'RL', 'AP', 'TP', 'SO', 'TD', '1K', '2K', '3K', '4K', '5K', '6K', '7K', '8K', '9K', 'CP', 'RD', 'MR', 'V2',
        'BL', 'ST', 'DA', 'CL', 'AL', 'ST', 'TR', 'WI', 'SI', 'GR', 'DF', 'WU', 'WD', 'TR', 'BR', 'AD', 'MU', 'NS', 'MG', 'RP', 'AS', 'FF'
    ];
}
/**
 * 
 * @param modString 
 * @returns reorders mods to be in the correct order and removes duplicates.
 */
function OrderMods(modString: string) {
    const ModsOrder = getOrderedMods(); 
    const modStringArray: ModsLazer[] = modString.toUpperCase().replaceAll(' ', '').replaceAll(',', '').replace(/(.{2})/g, "$1 ")
        .replaceAll('RLX', 'RL')
        .replaceAll('RX', 'RL')
        .replaceAll('AU', 'AT')
        .replaceAll('CN', 'CM')
        .replaceAll('S2', 'V2')
        .split(' ') as ModsLazer[];
    const modStringArrayOrdered: ModsLazer[] = [];
    const modStringArrayOrderedtest: ModsLazer[] = [];
    for (let i = 0; i < ModsOrder.length; i++) {
        for (let j = 0; j < modStringArray.length; j++) {
            if (ModsOrder[i] === modStringArray[j]) {
                modStringArrayOrderedtest.push(modStringArray[j]);
            }
        }
    }
    for (let i = 0; i < modStringArrayOrderedtest.length; i++) {
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
function shortModName(modstring: string) {
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
function longModName(modstring: string) {
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
        .replaceAll('MR', 'Mirror ')
        ;
}

/**
 * checks if any of the mods given are "unranked" (unsubmitted on stable)
 * @param mods shorthand mods name to verify (ie HDDT not hidden double time or 72)
 */
function unrankedMods_stable(mods: string) {
    let val = false;
    const unverifiable: Mods[] = [
        'AT', 'CM', 'RL', 'AP', 'V2', 'TP'
    ];
    val = unverifiable.some(x => mods.includes(x));
    return val;
}

/**
 * checks if any of the mods given are "unranked" (unsubmitted on stable)
 * @param mods shorthand mods name to verify (ie HDDT not hidden double time or 72)
 */
function unrankedMods_lazer(mods: string) {
    const val = false;
    const unverifiable: ModsLazer[] = [
        'AT', 'CM'
    ];
    return val;
}

/**
 * reorders mods to be in the correct order, removes duplicates and mods that don't fit the mode
 * NOTE LAZER MODS ARE IGNORED
 */
export function modHandler(mods: string, mode: 'osu' | 'taiko' | 'fruits' | 'mania') {
    const ModsOrder = getOrderedMods();
    const modStringArray = mods.toUpperCase().replaceAll(' ', '').replaceAll(',', '').replace(/(.{2})/g, "$1 ")
        .replaceAll('RLX', 'RL')
        .replaceAll('RX', 'RL')
        .replaceAll('AU', 'AT')
        .replaceAll('CN', 'CM')
        .replaceAll('S2', 'V2')
        .split(' ');
    const modStringArrayOrdered: ModsLazer[] = [];
    const modStringArrayOrderedtest: ModsLazer[] = [];
    for (let i = 0; i < ModsOrder.length; i++) {
        for (let j = 0; j < modStringArray.length; j++) {
            if (ModsOrder[i] === modStringArray[j]) {
                modStringArrayOrderedtest.push((modStringArray as ModsLazer[])[j]);
            }
        }
    }
    const maniaOnlyMods: ModsLazer[] = ['FI', '1K', '2K', '3K', '4K', '5K', '6K', '7K', '8K', '9K', 'CP', 'RD', 'MR',];
    const standardMods: ModsLazer[] = ['AP', 'TP', 'SO', 'TD',];
    let ignoreMods: ModsLazer[] = [];
    switch (mode) {
        default:
        case 'osu':
            ignoreMods = maniaOnlyMods;
            break;
        case 'taiko': case 'fruits':
            ignoreMods = maniaOnlyMods.concat(standardMods);
            break;
        case 'mania':
            ignoreMods = standardMods;
            break;
    }

    for (const elem of modStringArrayOrderedtest) {
        if (ignoreMods.includes(elem)) {
            const index = modStringArrayOrderedtest.indexOf(elem);
            modStringArrayOrderedtest.splice(index, 1);
        }
    }

    for (let i = 0; i < modStringArrayOrderedtest.length; i++) {
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
function csToRadius(cs: number) {
    return (0.00005556 * cs ** 2 - 4.483 * cs + 54.42);
}

/**
 * 
 * @param radius the radius of the circle
 * @returns cs circle size
 */

function csFromRadius(radius: number) {
    return (5000 / 8104533921) * radius ** 2 - (1808448550 / 8104533921) * radius + (8582285633270972 / 706821088118109);
}

/**
 * calculate values after mods are applied
 */
function calcValues(cs: number, ar: number, od: number, hp: number, bpm: number, length: number, mods: string) {
    let ncs: number = cs;
    let nar: number = ar;
    let nod: number = od;
    let nhp: number = hp;
    let nbpm: number = bpm;
    let nlength: number = length;
    let error: string | boolean = false;
    const nmods = mods.includes('NC') ? mods.toUpperCase().replace('NC', 'DT') : mods.toUpperCase();

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
            } else if (nmods.includes('DT') && nmods.includes('HT')) {
                error = 'DT and HT are not compatible';
            } else {
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

    const obj: Values = {
        cs: +ncs.toFixed(2),
        ar: +nar.toFixed(2),
        od: +nod.toFixed(2),
        hp: +nhp.toFixed(2),
        bpm: +nbpm.toFixed(2),
        length: +nlength.toFixed(2),
        mods,
        error,
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
export function calcValuesAlt(cs: number, ar: number, od: number, hp: number, bpm: number, length: number, speedMult: number) {
    speedMult = (speedMult ?? 1);
    const arMs = ARtoms(ar).ms;
    const odMs = ODtoms(od);
    const nar: number = msToAR(arMs / speedMult).ar;
    const nod: number = msToOD(odMs.hitwindow_300 / speedMult).od_num;
    const nbpm: number = bpm / speedMult;
    const nlength: number = length / speedMult;

    const obj: Values = {
        cs: +cs.toFixed(2),
        ar: +nar.toFixed(2),
        od: +nod.toFixed(2),
        hp: +hp.toFixed(2),
        bpm: +nbpm.toFixed(2),
        length: +nlength.toFixed(2),
        speedMult,
        details: {
            csRadius: csToRadius(cs),
            arMs,
            odMs,
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
function ModeNameToInt(mode: string): number {
    switch (mode) {
        case 'osu!std': case 'std': case 'osu': case 'o': case 'standard':
            return 0;
        case 'osu!taiko': case 'taiko': case 't':
            return 1;
        case 'osu!catch': case 'catch': case 'c': case 'fruits': case 'ctb': case 'catch the beat':
            return 2;
        case 'osu!mania': case 'mania': case 'm':
            return 3;
        default:
            return 0;
    }
}

/**
 * convert an integer into it's corresponding mode name
 */
function ModeIntToName(mode: number): types.GameMode {
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
function checkGrade(string: string, defaultRank?: types.Rank) {
    let grade: types.Rank;

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

export { ARtoms, DoubleTimeAR, HalfTimeAR, ModIntToString, ModStringToInt, ModeIntToName, ModeNameToInt, ODtoms, OrderMods, calcValues, calcgrade, calcgradeCatch, calcgradeMania, calcgradeTaiko, checkGrade, csFromRadius, csToRadius, longModName, msToAR, msToOD, odDT, odHT, shortModName, toEZ, toHR, unrankedMods_lazer, unrankedMods_stable };

/**
 * convert a player's rank into their badge weight seeding rank
 */
export function bws(badges: number, rank: number) {
    return badges > 0 ?
        rank ** (0.9937 ** (badges ** 2)) :
        rank;
}

/**
 * find a player's recommended map difficulty
 * @param pp the player's total performance
 */
export function recdiff(pp: number) {
    return (pp ** 0.4) * 0.195;
}