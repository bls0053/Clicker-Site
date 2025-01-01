<script lang='ts'>
	import { state, windows, nodes, window_speed } from '$lib/stores/stores';
	import { onMount } from 'svelte';

    import IconCoin from '~icons/pixelarticons/bitcoin';
	import Slider from '../buttons/SliderY.svelte';
	import SliderX from '../buttons/SliderX.svelte';

    let timeout: number;
    let interval: number;

    let topleft: boolean = false;
    let topright: boolean = false;
    let bottomleft: boolean = false;
    let bottomright: boolean = false;

    let nodeProcessing: { [nodeIndex: number]: boolean } = {};
    let windowBool: { [nodeIndex: number]: boolean } = {};
    let locations = [
        {row:0,col:4},
        {row:1,col:4},
        {row:2,col:4},
        {row:3,col:4},
        {row:4,col:3},
        {row:4,col:2},
        {row:4,col:1},
        {row:4,col:0}]
   

    function handleClick(clicked: string) {
        topleft = false;
        topright = false;
        bottomleft = false;
        bottomright = false;
        if (clicked === "topleft") topleft = true;
        if (clicked === "topright") topright = true;
        if (clicked === "bottomleft") bottomleft = true;
        if (clicked === "bottomright") bottomright = true;
    }

    // $: {
    //     state.subscribe(($state) => {
    //     const requiredWindows = $state.bencoin.current_windows;
        
    //         windows.update(($windows) => {
    //             while ($windows.length < requiredWindows) {
    //                 let num =  Math.floor(Math.random() * 2);
    //                 if (num == 1) {
    //                     $windows.push({ row: Math.floor(Math.random() * 4), col: Math.floor(4) });
    //                 }
    //                 else {
    //                     $windows.push({ row: Math.floor(4), col: Math.floor(Math.random() * 4) });
    //                 }
                    
    //             }
    //             while ($windows.length > requiredWindows) {
    //                 $windows.pop();
    //             }
    //             return [...$windows];
    //         });
    //     });
    // }

    $: {
        state.subscribe(($state) => {
            const requiredWindows = $state.bencoin.windows;
            const index = $windows.length;
            windows.update(($windows) => {
                if ($windows.length < requiredWindows) {
                    windowBool[index] = true;
                    $windows.push({ row: locations[index].row, col: locations[index].col });
                }
                return [...$windows]
            })

        })
    }

    $: {
        state.subscribe(($state) => {
            const requiredWindows = $state.bencoin.current_windows;
            windows.update(($windows) => {
                $windows.forEach((window, index) => {
                    if (index < $windows.length - requiredWindows) {
                        windowBool[index] = true;
                    }
                    else {
                        windowBool[index] = false;
                    }
                });
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

    function deductPrice(windows: number) {
        if (($state.lines.amount - (windows)*(1)) > 0) {
            $state.lines.amount -= (windows)*(1);
        }
    }

    function moveWindows() {
        windows.update((currentWindows) =>
            currentWindows.map((window, index) => {
                if (windowBool[index]) { return locations[index] }
                let newPosition: { row: any; col: any; };
                // do {
                newPosition = { row: Math.floor((Math.random()) * 4), col: Math.floor((Math.random()) * 4),}
                if (topleft) { newPosition = { row: Math.floor((Math.random())*2), col: Math.floor((Math.random())*2),}};
                if (topright) { newPosition = { row: Math.floor((Math.random())*2), col: Math.floor((Math.random()*2)+2),}};
                if (bottomleft) { newPosition = { row: Math.floor((Math.random()*2)+2), col: Math.floor((Math.random())*2),}};
                if (bottomright) { newPosition = { row: Math.floor((Math.random()*2)+2), col: Math.floor((Math.random()*2)+2),}};

                // } 
                // while (
                //     currentWindows.some(
                //         (other) => other !== window && other.row === newPosition.row && other.col === newPosition.col
                //     )
                // );
                
                return newPosition;
            })
        );
        
    }
  
    $: {
        $nodes;
        $windows;
        $window_speed;

        $windows.forEach((window) => {
            $nodes.forEach((node, nodeIndex) => {
                if (node.row === window.row && node.col === window.col) {

                    if (nodeProcessing[nodeIndex]) {
                        return; 
                    }

                    nodeProcessing[nodeIndex] = true;

                    timeout = setTimeout(() => {
                        let newPosition: { row: any; col: any; };

                        do {
                            newPosition = {
                                row: Math.floor(Math.random() * 4),
                                col: Math.floor(Math.random() * 4),
                            };
                        } while (
                            $windows.some((w) => w.row === newPosition.row && w.col === newPosition.col) ||
                            $nodes.some((n) => n.row === newPosition.row && n.col === newPosition.col)
                        );

                        nodes.update((currentNodes) => {
                            currentNodes[nodeIndex] = { ...node, ...newPosition };
                            return [...currentNodes];
                        });

                        $state["bencoin"].amount += 1;
                        nodeProcessing[nodeIndex] = false;
                    }, $window_speed);
                }
            });
        });
    }

    $: {
        console.log($window_speed)
        clearInterval(interval);
        interval = setInterval(moveWindows, $window_speed);
    }


    setInterval(() => {
        deductPrice($state.bencoin.current_windows)
    }, 1000)
    
    
</script>
  
<style>
    .grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      grid-template-rows: repeat(5, 1fr);
      
      width: 250px;
      height: 250px;
    }
  
    .cell {
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        align-items: center;
        justify-content: center;
        position: relative;
    }

    .cell-row {
        grid-row: 5 / 6;
        grid-column: 1 / span 4;
        display: flex;
        position: relative;
        width: 190px;
        height: 40px;
    }

    .cell-col {
        grid-column: 5 / 6;
        grid-row: 1 / span 4;
        display: flex;
        position: relative;
        width: 40px;
        height: 190px;
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
  
<div class="flex flex-row gap-6 w-full">
    <div class="flex flex-col gap-4">

        <div class="flex flex-row gap-4 w-full">
            <button class="pixel-font neo aspect-square flex flex-grow justify-center items-center p-4" onclick={() => handleClick("topleft")}>Top<br>Left</button>
            <button class="pixel-font neo aspect-square flex flex-grow justify-center items-center p-4" onclick={() => handleClick("topright")}>Top<br>Right</button>

        </div>
        
        <div class="flex flex-row gap-4 w-full">
            <button class="pixel-font neo aspect-square flex flex-grow justify-center items-center p-4" onclick={() => handleClick("bottomleft")}>Bottom<br>Left</button>
            <button class="pixel-font neo aspect-square flex flex-grow justify-center items-center p-4" onclick={() => handleClick("bottomright")}>Bottom<br>Right</button>
        </div>
        
        <button class="pixel-font neo" onclick={() => handleClick("any")}>any</button>
        <div class="flex justify-between items-center pixel-font">
            <div class="">Active Windows</div>
            <div class="text-xs">{$state.bencoin.current_windows} / {$state.bencoin.windows}</div>
        </div>
        <SliderX bind:value={$state.bencoin.current_windows} bind:max={$state.bencoin.windows}/>
            
        
        

    </div>


    <div class="grid">
        {#each Array(4) as _, rowIndex}
            {#each Array(4) as _, colIndex}
                <div class="cell neo-inset">
                    {#each $nodes as node}
                        {#if node.row === rowIndex && node.col === colIndex}
                            <div class="node !bg-yellow-600"><IconCoin class="text-yellow-200"></IconCoin></div>
                        {/if}
                    {/each}
                </div>
            {/each}
        {/each}

        {#each $windows as window}
            <div
            class="window"
            style={`transform: translate(${window.col * 50 + 5}px, ${window.row * 50 + 5}px); 
            transition: transform ${$window_speed / 1000}s ease-in-out;`}
            ></div>
        {/each}

        <div class="neo-inset cell-row"></div>
        <div class="neo-inset cell-col"></div>
    </div>
    
</div>
