<script lang="ts">
    let frames = [
        '/Typing/Typing/Typing_0.png',
        '/Typing/Typing/Typing_1.png',
        '/Typing/Typing/Typing_2.png',
        '/Typing/Typing/Typing_3.png',
        
    ];

    export let rate: number;
    export let paused: boolean;

    let intervalId: number | null;
    let index_count: number = 1;
    let pos = {
        x: 0,
        y: 0
    }

    $: {
        let intervalRate = Math.max(10,(500 / (1 + (5) * Math.log(1 + rate))))
		if (rate > 0 && !paused) {
            
			if (!intervalId) {
				intervalId = setInterval(() => {
					pos.x -= 32;
					if (index_count % 4 === 0) {
						pos.x = 0;
					}
					index_count += 1;
				}, intervalRate);
			}
		} 

        else {	
			if (intervalId) {
				clearInterval(intervalId);
				intervalId = null;
			}
		}
	}

</script>

<style>
    .sprite {
        width: 32px;
        height: 40px;
        background-image: url('/typing.png');
        background-repeat: no-repeat;
        background-size: fill;
        image-rendering: pixelated;
        image-rendering: crisp-edges;
        transform-origin: center left;
        transform: scale(6);
    }
</style>

<div style="top:54%; left: 5%; background-position: {pos.x}px {pos.y}px;" class="sprite absolute"></div>

