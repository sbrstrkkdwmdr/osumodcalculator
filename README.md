# osu! mod calculator

C# recreate of the main branch
### to do list: 
    [x] convert AR to DT & HT
    [x] convert OD to DT & HT
    [x] convert AR & OD to milliseconds
    [x] convert milliseconds to AR & OD
    [x] convert values to HR & EZ
    [x] convert mod integers to string and vice versa
    [...] convert circle size to object radius and vice versa

### to install:
```cs
using osumodcalc;
```
### notes:
    EZ & HR calculations should come before DT/HT calculations
    OD is listed as accuracy in the osu! api
    HP is listed as drain in the osu! api

# documentation

## conversion to double time

```cs

float baseAR = 9;
osumodcalc.objects.ARobj ar_doubletime = osumodcalc.functions.DoubleTimeAR(baseAR);
/*
    => {
        ar: 10.33
        ms: 400
    }

*/
float baseOD = 9;
osumodcalc.objects.ODobj od_doubletime = osumodcalc.functions.ODDT(baseOD);
/*
    => {
    range_300: 17,
    range_100: 45,
    range_50: 73,
    od: 10.42,
}

*/
```

## conversion to half time
```cs

float baseAR = 9;
osumodcalc.objects.ARobj ar_doubletime = osumodcalc.functions.HalfTimeAR(baseAR);
/*
    => {
    ar: 7.67
    ms: 800
    }

*/
float baseOD = 9;
osumodcalc.objects.ODobj od_halftime = osumodcalc.functions.ODHT(baseOD);
/*
    => {
    range_300: 34,
    range_100: 90,
    range_50: 146,
    od: 7.58,
    }

*/
```

## calculating accuracy (all modes)
```cs 
//for osu! standard
int hitgeki = 42; //unused in calculation
int hit300 = 298;
int hitkatu = 11; //unused in calculation
int hit100 = 22;
int hit50 = 11;
int miss = 25;
osumodcalc.objects.AccGradeObj accuracy = osumodcalc.functions.calcgrade(hit300, hit100, hit50, miss);
/*
    => { 
    grade: 'B',
    accuracy: 86.28277153558052, 
    }
*/


//for taiko
int hitgeki = 0; //unused in calculation
int hit300 = 193; // AKA great
int hitkatu = 0; //unused in calculation
int hit100 = 11; // AKA good
int hit50 = 0; //unused in calculation
int miss = 1;
osumodcalc.objects.AccGradeObj accuracy = osumodcalc.functions.calcgradeTaiko(hit300, hit100, miss)
/*
    =>  { 
    grade: 'S', 
    accuracy: 96.82926829268293, 
    }
*/


//for catch the beat
int hitgeki = 0; //unused in calculation. AKA combo-ending fruits
int hit300 = 202; // AKA fruits caught
int hitkatu = 1; // AKA missed droplets (DRP miss?)
int hit100 = 3; // AKA drops caught / ticks
int hit50 = 235; // AKA droplets caught
int miss = 0; // missed fruits + missed drops
osumodcalc.objects.AccGradeObj accuracy = osumodcalc.functions.calcgradeCatch(hit300, hit100, hit50, miss);
/*
    => { 
        grade: 'S', 
        accuracy: 99.77324263038548,
        }
*/


//for mania
int hitgeki = 213; //AKA hit max / hit 300+
int hit300 = 170;
int hitkatu = 48; // AKA hit200
int hit100 = 7;
int hit50 = 1;
int miss = 0;
osumodcalc.objects.AccGradeObj accuracy = osumodcalc.functions.calcgradeMania(hitgeki, hit300, hitkatu, hit100, hit50, miss);
/* 
    => { 
    grade: 'S', 
    accuracy: 95.10250569476082,
    }
*/
```

## converting values to/from ms (milliseconds)

```cs
//base values to milliseconds
float ar = 9;
int arInMs = osumodcalc.functions.ARtoms(ar); 
/*
    => 600
*/

float od = 9; 
osumodcalc.objects.ODobj odHitWindows = osumodcalc.functions.ODtoms(od);
/*
    => { 
    range_300: 25.5, 
    range_100: 67.5, 
    range_50: 109.5,
    od: 9, 
    }
    range300 is how many ms from the exact timing point a hit will count as a 300 
*/

//milliseconds to values
int arInMs = 600;
float ar = osumodcalc.functions.msToAR(arInMs);
/*
    => 9
*/


float hitWindow_300s = 25.5;
float hitWindow_100s = 67.5;
float hitWindow_50s = 109.5;

dynamic od = osumodcalc.functions.msToOD(hitWindow_300s, hitWindow_100s, hitWindow_50s); // only one of these is needed. to ignore a value replace it with 0
od = osumodcalc.functions.msToOD(0, hitWindow_100s, hitWindow_50s);
od = osumodcalc.functions.msToOD(0, 0, hitWindow_50s);
/*
    => 9
*/
od = osumodcalc.functions.msToOD(0, 0, 0);
/*
    => "Error"
*/
```

## conversion to EZ/HR

```cs
float baseCS = 4;
float baseAR = 9.8;
float baseOD = 9.1;
float baseHP = 5;
osumodcalc.objects.BasicMapVal valtoEZ = osumodcalc.functions.toEZ(baseCS, baseAR, baseOD, baseHP);
/*
    => {
    cs: 2
    ar: 4.9
    od: 4.55
    hp: 2.5
    }
*/
osumodcalc.objects.BasicMapVal valtoEZ = osumodcalc.functions.toHR(baseCS, baseAR, baseOD, baseHP);
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
```cs
string modString = osumodcalc.functions.ModIntToString(88);
/*
    => "HDDTHR"
*/

int modInt = osumodcalc.functions.ModStringToInt('EZHDDT');
/*
    => 74
*/

string unorderedMods = 'HDHDDTHDNFNFEZAT blhahblasblhsdbaslkhbdsahk';
string orderedMods = osumodcalc.functions.OrderMods(unorderedMods);
/*
    => "ATEZHDDTNF"
*/

```

## circle size to object radius
```cs
double objectSize = osumodcalc.functions.csToRadius(5);
/*
    => 32.006
*/

double cs = osumodcalc.functions.csFromRadius(32.01);
/*
    => 5
*/

```


### credits: 
[osu! accuracy wiki](https://osu.ppy.sh/wiki/en/Gameplay/Accuracy) <br/>
[osu! grades wiki](https://osu.ppy.sh/wiki/en/FAQ#grades) <br/>
[Difficulty Settings Table](https://www.reddit.com/r/osugame/comments/6phntt/difficulty_settings_table_with_all_values/) <br/>