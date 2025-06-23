/**
 * convert a player's rank into their badge weight seeding rank
 * 
 * @includeExample  src/examples/extra.ts:3-5
 */
export function bws(badges: number, rank: number) {
    return badges > 0 ?
        rank ** (0.9937 ** (badges ** 2)) :
        rank;
}

/**
 * find a player's recommended map difficulty
 * 
 * @includeExample src/examples/extra.ts:7-8
 */
export function recdiff(pp: number) {
    return (pp ** 0.4) * 0.195;
}