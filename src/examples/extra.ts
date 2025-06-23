import { bws, recdiff } from '../extra';

const badges: number = 5;
const rank: number = 10000;
const seed = bws(badges, rank); // => ~2602

const user_performance = 5000;
const recommend_difficulty = recdiff(user_performance); // => ~5.88
