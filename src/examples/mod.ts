import { acronymToName, disallowed, fix, intToAcronym, nameToAcronym, order, removeDisallowed, removeDupe, removeIncompatible, toInt } from '../mod';
import { GameMode, Mod } from '../types';
{
    const mods: Mod[] = ['EZ', 'HD', 'DT'];
    acronymToName(mods); // => 74
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
    // to do: disallowed example
}
{
    const mods: Mod[] = ['4K', 'EZ', 'FI', 'DT',];
    const mode: GameMode = 'osu';
    removeDisallowed(mods, mode); // => ['EZ', 'DT']
}
{
    const mods: Mod[] = ['EZ', 'HD', 'DT', 'NC', 'HR'];
    removeIncompatible(mods); // => ['EZ', 'HD', 'DT']
}
{
    const mods: Mod[] = ['DT', 'HR', 'HD', 'EZ', '4K', 'HD'];
    const mode: GameMode = 'osu';
    fix(mods, mode); // => ['HD', 'DT', 'HR']
}