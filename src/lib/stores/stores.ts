import { Timer_ms } from '$lib/util/time';
import { writable, derived, type Readable } from 'svelte/store';

export const count_char = writable(0);
export const actual_char = writable(0);

export const code_index = writable(0)
export const code_full = writable("");

export const count_time = writable(0);
export const is_brewing = writable(false);
export const can_brew = writable(false);


const defaultTheme = typeof window !== 'undefined' ? localStorage.getItem('theme') || 'light' : 'light';
export const theme = writable(defaultTheme);

theme.subscribe((value) => {
    if (typeof window !== 'undefined') {
        document.documentElement.setAttribute('data-theme', value);
        localStorage.setItem('theme', value);
        console.log(value)
    }
});

export const state = writable({
    lines: {
        amount: 1110,
        mult: 1,
        rate: .01,
    },

    coffee: {
        amount: 0
    },

    bencoin: {
        amount: 10009,
        windows: 1,
        nodes: 1,
        current_windows: 0,
        speed: 0
    },

    beans: {
        amount: 0
    },

    water: {
        amount: 0,
        pour: 60,
        speed: 1


    }
});


export const overallRate_ms = derived(state, ($state) => {
    return $state.lines.rate * $state.lines.mult * Math.pow(1.5, Math.sqrt($state.coffee.amount));
});

export const overallRate_s = derived(state, ($state) => {
    return $state.lines.rate * $state.lines.mult * Math.pow(1.5, Math.sqrt($state.coffee.amount)) * 100;
});


export const unlocked = writable({
    section1: false,
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
    auto_enter: true,
    ben_coin: false,
    coffee: false,
    auto_water: false,
    auto_bean: false

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

