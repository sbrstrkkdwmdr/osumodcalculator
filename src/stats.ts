import { types } from ".";

/**
 * Get hit windows for an Overall Difficulty (accuracy) value (standard)
 * 
 * example:
 * ```ts
 * const ms = ToMsOd(9);
 * // => { 
   // hitwindow_300: 25.5, 
   // hitwindow_100: 67.5, 
   // hitwindow_50: 109.5 
   // }
 * ```
 */
export function ToMsOd(od: number) {
    const rangeobj = {
        hitwindow_300: 79 - (od * 6) + 0.5,
        hitwindow_100: 139 - (od * 8) + 0.5,
        hitwindow_50: 199 - (od * 10) + 0.5,
    };
    return rangeobj;
}
/**
 * convert approach rate to milliseconds
 * 
 * example:
 * ```ts
 * const ms = ToMsAr(9); // => 9
 * ```
 */
function ToMsAr(ar: number) {
    const ogtoms = ar > 5 ? 1200 - (((ar - 5) * 10) * 15) : 1800 - (((ar) * 10) * 12);
    return ogtoms;
}
/**
 * convert hit window timings into an Overall Difficulty (accuracy) value
 * 
 * if a hitwindow is missing, either replace it with NaN, null or undefined
 * 
 * example:
 * ```ts
 * const hitWindow_300s = 25.5;
 * const hitWindow_100s = 67.5;
 * const hitWindow_50s = 109.5;
 * 
 * const first = FromMsOd(hitWindow_300s); // 9
 * const second = FromMsOd(NaN, hitWindow_100s); // 9
 * const third = FromMsOd(NaN, NaN, hitWindow_50s); // 9
 * ```
 */
export function FromMsOd(hitwindow300: number, hitwindow100?: number, hitwindow50?: number) {
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
    return ToMsOd(+od);
}
/**
 * calculate approach rate from milliseconds
 * 
 * example:
 * ```ts
 * const ar = FromMsAr(600); // 9
 * ```
 */
export function FromMsAr(ms: number) {
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
    return ar;


}

/**
 * calculate approach rate with Double Time applied
 * 
 * example:
 * ```ts
 * const oldAr = 9;
 * const newAr = ToDtAr(oldAr); 
 * // => {
 * // ar: 10.33
 * // ms: 400
 * // }
 * ```
 */
export function ToDtAr(ar: number) {
    /*     if (ar > 5) {
            ms = 200 + (11 - ar) * 100;
        }
        else {
            ms = 800 + (5 - ar) * 80;
        } */
    const ogtoms = ar > 5 ? 1200 - ((ar - 5) * 10 * 15) : 1800 - ((ar * 10) * 12);
    const ms = ogtoms * (2 / 3);
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
    const arobj = {
        ar: newAR,
        ms: ms,
    };
    return arobj;
}

/**
 * calculate approach rate with Half Time applied
 * 
 * example:
 * ```ts
 * const oldAr = 9;
 * const newAr = ToHtAr(oldAr); 
 * // => {
 * // ar: 7.67
 * // ms: 800
 * // }
 * ```
 */
export function ToHtAr(ar: number) {
    let newAR: number;

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
    const arobj = {
        ar: newAR,
        ms: ms,
    };
    return arobj;
}

/**
 * calculate Overall Difficulty (accuracy) with Double Time applied
 * 
 * example:
 * ```ts
 * const oldOd = 9;
 * const newOd = ToDtOd(oldOd); 
 * // => {
 * // hitwindow_300: 17,
 * // hitwindow_100: 45,
 * // hitwindow_50: 73,
 * // od_num: 10.42,
 * // }
 * ```
 */
export function ToDtOd(od: number) {
    const range300 = ((79 - (od * 6) + 0.5) * 2 / 3) + 0.33;
    const odobj = {
        hitwindow_300: range300,
        hitwindow_100: ((139 - (od * 8) + 0.5) * 2 / 3) + 0.33,
        hitwindow_50: ((199 - (od * 10) + 0.5) * 2 / 3) + 0.33,
        od: +((79.5 - range300) / 6).toFixed(2) > 11 ? 11 : +((79.5 - range300) / 6)
    };

    return odobj;

}
/**
 * calculate Overall Difficulty (accuracy) with Half Time applied
 * 
 * example:
 * ```ts
 * const oldOd = 9;
 * const newOd = ToHtOd(oldOd); 
 * // => {
 * // hitwindow_300: 34,
 * // hitwindow_100: 90,
 * // hitwindow_50: 146,
 * // od_num: 7.58,
 * // }
 * ```
 */
export function ToHtOd(od: number) {
    const range300 = ((79 - (od * 6) + 0.5) * 4 / 3) + 0.66;
    const odobj = {
        hitwindow_300: range300,
        hitwindow_100: ((139 - (od * 8) + 0.5) * 4 / 3) + 0.66,
        hitwindow_50: ((199 - (od * 10) + 0.5) * 4 / 3) + 0.66,
        od: +((79.5 - range300) / 6).toFixed(2) > 11 ? 11 : +((79.5 - range300) / 6)
    };

    return odobj;
}



/**
 * calculate values with hard rock applied
 * 
 * example:
 * ```ts
 * const baseCS = 4;
 * const baseAR = 9.8;
 * const baseOD = 9.1;
 * const baseHP = 5;
 * 
 * const modded = toEZ(baseCS, baseAR, baseOD, baseHP);
 * // => { 
 * // cs: 5.2
 * // ar: 10
 * // od: 10
 * // hp: 7
 * // }
 * ```
 */
export function toHR(cs: number, ar: number, od: number, hp: number) {

    const hrobj = {
        cs: cs * 1.3 > 10 ? 10 : cs * 1.3,
        ar: ar * 1.4 > 10 ? 10 : ar * 1.4,
        od: od * 1.4 > 10 ? 10 : od * 1.4,
        hp: hp * 1.4 > 10 ? 10 : hp * 1.4,
    };
    return hrobj;
}

/**
 * calculate values with hard rock applied
 * 
 * example:
 * ```ts
 * const baseCS = 4;
 * const baseAR = 9.8;
 * const baseOD = 9.1;
 * const baseHP = 5;
 * 
 * const modded = toEZ(baseCS, baseAR, baseOD, baseHP);
 * // => { 
 * // cs: 2
 * // ar: 4.9
 * // od: 4.55
 * // hp: 2.5
 * // }
 * ```
 */
export function toEZ(cs: number, ar: number, od: number, hp: number) {

    const ezobj = {
        cs: cs / 2 > 10 ? 10 : cs / 2,
        ar: ar / 2 > 10 ? 10 : ar / 2,
        od: od / 2 > 10 ? 10 : od / 2,
        hp: hp / 2 > 10 ? 10 : hp / 2,
    };
    return ezobj;
}

/**
 * get the radius of the circle (in pixels)
 * 
 * example:
 * ```ts
 * const radius = csToRadius(5); // => 32.006
 * ```
 */
export function csToRadius(cs: number) {
    return (0.00005556 * cs ** 2 - 4.483 * cs + 54.42);
}

/**
 * radius to circle size
 * 
 * example:
 * ```ts
 * const radius = 32.01; // in pixels
 * const circleSize = csFromRadius(radius); // => 5
 */

export function csFromRadius(radius: number) {
    return (5000 / 8104533921) * radius ** 2 - (1808448550 / 8104533921) * radius + (8582285633270972 / 706821088118109);
}

/**
 * calculate stats with speed applied
 * 
 * using DT or HT will apply 1.5 and 0.75 speed, respectively.
 * 
 * TODO: write examples
 */
export function speed(i: 'DT' | 'HT' | number, stats: {
    ar: number,
    od: number,
    bpm: number,
    song_length: number,
}) {
    if (!i) {
        i = 1.0;
    }
    if (typeof i == 'string') {
        switch (i) {
            case "DT":
                i = 1.5;
                break;
            case "HT":
                i = 0.75;
                break;
        }
    }
    const modAr = ToMsAr(stats.ar) / i;
    const modOd = ToMsOd(stats.od);
    modOd.hitwindow_300 /= i;
    modOd.hitwindow_100 /= i;
    modOd.hitwindow_50 /= i;

    const modBpm = stats.bpm / i;
    const modSl = stats.song_length / i;
    return {
        ar: FromMsAr(modAr),
        od: FromMsOd(modOd.hitwindow_300),
        bpm: modBpm,
        song_length: modSl,
        extra: {
            arMs: modAr,
            odMs: modOd,
        }
    };
}

/**
 * calculate values with mods applied
 * 
 * if custom speed is unused then the speed from any given mods will be used (DT, HT etc.)
 * 
 * TODO: write examples
 */
export function modded(stats: {
    cs: number,
    ar: number,
    od: number,
    hp: number,
    bpm: number,
    song_length: number,
},
    mods: types.ApiMod[] | types.Mod[],
    customSpeed?: number,
) {
    if (mods.length == 0) {
        if (!customSpeed || customSpeed == 1) {
            return {
                cs: stats.cs,
                ar: stats.ar,
                od: stats.od,
                hp: stats.hp,
                bpm: stats.bpm,
                song_length: stats.song_length,
                extra: {
                    csRadius: csToRadius(stats.cs),
                    arMs: ToMsAr(stats.ar),
                    odMs: ToMsOd(stats.od),
                }
            };
        }
        const modAr = ToMsAr(stats.ar) / customSpeed;
        const modOd = ToMsOd(stats.od);
        modOd.hitwindow_300 /= customSpeed;
        modOd.hitwindow_100 /= customSpeed;
        modOd.hitwindow_50 /= customSpeed;

        const modBpm = stats.bpm / customSpeed;
        const modSl = stats.song_length / customSpeed;
        return {
            cs: stats.cs,
            ar: FromMsAr(modAr),
            od: FromMsOd(modOd.hitwindow_300),
            hp: stats.hp,
            bpm: modBpm,
            song_length: modSl,
            extra: {
                csRadius: csToRadius(stats.cs),
                arMs: modAr,
                odMs: modOd,
            }
        };
    }
    let modCs = stats.cs;
    let modArMs = ToMsAr(stats.ar);
    let modOdMs = ToMsOd(stats.od);
    let modHp = stats.hp;
    let modBpm = stats.bpm;
    let modSl = stats.song_length;

    if (typeof mods[0] == 'string') {
        mods = mods as types.Mod[];

        if (mods.includes('HR')) {
            modCs *= 1.3;
            modArMs = ToMsAr(stats.ar * 1.4);
            modOdMs = ToMsOd(stats.od * 1.4);
            modHp *= 1.4;
        } else if (mods.includes('EZ')) {
            modCs /= 2;
            modArMs = ToMsAr(stats.ar / 2);
            modOdMs = ToMsOd(stats.od / 2);
            modHp /= 2;
        }

        if (!customSpeed) {
            if (mods.includes('DT') || mods.includes('NC')) customSpeed = 1.5;
            if (mods.includes('HT') || mods.includes('DC')) customSpeed = 0.75;
        }
    } else {
        mods = mods as types.ApiMod[];
        const modacrs = mods.map(x => x.acronym);

        if (modacrs.includes('HR')) {
            modCs *= 1.3;
            modArMs = ToMsAr(stats.ar * 1.4);
            modOdMs = ToMsOd(stats.od * 1.4);
            modHp *= 1.4;
        } else if (modacrs.includes('EZ')) {
            modCs /= 2;
            modArMs = ToMsAr(stats.ar / 2);
            modOdMs = ToMsOd(stats.od / 2);
            modHp /= 2;
        }

        if (!customSpeed) {
            for (const mod of mods) {
                if (mod?.settings?.speed_change) {
                    customSpeed = mod?.settings?.speed_change;
                }
            }
        }

        if (!customSpeed) {
            if (modacrs.includes('DT') || modacrs.includes('NC')) customSpeed = 1.5;
            if (modacrs.includes('HT') || modacrs.includes('DC')) customSpeed = 0.75;
        }
    }

    if (customSpeed) {
        modArMs /= customSpeed;
        modOdMs.hitwindow_300 /= customSpeed;
        modOdMs.hitwindow_100 /= customSpeed;
        modOdMs.hitwindow_50 /= customSpeed;
        modBpm /= customSpeed;
        modSl /= customSpeed;
    }

    return {
        cs: stats.cs,
        ar: FromMsAr(modArMs),
        od: FromMsOd(modOdMs.hitwindow_300),
        hp: stats.hp,
        bpm: modBpm,
        song_length: modSl,
        extra: {
            csRadius: csToRadius(stats.cs),
            arMs: modArMs,
            odMs: modOdMs,
        }
    };
}