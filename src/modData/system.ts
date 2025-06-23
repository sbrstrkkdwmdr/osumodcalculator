// https://osu.ppy.sh/wiki/en/Gameplay/Game_modifier_%28lazer%29

import { types } from "..";

/**
 * lazer mods
 */
export const Mods: types.ModDetailed[] = [
    {
        name: 'Score V2',
        acronym: 'SV2',
        incompatible: [],
        enum: 536870912
    },
    {
        name: 'Touch Device',
        acronym: 'TD',
        incompatible: ['AT', 'CN', 'AP', 'BM'],
        enum: 4
    },
];
