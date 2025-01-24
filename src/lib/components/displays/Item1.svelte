<script lang="ts">

</script>

<style>
    .sprite {
        background-image: url('/Homie/item1.png');
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
        image-rendering: pixelated;
        image-rendering: crisp-edges;
        transform-origin: center left;
        aspect-ratio: 1;
        z-index: -5;
    }

    .sprite.absolute {
        left: 25%;
        top: 0%;
    }

    .sprite.size {
        width: auto;
        height: 40%;
    }

    @media (max-width: 768px) {
        .sprite.absolute {
            left: 20%;
            top: 0%;
        }
        .sprite.size {
            width: auto;
            height: 40%;
        }
    }

</style>

    <div class="sprite absolute size"></div>

