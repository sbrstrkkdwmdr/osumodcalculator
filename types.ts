export type OverallDifficultyObj = {
    hitwindow_300: number,
    hitwindow_100: number,
    hitwindow_50: number,
    od_num?: number,
}
export type ApproachRateObj = {
    ar: number,
    ms: number,
}
export type AccGra = {
    grade: string,
    accuracy: number
}
export type ValObj = {
    cs: number,
    ar: number,
    od: number,
    hp: number,
    bpm?:number,
    length?:number,
    mods?:string,
    error?:string|boolean,
    details?: {
        csRadius: number,
        arMs: number,
        odMs: OverallDifficultyObj,
        lengthFull:string,
    }
}
export type ModList =
    'EZ' | 'HD' | 'FI' | 'HT' | 'DT' | 'NC' | 'HR' | 'SD' | 'PF' | 'FL' | 'NF' | 'AT' | 'RX' | 'AP' | 'TP' | 'SO' | '1K' | '2K' | '3K' | '4K' | '5K' | '6K' | '7K' | '8K' | '9K' | 'CP' | 'RD' | 'MR'