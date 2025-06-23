import * as omc from '.';

test('acr->int', () => {
    const fn = omc.mod.toInt;
    let i = fn(['EZ', 'HD', 'DT']);
    expect(i).toBe(74);
});

test('int->acr', () => {
    const fn = omc.mod.intToAcronym;
    let i = fn(88);
    expect(i.includes('HD')).toBe(true);
    expect(i.includes('HR')).toBe(true);
    expect(i.includes('DT')).toBe(true);
    expect(i.includes('EZ')).toBe(false);
});

test('full->acr', () => {
    const fn = omc.mod.nameToAcronym;
    const mods = ['Fade In', 'Magnetised', 'Single Tap'];
    let out = fn(mods);
    expect(out.length).toBe(3);
    expect(out[0]).toBe('FI');
    expect(out[1]).toBe('MG');
    expect(out[2]).toBe('SG');
});

test('acr->full', () => {
    const fn = omc.mod.acronymToName
    const mods:omc.types.Mod[] = ['ST', 'AC', 'TP'];
    let out = fn(mods);
    expect(out.length).toBe(3);
    expect(out[0]).toBe('Strict Tracking');
    expect(out[1]).toBe('Accuracy Challenge');
    expect(out[2]).toBe('Target Practice');
});

test('duplicate', () => {
    const fn = omc.mod.removeDupe;
    const mods:omc.types.Mod[] = ['HD', 'DT', 'HR', 'DT'];
    let out = fn(mods);
    expect(out.length).toBe(3);
    expect(out[0]).toBe('HD');
    expect(out[1]).toBe('DT');
    expect(out[2]).toBe('HR');
})

test('order', () => {
    const fn = omc.mod.order;
    const mods:omc.types.Mod[] = ['DT', 'HR', 'HD',];
    let out = fn(mods);
    expect(out.length).toBe(3);
    expect(out[0]).toBe('HD');
    expect(out[1]).toBe('DT');
    expect(out[2]).toBe('HR');
})