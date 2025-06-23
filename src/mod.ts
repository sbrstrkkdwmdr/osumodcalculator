import { Mods, types } from ".";
/**
 * Mod acronyms as an enum
 */
export enum ModInts {
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
    CN = 4194304,
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
 * STABLE MODS ONLY
 * 
 * Converts each mod to their enum value and adds them together
 * 
 * example:
 * ```ts
 * const mods = ['EZ', 'HD', 'DT']
 * const modInt = toInt(mods); // => 74
 * ```
 */
export function toInt(mods: types.ModLegacy[]) {
    let modInt = 0;
    const map: [string, number][] = Mods.map(x => [x.acronym, x.enum] as [string, number]).filter(x => x[1] != -1);
    const searchmap = map.map(x => x[0]);
    for (const mod of mods) {
        if (searchmap.includes(mod)) {
            const idx = searchmap.indexOf(mod);
            const v: number = map[idx][1];
            modInt += v;
        }
    }
    return modInt;
}

/**
 * STABLE MODS ONLY
 * 
 * Converts an enum into the acronym of each mod
 * 
 * example:
 * ```ts
 * const modInt = 88;
 * const mods = toString(modInt); // => ['HD','DT','HR'];
 * ```
 */
export function intToAcronym(modInt: number) {
    const mods: types.ModLegacy[] = [];
    for (const mod of Mods) {
        if (mod.enum != -1 && modInt & mod.enum) {
            mods.push(mod.acronym as types.ModLegacy);
        }
    }
    removeIncompatible(mods);
    return mods;
}

/**
 * mod acronyms in order (subjective)
 */
function getOrderedMods(): types.Mod[] {
    return ['EZ', 'HD', 'FI', 'HT', 'DC', 'DT', 'NC', 'HR', 'FL', 'SD', 'PF', 'NF', 'AT', 'CN', 'RX', 'AP', 'TP', 'SO', 'TD', '1K', '2K', '3K', '4K', '5K', '6K', '7K', '8K', '9K', '10K', 'CO', 'RD', 'MR', 'SV2',
        'BL', 'ST', 'DA', 'CL', 'AL', 'ST', 'TR', 'WG', 'SI', 'GR', 'DF', 'WU', 'WD', 'TR', 'BR', 'AD', 'MU', 'NS', 'MG', 'RP', 'AS', 'FF'
    ];
}

/**
 * Converts mod names to their respective acronyms
 * 
 * mods are NOT case sensitive
 * 
 * example:
 * ```ts
 * const mods = ['Fade In', 'Magnetised', 'Single Tap'];
 * const acronyms = nameToAcronym(mods); // => ['FI', 'MG', 'SG']
 * ```
 */
export function nameToAcronym(mods: string[]) {
    mods = mods.map(x => x.toLowerCase());
    const acronyms: types.Mod[] = [];
    const map: [string, types.Mod][] = Mods.map(x => [x.name.toLowerCase(), x.acronym] as [string, types.Mod]);
    const searchmap = map.map(x => x[0]);
    for (const mod of mods) {
        if (searchmap.includes(mod)) {
            const index = searchmap.indexOf(mod);
            acronyms.push(map[index][1]);
        }
    }
    return acronyms;
}

/**
 * Converts mod acronyms to their respective names
 * 
 * mods are NOT case sensitive
 * 
 * example:
 * ```ts
 * const mods = ['ST', 'AC', 'TP'];
 * const acronyms = acronymToName(mods); // => ['Strict Tracking', 'Accuracy Challenge', 'Target Practice']
 * ```
 */
export function acronymToName(mods: types.Mod[]) {
    mods = mods.map(x => x.toUpperCase() as types.Mod);
    const fullnames: types.ModLong[] = [];
    const map: [types.Mod, types.ModLong][] = Mods.map(x => [x.acronym, x.name] as [types.Mod, types.ModLong]);
    const searchmap = map.map(x => x[0]);
    for (const mod of mods) {
        if (searchmap.includes(mod)) {
            const index = searchmap.indexOf(mod);
            fullnames.push(map[index][1]);
        }
    }
    return fullnames;
}

/**
 * remove duplicate mods 
 * 
 * example:
 * ```ts
 * const mods = ['HD', 'DT', 'HR', 'DT'];
 * const fixed = removeDupe(mods); // => ['HD', 'DT', 'HR']
 * ```
 */
export function removeDupe(mods: types.Mod[]) {
    const nodupe: types.Mod[] = [];
    for (const mod of mods) {
        if (!nodupe.includes(mod)) {
            nodupe.push(mod);
        }
    }
    return nodupe;
}

/**
 * orders mods
 * 
 * example: 
 * ```ts
 * const mods = ['DT', 'HR', 'HD',];
 * const fixed = order(mods); // => ['HD','DT','HR']
 * ```
 */
export function order(mods: types.Mod[]) {
    const nt: types.Mod[] = [];
    for (const om of getOrderedMods()) {
        for (const mod of mods) {
            if (om === mod) {
                nt.push(mod);
            }
        }
    }
    return nt;
}

/**
 * get mods not allowed in a given gamemode
 * 
 * TODO: 
 * example:
 * ```ts
 * const mode = 'osu'
 * const ignore_these_mods = disallowed(mods); // => ['FI', '1K', '2K', '3K', '4K', '5K', '6K', '7K', '8K', '9K', 'CP', 'RD', 'MR']
 * ```
 */
export function disallowed(mode: types.GameMode) {
    let ignoreMods: types.Mod[] = [];
    const s: types.Mod[] = [
        'BL', 'ST', 'AP', 'SO', 'TP', 'AL', 'TR', 'WG', 'SI', 'GR', 'DF', 'TC', 'BR', 'AD', 'MG', 'RP', 'FR', 'BU', 'SY', 'DP', 'BM', 'TD',
    ];
    const t: types.Mod[] = [
        'SW'
    ];
    const f: types.Mod[] = [
        'FF'
    ];
    const m: types.Mod[] = [
        'NR', 'FI', 'CO', 'IN', 'HO',
        '1K', '2K', '3K', '4K', '5K', '6K', '7K', '8K', '9K',
    ];
    const st: types.Mod[] = [
        'CL', 'SG'
    ];
    const sf: types.Mod[] = [
        'NS'
    ];
    const stm: types.Mod[] = [
        'RD', 'AS'
    ];
    const sfm: types.Mod[] = [
        'MR'
    ];
    const tm: types.Mod[] = [
        'CS'
    ];
    switch (mode) {
        default:
        case 'osu':
            ignoreMods = t.concat(f).concat(m).concat(tm);
            break;
        case 'taiko':
            ignoreMods = s.concat(f).concat(m).concat(sf).concat(sfm);
            break;
        case 'fruits':
            ignoreMods = s.concat(t).concat(m).concat(st).concat(stm).concat(tm);
            break;
        case 'mania':
            ignoreMods = s.concat(t).concat(f).concat(st).concat(sf);
            break;
    }
    return ignoreMods;
}

/**
 * remove mods from other modes
 * 
 * example:
 * ```ts
 * const mods = ['4K','EZ','FI', 'DT',];
 * const mode = 'osu'
 * const fixed = removeDisallowed(mods); // => ['EZ', 'DT',]
 * ```
 */
export function removeDisallowed(mods: types.Mod[], mode: types.GameMode = 'osu') {
    const ignore = disallowed(mode);
    const nt: types.Mod[] = [];
    for (const mod of mods) {
        if (!ignore.includes(mod)) {
            nt.push(mod);
        }
    }
    return nt;
}

/**
 * removes incompatible mods such as ez+hr
 * 
 * example:
 * ```ts
 * const mods = ['EZ','HD','DT','NC','HR']
 * const fixed = removeIncompatible(mods); // => ['EZ', 'HD', 'DT']
 * ```
 */
export function removeIncompatible(mods: types.Mod[], mode: types.GameMode = 'osu') {
    const ignore: types.Mod[] = [];
    const map = Mods.map(x => x.acronym);

    const fr: types.Mod[] = [];
    for (const mod of mods) {
        if (!ignore.includes(mod)) {
            const idx = map.indexOf(mod);
            for (const ig of Mods[idx].incompatible) {
                if (ig.startsWith('(')) {
                    if (
                        (!ig.includes('!' + mode) && ig.includes(mode)) ||
                        (ig.includes('!') && !ig.includes(mode))
                    ) {
                        ignore.push(ig.split(')')[1] as types.Mod);
                    }
                } else {
                    ignore.push(ig as types.Mod);
                }
            }
            fr.push(mod);
        }
    }
    return fr;
}

/**
 * re-orders, removes duplicates, removes incompabitle
 * 
 * example: 
 * ```ts
 * const mods = ['DT', 'HR', 'HD', 'EZ', '4K','HD'];
 * const mode = 'osu';
 * const fixed = fix(mods, mode); // => ['HD','DT','HR']
 * ```
 */
export function fix(mods: types.Mod[], mode: types.GameMode = 'osu') {
    const nodupe = removeDupe(mods);

    const dr = removeDisallowed(nodupe, mode);

    const inc = removeIncompatible(dr, mode);

    const nt = order(inc);


    return nt;
}