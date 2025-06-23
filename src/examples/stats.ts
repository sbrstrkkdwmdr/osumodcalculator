import {
    FromMsAr,
    FromMsOd,
    ToDtAr, ToDtOd,
    ToHtAr, ToHtOd,
    ToMsAr,
    ToMsOd,
    csFromRadius,
    csToRadius,
    modded, speed,
    toEZ, toHR
} from "../stats";

import { ApiMod } from "../types";

{
    ToMsOd(9);
    // => { 
    // hitwindow_300: 25.5, 
    // hitwindow_100: 67.5, 
    // hitwindow_50: 109.5 
    // }
}
{
    ToMsAr(9); // => 600
}
{
    const hitWindow_300s = 25.5;
    const hitWindow_100s = 67.5;
    const hitWindow_50s = 109.5;

    const first = FromMsOd(hitWindow_300s); // => 9
    const second = FromMsOd(NaN, hitWindow_100s); // => 9
    const third = FromMsOd(NaN, NaN, hitWindow_50s); // => 9
}
{
    FromMsAr(600); // => 9
}
{
    const oldAr = 9;
    const newAr = ToDtAr(oldAr);
    // => {
    // ar: 10.33
    // ms: 400
    // }
}
{
    const oldAr = 9;
    const newAr = ToHtAr(oldAr);
    // => {
    // ar: 7.67
    // ms: 800
    // }
}
{
    const oldOd = 9;
    const newOd = ToDtOd(oldOd);
    // => {
    // hitwindow_300: 17,
    // hitwindow_100: 45,
    // hitwindow_50: 73,
    // od: 10.42,
    // }
}
{
    const oldOd = 9;
    const newOd = ToHtOd(oldOd);
    // => {
    // hitwindow_300: 34,
    // hitwindow_100: 90,
    // hitwindow_50: 146,
    // od: 7.58,
    // }
}
{
    const circleSize = 4;
    const approachRate = 9.8;
    const overallDifficulty = 9.1;
    const health = 5;

    const modded = toHR(circleSize, approachRate, overallDifficulty, health);
    // => { 
    // cs: 5.2
    // ar: 10
    // od: 10
    // hp: 7
    // }
}
{
    const circleSize = 4;
    const approachRate = 9.8;
    const overallDifficulty = 9.1;
    const health = 5;

    const modded = toEZ(circleSize, approachRate, overallDifficulty, health);
    // => { 
    // cs: 2
    // ar: 4.9
    // od: 4.55
    // hp: 2.5
    // }
}
{
    csToRadius(5); // => 32.006

}
{
    const radius = 32.01; // in pixels
    csFromRadius(radius); // => 5
}
{
    // https://osu.ppy.sh/b/ 759056
    const speedRate = 1.15;
    const approachRate = 9.2;
    const overallDifficulty = 8;
    const bpm = 189;
    const songLength = 189;
    const newStats = speed(speedRate, { ar: approachRate, od: overallDifficulty, bpm, songLength });
    // => 
    // {
    //     ar: 9.7,
    //     od: 8.68,
    //     bpm: 217.35,
    //     songLength: 164.34782608695653,      
    //     extra: {
    //         arMs: 495.6521739130436,
    //         odMs: {
    //             hitwindow_300: 27.39130434782609,
    //             hitwindow_100: 65.65217391304348,
    //             hitwindow_50: 103.91304347826087,
    //         },
    //     },
    // }
}
{
    const circleSize = 4;
    const approachRate = 10;
    const overallDifficulty = 5.5;
    const hp = 6;
    const bpm = 215;
    const songLength = 180;
    const mods: ApiMod[] = [{
        acronym: 'DT',
        settings: {
            speed_change: 1.15
        }
    },
    {
        acronym: 'DA',
        settings: {
            circle_size: 3.5
        }
    }
    ];
    const moddedStats = modded({
        cs: circleSize,
        ar: approachRate,
        od: overallDifficulty,
        hp, bpm, songLength
    }, mods);
    // =>
    // {
    // cs: 3.5,
    // ar: 10.39,
    // od: 6.51,
    // hp: 6,
    // bpm: 247.24999999999997,
    // songLength: 156.52173913043478,
    // extra: {
    //     csRadius: 38.730180610000005,
    //     arMs: 391.304347826087,
    //     odMs: {
    //         hitwindow_300: 40.434782608695656,
    //         hitwindow_100: 83.04347826086958,
    //         hitwindow_50: 125.65217391304348,
    //     },
    // },
}