import { types } from ".";

/**
 * convert a mode name into it's corresponding integer value
 * 
 * @includeExample src/examples/mode.ts:4-7
 */
export function toInt(mode: string): number {
    switch (mode) {
        case '0': case 'o': case 'osu': case 'osu!': case 'osu!standard': case 'osu!std': case 'std': case 'standard': case 'stable': case 'lazer':
            return 0;
        case '1': case 't': case 'taiko': case 'osu!taiko':
            return 1;
        case '2': case 'f': case 'fruits': case 'osu!fruits': case 'osu!catch': case 'catch': case 'c': case 'fruits': case 'ctb': case 'catch the beat':
            return 2;
        case '3': case 'm': case 'mania': case 'osu!mania':
            return 3;
        default:
            return 0;
    }
}

/**
 * convert an integer into its corresponding mode name
 * 
 * @includeExample src/examples/mode.ts:10-11
 */
export function toName(mode: number): types.GameMode {
    switch (mode) {
        case 0:
            return 'osu';
        case 1:
            return 'taiko';
        case 2:
            return 'fruits';
        case 3:
            return 'mania';
        default:
            return 'osu';
    }
}

/**
 * get the mode name from a given input
 * 
 * see toName() and toInt() for examples
 */
export function fromValue(value: any): types.GameMode | null {
    switch (value) {
        case 0: case '0': case 'o': case 'osu': case 'osu!': case 'osu!standard': case 'osu!std': case 'std': case 'standard': case 'stable': case 'lazer':
            return 'osu';
        case 1: case '1': case 't': case 'taiko': case 'osu!taiko':
            return 'taiko';
        case 2: case '2': case 'f': case 'fruits': case 'osu!fruits': case 'osu!catch': case 'catch': case 'c': case 'fruits': case 'ctb': case 'catch the beat':
            return 'fruits';
        case 3: case '3': case 'm': case 'mania': case 'osu!mania':
            return 'mania';
        default:
            return null;
    }
}