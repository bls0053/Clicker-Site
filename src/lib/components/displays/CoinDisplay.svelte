<script lang='ts'>
	import { state, windows, nodes, window_speed } from '$lib/stores/stores';
	import { onMount } from 'svelte';

    import IconCoin from '~icons/pixelarticons/bitcoin';

    let timeout: number;
    let interval: number;

    // Any: { row: Math.floor(Math.random() * 4), col: Math.floor(Math.random() * 4) }
    // Top Left: { row: Math.floor(Math.random() * 2), col: Math.floor(Math.random() * 2) }
    // Top Right: { row: Math.floor(Math.random() * 4), col: Math.floor((Math.random() + 2) * 2) }
    // Bottom Left: { row: Math.floor((Math.random()*2) * 2), col: Math.floor(Math.random() * 4) }
    // Bottom Right: { row: Math.floor((Math.random()*2) * 2), col: Math.floor((Math.random()*2) * 2) }




    $: {
    state.subscribe(($state) => {
        const requiredWindows = $state.bencoin.windows;
        windows.update(($windows) => {
            while ($windows.length < requiredWindows) {
                $windows.push({ row: Math.floor(Math.random() * 4), col: Math.floor(Math.random() * 4) });
            }
            while ($windows.length > requiredWindows) {
                $windows.pop();
            }
            return [...$windows];
            });
        });
    }

    $: {
        state.subscribe(($state) => {
            const requiredNodes = $state.bencoin.nodes;
            nodes.update(($nodes) => {
                while ($nodes.length < requiredNodes) {
                    $nodes.push({ row: Math.floor(Math.random() * 4), col: Math.floor(Math.random() * 4) });
                }
                while ($nodes.length > requiredNodes) {
                    $nodes.pop();
                }
                return [...$nodes];
            });
        });
    }

    function moveWindows() {
        windows.update((currentWindows) =>
            currentWindows.map((window) => {
                let newPosition: { row: any; col: any; };
                do {
                    newPosition = {
                    row: Math.floor(Math.random() * 4),
                    col: Math.floor(Math.random() * 4),
                    };
                } 
                while (
                    currentWindows.some(
                        (other) => other !== window && other.row === newPosition.row && other.col === newPosition.col
                    )
                );
                return newPosition;
            })
        );
    }
  
    $: {
        $windows;
        $nodes;
        $window_speed;

        $windows.forEach((window) => {
            $nodes.forEach((node, nodeIndex) => {
                if (node.row === window.row && node.col === window.col) {
                    timeout = setTimeout(() => {
                        let newPosition: { row: any; col: any; };

                        do {
                            newPosition = {
                                row: Math.floor(Math.random() * 4),
                                col: Math.floor(Math.random() * 4),
                            };
                        } 
                        while (
                            $windows.some((w) => w.row === newPosition.row && w.col === newPosition.col) ||
                            $nodes.some((n) => n.row === newPosition.row && n.col === newPosition.col));

                        nodes.update((currentNodes) => {
                            currentNodes[nodeIndex] = { ...node, ...newPosition };
                            return [...currentNodes];
                        });

                        $state["bencoin"].amount += 1;
                    }, ($window_speed));
                }
            });
        });
    }

    $: {
        console.log($window_speed)
        clearInterval(interval);
        interval = setInterval(moveWindows, $window_speed);
    }

    
    
</script>
  
<style>
    .grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-template-rows: repeat(4, 1fr);
      
      width: 200px;
      height: 200px;
    }
  
    .cell {
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
    }

    .node {
        width: 20px;
        height: 20px;
        border-radius: 50%;
    }

    .window {
        position: absolute;
        width: 30px;
        height: 30px;
        background: transparent;
        z-index: 1;
        border-radius: 8px;
        transform: translate(0px, 0px);
    }

    .window::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        
        border: 2px solid transparent;
        border-radius: 8px;
        border-color: rgb(255, 255, 255);
        opacity: 50%;
        box-sizing: border-box;
    }

</style>
  
<div class="grid">
    {#each Array(4) as _, rowIndex}
        {#each Array(4) as _, colIndex}
            <div class="cell neo-inset">
                {#each $nodes as node}
                    {#if node.row === rowIndex && node.col === colIndex}
                        <div class="node !bg-red-400"></div>
                    {/if}
                {/each}
            </div>
        {/each}
    {/each}

    {#each $windows as window}
        <div
        class="window duration-[]"
        style={`transform: translate(${window.col * 50 + 5}px, ${window.row * 50 + 5}px); 
        transition: transform ${$window_speed / 1000}s ease-in-out;`}
        ></div>
    {/each}
</div>
  