<script lang="ts">
	import { can_brew, is_brewing, state, unlocked } from "$lib/stores/stores";
	import { Timer_ms } from "$lib/util/time";
	import { onMount } from "svelte";


    export let min: number = -150;
    export let max: number = 150;
    export let value: number = 0;
    export let step: number = 1;

    let insidebool = true;
    let high_jump = false;
    let low_jump = false;
    let height: number = 300;
    let window = {y:0}
    let jump_count = 0;
    let jump_amount = 10;
    let auto_water = false;
    let ease_amount = .1;
    let window_height: number;
    let node_speed: number;
    let bean_count: number;
    let bean_bool: boolean = false;
    let brew_count: number;
    let offset: number = 0;

    let paused = false;
    let user_click = false;

    function updateValue(event: Event) {
        const target = event.target as HTMLInputElement;
        value = parseFloat(target.value);
    }

    function startUserInteraction() {
        user_click = true;
    }

    function endUserInteraction() {
        user_click = false;
    }

    function adjustPosition() {
        
        let jumpdecider = Math.floor(Math.random() * (20))

        if (high_jump) {
            if (jump_count < Math.floor(jump_amount) && window.y >= min+5) {
                window.y -= 5;
                jump_count += 1; }
            else {
                high_jump = false;
                jump_count = 0; }}

        if (low_jump) {
            if (jump_count < jump_amount && window.y <= max-5) {
                window.y += 5;
                jump_count += 1; }
            else {
                low_jump = false;
                jump_count = 0; }}
        
        if (!high_jump && !low_jump) {
            if (jumpdecider == 0) { low_jump = true; }
            if (jumpdecider > 1 && jumpdecider <= 3) { high_jump = true; }

            let decider = Math.floor(Math.random() * (2));
            if (decider == 1 && window.y >= min+5) { window.y -= 5 }
            if (decider == 0 && window.y <= max-5) { window.y += 5 }
        }
    }

    function handle_node() {
        if (!auto_water) { return };
        if (window.y > value) {
            value += 1;
        }
        if (window.y < value) {
            value -= 1;
        }
    }

    function getSliderBackground(num: number): string {

        let percentage = ((num) / max)*100;

        return `linear-gradient(to top, 
        rgb(0, 130, 202) ${0}% ${percentage}%, 
                white ${percentage}%)`;
    }

    Timer_ms.subscribe((time) => {
        if (!paused && time > 1000 - (node_speed*100) && !user_click) {
            handle_node();
        }
    });


    setInterval(() => {
        if (!paused) {
            adjustPosition()
            if (insidebool) {
                $state.water.amount += 1;
            }
        }

        if ($state.water.amount >= 150) {
            paused = true;
            ease_amount = 2;
            window.y = max - window_height/2 + 10;
        }

        if (paused && $state.beans.amount >= 5) { 
            if (!bean_bool) {
                bean_count = $state.beans.amount - ($state.beans.amount % 5);
                brew_count = bean_count / 5;

            }
            is_brewing.set(true);
            bean_bool = true;
            $state.water.amount -= 1; 
        }

        if ($state.water.amount == 0) { 
            bean_bool = false
            is_brewing.set(false);
            
            if (paused) {
                $state.beans.amount -= bean_count;
                $state.coffee.amount += brew_count;
            }
            paused = false;
            ease_amount = .1;
        }

    }, 50)

   
    $: {
        if ( value < (window.y + (window_height/2) + 10) && value > (window.y - (window_height/2) + 10)) {
            insidebool = true 
        }
        else { insidebool = false }
    }

    $: {
        if (window.y - $state.water.pour/2 < min) {
            const diff = (window.y - ($state.water.pour / 2)) - min;
            offset = diff/2+10;
            window_height = $state.water.pour + diff;
        }

        else if  (window.y + $state.water.pour/2 > max) {
            const diff = (window.y + ($state.water.pour / 2)) - max;
            offset = diff/2-10;
            window_height = $state.water.pour - diff;
        }

        else {
            window_height = $state.water.pour;
        }

        node_speed = $state.water.speed;
        if ($unlocked.auto_water) {
            $unlocked.auto_water = true;
            auto_water = true;
        }
    }

 
</script>

<style>
    .window {
        position: absolute;
        width: 40px;
        
        background: transparent;
        z-index: 0; 
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
        border: 4px solid transparent;
        border-radius: 8px;
        border-color: rgb(0, 110, 172);
        opacity: 80%;
        box-sizing: border-box;
    }
    
    .slider-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .slider {
        -webkit-appearance: none;
        width: 20px;
        height: 100%;
        border-radius: 5px;
        outline: none;
        writing-mode: vertical-rl;
        z-index: 10;
    }

    .slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        background: #242424;
        width: 40px;
        height: 20px;
        cursor: pointer;
        border-radius: 0%;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        
    }

    .slider::-moz-range-thumb {
        width: 20px;
        height: 20px;
        cursor: pointer;
        border-radius: 50%;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        
    }

    
</style>



<div class="flex flex-row gap-4 overflow-hidden p-4 bg-green-300">
    
    <div class="flex flex-row relative justify-center items-center">
        <div
            class="window"
            style={`transform: translate(0px, ${window.y - offset}px); 
            transition: transform ${ease_amount}s ease-in-out;
            height: ${window_height}px;`}>
        </div>

        
        <div
            class="window"
            style={`transform: translate(${window.y - offset}px, 0px); 
            transition: transform ${ease_amount}s ease-in-out;
            height: ${window_height}px;`}>
        </div>
        
        <div class="">
            <div 
            class="slider-container"
            style="height: {height}px">
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    bind:value={value}
                    on:input={updateValue}
                    on:mousedown={startUserInteraction}
                    on:mouseup={endUserInteraction}
                    on:touchstart={startUserInteraction}
                    on:touchend={endUserInteraction}
                    class="slider {insidebool ? '' : ''}"
                    style="background: {getSliderBackground($state.water.amount)}"
                />
            </div>
        </div>
    </div>

</div>