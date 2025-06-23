import * as omc from '.';

test('speed', () => {
    const mockedAdd = omc.stats.speed as jest.MockedFunction<typeof omc.stats.speed>;
    const pc = mockedAdd(1.15, { ar: 9.2, od: 8, bpm: 189, songLength: 189 });
});

test('modded', () => {
    const circleSize = 4;
    const approachRate = 10;
    const overallDifficulty = 5.5;
    const hp = 6;
    const bpm = 215;
    const songLength = 180;
    const mods: omc.types.ApiMod[] = [{
        acronym: 'DT',
        settings: {
            speed_change: 1.15
        }
    },
    {
        acronym: 'DA',
        settings: {
            circle_size: 3.5
        }
    }
    ];
    const moddedStats = omc.stats.modded({
        cs: circleSize,
        ar: approachRate,
        od: overallDifficulty,
        hp, bpm, songLength
    }, mods);
    expect(moddedStats.ar).toBe(10.39);
    expect(moddedStats.hp).toBe(6);
    expect(moddedStats.cs).toBe(3.5);
});