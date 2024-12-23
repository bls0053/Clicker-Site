<script lang="ts">
    import { writable, type Writable } from 'svelte/store';
    

    export let store: Writable<number>;
    export let text: string;

    const pressedKeys = new Set<string>();

    const handleKeydown = (event: KeyboardEvent) => {
        if (!pressedKeys.has(event.key)) {
            pressedKeys.add(event.key);
            store.update((n) => n + 1);
        }
    };

    const handleKeyup = (event: KeyboardEvent) => {
        pressedKeys.delete(event.key); 
    };

    const handleClick = () => {
        store.update((n) => n + 1000);
    };

    

</script>

<svelte:window 
    on:keydown={handleKeydown} 
    on:keyup={handleKeyup} 
/>


<button 
    on:click={handleClick}
    on:keydown={handleKeydown} 
    on:keyup={handleKeyup} 
        class="rounded-md  p-2 m-2 neo">
    {text}
</button>   