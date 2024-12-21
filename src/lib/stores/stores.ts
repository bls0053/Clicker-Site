import { writable } from 'svelte/store';

export const count_char = writable(0);

export const code_index = writable(0)
export const code_full = writable("");
export const code_snippet = writable<string>("");

export const count_time = writable(0);

export const state = writable({
    lines: {
        amount: 100,
        mult: 1,
        rate: 0,
    },

    coffee: {
        amount: 20,
        mult: 1,
        rate: 0,
    },

    bencoin: {
        amount: 90,
        mult: 1,
        rate: 0,
    },
});

export const unlocked = writable({
    id1: true,
    id2: true,
    id3: false,
    id4: false,
    menu_bar: false,
    resume: false
});
