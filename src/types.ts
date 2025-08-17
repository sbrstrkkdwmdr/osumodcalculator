/**
 * dictionary type
 * 
 * example usage:
 * ```ts
 * const test:Dict = {
 * one: 'string'
 * two: NaN
 * }
 * 
 * const second_test:Dict = {}
 * ```
 */
export type Dict = { [key: string]: any; };

/**
 * Mod structure in osu! api v2 (when header is set to after 20220705)
 * 
 * https://osu.ppy.sh/docs/index.html#api-versions
 * 
 * 
 */
export type ApiMod = {
    name?: string,
    acronym: string;
    settings?: {
        retries?: number, // EZ
        speed_change?: number, // HT, DC, DT, NC
        adjust_pitch?: boolean, // HT, DT, WU, WD, AS
        restart?: boolean, // SD, PF, AC
        only_fade_approach_circles?: boolean, //HD
        follow_delay?: number, //FL
        size_multiplier?: number, //FL
        combo_based_size?: boolean, //FL
        minimum_accuracy?: number, //AC
        accuracy_judge_mode?: number, //AC
        seed?: number, //TP, RD
        metronome?: boolean,//TP
        circle_size?: number,//DA
        approach_rate?: number,//DA
        drain_rate?: number,//DA
        overall_difficulty?: number,//DA
        extended_limits?: boolean,//DA
        no_slider_head_accuracy?: boolean, //CL
        classic_note_lock?: boolean, //CL
        always_play_tail_sample?: boolean, //CL
        fade_hit_circle_early?: boolean, //CL
        classic_health?: boolean, //CL
        angle_sharpness?: number, //RD
        reflection?: string, //MR
        strength?: number; //WG
        start_scale?: number, //GR, DF
        initial_rate?: number; //WU, WD, AS
        final_rate?: number; //WU, WD
        spin_speed?: number, //BR
        direction?: string, //BR
        scale?: number, //AD
        style?: string, //AD
        inverse_muting?: boolean, //MU
        enable_metronome?: boolean, //MU
        mute_combo_count?: number, //MU
        affects_hit_sounds?: boolean, //MU
        hidden_combo_count?: number, //NS,
        attraction_strength?: number, //MG
        max_depth?: number, //DP
        show_approach_circles?: boolean, //DP
        max_size_combo_count?: number, //BM
        max_cursor_size?: number, //BM
    };
};

export type GameMode = 'osu' | 'taiko' | 'fruits' | 'mania';

export type Rank = 'XH' | 'X' | 'SH' | 'S' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F';

/**
 * mods from stable
 */
export type ModLegacy =
    'EZ' | 'HD' | 'FI' | 'HT' | 'DT' | 'NC' | 'HR' | 'FL' | 'SD' | 'PF' | 'NF' | 'AT' | 'CN' | 'RX' | 'AP' | 'TP' | 'SO' | 'TD' | '1K' | '2K' | '3K' | '4K' | '5K' | '6K' | '7K' | '8K' | '9K' | 'CO' | 'RD' | 'MR' | 'SV2';

/**
 * All mods
 */
export type Mod = ModLegacy | 'BM' | 'DP' | 'SY' | 'BU' | '10K' | 'HO' | 'CS' | 'IN' | 'SW' | 'NR' | 'AC' | 'DC' | 'BL' | 'ST' | 'DA' | 'CL' | 'AL' | 'SG' | 'TR' /**transform */ | 'WG' | 'SI' | 'GR' | 'DF' | 'WU' | 'WD' | 'TC' /**traceable */ | 'BR' | 'AD' | 'MU' | 'NS' | 'MG' | 'RP' | 'AS' | 'FF' | 'FR' | 'MF';

export type ModLegacyLong = 'Easy' | 'Hidden' | 'Fade In' | 'Half Time' | 'Double Time' | 'Nightcore' | 'Hard Rock' | 'Flashlight' | 'Sudden Death' | 'Perfect' | 'No Fail' | 'Autoplay' | 'Cinema' | 'Relax' | 'Autopilot' | 'Target Practice' | 'Spun Out' | 'Touch Device' | '1K' | '2K' | '3K' | '4K' | '5K' | '6K' | '7K' | '8K' | '9K' | 'Co-op' | 'Random' | 'Mirror' | 'Score V2';

export type ModLong = ModLegacyLong | 'Bloom' | 'Depth' | 'Synesthesia' | 'Bubbles' | '10K' | 'Hold Off' | 'Constant Speed' | 'Invert' | 'Swap' | 'No Release' | 'Accuracy Challenge' | 'Cover' | 'Daycore' | 'Blinds' | 'Strict Tracking' | 'Difficulty Adjust' | 'Classic' | 'Alternate' | 'Single Tap' | 'Transform' | 'Wiggle' | 'Spin In' | 'Grow' | 'Deflate' | 'Wind Up' | 'Wind Down' | 'Traceable' | 'Barrel Roll' | 'Approach Different' | 'Muted' | 'No Scope' | 'Magnetised' | 'Repel' | 'Adaptive Speed' | 'Floating Fruits' | 'Freeze Frame' | 'Moving Fast';

export interface ModDetailed {
    name: ModLong,
    acronym: Mod,
    incompatible: string[], // use acronyms. if it only applies to a specific mode prefix with (mode) or (!mode) if the opposite
    enum: number, // use -1 if unknown / NA
    restrictMode?: GameMode[], // IF this isnt in all modes, then list which ones it is in here
}