import { extra } from '.';

test('bws', () => {
    const badges: number = 5;
    const rank: number = 10000;
    const seed = extra.bws(badges, rank);
    expect(seed).toBeCloseTo(2602, -0.5);
});

test('recommended stars', () => {
    const user_performance = 5000;
    const recommend_difficulty = extra.recdiff(user_performance); // 5.88 stars
    expect(recommend_difficulty).toBeCloseTo(5.885);
})