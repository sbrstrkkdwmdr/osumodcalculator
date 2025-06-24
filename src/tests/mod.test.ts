import { mod, types } from '..';

test('acr->int', () => {
    const fn = mod.toInt;
    let i = fn(['EZ', 'HD', 'DT']); // => 74
    expect(i).toBe(74);
});

test('int->acr', () => {
    const fn = mod.intToAcronym;
    let i = fn(88); // => ['HD', 'DT', 'HR']
    expect(i.includes('HD')).toBe(true);
    expect(i.includes('HR')).toBe(true);
    expect(i.includes('DT')).toBe(true);
    expect(i.includes('EZ')).toBe(false);
});

test('full->acr', () => {
    const fn = mod.nameToAcronym;
    const mods = ['Fade In', 'Magnetised', 'Single Tap'];
    let out = fn(mods); // => ['FI', 'MG', 'SG]
    expect(out.length).toBe(3);
    expect(out[0]).toBe('FI');
    expect(out[1]).toBe('MG');
    expect(out[2]).toBe('SG');
});

test('acr->full', () => {
    const fn = mod.acronymToName;
    const mods: types.Mod[] = ['ST', 'AC', 'TP'];
    let out = fn(mods); // => ['Strict Tracking', 'Accuracy Challenge','Target Practice']
    expect(out.length).toBe(3);
    expect(out[0]).toBe('Strict Tracking');
    expect(out[1]).toBe('Accuracy Challenge');
    expect(out[2]).toBe('Target Practice');
});

test('duplicate', () => {
    const fn = mod.removeDupe;
    const mods: types.Mod[] = ['HD', 'DT', 'HR', 'DT'];
    let out = fn(mods); // => ['HD','DT','HR']
    expect(out.length).toBe(3);
    expect(out[0]).toBe('HD');
    expect(out[1]).toBe('DT');
    expect(out[2]).toBe('HR');
});

test('order', () => {
    const fn = mod.order;
    const mods: types.Mod[] = ['DT', 'HR', 'HD',];
    let out = fn(mods); // => ['HD','DT','HR']
    expect(out.length).toBe(3);
    expect(out[0]).toBe('HD');
    expect(out[1]).toBe('DT');
    expect(out[2]).toBe('HR');
});

test('disallowed', () => {
    const fn = mod.disallowed;
    let out = fn('osu');
    console.log(out);
    out = fn('taiko');
    console.log(out);
    out = fn('fruits');
    console.log(out);
    out = fn('mania');
    console.log(out);
});

test('remove disallowed', () => {
    const fn = mod.removeDisallowed;
    const mods: types.Mod[] = ['4K', 'EZ', 'FI', 'DT',];
    const mode = 'osu';
    const fixed = fn(mods, mode); // => ['EZ', 'DT']
    expect(fixed.length).toBe(2);
    expect(fixed[0]).toBe('EZ');
    expect(fixed[1]).toBe('DT');
});

test('incompatible', () => {
    const fn = mod.removeIncompatible;
    const mods: types.Mod[] = ['EZ', 'HD', 'DT', 'NC', 'HR'];
    const fixed = fn(mods); // => ['EZ', 'HD', 'DT']
    expect(fixed.length).toBe(3);
    expect(fixed[0]).toBe('EZ');
    expect(fixed[1]).toBe('HD');
    expect(fixed[2]).toBe('DT');
});

test('fix all', () => {
    const fn = mod.fix;
    const mods: types.Mod[] = ['DT', 'HR', 'HD', 'EZ', '4K', 'HD'];
    const fixed = fn(mods);
    expect(fixed.length).toBe(3);
    expect(fixed[0]).toBe('HD');
    expect(fixed[1]).toBe('DT');
    expect(fixed[2]).toBe('HR');
});

test('from string', () => {
    const mods = 'HDDTHR';
    const fixed = mod.fromString(mods); // => ['HD','DT','HR']
    expect(fixed.length).toBe(3);
    expect(fixed[0]).toBe('HD');
    expect(fixed[1]).toBe('DT');
    expect(fixed[2]).toBe('HR');
});