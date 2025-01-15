<script lang="ts">

    const handleClick = () => {
        const enterKeyPressEvent = new KeyboardEvent('keydown', {
            key: 'Enter',
            code: 'Enter',
            keyCode: 13,
            bubbles: true,
        });

        const buttonElement = document.querySelector('button');
        buttonElement?.dispatchEvent(enterKeyPressEvent);

        window.dispatchEvent(enterKeyPressEvent);
    };
</script>

<style>
    .sprite {
        width: 100%;
        height: 100%;
        image-rendering: pixelated;
        image-rendering: crisp-edges;
        aspect-ratio: 4;
        object-fit: contain;
    }

    :active.b {
        transform: scaleX(.95) scaleY(.90);
        transform-origin: bottom;
    }
</style>

<button
    on:click={handleClick}
    style="aspect-ratio: 4"
    class="flex w-full h-full select-none b"
>
    <img src="ButtonSections/enter.png" alt="Enter Button" class="sprite  pointer-events-none" draggable="false"/>
</button>
