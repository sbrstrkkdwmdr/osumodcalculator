# osu! mod calculator
edit of the calculator i made for [my discord bot](https://github.com/sbrstrkkdwmdr/sbrbot)

## conversion to double time

```js

let baseAR = 9
let ar_doubletime = doubletimear(baseAR)
/*
    => {
        ar: 10.33
        ms: 400
        ar_old: 9
    }

*/
let baseOD = 9
let od_doubletime = oddt(baseOD)\
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
let ar_doubletime = halftimear(baseAR)
/*
    => {
    ar: 7.67
    ms: 800
    ar_old: 9
    }

*/
let baseOD = 9
let od_halftime = odht(baseOD)
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
let accuracy = calcgradetaiko(hit300, hit100, miss)
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
let accuracy = calcgrade(hit300, hit100, hit50, miss)
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
let accuracy = calcgrademania(hitgeki, hit300, hitkatu, hit100, hit50, miss)
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
let arInMs = artoms(ar) 
/*
    => 600
*/

let od = 9 
let odHitWindows = odtoms(od)
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
let ar = mstoar(arInMs)
/*
    => 9
*/


let hitWindow_300s = 25.5
let hitWindow_100s = 67.5
let hitWindow_50s = 109.5

let od = mstood(hitWindow_300s, hitWindow_100s, hitWindow_50s) // only one of these is needed. to ignore a value replace it with NaN (null returns 13.25)
let od = mstood(NaN, hitWindow_100s, hitWindow_50s)
let od = mstood(NaN, NaN, hitWindow_50s)
/*
    => 9
*/
let od = mstood(NaN, NaN, NaN)
/*
    => '???'
*/
```