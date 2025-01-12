<script lang="ts">
    export let min: number = 0;
    export let max: number = 100;
    export let value: number = 50;
    export let step: number = 1;

    // Values for the red range
    export let lower: number = 0;  // Starting value of the red range
    export let higher: number = 0; // Ending value of the red range

    function updateValue(event: Event) {
        const target = event.target as HTMLInputElement;
        value = parseFloat(target.value);
    }

    

    $: {
        if (value > max - higher && value < max - lower) {
        }
    }


</script>

<style>

    input[type="range"] {
        -webkit-appearance: none;
        touch-action: manipulation;
        appearance: inherit;
    }

    .slider-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 200px;
    }

    .slider {
        width: 15px;
        height: 100%;
        border-radius: 5px;
        outline: none;
        writing-mode: vertical-rl;
        z-index: 10;
        direction: rtl;
    }

    .slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        background: #242424;
        width: 20px;
        height: 20px;
        cursor: pointer;
        border-radius: 50%;
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

<div class="slider-container">
    <input
        type="range"
        min={min}
        max={max}
        step={step}
        bind:value={value}
        on:input={updateValue}
        class="slider"
    />
</div>
