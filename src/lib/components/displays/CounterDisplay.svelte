<script lang="ts">
    import { writable, type Writable } from 'svelte/store';

    export let store: string | number;
    export let text: string;

</script>




<div class="rounded-md outline p-2 m-2">
    {text}{store}
</div>