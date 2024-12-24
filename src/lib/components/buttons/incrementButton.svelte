<script lang="ts">
    import { writable, type Writable } from 'svelte/store';
    import { paused } from '../../stores/stores';
    
    export let store: Writable<number>;
    export let text: string;

    const pressedKeys = new Set<string>();

    // const handleKeydown = (event: KeyboardEvent) => {
    //     if (!$paused && !pressedKeys.has(event.key) && event.key !== "Enter") {
    //         console.log("inbutton1")
    //         pressedKeys.add(event.key);
    //         store.update((n) => n + 1);
    //     }
    // };

    // const handleKeyup = (event: KeyboardEvent) => {
    //     console.log("inbutton2")
    //     if (event.key !== "Enter") {
    //         pressedKeys.delete(event.key); 
    //     }
    // };

    const handleClick = () => {
        console.log("inbutton3");
        if (!$paused) {
            store.update((n) => n + 100);
        }
    };

    const handleKeydown = (event: KeyboardEvent) => {
        // Prevent Enter key from triggering the click
        if (event.key === "Enter") {
            event.preventDefault();
        }
    };
</script>

<!-- 
<svelte:window on:keydown={handleKeydown} on:keyup={handleKeyup} /> -->

<button tabindex="-1"
    on:click={handleClick}
    on:keydown={handleKeydown}
    class="rounded-md p-2 m-2 neo">
    {text}
</button>



