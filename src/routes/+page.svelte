<script lang="ts">
    import { get, writable } from 'svelte/store';
    import IncrementButton from '$lib/components/buttons/incrementButton.svelte';
    import CounterDisplay from '$lib/components/displays/CounterDisplay.svelte';
    import { count_a, count_b, count_c, count_time } from '../lib/stores/counters';
    import { rate_a, rate_b, rate_c } from '../lib/stores/rates';
    import { Timer } from '../lib/util/time';

    export const code_count = writable(0);

    let intervalId: NodeJS.Timeout;

    const updateCounters = () => {
        count_a.update((n) => n + get(rate_a));
        count_b.update((n) => n + get(rate_b));
        count_c.update((n) => n + get(rate_c));
    };

    Timer.subscribe((time) => {
            updateCounters();
    });

	function formatCount(num: number): number | string {
		return num.toFixed(3)
	}

</script>

<div class="container h-[100vh] w-full m-auto flex justify-center items-center">
    <div class="flex flex-row gap-6">

        <div class="flex flex-col">
            <button on:click={() => rate_a.update(n => +(n + 0.001).toFixed(3))} class="outline rounded-md p-2 m-2">+.1/s rate_a</button>
			<button on:click={() => rate_a.update(n => +(n - 0.001).toFixed(3))} class="outline rounded-md p-2 m-2">-.1/s rate_a</button>
			<button on:click={() => rate_a.update(n => +(n + 0.01).toFixed(3))} class="outline rounded-md p-2 m-2">+1/s rate_a</button>
			<button on:click={() => rate_a.update(n => +(n - 0.01).toFixed(3))} class="outline rounded-md p-2 m-2">-1/s rate_a</button>
			<button on:click={() => rate_a.update(n => +(n + 0.1).toFixed(3))} class="outline rounded-md p-2 m-2">+10/s rate_a</button>
			<button on:click={() => rate_a.update(n => +(n - 0.1).toFixed(3))} class="outline rounded-md p-2 m-2">-10/s rate_a</button>
			<button on:click={() => rate_a.update(n => 0)} class="outline rounded-md p-2 m-2">clear rate_a</button>
			<button on:click={() => count_a.update(n => 0)} class="outline rounded-md p-2 m-2">clear count_a</button>
            <IncrementButton text="increment a" store={count_a} />
            <CounterDisplay text="a: " store={$count_a ? formatCount($count_a) : "0"} />
			<button class="outline rounded-md p-2 m-2">rate_a: {$rate_a}</button>
        </div>

        <!-- <div class="flex flex-col">
            <button on:click={() => rate_b.update(n => n + 1)} class="outline rounded-md p-2 m-2">+1/s rate_b</button>
            <button on:click={() => rate_b.update(n => n - 1)} class="outline rounded-md p-2 m-2">-1/s rate_b</button>
            <IncrementButton text="increment b" store={count_b} />
            <CounterDisplay text="b: " store={$count_b ? formatCount($count_b) : "0"} />
			<button class="outline rounded-md p-2 m-2">rate_b: {$rate_b}</button>
        </div>

        <div class="flex flex-col">
            <button on:click={() => rate_c.update(n => n + 1)} class="outline rounded-md p-2 m-2">+1/s rate_c</button>
            <button on:click={() => rate_c.update(n => n - 1)} class="outline rounded-md p-2 m-2">-1/s rate_c</button>
			<button on:click={() => rate_c.update(n => n + 10)} class="outline rounded-md p-2 m-2">+10/s rate_c</button>
            <button on:click={() => rate_c.update(n => n - 10)} class="outline rounded-md p-2 m-2">-10/s rate_c</button>
			<button on:click={() => rate_c.update(n => n + 100)} class="outline rounded-md p-2 m-2">+100/s rate_c</button>
            <button on:click={() => rate_c.update(n => n - 100)} class="outline rounded-md p-2 m-2">-100/s rate_c</button>
            <IncrementButton text="increment c" store={count_c} />
            <CounterDisplay text="b: " store={$count_c ? formatCount($count_c) : "0"} />
			<button class="outline rounded-md p-2 m-2">rate_c: {$rate_c}</button>
			<div class="mt-12"><CounterDisplay text="b: " store={$count_time ? formatCount($count_time) : "0"} /></div>
        </div> -->

    </div>
</div>
