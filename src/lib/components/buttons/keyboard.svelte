<script lang='ts'>
    import { writable, type Writable } from 'svelte/store';
    import { actual_char } from '$lib/stores/stores';
    
    export let store: Writable<number>;
    export let paused: boolean;

    const pressedKeys = new Set<string>();

   
    const handleKeyup = (event: KeyboardEvent) => {

        if (event.key !== "Enter") {
            pressedKeys.delete(event.key); 
        }
    };

    const handleClick = () => {
        console.log("click")
        if (!paused) {
            store.update((n) => n + 1);
            
            
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

<style>
    .sprite {
        position: absolute;
        top: 0%;
        left: 50%;
        width: 100%;
        height: auto;
        image-rendering: pixelated;
        image-rendering: crisp-edges;
        transform: translate(-50%, -55%);
        aspect-ratio: 1;
        object-fit: contain;
    }
  </style>

<button on:click={handleClick} on:touchend={handleClick} style="aspect-ratio: 2" class="flex w-full  p-2 relative select-none">
    <img src="/keyboard.png" alt="" class="sprite "  />
</button>



