import { readable } from 'svelte/store';
import { browser } from '$app/environment';
import { count_time } from '../stores/stores';

export const Timer_ms = readable(0, (set) => {
    if (!browser) return;

    let start = performance.now();

    function update(time: DOMHighResTimeStamp) {
        const elapsed = time - start;

        const ms = Math.floor(elapsed % 1000);
        count_time.set(ms);
        set(ms);

        requestAnimationFrame(update);
    }

    requestAnimationFrame(update);

    return () => {

    };
});
