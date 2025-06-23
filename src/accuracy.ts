import { types } from ".";

//https://osu.ppy.sh/wiki/en/Gameplay/Accuracy
/**
 * calculates accuracy and rank for osu!
 * 
 * rank_legacy uses old hit-ratio based ranks
 * 
 * example using [this score](https://osu.ppy.sh/scores/1597034515):
 * ```ts
const hit300 = 232;
const hit100 = 23;
const hit50 = 0;
const miss = 0;
const calc = accuracy.standard(hit300, hit100, hit50, miss);
// =>
// {
//  rank_legacy: "S"
//  rank: "A"
//  accuracy: 93.98
// }
 * ```
 */
export function standard(great: number, ok: number, meh: number, miss: number) {
    const totalhits = great + ok + meh + miss;
    const equation = ((Math.floor((300 * great) + (100 * ok) + (50 * meh))) / (Math.floor(300 * (great + ok + meh + miss)))) * 100;
    //https://osu.ppy.sh/wiki/en/FAQ#ranks
    let [rank_legacy, rankLazer] = ['D', 'D'];
    if (great / totalhits > 0.6) {
        rank_legacy = 'C';
    }
    if ((great / totalhits > 0.7 && miss == 0) || (great / totalhits > 0.8)) {
        rank_legacy = 'B';
    }
    if ((great / totalhits > 0.8 && miss == 0) || (great / totalhits > 0.9)) {
        rank_legacy = 'A';
    }
    if (Math.abs(great / totalhits) > 0.9 && miss == 0 && Math.abs(meh / totalhits) < 0.01) {
        rank_legacy = 'S';
    }
    if (ok < 1 && meh < 1 && miss == 0) {
        rank_legacy = 'SS';
        rankLazer = 'SS';
    }
    if (equation >= 70) {
        rankLazer = 'C';
    }
    if (equation >= 80) {
        rankLazer = 'B';
    }
    if (equation >= 90) {
        rankLazer = 'A';
    }
    if (equation >= 95 && miss == 0) {
        rankLazer = 'S';
    }

    const finalarr = {
        rank_legacy,
        rank: rankLazer,
        accuracy: equation,
    };

    return finalarr;
}
/**
 * calculates accuracy and rank for osu!taiko
 * 
 * example using [this score](https://osu.ppy.sh/scores/1860658559):
 * ```ts
 * const hit300 = 90;
 * const hit100 = 25;
 * const miss = 6;
 * const calc = taiko(hit300, hit100, miss);
 * // =>
 * // {
 * // rank_legacy: "B"
 * // rank: "B"
 * // accuracy: 84.71
 * // }
 * ```
 */
export function taiko(great: number, good: number, miss: number) {
    const equation = (Math.abs(great + (good / 2))) / (Math.abs(great + good + miss));
    const totalhits = great + good + miss;
    //rank = 'https://osu.ppy.sh/wiki/en/FAQ#ranks'
    let [rank_legacy, rankLazer] = ['D', 'D'];
    if (equation >= 0.8) {
        rankLazer = 'B';
    }
    if (equation >= 0.9) {
        rankLazer = 'A';
    }
    if (equation >= 0.95 && miss == 0) {
        rankLazer = 'S';
    }
    if (equation == 1) {
        [rank_legacy, rankLazer] = ['SS', 'SS'];
    }
    if (great / totalhits > 0.6) {
        rank_legacy = 'C';
    }
    if ((great / totalhits > 0.7 && miss == 0) || (great / totalhits > 0.8)) {
        rank_legacy = 'B';
    }
    if ((great / totalhits > 0.8 && miss == 0) || (great / totalhits > 0.9)) {
        rank_legacy = 'A';
    }
    if (Math.abs(great / totalhits) > 0.9 && miss == 0 && Math.abs(good / totalhits) < 0.01) {
        rank_legacy = 'S';
    }

    const finalarr = {
        rank_legacy,
        rank: rankLazer,
        accuracy: equation * 100,
    };
    return finalarr;

}

/**
 * calculates accuracy and rank for osu!catch / fruits / ctb
 * 
 * example using [this score](https://osu.ppy.sh/scores/5045322123):
 * ```ts
    const hit300 = 419;
    const hit100 = 2; // drops
    const hit50 = 209; // droplets
    const hitkatu = 234 - 209; // droplet miss
    const miss = 87; // miss
    const calc = accuracy.fruits(hit300, hit100, hit50, hitkatu, miss);
 * // =>
 * // {
 * // rank: "D"
 * // accuracy: 94.90
 * // }
 * ```
 */
export function fruits(fruits: number, drops: number, droplets: number, droplets_miss: number, miss: number) {
    const equation = Math.floor(fruits + drops + droplets) / Math.floor(fruits + drops + droplets + droplets_miss + miss);
    let [/* rank_legacy */, rankLazer] = ['D', 'D'];
    if (equation >= 0.85) {
        [/* rank_legacy */, rankLazer] = ['C', 'C'];
    }
    if (equation >= 0.9) {
        [/* rank_legacy */, rankLazer] = ['B', 'B'];
    }
    if (equation >= 0.94) {
        [/* rank_legacy */, rankLazer] = ['A', 'A'];
    }
    if (equation >= 0.98) {
        [/* rank_legacy */, rankLazer] = ['S', 'S'];
    }
    if (equation == 1) {
        [/* rank_legacy */, rankLazer] = ['SS', 'SS'];
    }

    const finalarr = {
        /* rank_legacy, */
        rank: rankLazer,
        accuracy: equation * 100,
    };
    return finalarr;
}
/**
 * 
 * @param hit300max - hit max/300+ (100%)
 * @param hit300 - hit 300 (100%)
 * @param hit200 - hit 200 (66.66%)
 * @param hit100 - hit 100 (33.33%)
 * @param hit50 - hit 50 (16.66%)
 * @param miss - miss (0%)
 * @returns an array containing ranks and accuracy
 */

/**
 * calculates accuracy and rank for osu!mania
 * 
 * example using [this score](https://osu.ppy.sh/scores/5045329156):
 * ```ts
    const hitgeki = 162;
    const hit300 = 178;
    const hitkatu = 92;
    const hit100 = 32;
    const hit50 = 16;
    const miss = 25;
    const calc = accuracy.mania(hitgeki, hit300, hitkatu, hit100, hit50, miss, true);
 * // =>
 * // {
 * // rank: "B"
 * // accuracy: 81.29
 * // }
 * ```
 */
export function mania(perfect: number, great: number, good: number, ok: number, meh: number, miss: number, useScoreV2 = true) {
    const equation1 = Math.floor(
        (300 * (perfect + great)) + (200 * good) + (100 * ok) + (50 * meh)) / Math.floor(300 * (perfect + great + good + ok + meh + miss));
    const equationsv2 = Math.floor((305 * perfect) + (300 * great) + (200 * good) + (100 * ok) + (50 * meh)) / Math.floor(305 * (perfect + great + good + ok + meh + miss));
    const equation = useScoreV2 ? equationsv2 : equation1;
    let [/* rank_legacy */, rankLazer] = ['D', 'D'];
    if (equation >= 0.7) {
        [/* rank_legacy */, rankLazer] = ['C', 'C'];
    }
    if (equation >= 0.8) {
        [/* rank_legacy */, rankLazer] = ['B', 'B'];
    }
    if (equation >= 0.9) {
        [/* rank_legacy */, rankLazer] = ['A', 'A'];
    }
    if (equation >= 0.95) {
        [/* rank_legacy */, rankLazer] = ['S', 'S'];
    }
    if (equation == 1) {
        [/* rank_legacy */, rankLazer] = ['SS', 'SS'];
    }
    const finalarr = {
        // rank_legacy,
        rank: rankLazer,
        accuracy: equation * 100,
    };
    return finalarr;
}

/**
 * convert a string into an osu! rank/rank
 */
function checkrank(string: string, defaultRank?: types.Rank) {
    let rank: types.Rank;

    if (!defaultRank) {
        defaultRank = 'A';
    }

    switch (true) {
        case string.toUpperCase().includes('SSH'):
            rank = 'XH';
            break;
        case string.toUpperCase().includes('SS'):
            rank = 'X';
            break;
        case string.toUpperCase().includes('SH'):
            rank = 'SH';
            break;
        case string.toUpperCase().includes('S'):
            rank = 'S';
            break;
        case string.toUpperCase().includes('A'):
            rank = 'A';
            break;
        case string.toUpperCase().includes('B'):
            rank = 'B';
            break;
        case string.toUpperCase().includes('C'):
            rank = 'C';
            break;
        case string.toUpperCase().includes('D'):
            rank = 'D';
            break;
        case string.toUpperCase().includes('F'):
            rank = 'F';
            break;
        default:
            rank = defaultRank;
            break;
    }
    return rank;
}