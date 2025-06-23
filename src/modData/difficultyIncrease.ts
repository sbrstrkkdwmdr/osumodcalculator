// https://osu.ppy.sh/wiki/en/Gameplay/Game_modifier_%28lazer%29

import { types } from "..";

/**
 * lazer mods
 */
export const Mods: types.ModDetailed[] = [
    {
        name: 'Hard Rock',
        acronym: 'HR',
        incompatible: ['EZ', 'DA', '(osu)MR'],
        enum: 16
    },
    {
        name: 'Sudden Death',
        acronym: 'SD',
        incompatible: ['NF', 'PF', 'CN', 'TP'],
        enum: 32
    },
    {
        name: 'Perfect',
        acronym: 'PF',
        incompatible: ['No Fail', 'SD', 'CN', 'TP'],
        enum: 16384
    },
    {
        name: 'Double Time',
        acronym: 'DT',
        incompatible: ['HT', 'DC', 'NC', 'AS', 'WU', 'WD'],
        enum: 64
    },
    {
        name: 'Nightcore',
        acronym: 'NC',
        incompatible: ['HT', 'DC', 'DT', 'AS', 'WU', 'WD'],
        enum: 512
    },
    {
        name: 'Fade In',
        acronym: 'FI',
        incompatible: ['HD', 'CO', 'FL'],
        enum: 1048576
    },
    {
        name: 'Hidden',
        acronym: 'HD',
        incompatible: ['FI', 'CO', '(mania)FL', 'SI', 'TC', 'AD', 'DP'],
        enum: 8
    },
    {
        name: 'Cover',
        acronym: 'CO',
        incompatible: ['HD', 'FI', 'FL'],
        enum: -1
    },
    {
        name: 'Flashlight',
        acronym: 'FL',
        incompatible: ['FI', '(mania)HD', 'CO', 'BL', 'BM'],
        enum: 1024
    },
    {
        name: 'Blinds',
        acronym: 'BL',
        incompatible: ['FL'],
        enum: -1
    },
    {
        name: 'Strict Tracking',
        acronym: 'ST',
        incompatible: ['TP', 'CL'],
        enum: -1
    },
    {
        name: 'Accuracy Challenge',
        acronym: 'AC',
        incompatible: ['(!taiko)EZ', 'NF', 'PF', 'CN'],
        enum: -1
    }

];
