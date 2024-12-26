import { Timer_ms } from '$lib/util/time';
import { writable, derived, type Readable } from 'svelte/store';







export const count_char = writable(0);
export const actual_char = writable(0);

export const code_index = writable(0)
export const code_full = writable("");

export const count_time = writable(0);

export const state = writable({
    lines: {
        amount: 0,
        mult: 1,
        rate: 0,
    },

    coffee: {
        amount: 0,
        mult: 1,
        rate: 0,
    },

    bencoin: {
        amount: 10000,
        windows: 1,
        nodes: 1,
        current_windows: 1,
        speed: 0
    },
});

export const overallRate_ms = derived(state, ($state) => {
    return $state["lines"].rate * $state["lines"].mult;
});

export const overallRate_s = derived(state, ($state) => {
    return $state["lines"].rate * $state["lines"].mult*100;
});


export const unlocked = writable({
    section1: true,
    section2: false,
    section3: false,
    section4: false,
    section5: false,
    menu_bar: false,
    resume: false,
    email: false,
    linkedin: false,
    github: false,
    project1: false,
    project2: false,
    project3: false,
    project4: false,
    auto_enter: false,
    ben_coin: true,

    
});


export const active_tab = writable("code")


export interface GridItem {
    row: number;
    col: number;
}

export const windows = writable<GridItem[]>([
])

export const nodes = writable<GridItem[]>([
]);


export const window_speed = derived(state, ($state) => {
    const maximum = 50;
    const minimum = 1000;
    const max_upgrades = 10;
    let progress = minimum - (minimum - maximum)* (Math.pow(($state["bencoin"].speed/max_upgrades), .5))
    return progress;
});