<script lang="ts">
    import { writable, type Writable } from 'svelte/store';


    export let store: Writable<number>;
    export let text: string;
    export let incrementAmount: number = 1;

    const increment = () => {
        store.update(n => n + incrementAmount);
        console.log(text,$store)
    };
</script>

<button on:click={increment} 
class="rounded-md outline p-2 m-2">
    {text}
</button>