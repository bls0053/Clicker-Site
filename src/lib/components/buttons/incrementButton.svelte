<script lang="ts">
    import { writable, type Writable } from 'svelte/store';


    export let store: Writable<number>;
    export let text: string;

    const increment = (event: KeyboardEvent) => {
        store.update((n) => n + 1);
        console.log(text, event.key);
    };

</script>

<button 
    on:click={increment}
    on:keydown={increment} 
        class="rounded-md  p-2 m-2 neo">
    {text}
</button>   