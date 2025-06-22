import { types } from ".";

/**
 * Mods as an enum
 */
export enum ModLong {
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
/**
 * Mod acronyms as an enum
 */
export enum ModAcronyms {
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
    S2 = 536870912,
    MR = 1073741824
}

/**
 * Dictionary of mod acronyms and mods they're incompatible with / cancel out
 */
export const incompatible: types.Dict = {
    'DT': ['NC', 'HT', 'DC'],
    'NC': ['DT', 'HT', 'DC'],
    'HT': ['DT', 'NC', 'DC'],
    'DC': ['DT', 'NC', 'HT',],

    'EZ': ['HR',],
    'HR': ['EZ',],

    'NF': ['SD', 'PF', 'AC'],
    'SD': ['NF', 'PF', 'AC', 'AT', 'CN'],
    'PF': ['SD', 'NF', 'AC', 'AT', 'CN'],
    'AC': ['SD', 'PF', 'NF', 'AT', 'CN'],

    'RL': ['AP', 'SO', 'AT', 'CN'],
    'AP': ['RL', 'SO', 'AT', 'CN'],

    'AT': ['AP', 'SO', 'RL', 'CN', 'SD', 'PF'],
    'CN': ['AP', 'SO', 'AT', 'RL', 'SD', 'PF'],
};

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
    for (const mod of mods) {
        if (Object.keys(ModAcronyms).includes(mod)) {
            // @ts-ignore Element implicitly has an 'any' type because index expression is not of type 'number'.ts(7015)
            const v: number = ModAcronyms[mod];
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
export function toString(modInt: number) {
    let mods: types.ModLegacy[] = [];
    for (const key in ModAcronyms) {
        if (typeof ModAcronyms[key] == 'number' && modInt & ModAcronyms[key]) {
            mods.push(key as types.ModLegacy);
        }
    }
    if (mods.includes('DT') && mods.includes('NC')) {
        const index = mods.indexOf('DT');
        mods.splice(index, 1);
    }
    if (mods.includes('SD') && mods.includes('PF')) {
        const index = mods.indexOf('SD');
        mods.splice(index, 1);
    }
    removeIncompatible(mods);
    return mods;
}

function getOrderedMods(): types.Mod[] {
    return ['EZ', 'HD', 'FI', 'HT', 'DC', 'DT', 'NC', 'HR', 'FL', 'SD', 'PF', 'NF', 'AT', 'CM', 'RL', 'AP', 'TP', 'SO', 'TD', '1K', '2K', '3K', '4K', '5K', '6K', '7K', '8K', '9K', 'CP', 'RD', 'MR', 'V2',
        'BL', 'ST', 'DA', 'CL', 'AL', 'ST', 'TR', 'WI', 'SI', 'GR', 'DF', 'WU', 'WD', 'TR', 'BR', 'AD', 'MU', 'NS', 'MG', 'RP', 'AS', 'FF'
    ];
}
/**
 * TODO: write documentation
 */
function legacy_OrderMods(modString: string) {
    const ModsOrder = getOrderedMods();
    const modStringArray: types.Mod[] = modString.toUpperCase().replaceAll(' ', '').replaceAll(',', '').replace(/(.{2})/g, "$1 ")
        .replaceAll('RLX', 'RL')
        .replaceAll('RX', 'RL')
        .replaceAll('AU', 'AT')
        .replaceAll('CN', 'CM')
        .replaceAll('S2', 'V2')
        .split(' ') as types.Mod[];
    const modStringArrayOrdered: types.Mod[] = [];
    const modStringArrayOrderedtest: types.Mod[] = [];
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
 * TODO: write documentation
 */
export function toAcronym(modstring: string) {
    return legacy_OrderMods(modstring.toLowerCase()
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
 * TODO: write documentation
 */
export function toFullName(modstring: string) {
    return (legacy_OrderMods(modstring).string)
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
 * check if mods are unranked
 */
// export function isUnranked_stable(mods: string) {
//     let val = false;
//     const unverifiable: types.Mod[] = [
//         'AT', 'CM', 'RL', 'AP', 'V2', 'TP'
//     ];
//     val = unverifiable.some(x => mods.includes(x));
//     return val;
// }

/**
 * checks if any of the mods given are "unranked" on lazer
 * this won't be touched bcs rate change might be added at some point
 */
// export function isUnranked(mods: string) {
//     const val = false;
//     const unverifiable: types.Mod[] = [
//         'AT', 'CM'
//     ];
//     return val;
// }

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
 * order mods
 * 
 * TODO: write examples
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
 * example:
 * ```ts
 * const mode = 'osu'
 * const ignore_these_mods = disallowed(mods); // => ['FI', '1K', '2K', '3K', '4K', '5K', '6K', '7K', '8K', '9K', 'CP', 'RD', 'MR']
 * ```
 */
export function disallowed(mode: types.GameMode) {
    let ignoreMods: types.Mod[] = [];
    const maniaOnlyMods: types.Mod[] = ['FI', '1K', '2K', '3K', '4K', '5K', '6K', '7K', '8K', '9K', 'CP', 'RD', 'MR',];
    const standardMods: types.Mod[] = ['AP', 'TP', 'SO', 'TD',];
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
    return ignoreMods;
}

/**
 * remove mods from other modes
 * 
 * example:
 * ```ts
 * const mods = ['4K','EZ','FI', 'DT',];
 * const mode = 'osu'
 * const fixed = disallowedRemove(mods); // => ['EZ', 'DT',]
 * ```
 */
export function disallowedRemove(mods: types.Mod[], mode: types.GameMode) {
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
 * const fixed = removeIncompatible(mods);
 * ```
 */
export function removeIncompatible(mods: types.Mod[]) {
    const nt: {
        acr: types.Mod;
        ignore: boolean;
    }[] = mods.map(x => { return { acr: x, ignore: false }; });

    const fr: types.Mod[] = [];
    for (const mod of nt) {
        if (Object.keys(incompatible).includes(mod.acr) && !mod.ignore) {
            for (const submod of nt) {
                if (incompatible[mod.acr].includes(submod.acr)) {
                    submod.ignore = true;
                }
            }
        }
        if (!mod.ignore) {
            fr.push(mod.acr);
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
export function fix(mods: types.Mod[], mode: types.GameMode) {
    const nodupe = removeDupe(mods);

    const nt = order(nodupe);

    const dr = disallowedRemove(nt, mode);

    return dr;
}