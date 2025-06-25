import { acronymToName, fix, fromString, intToAcronym, nameToAcronym, order, removeDupe, removeIncompatible, toInt, } from '../mod';
import { GameMode, Mod, ModLegacy } from '../types';
{
    const mods: ModLegacy[] = ['EZ', 'HD', 'DT'];
    toInt(mods); // => 74
}
{
    const modInt = 88;
    intToAcronym(modInt); // => ['HD', 'DT', 'HR']
}
{
    const mods = ['Fade In', 'Magnetised', 'Single Tap'];
    nameToAcronym(mods); // => ['FI', 'MG', 'SG]
}
{
    const mods: Mod[] = ['ST', 'AC', 'TP'];
    acronymToName(mods); // => ['Strict Tracking', 'Accuracy Challenge','Target Practice']
}
{
    const mods: Mod[] = ['HD', 'DT', 'HR', 'DT'];
    removeDupe(mods); // => ['HD','DT','HR']
}
{
    const mods: Mod[] = ['DT', 'HR', 'HD',];
    order(mods); // => ['HD','DT','HR']
}
{
    const mods: Mod[] = ['4K', 'FI', 'EZ', 'HD', 'DT', 'NC', 'HR'];
    removeIncompatible(mods); // => ['EZ', 'HD', 'DT']
}
{
    const mods: Mod[] = ['DT', 'HR', 'HD', 'EZ', '4K', 'HD'];
    const mode: GameMode = 'osu';
    fix(mods, mode); // => ['HD', 'DT', 'HR']
}
{
    const mods = 'HDDTHR';
    fromString(mods); // => ['HD','DT','HR']
}