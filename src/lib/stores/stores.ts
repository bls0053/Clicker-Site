import { writable } from 'svelte/store';

export const count_char = writable(0);

export const code_index = writable(0)
export const code_full = writable("");
export const code_snippet = writable<string>("");

export const count_time = writable(0);

export const state = writable({
    lines: 0,
    char_rate: 0,

    coffee: 0,
    coffee_rate: 0,

    coins: 0,
    coin_rate: 0
});



export const unlocks = writable({


});


