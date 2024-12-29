<script lang="ts">
    import { writable, type Writable } from 'svelte/store';
    import { actual_char } from '$lib/stores/stores';
    
    export let store: Writable<number>;
    export let text: string;
    export let paused: boolean;

    const pressedKeys = new Set<string>();

   
    const handleKeyup = (event: KeyboardEvent) => {

        if (event.key !== "Enter") {
            pressedKeys.delete(event.key); 
        }
    };

    const handleClick = () => {

        if (!paused) {
            store.update((n) => n + 111);
            
        }
    };

    const handleKeydown = (event: KeyboardEvent) => {
        if (event.key === "Enter") {
            event.preventDefault();
        }
        else {
            if (!paused && !pressedKeys.has(event.key) && event.key !== "Enter") {

            pressedKeys.add(event.key);
            store.update((n) => n + 1);
            }
        }
    };
</script>


<svelte:window on:keydown={handleKeydown} on:keyup={handleKeyup} />

<button tabindex="-1"
    on:click={handleClick}
    on:keydown={handleKeydown}
    class="rounded-md p-2 m-2 neo">
    {text}
</button>



