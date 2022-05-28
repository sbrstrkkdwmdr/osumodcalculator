# osu! mod calculator
edit of the calculator i made for [my discord bot](https://github.com/sbrstrkkdwmdr/sbrbot)
### to do list: 
    [x] convert AR to DT & HT
    [x] convert OD to DT & HT
    [x] convert AR & OD to milliseconds
    [x] convert milliseconds to AR & OD
    convert HP (drain) to DT & HT
    [x] convert values to HR & EZ

### to install:
run `npm i osumodcalculator`
in your main js file:
```js
const { DoubleTimeAR, HalfTimeAR, calcgrade, calcgradeTaiko, calcgradeCatch, calcgradeMania, odDT, odHT, ODtoms, ARtoms, msToAR, msToOD, toEZ, toHR } = require('osumodcalculator')
//code here 
```
OR 
```js
import { DoubleTimeAR, HalfTimeAR, calcgrade, calcgradeTaiko, calcgradeCatch, calcgradeMania, odDT, odHT, ODtoms, ARtoms, msToAR, msToOD, toEZ, toHR } from 'osumodcalculator'
```
### notes:
    EZ & HR calculations should come before DT/HT calculations
    OD is listed as accuracy in the osu! api
    HP is listed as drain in the osu! api

## conversion to double time

```js

let baseAR = 9
let ar_doubletime = DoubleTimeAR(baseAR)
/*
    => {
        ar: 10.33
        ms: 400
        ar_old: 9
    }

*/
let baseOD = 9
let od_doubletime = odDT(baseOD)\
/*
    => {
    hitwindow_300: 17,
    hitwindow_100: 45,
    hitwindow_50: 73,
    od_num: 10.42,
    hitwin_300_old: 25.5,
    hitwin_100_old: 67.5,
    hitwin_50_old: 109.5,
    od_old: 9
}

*/
```

## conversion to half time
```js

let baseAR = 9
let ar_doubletime = HalfTimeAR(baseAR)
/*
    => {
    ar: 7.67
    ms: 800
    ar_old: 9
    }

*/
let baseOD = 9
let od_halftime = odHT(baseOD)
/*
    => {
    hitwindow_300: 34,
    hitwindow_100: 90,
    hitwindow_50: 146,
    od_num: 7.58,
    hitwin_300_old: 25.5,
    hitwin_100_old: 67.5,
    hitwin_50_old: 109.5,
    od_old: 9
    }

*/
```

## calculating accuracy (all modes)
```js 
//for osu! standard
let hitgeki = 42 //unused in calculation
let hit300 = 298
let hitkatu = 11 //unused in calculation
let hit100 = 22
let hit50 = 11
let miss = 25
let accuracy = calcgrade(hit300, hit100, hit50, miss)
/*
    => { 
    grade: 'B',
    accuracy: '86.28%', 
    fullacc: '86.28277153558052%' 
    }
*/


//for taiko
let hitgeki = 0 //unused in calculation
let hit300 = 193 // AKA great
let hitkatu = 0 //unused in calculation
let hit100 = 11 // AKA good
let hit50 = '?' //unused in calculation
let miss = 1
let accuracy = calcgradeTaiko(hit300, hit100, miss)
/*
    =>  { 
    grade: 'S', 
    accuracy: '96.83%', 
    fullacc: '96.82926829268293%' 
    }
*/


//for catch the beat
let hitgeki = 0 //unused in calculation. AKA combo-ending fruits
let hit300 = 202 // AKA fruits caught
let hitkatu = 1 // AKA missed droplets (DRP miss?)
let hit100 = 3 // AKA drops caught / ticks
let hit50 = 235 // AKA droplets caught
let miss = 0 // missed fruits + missed drops
let accuracy = calcgradeCatch(hit300, hit100, hit50, miss)
/*
    => { 
        grade: 'S', 
        accuracy: '99.77%', 
        fullacc: '99.77324263038548%' 
        }
*/
//for mania
let hitgeki = 213 //AKA hit max / hit 300+
let hit300 = 170
let hitkatu = 48 // AKA hit200
let hit100 = 7
let hit50 = 1
let miss = 0
let accuracy = calcgradeMania(hitgeki, hit300, hitkatu, hit100, hit50, miss)
/* 
    => { grade: 'S', 
    accuracy: '95.10%', 
    fullacc: '95.10250569476082%' 
    }
*/
```

## converting values to/from ms (milliseconds)

```js
//base values to milliseconds
let ar = 9
let arInMs = ARtoms(ar) 
/*
    => 600
*/

let od = 9 
let odHitWindows = ODtoms(od)
/*
    => { 
    range300: 25.5, 
    range100: 67.5, 
    range50: 109.5 
    }
    range300 is how many ms from the exact timing point a hit will count as a 300 
*/

//milliseconds to values
let arInMs = 600
let ar = msToAR(arInMs)
/*
    => 9
*/


let hitWindow_300s = 25.5
let hitWindow_100s = 67.5
let hitWindow_50s = 109.5

let od = msToOD(hitWindow_300s, hitWindow_100s, hitWindow_50s) // only one of these is needed. to ignore a value replace it with NaN (null returns 13.25)
let od = msToOD(NaN, hitWindow_100s, hitWindow_50s)
let od = msToOD(NaN, NaN, hitWindow_50s)
/*
    => 9
*/
let od = msToOD(NaN, NaN, NaN)
/*
    => '???'
*/
```

## conversion to EZ/HR

```js
let baseCS = 4
let baseAR = 9.8
let baseOD = 9.1
let baseHP = 5
let valtoEZ = toEZ(baseCS, baseAR, baseOD, baseHP)
/*
    => {
    cs: 2
    ar: 4.9
    od: 4.55
    hp: 2.5
    }
*/
let valtoEZ = toHR(baseCS, baseAR, baseOD, baseHP)
/*
    => {
    cs: 5.2
    ar: 10
    od: 10
    hp: 7
    }
*/


```


### credits: 
[osu! accuracy wiki](https://osu.ppy.sh/wiki/en/Gameplay/Accuracy) <br/>
[osu! grades wiki](https://osu.ppy.sh/wiki/en/FAQ#grades) <br/>
[Difficulty Settings Table](https://www.reddit.com/r/osugame/comments/6phntt/difficulty_settings_table_with_all_values/) <br/>