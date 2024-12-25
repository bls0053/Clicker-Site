<script>
	import { state, windows, nodes } from '$lib/stores/stores';
    import { writable } from 'svelte/store';
    import IconCoin from '~icons/pixelarticons/bitcoin';

    const score = writable(0);
  
    function moveWindows() {
        windows.update((currentWindows) =>
            currentWindows.map((window) => {
                let newPosition;
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

        $windows.forEach((window) => {
        $nodes.forEach((node, nodeIndex) => {
            if (node.row === window.row && node.col === window.col) {
            console.log("match");
            setTimeout(() => {
                let newPosition;
                do {
                newPosition = {
                    row: Math.floor(Math.random() * 4),
                    col: Math.floor(Math.random() * 4),
                };
                } while ($windows.some((w) => w.row === newPosition.row && w.col === newPosition.col));

                nodes.update((currentNodes) => {
                currentNodes[nodeIndex] = { ...node, ...newPosition };
                return [...currentNodes];
                });

                $state["bencoin"].amount += 1;
            }, 1000);
            }
        });
        });
    }

    setInterval(moveWindows, 100);
    
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
        transition: transform .1s ease-in-out;
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
            class="window"
            style={`transform: translate(${window.col * 50 + 5}px, ${window.row * 50 + 5}px);`}
            ></div>
        {/each}
    </div>
  