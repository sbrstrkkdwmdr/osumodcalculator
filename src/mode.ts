import { types } from ".";

/**
 * convert a mode name into it's corresponding integer value
 */
export function toInt(mode: string): number {
    switch (mode) {
        case 'osu!std': case 'std': case 'osu': case 'o': case 'standard':
            return 0;
        case 'osu!taiko': case 'taiko': case 't':
            return 1;
        case 'osu!catch': case 'catch': case 'c': case 'fruits': case 'ctb': case 'catch the beat':
            return 2;
        case 'osu!mania': case 'mania': case 'm':
            return 3;
        default:
            return 0;
    }
}

/**
 * convert an integer into it's corresponding mode name
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