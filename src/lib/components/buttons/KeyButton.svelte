<script lang='ts'>
    import { writable, type Writable } from 'svelte/store';
    import { actual_char, unlocked } from '$lib/stores/stores';
    
    export let store;
    export let paused: boolean;

    const pressedKeys = new Set<string>();

    const handleClick = () => {
        if (!paused) {
            $store.lines.rate += .5;
            setTimeout(() => {
                $store.lines.rate -= .5;
            }, 100);
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

    :active.b {
        transform: scaleX(.95) scaleY(.90);
        transform-origin: bottom;
    }
  </style>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div on:click={handleClick} on:touchend={handleClick} style="" class="flex w-full h-full relative select-none cursor-pointer b">
    <img src="/keyarea.png" alt="" class="sprite pointer-events-none" draggable="false" />
</div>



