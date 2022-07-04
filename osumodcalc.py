import math

# approach rate object
class ApproachObj:
    def __init__(self, ar: float, ms: int):
        self.ms = ms
        self.ar = ar

# overall difficulty object
class OdObj:
    def __init__(self, range300: float, range100: float, range50: float, od: float):
        self.range300 = range300
        self.range100 = range100
        self.range50 = range50
        self.od = od

# grade and acc object
class GradeObj:
    def __init__(self, grade: str, accuracy: float):
        self.grade = grade
        self.accuracy = accuracy

# map value object
class MapValueObj:
    def __init__(self, cs: float, ar: float, od: float, hp: float):
        self.cs = cs
        self.ar = ar
        self.od = od
        self.hp = hp


# convert approach rate to double time
def DoubleTimeAR(ar: float):
    ms = 0
    if ar > 5:
        ms = 200 + (11 - ar) * 100
    else:
        ms = 800 + (5 - ar) * 80

    if ms < 300:
        newAR = 11
    elif ms < 1200:
        newAR = round((11 - (ms - 300) / 150) * 100) / 100
    else:
        newAR = round((5 - (ms - 1200) / 120) * 100) / 100

    approach = ApproachObj(ms, newAR)
    return approach

# convert approach rate to half time
def HalfTimeAR(ar: float):
    if ar > 5:
        fms = 1200 - (((ar-5) * 10)*15)
    else:
        fms = 1800 - (((ar)*10)*12)

    ms = fms * (4/3)

    if ms < 300:
        newAR = 11
    elif ms < 1200:
        newAR = round((11 - (ms - 300) / 150) * 100) / 100
    else:
        newAR = round((5 - (ms - 1200) / 120) * 100) / 100

    approach = ApproachObj(ms, newAR)
    return approach

# convert approach rate to milliseconds
def ARtoms(ar: float):
    if ar > 5:
        return 1200 - (((ar-5) * 10)*15)
    else:
        return 1800 - (((ar)*10)*12)

# convert milliseconds to approach rate
def msToAR(ms: int):
    if ms < 300:
        ar = 11
    elif ms < 1200:
        ar = round((11 - (ms - 300) / 150) * 100) / 100

    else:
        ar = round((5 - (ms - 1200) / 120) * 100) / 100
    return ar

# convert overall difficulty to milliseconds
def ODtoms(od: float):
    rangeobj = OdObj(
        79 - (od*6)+0.5,
        139-(od*8)+0.5,
        199-(od*10)+0.5,
        od
    )
    return rangeobj

# convert milliseconds to overall difficulty
def msToOD(range300: float, range100: float, range50: float):
    if ~math.isnan(range300):
        od = (((79.5 - range300) / 6) + 0.5)
    elif ~math.isnan(range100):
        od = (((139.5 - range100) / 8) + 0.5)
    elif ~math.isnan(range50):
        od = (((199.5 - range50) / 10) + 0.5)
    else:
        od = '???'
    return od


# convert overall difficulty to double time
def odDT(od: float):
    rangeobj = OdObj(
        (79-(od*6)+0.5)*2/3,
        (139-(od*8)+0.5)*2/3,
        (199-(od*10)+0.5)*2/3,
        od * 4/3
    )
    return rangeobj


# convert overall difficulty to half time
def odHT(od: float):
    rangeobj = OdObj(
        (79-(od*6)+0.5)*4/3,
        (139-(od*8)+0.5)*4/3,
        (199-(od*10)+0.5)*4/3,
        od * 2/3,
    )
    return rangeobj


# calculate accuracy and grade for osu! standard
def osuGrade(hit300: int, hit100: int, hit50: int, miss: int):
    if hit300 == 0 and hit100 == 0 and hit50 == 0 and miss == 0:
        return GradeObj('Error - no hits', math.nan)
    totalhits = hit300 + hit100 + hit50 + miss
    accuracy = (hit300 * 300 + hit100 * 100 + hit50 * 50) / (300*totalhits)
    grade = 'D'
    if (hit300/totalhits > 0.6 and miss == 0) or hit300/totalhits > 0.7:
        grade = 'C'
    if (hit300/totalhits > 0.7 and miss == 0) or hit300/totalhits > 0.8:
        grade = 'B'
    if (hit300/totalhits > 0.8 and miss == 0) or hit300/totalhits > 0.9:
        grade = 'A'
    if hit300/totalhits > 0.9 and miss == 0 and hit50/totalhits < 0.01:
        grade = 'S'
    if hit100 == 0 and hit50 == 0 and miss == 0:
        grade = 'SS'
    return GradeObj(grade, accuracy)

# calculate accuracy and grade for taiko
def taikoGrade(hit300: int, hit100: int, miss: int):
    if hit300 == 0 and hit100 == 0 and miss == 0:
        return GradeObj('Error - no hits', math.nan)
    totalhits = hit300 + hit100 + miss
    accuracy = (hit300 + (hit100/2)) / (totalhits)
    grade = 'https://osu.ppy.sh/wiki/en/FAQ#grades'
    if accuracy > 0.8:
        grade = 'B'
    if accuracy > 0.9:
        grade = 'A'
    if accuracy > 0.95:
        grade = 'S'
    if hit100 == 0 and miss == 0:
        grade = 'SS'
    return GradeObj(grade, accuracy)

# calculate accuracy and grade for catch the beat
def ctbGrade(hit300: int, hitkatu: int, hit100: int, hit50: int, miss: int):
    if hit300 == 0 and hitkatu == 0 and hit100 == 0 and hit50 == 0 and miss == 0:
        return GradeObj('Error - no hits', math.nan)
    totalhits = hit300 + hitkatu + hit100 + hit50 + miss
    accuracy = (hit300 + hit100 + hit50) / (totalhits)
    grade = 'D'
    if accuracy > 0.85:
        grade = 'C'
    if accuracy > 0.9:
        grade = 'B'
    if accuracy > 0.94:
        grade = 'A'
    if accuracy > 0.98:
        grade = 'S'
    if accuracy == 1:
        grade = 'SS'
    return GradeObj(grade, accuracy)

# calculate accuracy and grade for mania
def maniaGrade(hitgeki:int, hit300: int, hitkatu: int, hit100: int, hit50: int, miss: int):
    if hitgeki == 0 and hit300 == 0 and hitkatu == 0 and hit100 == 0 and hit50 == 0 and miss == 0:
        return GradeObj('Error - no hits', math.nan)
    totalhits = hitgeki + hit300 + hitkatu + hit100 + hit50 + miss
    accuracy = ((300 * (hitgeki + hit300)) + (200 * hitkatu) + (100 * hit100) + (50 * hit50)) / (300 * totalhits)
    grade = 'D'
    if accuracy > 0.7:
        grade = 'C'
    if accuracy > 0.8:
        grade = 'B'
    if accuracy > 0.9:
        grade = 'A'
    if accuracy > 0.95:
        grade = 'S'
    if accuracy == 1:
        grade = 'SS'
    return GradeObj(grade, accuracy)

# convert map values to hardrock
def ToHR(cs:float, ar:float, od:float, hp:float):
    return MapValueObj(
        cs*1.3 if cs < 10 else 10,
        ar*1.4 if ar < 10 else 10,
        od*1.4 if od < 10 else 10,
        hp*1.4 if hp < 10 else 10
    )

# convert map values to easy
def ToEZ(cs:float, ar:float, od:float, hp:float):
    return MapValueObj(
        cs/2,
        ar/2,
        od/2,
        hp/2
    )

# convert shorthand mods to their repsective integer value
def modsToInt(mods:str):
    modInt = 0
    if 'NF' in mods:
        modInt += 1
    if 'EZ' in mods:
        modInt += 2
    if 'TD' in mods:
        modInt += 4
    if 'HD' in mods:
        modInt += 8
    if 'HR' in mods:
        modInt += 16
    if 'SD' in mods:
        modInt += 32
    if 'DT' in mods:
        modInt += 64
    if 'RX' in mods or 'RL' in mods or 'RLX' in mods:
        modInt += 128
    if 'HT' in mods:
        modInt += 256
    if 'NC' in mods:
        modInt += 512
    if 'FL' in mods:
        modInt += 1024
    if 'AT' in mods or 'AU' in mods:
        modInt += 2048
    if 'SO' in mods:
        modInt += 4096
    if 'AP' in mods or 'RX2' in mods:
        modInt += 8192
    if 'PF' in mods:
        modInt += 16384
    if '4K' in mods:
        modInt += 32768
    if '5K' in mods:
        modInt += 65536
    if '6K' in mods:
        modInt += 131072
    if '7K' in mods:
        modInt += 262144
    if '8K' in mods:
        modInt += 524288
    if 'FI' in mods:
        modInt += 1048576
    if 'RDM' in mods:
        modInt += 2097152
    if 'CN' in mods:
        modInt += 4194304
    if 'TP' in mods:
        modInt += 8388608
    if '9K' in mods:
        modInt += 16777216
    if 'KC' in mods:
        modInt += 33554432
    if '1K' in mods:
        modInt += 67108864
    if '3K' in mods:
        modInt += 134217728
    if '2K' in mods:    
        modInt += 268435456
    if 'SV2' in mods or 'S2' in mods:
        modInt += 536870912
    if 'MR' in mods:
        modInt += 1073741824

    return modInt

# do the opposite of modsToInt
def intToMods(modInt:int):
    mods = ''
    if modInt & 1:
        mods += 'NF'
    if modInt & 2:
        mods += 'EZ'
    if modInt & 4:
        mods += 'TD'
    if modInt & 8:
        mods += 'HD'
    if modInt & 16:
        mods += 'HR'
    if modInt & 32:
        mods += 'SD'
    if modInt & 64:
        mods += 'DT'
    if modInt & 128:
        mods += 'RX'
    if modInt & 256:
        mods += 'HT'
    if modInt & 512:
        mods += 'NC'
    if modInt & 1024:
        mods += 'FL'
    if modInt & 2048:
        mods += 'AT'
    if modInt & 4096:
        mods += 'SO'
    if modInt & 8192:
        mods += 'AP'
    if modInt & 16384:
        mods += 'PF'
    if modInt & 32768:
        mods += '4K'
    if modInt & 65536:
        mods += '5K'
    if modInt & 131072:
        mods += '6K'
    if modInt & 262144:
        mods += '7K'
    if modInt & 524288:
        mods += '8K'
    if modInt & 1048576:
        mods += 'FI'
    if modInt & 2097152:
        mods += 'RDM'
    if modInt & 4194304:
        mods += 'CN'
    if modInt & 8388608:
        mods += 'TP'
    if modInt & 16777216:
        mods += '9K'
    if modInt & 33554432:
        mods += 'KC'
    if modInt & 67108864:
        mods += '1K'
    if modInt & 134217728:
        mods += '3K'
    if modInt & 268435456:
        mods += '2K'
    if modInt & 536870912:
        mods += 'SV2'
    if modInt & 1073741824:
        mods += 'MR'
    return mods

# order mods and remove duplicates
def orderMods(mods:str):
    modOrder = ['AT', 'RX', 'AP', 'TP', 'SO', 'EZ', 'HD', 'HT', 'DT', 'NC', 'HR', 'SD', 'PF', 'FL', 'NF']
    modArray = [mods[i:i+2] for i in range(0, len(mods), 2)]
    modArray.sort(key=lambda x: modOrder.index(x) if x in modOrder else len(modOrder))
    modArray = list(dict.fromkeys(modArray))
    return ''.join(modArray)
