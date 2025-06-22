/**
 * convert a player's rank into their badge weight seeding rank
 * 
 * example: 
 * ```ts
 * const badges:number = 5;
 * const rank:number = 10000; // 10,000
 * const seed = bws(badges, rank); // => 2602
 * ```
 */
export function bws(badges: number, rank: number) {
    return badges > 0 ?
        rank ** (0.9937 ** (badges ** 2)) :
        rank;
}

/**
 * find a player's recommended map difficulty
 * 
 * example:
 * ```ts
 * const user_performance = 5000;
 * const recommend_difficulty = recdiff(user_performance); // 5.88 stars
 * ```
 */
export function recdiff(pp: number) {
    return (pp ** 0.4) * 0.195;
}