import { writable } from 'svelte/store';

export const count_char = writable(0);
export const count_lines = writable(0);

export const count_b = writable(0);
export const count_c = writable(0);
export const count_time = writable(0);


export const code_line = writable(0)
export const code_index = writable(0)

export const code_full = writable("");
export const code_snippet = writable<string>("");


export const state = writable({
    currency: 1000,
    rate: 0,
    unlocks: {},
  });