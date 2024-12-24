import { readable } from 'svelte/store';
import { count_time } from '$lib/stores/stores';

export const Timer_ms = readable(0, (set) => {
    

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
