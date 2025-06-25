import { types } from ".";

//https://osu.ppy.sh/wiki/en/Gameplay/Accuracy
/**
 * calculates accuracy and rank for osu!
 * 
 * rank_legacy uses old hit-ratio based ranks
 * 
 * @includeExample src/examples/accuracy.ts:4-16
 */
export function standard(great: number, ok: number, meh: number, miss: number) {
    const totalhits = great + ok + meh + miss;
    const equation = ((Math.floor((300 * great) + (100 * ok) + (50 * meh))) / (Math.floor(300 * (great + ok + meh + miss))));
    //https://osu.ppy.sh/wiki/en/FAQ#ranks
    let [rank_legacy, rankLazer] = [standardRankLegacy(great, meh, miss, totalhits), standardRankLazer(equation, miss)];
    if (equation == 1) {
        rank_legacy = 'SS';
        rankLazer = 'SS';
    }

    const finalarr = {
        rank_legacy,
        rank: rankLazer,
        accuracy: +(equation * 100).toFixed(2),
    };

    return finalarr;
}

function standardRankLegacy(great: number, meh: number, miss: number, totalhits: number) {
    let rank_legacy = 'D';
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
    return rank_legacy;
}

function standardRankLazer(equation: number, miss: number) {
    let rankLazer = 'D';
    if (equation >= 0.7) {
        rankLazer = 'C';
    }
    if (equation >= 0.8) {
        rankLazer = 'B';
    }
    if (equation >= 0.9) {
        rankLazer = 'A';
    }
    if (equation >= 0.95 && miss == 0) {
        rankLazer = 'S';
    }
    return rankLazer;
}

/**
 * calculates accuracy and rank for osu!taiko
 * 
 * @includeExample src/examples/accuracy.ts:19-30
 */
export function taiko(great: number, good: number, miss: number) {
    const equation = (Math.abs(great + (good / 2))) / (Math.abs(great + good + miss));
    const totalhits = great + good + miss;
    //rank = 'https://osu.ppy.sh/wiki/en/FAQ#ranks'
    let [rank_legacy, rankLazer] = [taikoRankLegacy(great, good, miss, totalhits), taikoRankLazer(equation, miss)];
    if (equation == 1) {
        [rank_legacy, rankLazer] = ['SS', 'SS'];
    }

    const finalarr = {
        rank_legacy,
        rank: rankLazer,
        accuracy: +(equation * 100).toFixed(2),
    };
    return finalarr;
}

function taikoRankLegacy(great: number, good: number, miss: number, totalhits: number) {
    let rank_legacy = 'D';
    if (great / totalhits > 0.6) {
        rank_legacy = 'C';
    }
    if ((great / totalhits > 0.7 && miss == 0) || (great / totalhits > 0.8)) {
        rank_legacy = 'B';
    }
    if ((great / totalhits > 0.8 && miss == 0) || (great / totalhits > 0.9)) {
        rank_legacy = 'A';
    }
    if (great / totalhits > 0.9 && miss == 0 && good / totalhits < 0.01) {
        rank_legacy = 'S';
    }
    return rank_legacy;
}

function taikoRankLazer(equation: number, miss: number) {
    let rankLazer = 'D';
    if (equation >= 0.8) {
        rankLazer = 'B';
    }
    if (equation >= 0.9) {
        rankLazer = 'A';
    }
    if (equation >= 0.95 && miss == 0) {
        rankLazer = 'S';
    }
    return rankLazer;
}

/**
 * calculates accuracy and rank for osu!catch / fruits / ctb
 * 
 * @includeExample src/examples/accuracy.ts:33-45
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
        accuracy: +(equation * 100).toFixed(2),
    };
    return finalarr;
}

/**
 * calculates accuracy and rank for osu!mania
 * 
 * @includeExample src/examples/accuracy.ts:48-61
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
        accuracy: +(equation * 100).toFixed(2),
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