import { fruits, mania, standard, taiko } from '../accuracy';

{
    // https://osu.ppy.sh/scores/1597034515
    const hit300 = 232;
    const hit100 = 23;
    const hit50 = 0;
    const miss = 0;
    const calc = standard(hit300, hit100, hit50, miss);
    /**
     * => {
     * accuracy: 93.98
     * rank_legacy: 'S'
     * rank: 'A'
     * }
     */
}
{
    // https://osu.ppy.sh/scores/1860658559
    const hit300 = 90;
    const hit100 = 25;
    const miss = 6;
    const calc = taiko(hit300, hit100, miss);
    /**
     * => {
     * accuracy: 84.71
     * rank_legacy: 'B'
     * rank: 'B'
     * }
     */
}
{
    // https://osu.ppy.sh/scores/5045322123
    const hit300 = 419;
    const hit100 = 2; // drops
    const hit50 = 209; // droplets
    const hitkatu = 234 - 209; // droplet miss
    const miss = 87; // miss
    const calc = fruits(hit300, hit100, hit50, hitkatu, miss);
    /**
     * => {
     * accuracy: 84.90
     * rank: 'D'
     * }
     */
}
{
    // https://osu.ppy.sh/scores/5045329156
    const hitgeki = 162;
    const hit300 = 178;
    const hitkatu = 92;
    const hit100 = 32;
    const hit50 = 16;
    const miss = 25;
    const calc = mania(hitgeki, hit300, hitkatu, hit100, hit50, miss, true);
    /**
     * => {
     * accuracy: 81.29
     * rank: 'A'
     * }
     */
}