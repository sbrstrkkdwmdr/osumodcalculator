import { mode } from '.';

test('str->int', () => {
    const fn = mode.toInt;
    let i = fn('ctb');
    expect(i).toBe(2);
    i = fn('std');
    expect(i).toBe(0);
    i = fn('taiko');
    expect(i).toBe(1);
    i = fn('m');
    expect(i).toBe(3);
});

test('int->str', () => {
    let fn = mode.toName;
    let name = fn(1);
    expect(name).toBe('taiko');
    name = fn(2);
    expect(name).toBe('fruits');
    name = fn(0);
    expect(name).toBe('osu');
    name = fn(3);
    expect(name).toBe('mania');
    name = fn(6);
    expect(name).toBe('osu');
});