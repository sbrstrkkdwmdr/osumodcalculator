use std::str
use std::to_ascii_uppercase

pub struct ArObj {
    ar: f64,
    ms: i32,
}
fn ARDT(ar: f32) -> ArObj{
    let ms = if ar > 5 { 200 + (11 - ar) * 100} else { 800 + (5 - ar) * 80};
    let newAr;
    if ms < 300 {
        newAr = 11
    }
    else if ms < 1200 {
        newAr = ((11 - (ms - 300) / 150) * 100) / 100;
    } else {
        newAr = ((5 - (ms - 1200)/120)*100)/100;
    }
    let ArAsObj = ArObj {
        ar: newAr,
        ms: ms,
    };

    return ArAsObj
}

fn ModStringToInt(mods: str) -> i32{
    let modInt = 0
    let modparse = to_ascii_uppercase(mods);
    modInt += if modparse::contains("NF") {1} else {0}
    modInt +=if modparse::contains("EZ") {2} else {0}
    modInt += if modparse::contains("TD") {4} else {0}
    modInt += if modparse::contains("HD") {8} else {0}
     modInt +=if modparse::contains("HR") {16} else {0}
     modInt +=if modparse::contains("SD") {32} else {0}
     modInt +=if modparse::contains("DT") {64} else {0}
     modInt +=if modparse::contains("RX") {128} else {0}
     modInt +=if modparse::contains("HT") {256} else {0}
     modInt +=if modparse::contains("NC") {512} else {0}
     modInt +=if modparse::contains("FL") {1024} else {0}
   modInt +=  if modparse::contains("AT") {2048} else {0}
     modInt +=if modparse::contains("SO") {4096} else {0}
    modInt += if modparse::contains("AP") {8192} else {0}
    modInt += if modparse::contains("PF") {16384} else {0}
    modInt += if modparse::contains("1K") {67108864} else {0}
    modInt += if modparse::contains("2K") {268435456} else {0}
   modInt +=  if modparse::contains("3K") {134217728} else {0}
   modInt +=  if modparse::contains("4K") {32768} else {0}
   modInt +=  if modparse::contains("5K") {65536} else {0}
   modInt +=  if modparse::contains("6K") {131072} else {0}
   modInt +=  if modparse::contains("7K") {262144} else {0}
   modInt +=  if modparse::contains("8K") {524288} else {0}
   modInt +=  if modparse::contains("9K") {16777216} else {0}
   modInt +=  if modparse::contains("FI") {1048576} else {0}
   modInt +=  if modparse::contains("RDM") {2097152} else {0}
   modInt +=  if modparse::contains("CN") {4194304} else {0}
   modInt +=  if modparse::contains("TP") {8388608} else {0}
   modInt +=  if modparse::contains("KC") {33554432} else {0}
   modInt +=  if modparse::contains("SV2") {536870912} else {0}
   modInt +=  if modparse::contains("MR") {1073741824} else {0}
    return modInt;
}
//fn thats the reverse of the above
fn ModIntToString(modInt: i64) -> str {
    let modString = '';
    modString += if modInt & 1 == 1 {'NF'} else {''}
    modString += if modInt & 2 == 2 {'EZ'} else {''}
    modString += if modInt & 4 == 4 {'TD'} else {''}
    modString += if modInt & 8 == 8 {'HD'} else {''}
    modString += if modInt & 16 == 16 {'HR'} else {''}
    modString += if modInt & 32 == 32 {'SD'} else {''}
    modString += if modInt & 64 == 64 {'DT'} else {''}
    modString += if modInt & 128 == 128 {'RX'} else {''}
    modString += if modInt & 256 == 256 {'HT'} else {''}
    modString += if modInt & 512 == 512 {'NC'} else {''}
    modString += if modInt & 1024 == 1024 {'FL'} else {''}
    modString += if modInt & 2048 == 2048 {'AT'} else {''}
    modString += if modInt & 4096 == 4096 {'SO'} else {''}
    modString += if modInt & 8192 == 8192 {'AP'} else {''}
    modString += if modInt & 16384 == 16384 {'PF'} else {''}
    modString += if modInt & 67108864 == 67108864 {'1K'} else {''}
    modString += if modInt & 268435456 == 268435456 {'2K'} else {''}
    modString += if modInt & 134217728 == 134217728 {'3K'} else {''}
    modString += if modInt & 32768 == 32768 {'4K'} else {''}
    modString += if modInt & 65536 == 65536 {'5K'} else {''}
    modString += if modInt & 131072 == 131072 {'6K'} else {''}
    modString += if modInt & 262144 == 262144 {'7K'} else {''}
    modString += if modInt & 524288 == 524288 {'8K'} else {''}
    modString += if modInt & 16777216 == 16777216 {'9K'} else {''}
    modString += if modInt & 1048576 == 1048576 {'FI'} else {''}
    modString += if modInt & 2097152 == 2097152 {'RDM'} else {''}
    modString += if modInt & 4194304 == 4194304 {'CN'} else {''}
    modString += if modInt & 8388608 == 8388608 {'TP'} else {''}
    modString += if modInt & 33554432 == 33554432 {'KC'} else {''}
    modString += if modInt & 536870912 == 536870912 {'SV2'} else {''}
    modString += if modInt & 1073741824 == 1073741824 {'MR'} else {''}
    return modString;
}

fn OrderMods(mods: str) -> str {
    let ModsOrder = ['AT', 'RX', 'AP', 'TP', 'SO', 'EZ', 'HD', 'HT', 'DT', 'NC', 'HR', 'SD', 'PF', 'FL', 'NF']
    let inputasarray = mods.split(' ');
}
