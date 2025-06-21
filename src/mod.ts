import { types } from ".";
import { ModsLazer } from "./types";

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
 */
export function toInt(mods: string) {
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
 * STABLE MODS ONLY
 */
export function toString(modInt: number) {
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

function getOrderedMods(): types.ModsLazer[] {
    return ['EZ', 'HD', 'FI', 'HT', 'DC', 'DT', 'NC', 'HR', 'FL', 'SD', 'PF', 'NF', 'AT', 'CM', 'RL', 'AP', 'TP', 'SO', 'TD', '1K', '2K', '3K', '4K', '5K', '6K', '7K', '8K', '9K', 'CP', 'RD', 'MR', 'V2',
        'BL', 'ST', 'DA', 'CL', 'AL', 'ST', 'TR', 'WI', 'SI', 'GR', 'DF', 'WU', 'WD', 'TR', 'BR', 'AD', 'MU', 'NS', 'MG', 'RP', 'AS', 'FF'
    ];
}
/**
 * 
 * @param modString 
 * @returns reorders mods to be in the correct order and removes duplicates.
 */
export function OrderMods(modString: string) {
    const ModsOrder = getOrderedMods();
    const modStringArray: types.ModsLazer[] = modString.toUpperCase().replaceAll(' ', '').replaceAll(',', '').replace(/(.{2})/g, "$1 ")
        .replaceAll('RLX', 'RL')
        .replaceAll('RX', 'RL')
        .replaceAll('AU', 'AT')
        .replaceAll('CN', 'CM')
        .replaceAll('S2', 'V2')
        .split(' ') as types.ModsLazer[];
    const modStringArrayOrdered: types.ModsLazer[] = [];
    const modStringArrayOrderedtest: types.ModsLazer[] = [];
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
export function toAcronym(modstring: string) {
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
 */
export function toFullName(modstring: string) {
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
 * check if mods are unranked
 */
export function isUnranked_stable(mods: string) {
    let val = false;
    const unverifiable: types.Mods[] = [
        'AT', 'CM', 'RL', 'AP', 'V2', 'TP'
    ];
    val = unverifiable.some(x => mods.includes(x));
    return val;
}

/**
 * checks if any of the mods given are "unranked" on lazer
 * this won't be touched bcs rate change might be added at some point
 */
export function isUnranked(mods: string) {
    const val = false;
    const unverifiable: ModsLazer[] = [
        'AT', 'CM'
    ];
    return val;
}

/**
 * remove duplicate mods 
 */
export function removeDupe(mods: types.ModsLazer[]) {
    const nodupe: types.ModsLazer[] = [];
    for (const mod of mods) {
        if (!nodupe.includes(mod)) {
            nodupe.push(mod);
        }
    }
    return nodupe;
}

/**
 * order mods
 */
export function order(mods: types.ModsLazer[]) {
    const nt: types.ModsLazer[] = [];
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
 */
export function disallowed(mode: types.GameMode) {
    let ignoreMods: types.ModsLazer[] = [];
    const maniaOnlyMods: types.ModsLazer[] = ['FI', '1K', '2K', '3K', '4K', '5K', '6K', '7K', '8K', '9K', 'CP', 'RD', 'MR',];
    const standardMods: types.ModsLazer[] = ['AP', 'TP', 'SO', 'TD',];
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
 * remove mods from other modes and incompatible mods such as ez+hr
 */
export function disallowedRemove(mods: types.ModsLazer[], mode: types.GameMode) {
    const ignore = disallowed(mode);
    const nt: {
        acr: types.ModsLazer;
        ignore: boolean;
    }[] = [];
    for (const mod of mods) {
        if (!ignore.includes(mod)) {
            nt.push({ acr: mod, ignore: false });
        }
    }
    const fr: types.ModsLazer[] = [];
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
 * order, removes duplicates, removes incompabitle
 */
export function handle(mods: types.ModsLazer[], mode: types.GameMode) {
    const nodupe = removeDupe(mods);

    const nt = order(nodupe);

    const dr = disallowedRemove(nt, mode);

    return dr;
}