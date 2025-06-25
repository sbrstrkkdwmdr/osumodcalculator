// https://osu.ppy.sh/wiki/en/Gameplay/Game_modifier_%28lazer%29

import { types } from "..";

/**
 * lazer mods
 */
export const Mods: types.ModDetailed[] = [
    {
        name: 'Autoplay',
        acronym: 'AT',
        incompatible: ['CN', 'RX', 'AP', 'SO', 'AL', 'SG', 'MG', 'RP', 'AS', 'TD'],
        enum: 2048,
    },
    {
        name: 'Cinema',
        acronym: 'CN',
        incompatible: ['NF', 'SD', 'PF', 'AC', 'AT', 'RX', 'AP', 'SO', 'AL', 'SG', 'MG', 'RP', 'AS', 'TD'],
        enum: 4194304,
    },
    {
        name: 'Relax',
        acronym: 'RX',
        incompatible: ['AT', 'CN', 'AP', 'AL', 'SG', 'MG'],
        enum: 128,
        restrictMode: ['osu', 'taiko', 'fruits'],
    },
    {
        name: 'Autopilot',
        acronym: 'AP',
        incompatible: ['AT', 'CN', 'RX', 'SO', 'MG', 'RP'],
        enum: 8192,
        restrictMode: ['osu'],
    },
    {
        name: 'Spun Out',
        acronym: 'SO',
        incompatible: ['AT', 'CN', 'AP', 'TP'],
        enum: 4096,
        restrictMode: ['osu'],
    }
];
