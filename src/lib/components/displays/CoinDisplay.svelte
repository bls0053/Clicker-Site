<script lang='ts'>
	import { state, windows, nodes, window_speed } from '$lib/stores/stores';
	import { onMount } from 'svelte';

    import IconCoin from '~icons/pixelarticons/bitcoin';
	import Slider from '../buttons/SliderY.svelte';
	import SliderX from '../buttons/SliderX.svelte';
	import SliderY from '../buttons/SliderY.svelte';

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

        const requiredWindows = $state.bencoin.windows;
        const index = $windows.length;
        windows.update(($windows) => {
            if ($windows.length < requiredWindows) {
                windowBool[index] = true;
                $windows.push({ row: locations[index].row, col: locations[index].col });

            }
            return [...$windows]
        })

    }

    $: {

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

    }


    $: {
        
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

    }

    function deductPrice(windows: number) {
        while ($state.bencoin.current_windows * 10 > $state.lines.amount && $state.bencoin.current_windows > 0) {
            $state.bencoin.current_windows = Math.floor($state.lines.amount/10);
        }
        if (($state.lines.amount - (windows)*(10)) >= 0) {
            $state.lines.amount -= (windows)*(10);
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

                        $state["bencoin"].amount += (1 * $state.bencoin.mult);
                        nodeProcessing[nodeIndex] = false;
                    }, $window_speed);
                }
            });
        });
    }

    $: {
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
      width: 360px;
      height: 360px;
    }
  
    .cell {
        width: 72px;
        height: 72px;
        display: flex;
        align-items: center;
        justify-content: center;
        align-items: center;
        justify-content: center;
        z-index: 5;
    }

    /* .cell-row {
        grid-row: 5 / 6;
        grid-column: 1 / span 4;
        display: flex;
        position: relative;
        width: 310px;
        height: 80px;
    }

    .cell-col {
        grid-column: 5 / 6;
        grid-row: 1 / span 4;
        display: flex;
        position: relative;
        width: 80px;
        height: 310px;
    } */

    .node {
        width: 40px;
        height: 40px;
        transform: translate(0px, -2px);
        border-radius: 50%;
        z-index: 0;
    }

    .window {
        position: absolute;
        width: 45px;
        height: 45px;
        background-image: url('/Bencoin/window.png');
        background-size: contain;
        image-rendering: pixelated;
        image-rendering: crisp-edges;
        z-index: 5;
        transform: translate(0px, 0px);
    }

    

    .sprite {
        width: 100%;
        height: 100%;
        image-rendering: pixelated;
        image-rendering: crisp-edges;
        aspect-ratio: 1;
        object-fit: contain;
    }

    .sprite2 {
        width: 100%;
        height: 100%;
        image-rendering: pixelated;
        image-rendering: crisp-edges;
        aspect-ratio: 4;
        object-fit: fit;
    }

    :active.b {
        transform: scaleX(.95) scaleY(.90);
        transform-origin: bottom;
    }

</style>
  
<div class="flex flex-row flex-wrap-reverse gap-4 justify-center select-none">
    <div class="flex flex-row lg:flex-col w-auto justify-center">
        <div class="flex flex-col w-auto h-full p-2">
            <div class="flex flex-row gap-4 pb-4">
                <button
                    onclick={() => handleClick("topleft")}
                    class="flex h-[110px] w-[110px] select-none b">
                    <img src="/Bencoin/buttons/button_tl.png" alt="" class="sprite  pointer-events-none" draggable="false"/>
                </button>
                <button
                    onclick={() => handleClick("topright")}
                    class="flex h-[110px] w-[110px] select-none b">
                    <img src="/Bencoin/buttons/button_tr.png" alt="" class="sprite  pointer-events-none" draggable="false"/>
                </button>
            </div>
            
            <div class="flex flex-row gap-4 pb-4">
                <button
                    onclick={() => handleClick("bottomleft")}
                    class="flex h-[110px] w-[110px] select-none b">
                    <img src="/Bencoin/buttons/button_bl.png" alt="" class="sprite  pointer-events-none" draggable="false"/>
                </button>
                <button
                    onclick={() => handleClick("bottomright")}
                    class="flex h-[110px] w-[110px] select-none b">
                    <img src="/Bencoin/buttons/button_br.png" alt="" class="sprite  pointer-events-none" draggable="false"/>
                </button>
            </div>
            <div class="flex flex-row pixel-font lg:hidden">
                <SliderX bind:value={$state.bencoin.current_windows} bind:max={$state.bencoin.windows}/>
            </div>
            
        </div>

        <button
            onclick={() => handleClick("any")}
            class="h-[55px] w-full select-none hidden lg:flex b">
            <img src="/Bencoin/buttons/button_any.png" alt="" class="sprite2 pointer-events-none" draggable="false"/>
        </button>
        <div class="flex flex-col w-full h-full gap-3 lg:hidden">
            <button
                onclick={() => handleClick("any")}
                class="h-[245px] w-[55px] select-none flex pt-2 pl-2">
                <img src="/Bencoin/buttons/button_any_vert.png" alt="" class="sprite2  pointer-events-none" draggable="false"/>
            </button>
            <div class="text-lg">{$state.bencoin.current_windows} / {$state.bencoin.windows}</div>
        </div>
        <div class="hidden lg:flex flex-row pt-4 gap-4 pixel-font">
            <SliderX bind:value={$state.bencoin.current_windows} bind:max={$state.bencoin.windows}/>
            <div class="text-lg">{$state.bencoin.current_windows} / {$state.bencoin.windows}</div>
        </div>

      
    </div>


    <div class="grid select-none">
        <div class="col-span-4 row-span-4 relative">
            <img src="/Bencoin/bencoin_bg2.png" alt="" class="sprite pointer-events-none absolute" draggable="false"/>
            <img src="/Bencoin/bencoin_cover8.png" alt="" class="sprite pointer-events-none absolute z-10" draggable="false"/>
        </div>
        
        {#each Array(4) as _, rowIndex}
            {#each Array(4) as _, colIndex}
                <div class="cell absolute" 
                style={`transform: translate(${colIndex * 72}px, ${rowIndex * 72}px);`}>
                    {#each $nodes as node}
                        {#if node.row === rowIndex && node.col === colIndex}
                            <div class="flex justify-center items-center node">
                                <img src="/Bencoin/coin.png" alt="" class="sprite pointer-events-none absolute" draggable="false"/>
                            </div>
                        {/if}
                    {/each}
                </div>
            {/each}
        {/each}

        {#each $windows as window}
            <div
            class="window"
            style={`transform: translate(${window.col * 72 + 14}px, ${window.row * 72 + 12}px); 
            transition: transform ${$window_speed / 1000}s ease-in-out;`}
            ></div>
        {/each}

        <div class="col-start-1 col-span-4 row-start-5 relative">
            <img src="/Bencoin/bencoin_cover_wide.png" alt="" class="sprite pointer-events-none absolute z-10" draggable="false"/>
            <img src="/Bencoin/bencoin_bg_wide.png" alt="" class="sprite pointer-events-none absolute" draggable="false"/>
        </div>
        <div class="col-start-5 row-span-4 relative">
            <img src="/Bencoin/bencoin_cover_tall.png" alt="" class="sprite pointer-events-none absolute z-10" draggable="false"/>
            <img src="/Bencoin/bencoin_bg_tall.png" alt="" class="sprite pointer-events-none absolute" draggable="false"/>
        </div>
    </div>
    
</div>
