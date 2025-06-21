import types = require("./src/types");


export type AccGrade = {
    grade: string,
    gradeLazer: string,
    accuracy: number;
};
export type Values = {
    cs: number,
    ar: number,
    od: number,
    hp: number,
    bpm?: number,
    length?: number,
    mods?: string,
    speedMult?: number,
    error?: string | boolean,
    details?: {
        csRadius: number,
        arMs: number,
        odMs: OverallDifficulty,
        lengthFull: string,
    };
};