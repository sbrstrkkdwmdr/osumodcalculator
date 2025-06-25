// https://osu.ppy.sh/wiki/en/Gameplay/Game_modifier_%28lazer%29

import { types } from "..";

/**
 * lazer mods
 */
export const Mods: types.ModDetailed[] = [
    {
        name: 'Transform',
        acronym: 'TR',
        incompatible: ['WG', 'MG', 'RP', 'FR', 'DP'],
        enum: -1,
        restrictMode: ['osu'],
    },
    {
        name: 'Wiggle',
        acronym: 'WG',
        incompatible: ['TR', 'MG', 'RP', 'DP'],
        enum: -1,
        restrictMode: ['osu'],
    },
    {
        name: 'Spin In',
        acronym: 'SI',
        incompatible: ['HD', 'GR', 'DF', 'TC', 'AD', 'DP'],
        enum: -1,
        restrictMode: ['osu'],
    },
    {
        name: 'Grow',
        acronym: 'GR',
        incompatible: ['SI', 'DF', 'TC', 'AD', 'DP'],
        enum: -1,
        restrictMode: ['osu'],
    },
    {
        name: 'Deflate',
        acronym: 'DF',
        incompatible: ['SI', 'GR', 'TC', 'AD', 'DP'],
        enum: -1,
        restrictMode: ['osu'],
    },
    {
        name: 'Wind Up',
        acronym: 'WU',
        incompatible: ['HT', 'DC', 'DT', 'NC', 'WD', 'AS'],
        enum: -1,
    },
    {
        name: 'Wind Down',
        acronym: 'WD',
        incompatible: ['HT', 'DC', 'DT', 'NC', 'WD', 'AS'],
        enum: -1,
    },
    {
        name: 'Traceable',
        acronym: 'TC',
        incompatible: ['HD', 'TP', 'SI', 'GR', 'DF'],
        enum: -1,
        restrictMode: ['osu'],
    },
    {
        name: 'Barrel Roll',
        acronym: 'BR',
        incompatible: ['BU'],
        enum: -1,
        restrictMode: ['osu'],
    },
    {
        name: 'Approach Different',
        acronym: 'AD',
        incompatible: ['HD', 'TP', 'SI', 'GR', 'DF', 'FR'],
        enum: -1,
        restrictMode: ['osu'],
    },
    {
        name: 'Floating Fruits',
        acronym: 'FF',
        incompatible: [],
        enum: -1,
        restrictMode: ['fruits'],
    },
    {
        name: 'Muted',
        acronym: 'MU',
        incompatible: [],
        enum: -1,
    },
    {
        name: 'No Scope',
        acronym: 'NS',
        incompatible: ['BM'],
        enum: -1,
        restrictMode: ['osu', 'fruits'],
    },
    {
        name: 'Magnetised',
        acronym: 'MG',
        incompatible: ['AT', 'CN', 'RX', 'AP', 'TR', 'WG', 'RP', 'BU', 'DP'],
        enum: -1,
        restrictMode: ['osu'],
    },
    {
        name: 'Repel',
        acronym: 'RP',
        incompatible: ['AT', 'CN', 'AP', 'TR', 'MG', 'BU', 'DP'],
        enum: -1,
        restrictMode: ['osu'],
    },
    {
        name: 'Adaptive Speed',
        acronym: 'AS',
        incompatible: ['HT', 'DC', 'DT', 'NC', 'AT', 'CN', 'WU', 'WD'],
        enum: -1,
        restrictMode: ['osu', 'taiko', 'mania'],
    },
    {
        name: 'Freeze Frame',
        acronym: 'FR',
        incompatible: ['TR', 'AD', 'DP'],
        enum: -1,
        restrictMode: ['osu'],
    },
    {
        name: 'Bubbles',
        acronym: 'BU',
        incompatible: ['BR', 'MG', 'RP'],
        enum: -1,
        restrictMode: ['osu'],
    },
    {
        name: 'Synesthesia',
        acronym: 'SY',
        incompatible: [],
        enum: -1,
        restrictMode: ['osu'],
    },
    {
        name: 'Depth',
        acronym: 'DP',
        incompatible: ['HD', 'TP', 'TR', 'WG', 'SI', 'GR', 'DP', 'TC', 'MG', 'RP', 'FR'],
        enum: -1,
        restrictMode: ['osu'],
    },
    {
        name: 'Bloom',
        acronym: 'BM',
        incompatible: ['FL', 'NS', 'TD'],
        enum: -1,
        restrictMode: ['osu'],
    },
];
