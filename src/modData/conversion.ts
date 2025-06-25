// https://osu.ppy.sh/wiki/en/Gameplay/Game_modifier_%28lazer%29

import { types } from "..";

/**
 * lazer mods
 */
export const Mods: types.ModDetailed[] = [
    {
        name: 'Target Practice',
        acronym: 'TP',
        incompatible: ['SD', 'ST', 'SO', 'RD', 'TC', 'AD', 'DP'],
        enum: 8388608,
        restrictMode: ['osu'],
    },
    {
        name: 'Difficulty Adjust',
        acronym: 'DA',
        incompatible: ['EZ', 'HR'],
        enum: -1
    },
    {
        name: 'Classic',
        acronym: 'CL',
        incompatible: ['(osu)ST'],
        enum: -1,
        restrictMode: ['osu', 'taiko'],
    },
    {
        name: 'Random',
        acronym: 'RD',
        incompatible: ['TP', 'SW'],
        enum: 2097152,
        restrictMode: ['osu', 'taiko', 'mania'],
    },
    {
        name: 'Mirror',
        acronym: 'MR',
        incompatible: ['(osu)HR'],
        enum: 1073741824,
        restrictMode: ['osu', 'fruits', 'mania'],
    },
    {
        name: 'Alternate',
        acronym: 'AL',
        incompatible: ['AT', 'CN', 'RX', 'SG'],
        enum: -1,
        restrictMode: ['osu'],
    },
    {
        name: 'Swap',
        acronym: 'SW',
        incompatible: ['RD'],
        enum: -1,
        restrictMode: ['taiko'],
    },
    {
        name: 'Single Tap',
        acronym: 'SG',
        incompatible: ['AT', 'CN', 'RX', 'AL'],
        enum: -1,
        restrictMode: ['osu', 'taiko'],
    },
    {
        name: 'Invert',
        acronym: 'IN',
        incompatible: ['HO'],
        enum: -1,
        restrictMode: ['mania'],
    },
    {
        name: 'Constant Speed',
        acronym: 'CS',
        incompatible: [],
        enum: -1,
        restrictMode: ['taiko', 'mania'],
    },
    {
        name: 'Hold Off',
        acronym: 'HO',
        incompatible: ['NR', 'IN'],
        enum: -1,
        restrictMode: ['mania'],
    },
    {
        name: '1K',
        acronym: '1K',
        incompatible: [],
        enum: 67108864,
        restrictMode: ['mania'],
    },
    {
        name: '2K',
        acronym: '2K',
        incompatible: [],
        enum: 268435456,
        restrictMode: ['mania'],
    },
    {
        name: '3K',
        acronym: '3K',
        incompatible: [],
        enum: 134217728,
        restrictMode: ['mania'],
    },
    {
        name: '4K',
        acronym: '4K',
        incompatible: [],
        enum: 32768,
        restrictMode: ['mania'],
    },
    {
        name: '5K',
        acronym: '5K',
        incompatible: [],
        enum: 65536,
        restrictMode: ['mania'],
    },
    {
        name: '6K',
        acronym: '6K',
        incompatible: [],
        enum: 131072,
        restrictMode: ['mania'],
    },
    {
        name: '7K',
        acronym: '7K',
        incompatible: [],
        enum: 262144,
        restrictMode: ['mania'],
    },
    {
        name: '8K',
        acronym: '8K',
        incompatible: [],
        enum: 524288,
        restrictMode: ['mania'],
    },
    {
        name: '9K',
        acronym: '9K',
        incompatible: [],
        enum: 16777216,
        restrictMode: ['mania'],
    },
    {
        name: '10K',
        acronym: '10K',
        incompatible: [],
        enum: -1,
        restrictMode: ['mania'],
    },
];
