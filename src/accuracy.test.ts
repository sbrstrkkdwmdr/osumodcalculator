import { accuracy, } from ".";

test('standard', () => {
    const hit300 = 232;
    const hit100 = 23;
    const hit50 = 0;
    const miss = 0;
    const calc = accuracy.standard(hit300, hit100, hit50, miss);
    expect(calc.accuracy).toBeCloseTo(93.985);
    expect(calc.rank_legacy).toBe('S');
    expect(calc.rank).toBe('A');
});

test('taiko', () => {
    const hit300 = 90;
    const hit100 = 25;
    const miss = 6;
    const calc = accuracy.taiko(hit300, hit100, miss);
    expect(calc.accuracy).toBeCloseTo(84.715);
    expect(calc.rank).toBe('B');
});

test('fruits', () => {
    // https://osu.ppy.sh/scores/5045322123
    const hit300 = 419;
    const hit100 = 2; // drops
    const hit50 = 209; // droplets
    const hitkatu = 234 - 209; // droplet miss
    const miss = 87; // miss
    const calc = accuracy.fruits(hit300, hit100, hit50, hitkatu, miss);
    expect(calc.accuracy).toBeCloseTo(84.905);
    expect(calc.rank).toBe('D');
});

test('mania', () => {
    // https://osu.ppy.sh/scores/5045329156
    const hitgeki = 162;
    const hit300 = 178;
    const hitkatu = 92;
    const hit100 = 32;
    const hit50 = 16;
    const miss = 25;
    const calc = accuracy.mania(hitgeki, hit300, hitkatu, hit100, hit50, miss, true);
    expect(calc.accuracy).toBeCloseTo(81.295);
    expect(calc.rank).toBe('B');
});