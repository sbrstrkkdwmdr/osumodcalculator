const { OrderMods } = require("./index.cjs");
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
console.log(ModIntToString2('88'));
function ModStringToInt2(mods) {
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
    modInt += mods.toUpperCase().includes('NC') ? 512 : 0;
    modInt += mods.toUpperCase().includes('FL') ? 1024 : 0;
    modInt += mods.toUpperCase().includes('AT') ? 2048 : 0;
    modInt += mods.toUpperCase().includes('SO') ? 4096 : 0;
    modInt += mods.toUpperCase().includes('AP') || mods.toUpperCase().includes('RX2') ? 8192 : 0;
    modInt += mods.toUpperCase().includes('PF') ? 16384 : 0;
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

function ModIntToString2(modInt) {
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



































function ModStringToIntSwitch(mods) {
    let modInt = 0;
    switch (true) {
        case mods.toUpperCase().includes('NF'):
            modInt += 1
            break;
        case mods.toUpperCase().includes('EZ'):
            modInt += 2
            break;
        case mods.toUpperCase().includes('TD'):
            modInt += 4
            break;
        case mods.toUpperCase().includes('HD'):
            modInt += 8
            break;
        case mods.toUpperCase().includes('HR'):
            modInt += 16
            break;
        case mods.toUpperCase().includes('SD'):
            modInt += 32
            break;
        case mods.toUpperCase().includes('DT'):
            modInt += 64
            break;
        case mods.toUpperCase().includes('RX'):
        case mods.toUpperCase().includes('RL'):
        case mods.toUpperCase().includes('RLX'):
            modInt += 128
            break;
        case mods.toUpperCase().includes('HT'):
            modInt += 256
            break;
        case mods.toUpperCase().includes('NC'):
            modInt += 512
            break;
        case mods.toUpperCase().includes('FL'):
            modInt += 1024
            break;
        case mods.toUpperCase().includes('AT'):
            modInt += 2048
            break;
        case mods.toUpperCase().includes('SO'):
            modInt += 4096
            break;
        case mods.toUpperCase().includes('AP'):
        case mods.toUpperCase().includes('RX2'):
            modInt += 8192
            break;
        case mods.toUpperCase().includes('PF'):
            modInt += 16384
            break;
        case mods.toUpperCase().includes('1K'):
            modInt += 67108864
            break;
        case mods.toUpperCase().includes('2K'):
            modInt += 268435456
            break;
        case mods.toUpperCase().includes('3K'):
            modInt += 134217728
            break;
        case mods.toUpperCase().includes('4K'):
            modInt += 32768
            break;
        case mods.toUpperCase().includes('5K'):
            modInt += 65536
            break;
        case mods.toUpperCase().includes('6K'):
            modInt += 131072
            break;
        case mods.toUpperCase().includes('7K'):
            modInt += 262144
            break;
        case mods.toUpperCase().includes('8K'):
            modInt += 524288
            break;
        case mods.toUpperCase().includes('9K'):
            modInt += 16777216
            break;
        case mods.toUpperCase().includes('FI'):
            modInt += 1048576
            break;
        case mods.toUpperCase().includes('RDM'):
            modInt += 2097152
            break;
        case mods.toUpperCase().includes('CN'):
            modInt += 4194304
            break;
        case mods.toUpperCase().includes('TP'):
            modInt += 8388608
            break;
        case mods.toUpperCase().includes('KC'):
            modInt += 33554432
            break;
        case mods.toUpperCase().includes('SV2'):
        case mods.toUpperCase().includes('S2'):
            modInt += 536870912
            break;
        case mods.toUpperCase().includes('MR'):
            modInt += 1073741824
            break;
        default:
            break;
    }
    return modInt;
}

/**
 * 
 * @param {*} modInt 
 * @returns converts mod integers to a string (88 = HDDTHR)
 */
function ModIntToStringSwitch(modInt) {
    let modString = '';
    switch (true) {
        case modInt & 1:
            modString += 'NF'
            break;
        case modInt & 2:
            modString += 'EZ'
            break;
        case modInt & 4:
            modString += 'TD'
            break;
        case modInt & 8:
            modString += 'HD'
            break;
        case modInt & 16:
            modString += 'HR'
            break;
        case modInt & 32:
            modString += 'SD'
            break;
        case modInt & 64:
            modString += 'DT'
            break;
        case modInt & 128:
            modString += 'RX'
            break;
        case modInt & 256:
            modString += 'HT'
            break;
        case modInt & 512:
            modString += 'NC'
            break;
        case modInt & 1024:
            modString += 'FL'
            break;
        case modInt & 2048:
            modString += 'AT'
            break;
        case modInt & 4096:
            modString += 'SO'
            break;
        case modInt & 8192:
            modString += 'AP'
            break;
        case modInt & 16384:
            modString += 'PF'
            break;
        case modInt & 67108864:
            modString += '1K'
            break;
        case modInt & 268435456:
            modString += '2K'
            break;
        case modInt & 134217728:
            modString += '3K'
            break;
        case modInt & 32768:
            modString += '4K'
            break;
        case modInt & 65536:
            modString += '5K'
            break;
        case modInt & 131072:
            modString += '6K'
            break;
        case modInt & 262144:
            modString += '7K'
            break;
        case modInt & 524288:
            modString += '8K'
            break;
        case modInt & 16777216:
            modString += '9K'
            break;
        case modInt & 1048576:
            modString += 'FI'
            break;
        case modInt & 2097152:
            modString += 'RDM'
            break;
        case modInt & 4194304:
            modString += 'CN'
            break;
        case modInt & 8388608:
            modString += 'TP'
            break;
        case modInt & 33554432:
            modString += 'KC'
            break;
        case modInt & 536870912:
            modString += 'SV2'
            break;
        case modInt & 1073741824:
            modString += 'MR'
            break;
        default:
            break;
    }
    if (modString.includes('DT') && modString.includes('NC')) {
        modString = modString.replace('DT', '')
    }
    if (modString.includes('SD') && modString.includes('PF')) {
        modString = modString.replace('SD', '')
    }
    return modString;
}
