export type Dict = { [key: string]: any; };

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
export type ModList =
    'EZ' | 'HD' | 'FI' | 'HT' | 'DT' | 'NC' | 'HR' | 'SD' | 'PF' | 'FL' | 'NF' | 'AT' | 'RX' | 'AP' | 'TP' | 'SO' | '1K' | '2K' | '3K' | '4K' | '5K' | '6K' | '7K' | '8K' | '9K' | 'CP' | 'RD' | 'MR';

export type GameMode = 'osu' | 'taiko' | 'fruits' | 'mania';

export type Rank = 'XH' | 'X' | 'SH' | 'S' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F';

export type Mods =
    'EZ' | 'HD' | 'FI' | 'HT' | 'DT' | 'NC' | 'HR' | 'FL' | 'SD' | 'PF' | 'NF' | 'AT' | 'CM' | 'RL' | 'AP' | 'TP' | 'SO' | 'TD' | '1K' | '2K' | '3K' | '4K' | '5K' | '6K' | '7K' | '8K' | '9K' | 'CP' | 'RD' | 'MR' | 'V2';

export type ModsLazer = Mods | 'DC' | 'BL' | 'ST' /**strict tracking */ | 'DA' | 'CL' | 'AL' | 'ST' /**single tap */ | 'TR' /**transform */ | 'WI' | 'SI' | 'GR' | 'DF' | 'WU' | 'WD' | 'TR' /**traceable */ | 'BR' | 'AD' | 'MU' | 'NS' | 'MG' | 'RP' | 'AS' | 'FF';

export type ModsLong = 'Easy' | 'Hidden' | 'Fade in' | 'Half Time' | 'Double Time' | 'Nightcore' | 'Hard Rock' | 'Flashlight' | 'Sudden Death' | 'Perfect' | 'No Fail' | 'Auto' | 'Cinema' | 'Relax' | 'Autopilot' | 'Target Practice' | 'Spun Out' | 'Touch device' | '1K' | '2K' | '3K' | '4K' | '5K' | '6K' | '7K' | '8K' | '9K' | 'Co-op' | 'Random' | 'Mirror' | 'ScoreV2';

export type ModsLazerLong = ModsLong | 'Daycore' | 'Blinds' | 'Strict Tracking' | 'Difficulty Adjust' | 'Classic' | 'Alternate' | 'Single Tap' | 'Transform' | 'Wiggle' | 'Spin In' | 'Grow' | 'Deflate' | 'Wind Up' | 'Wind Down' | 'Traceable' | 'Barrel Roll' | 'Approach Different' | 'Muted' | 'No Scope' | 'Magnetised' | 'Repel' | 'Adaptive Speed' | 'Freeze Frame';