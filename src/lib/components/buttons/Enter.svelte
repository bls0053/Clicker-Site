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
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100%;
        height: auto;
        image-rendering: pixelated;
        image-rendering: crisp-edges;
        transform: translate(-50%, -50%);
        aspect-ratio: 4;
        object-fit: contain;
    }
</style>

<button
    on:click={handleClick}
    style="aspect-ratio: 4"
    class="flex h-1/3 w-full p-2 relative select-none"
>
    <img src="/enter.png" alt="Enter Button" class="sprite" />
</button>
