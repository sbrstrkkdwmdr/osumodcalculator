// following https://osu.ppy.sh/wiki/en/Gameplay/Game_modifier_%28lazer%29
// 2025-06-23
import { types } from '..';

import { Mods as auto } from './automation';
import { Mods as conv } from './conversion';
import { Mods as hard } from './difficultyIncrease';
import { Mods as easy } from './difficultyReduction';
import { Mods as fun } from './fun';

export const Mods: types.ModDetailed[] = easy
    .concat(hard)
    .concat(auto)
    .concat(conv) 
    .concat(fun); 