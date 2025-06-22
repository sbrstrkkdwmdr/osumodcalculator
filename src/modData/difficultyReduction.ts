// https://osu.ppy.sh/wiki/en/Gameplay/Game_modifier_%28lazer%29

import { types } from "..";

/**
 * lazer mods
 */
export const Mods: types.ModDetailed[] = [
    {
        name: 'Easy',
        acronym: 'EZ',
        incompatible: ['HR', '(!taiko)AC', 'DA'],
        enum: 2,
    },
    {
        name: 'No Fail',
        acronym: 'NF',
        incompatible: ['AC', 'PF', 'SD', 'CN'],
        enum: 1
    },
    {
        name: 'Half Time',
        acronym: 'HT',
        incompatible: ['DC', 'DT', 'NC', 'AS', 'WU', 'WD'],
        enum: 256,
    },
    {
        name: 'Daycore',
        acronym: 'DC',
        incompatible: ['HT', 'DT', 'NC', 'AS', 'WU', 'WD'],
        enum: -1,
    },
    {
        name: 'No Release',
        acronym: 'NC',
        incompatible: ['HO'],
        enum: -1,
    }
];
