# osu! mod calculator

python rewrite of the main branch

### to do list: 
    [x] convert AR to DT & HT
    [x] convert OD to DT & HT
    [x] convert AR & OD to milliseconds
    [x] convert milliseconds to AR & OD
    [x] convert values to HR & EZ
    [x] convert mod integers to string and vice versa

### to install:

```py
import osumodcalc as *
```
or 
```py
import osumodcalc
```

### notes:
    EZ & HR calculations should come before DT/HT calculations
    OD is listed as accuracy in the osu! api
    HP is listed as drain in the osu! api

# documentation

## conversion to double time

```js

baseAR = 9
ar_doubletime = osumodcalc.DoubleTimeAR(baseAR)
/*
    => {
        ar: 10.33
        ms: 400
    }

*/
baseOD = 9
od_doubletime = osumodcalc.odDT(baseOD)\
/*
    => {
    hitwindow_300: 17,
    hitwindow_100: 45,
    hitwindow_50: 73,
    od_num: 10.42,
}

*/
```

## conversion to half time
```js

baseAR = 9
ar_doubletime = osumodcalc.HalfTimeAR(baseAR)
/*
    => {
    ar: 7.67
    ms: 800
    ar_old: 9
    }

*/
baseOD = 9
od_halftime = osumodcalc.odHT(baseOD)
/*
    => {
    hitwindow_300: 34,
    hitwindow_100: 90,
    hitwindow_50: 146,
    od_num: 7.58,
    }

*/
```

## calculating accuracy (all modes)
```js 
//for osu! standard
hitgeki = 42 //unused in calculation
hit300 = 298
hitkatu = 11 //unused in calculation
hit100 = 22
hit50 = 11
miss = 25
accuracy = osumodcalc.calcgrade(hit300, hit100, hit50, miss)
/*
    => { 
    grade: 'B',
    accuracy: 86.28277153558052,
    }
*/


//for taiko
hitgeki = 0 //unused in calculation
hit300 = 193 // AKA great
hitkatu = 0 //unused in calculation
hit100 = 11 // AKA good
hit50 = '?' //unused in calculation
miss = 1
accuracy = osumodcalc.calcgradeTaiko(hit300, hit100, miss)
/*
    =>  { 
    grade: 'S', 
    accuracy: 96.82926829268293,
    }
*/


//for catch the beat
hitgeki = 0 //unused in calculation. AKA combo-ending fruits
hit300 = 202 // AKA fruits caught
hitkatu = 1 // AKA missed droplets (DRP miss?)
hit100 = 3 // AKA drops caught / ticks
hit50 = 235 // AKA droplets caught
miss = 0 // missed fruits + missed drops
accuracy = osumodcalc.calcgradeCatch(hit300, hit100, hit50, miss)
/*
    => { 
        grade: 'S', 
        accuracy: 99.77324263038548,
        }
*/
//for mania
hitgeki = 213 //AKA hit max / hit 300+
hit300 = 170
hitkatu = 48 // AKA hit200
hit100 = 7
hit50 = 1
miss = 0
accuracy = osumodcalc.calcgradeMania(hitgeki, hit300, hitkatu, hit100, hit50, miss)
/* 
    => { 
        grade: 'S', 
        accuracy: 95.10250569476082,
        }
*/
```

## converting values to/from ms (milliseconds)

```js
//base values to milliseconds
ar = 9
arInMs = osumodcalc.ARtoms(ar) 
/*
    => 600
*/

od = 9 
odHitWindows = osumodcalc.ODtoms(od)
/*
    => { 
    range300: 25.5, 
    range100: 67.5, 
    range50: 109.5 
    }
    range300 is how many ms from the exact timing point a hit will count as a 300 
*/

//milliseconds to values
arInMs = 600
ar = osumodcalc.msToAR(arInMs)
/*
    => 9
*/


hitWindow_300s = 25.5
hitWindow_100s = 67.5
hitWindow_50s = 109.5

od = osumodcalc.msToOD(hitWindow_300s, hitWindow_100s, hitWindow_50s) // only one of these is needed. to ignore a value replace it with NaN (null returns 13.25)
od = osumodcalc.msToOD(NaN, hitWindow_100s, hitWindow_50s)
od = osumodcalc.msToOD(NaN, NaN, hitWindow_50s)
/*
    => 9
*/
od = osumodcalc.msToOD(NaN, NaN, NaN)
/*
    => '???'
*/
```

## conversion to EZ/HR

```js
baseCS = 4
baseAR = 9.8
baseOD = 9.1
baseHP = 5
valtoEZ = osumodcalc.toEZ(baseCS, baseAR, baseOD, baseHP)
/*
    => {
    cs: 2
    ar: 4.9
    od: 4.55
    hp: 2.5
    }
*/
valtoEZ = osumodcalc.toHR(baseCS, baseAR, baseOD, baseHP)
/*
    => {
    cs: 5.2
    ar: 10
    od: 10
    hp: 7
    }
*/


```

## mod integer/string parsing
```js
modString = osumodcalc.ModIntToString(88)
/*
    => 'HDDTHR'
*/

modInt = osumodcalc.ModStringToInt('EZHDDT')
/*
    => 74
*/

unorderedMods = 'HDHDDTHDNFNFEZAT blhahblasblhsdbaslkhbdsahk'
orderedMods = osumodcalc.OrderMods(unorderedMods)
/*
    => ATEZHDDTNF
*/

```


### credits: 
[osu! accuracy wiki](https://osu.ppy.sh/wiki/en/Gameplay/Accuracy) <br/>
[osu! grades wiki](https://osu.ppy.sh/wiki/en/FAQ#grades) <br/>
[Difficulty Settings Table](https://www.reddit.com/r/osugame/comments/6phntt/difficulty_settings_table_with_all_values/) <br/>