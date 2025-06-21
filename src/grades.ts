import { types } from ".";

//https://osu.ppy.sh/wiki/en/Gameplay/Accuracy
/**
 * 
 * @param hit300 - hit 300s (100%)
 * @param hit100 - hit 100s (33.33%)
 * @param hit50  - hit 50s (16.66%)
 * @param miss - hit 0s/misses (0%)
 * @returns an array containing grades and accuracy
 */
export function standard(hit300: number, hit100: number, hit50: number, miss: number) {
    const totalhits = hit300 + hit100 + hit50 + miss;
    const equation = ((Math.floor((300 * hit300) + (100 * hit100) + (50 * hit50))) / (Math.floor(300 * (hit300 + hit100 + hit50 + miss)))) * 100;
    //https://osu.ppy.sh/wiki/en/FAQ#grades
    let [grade, gradeLazer] = ['D', 'D'];
    if (hit300 / totalhits > 0.6) {
        grade = 'C';
    }
    if ((hit300 / totalhits > 0.7 && miss == 0) || (hit300 / totalhits > 0.8)) {
        grade = 'B';
    }
    if ((hit300 / totalhits > 0.8 && miss == 0) || (hit300 / totalhits > 0.9)) {
        grade = 'A';
    }
    if (Math.abs(hit300 / totalhits) > 0.9 && miss == 0 && Math.abs(hit50 / totalhits) < 0.01) {
        grade = 'S';
    }
    if (hit100 < 1 && hit50 < 1 && miss == 0) {
        grade = 'SS';
        gradeLazer = 'SS';
    }
    if (equation >= 70) {
        grade = 'C';
    }
    if (equation >= 80) {
        grade = 'B';
    }
    if (equation >= 90) {
        grade = 'A';
    }
    if (equation >= 95 && miss == 0) {
        gradeLazer = 'S';
    }

    const finalarr = {
        rank_legacy: grade,
        rank: gradeLazer,
        accuracy: equation,
    };

    return finalarr;
}
/**
 * 
 * @param hit300 - hit 300s/greats (100%)
 * @param hit100 - hit 100s/good (50%)
 * @param miss - misses (0%)
 * @returns an array containing grades and accuracy
 */
export function taiko(hit300: number, hit100: number, miss: number) {
    const equation = (Math.abs(hit300 + (hit100 / 2))) / (Math.abs(hit300 + hit100 + miss));
    //grade = 'https://osu.ppy.sh/wiki/en/FAQ#grades'
    let [grade, gradeLazer] = ['D', 'D'];
    if (equation >= 0.8) {
        [grade, gradeLazer] = ['B', 'B'];
    }
    if (equation >= 0.9) {
        [grade, gradeLazer] = ['A', 'B'];
    }
    if (equation >= 0.95) {
        grade = 'S';
    }
    if (equation >= 0.95 && miss == 0) {
        gradeLazer = 'S';
    }
    if (equation == 1) {
        [grade, gradeLazer] = ['SS', 'SS'];
    }
    const finalarr = {
        rank_legacy: grade,
        rank: gradeLazer,
        accuracy: equation * 100,
    };
    return finalarr;

}
/**
 * 
 * @param hit300 - fruits caught
 * @param hit100 - drops caught
 * @param hit50 - droplets caught
 * @param miss - misses
 * @param hitkatu - droplets missed
 * @returns an array containing grades and accuracy
 */
export function fruits(hit300: number, hit100: number, hit50: number, hitkatu: number, miss: number) {
    const equation = Math.floor(hit300 + hit100 + hit50) / Math.floor(hit300 + hit100 + hit50 + hitkatu + miss);
    let [grade, gradeLazer] = ['D', 'D'];
    if (equation >= 0.85) {
        [grade, gradeLazer] = ['C', 'C'];
    }
    if (equation >= 0.9) {
        [grade, gradeLazer] = ['B', 'B'];
    }
    if (equation >= 0.94) {
        [grade, gradeLazer] = ['A', 'A'];
    }
    if (equation >= 0.98) {
        [grade, gradeLazer] = ['S', 'S'];
    }
    if (equation == 1) {
        [grade, gradeLazer] = ['SS', 'SS'];
    }

    const finalarr = {
        rank_legacy: grade,
        rank: gradeLazer,
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
 * @returns an array containing grades and accuracy
 */
export function mania(hit300max: number, hit300: number, hit200: number, hit100: number, hit50: number, miss: number) {
    const equation = Math.floor((300 * (hit300max + hit300)) + (200 * hit200) + (100 * hit100) + (50 * hit50)) / Math.floor(300 * (hit300max + hit300 + hit200 + hit100 + hit50 + miss));
    let [grade, gradeLazer] = ['D', 'D'];
    if (equation >= 0.7) {
        [grade, gradeLazer] = ['C', 'C'];
    }
    if (equation >= 0.8) {
        [grade, gradeLazer] = ['B', 'B'];
    }
    if (equation >= 0.9) {
        [grade, gradeLazer] = ['A', 'A'];
    }
    if (equation >= 0.95) {
        [grade, gradeLazer] = ['S', 'S'];
    }
    if (equation == 1) {
        [grade, gradeLazer] = ['SS', 'SS'];
    }
    const finalarr = {
        rank_legacy: grade,
        rank: gradeLazer,
        accuracy: equation * 100,
    };
    return finalarr;
}

/**
 * convert a string into an osu! rank/grade
 */
function checkGrade(string: string, defaultRank?: types.Rank) {
    let grade: types.Rank;

    if (!defaultRank) {
        defaultRank = 'A';
    }

    switch (true) {
        case string.toUpperCase().includes('SSH'):
            grade = 'XH';
            break;
        case string.toUpperCase().includes('SS'):
            grade = 'X';
            break;
        case string.toUpperCase().includes('SH'):
            grade = 'SH';
            break;
        case string.toUpperCase().includes('S'):
            grade = 'S';
            break;
        case string.toUpperCase().includes('A'):
            grade = 'A';
            break;
        case string.toUpperCase().includes('B'):
            grade = 'B';
            break;
        case string.toUpperCase().includes('C'):
            grade = 'C';
            break;
        case string.toUpperCase().includes('D'):
            grade = 'D';
            break;
        case string.toUpperCase().includes('F'):
            grade = 'F';
            break;
        default:
            grade = defaultRank;
            break;
    }
    return grade;
}