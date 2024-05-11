# osu! mod calculator

[![NPM](https://nodei.co/npm/osumodcalculator.png)](https://nodei.co/npm/osumodcalculator/)<br/>
[![CodeFactor](https://www.codefactor.io/repository/github/sbrstrkkdwmdr/osumodcalculator/badge)](https://www.codefactor.io/repository/github/sbrstrkkdwmdr/osumodcalculator)
### to do list:

    [x] convert AR to DT & HT
    [x] convert OD to DT & HT
    [x] convert AR & OD to milliseconds
    [x] convert milliseconds to AR & OD
    [x] convert values to HR & EZ
    [x] convert mod integers to string and vice versa
    [x] convert circle size to object radius and vice versa

### to install:

run `npm i osumodcalculator`
in your main js file:

```js
const osumodcalc = require("osumodcalculator");
//code here
```

OR

```js
import * as osumodcalc from "osumodcalculator";
```

### notes:

    EZ & HR calculations should come before DT/HT calculations
    OD is listed as accuracy in the osu! api
    HP is listed as drain in the osu! api

# documentation

## conversion to double time

```js
let baseAR = 9;
let ar_doubletime = osumodcalc.DoubleTimeAR(baseAR);
/*
    => {
        ar: 10.33
        ms: 400
    }

*/
let baseOD = 9;
let od_doubletime = osumodcalc.odDT(baseOD);
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
let baseAR = 9;
let ar_doubletime = osumodcalc.HalfTimeAR(baseAR);
/*
    => {
    ar: 7.67
    ms: 800
    }

*/
let baseOD = 9;
let od_halftime = osumodcalc.odHT(baseOD);
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
let hitgeki = 42; //unused in calculation
let hit300 = 298;
let hitkatu = 11; //unused in calculation
let hit100 = 22;
let hit50 = 11;
let miss = 25;
let accuracy = osumodcalc.calcgrade(hit300, hit100, hit50, miss);
/*
    => { 
    grade: 'B',
    accuracy: 86.28277153558052, 
    }
*/

//for taiko
let hitgeki = 0; //unused in calculation
let hit300 = 193; // AKA great
let hitkatu = 0; //unused in calculation
let hit100 = 11; // AKA good
let hit50 = "?"; //unused in calculation
let miss = 1;
let accuracy = osumodcalc.calcgradeTaiko(hit300, hit100, miss);
/*
    =>  { 
    grade: 'S', 
    accuracy: 96.82926829268293, 
    }
*/

//for catch the beat
let hitgeki = 0; //unused in calculation. AKA combo-ending fruits
let hit300 = 202; // AKA fruits caught
let hitkatu = 1; // AKA missed droplets (DRP miss?)
let hit100 = 3; // AKA drops caught / ticks
let hit50 = 235; // AKA droplets caught
let miss = 0; // missed fruits + missed drops
let accuracy = osumodcalc.calcgradeCatch(hit300, hit100, hit50, miss);
/*
    => { 
        grade: 'S', 
        accuracy: 99.77324263038548,
        }
*/

//for mania
let hitgeki = 213; //AKA hit max / hit 300+
let hit300 = 170;
let hitkatu = 48; // AKA hit200
let hit100 = 7;
let hit50 = 1;
let miss = 0;
let accuracy = osumodcalc.calcgradeMania(
  hitgeki,
  hit300,
  hitkatu,
  hit100,
  hit50,
  miss
);
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
let ar = 9;
let arInMs = osumodcalc.ARtoms(ar);
/*
    => 600
*/

let od = 9;
let odHitWindows = osumodcalc.ODtoms(od);
/*
    => { 
    hitwindow_300: 25.5, 
    hitwindow_100: 67.5, 
    hitwindow_50: 109.5 
    }
    hitwindow_300 is how many ms from the exact timing point a hit will count as a 300 
    */

//milliseconds to values
let arInMs = 600;
let ar = osumodcalc.msToAR(arInMs);
/*
    => 9
*/

let hitWindow_300s = 25.5;
let hitWindow_100s = 67.5;
let hitWindow_50s = 109.5;

let od = osumodcalc.msToOD(hitWindow_300s, hitWindow_100s, hitWindow_50s); // only one of these is needed. to ignore a value replace it with NaN (null returns 13.25)
let od = osumodcalc.msToOD(NaN, hitWindow_100s, hitWindow_50s);
let od = osumodcalc.msToOD(NaN, NaN, hitWindow_50s);
/*
    => 9
*/
let od = osumodcalc.msToOD(NaN, NaN, NaN);
/*
    => '???'
*/
```

## conversion to EZ/HR

```js
let baseCS = 4;
let baseAR = 9.8;
let baseOD = 9.1;
let baseHP = 5;
let valtoEZ = osumodcalc.toEZ(baseCS, baseAR, baseOD, baseHP);
/*
    => {
    cs: 2
    ar: 4.9
    od: 4.55
    hp: 2.5
    }
*/
let valtoEZ = osumodcalc.toHR(baseCS, baseAR, baseOD, baseHP);
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
let modString = osumodcalc.ModIntToString(88);
/*
    => 'HDDTHR'
*/

let modInt = osumodcalc.ModStringToInt("EZHDDT");
/*
    => 74
*/

let unorderedMods = "HDHDDTHDNFNFEZAT blhahblasblhsdbaslkhbdsahk";
let orderedMods = osumodcalc.OrderMods(unorderedMods);
/*
    => EZHDDTSDNFAT
*/
```

## circle size to object radius

```js
let objectSize = osumodcalc.csToRadius(5);
/*
    => 32.006
*/

let cs = osumodcalc.csFromRadius(32.01);
/*
    => 5
*/
```

## calculate all values

```js
let cs = 4;
let ar = 9;
let od = 8;
let hp = 3;
let bpm = 180;
let length = 90;
let mods = "HDDTHR";

let values = osumodcalc.calcValues(cs, ar, od, hp, bpm, length, mods);

/*
    => {
    cs: 5.2,
    ar: 11,
    od: 11,
    hp: 4.2,
    bpm: 270,
    length: 60,
    mods: 'HDDTHR',
    error: false,
    details: {
        csRadius: 31.1099023424,
        arMs: 300,
        odMs: { hitwindow_300: 13.5, hitwindow_100: 51.5, hitwindow_50: 89.5 },
        lengthFull: '1:00'
        }
    }
*/
```

## convert mode name to int and vice versa
```js
let modeName = osumodcalc.ModeIntToName(0)
/*
    => 'osu'
*/

let modeInt = osumodcalc.ModeNameToInt('fruits') //'catch' also works
/*
    => 2
*/
```

## get medal name from acheivement id (WIP)
```js
let medalName = osumodcalc.AchievementIdToName(0)
//will do this later
```

### credits:

[osu! accuracy wiki](https://osu.ppy.sh/wiki/en/Gameplay/Accuracy) <br/>
[osu! grades wiki](https://osu.ppy.sh/wiki/en/FAQ#grades) <br/>
[Difficulty Settings Table](https://www.reddit.com/r/osugame/comments/6phntt/difficulty_settings_table_with_all_values/) <br/>
