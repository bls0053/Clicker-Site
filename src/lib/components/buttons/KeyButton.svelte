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
        if (!paused) {
            store.update((n) => n + 3);
            
            
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

<!-- svelte-ignore a11y_no_static_element_interactions -->

<style>
    .sprite {
        width: 100%;
        height: 100%;
        image-rendering: pixelated;
        image-rendering: crisp-edges;
        object-fit: contain;
    }
  </style>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div on:click={handleClick} on:touchend={handleClick} style="" class="flex w-full h-full relative select-none cursor-pointer">
    <img src="/keyarea.png" alt="" class="sprite pointer-events-none" draggable="false" />
</div>



