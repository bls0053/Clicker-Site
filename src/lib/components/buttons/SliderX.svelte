<script lang="ts">
    export let min: number = 0;
    export let max: number = 100;
    export let value: number = 50;
    export let step: number = .5;

    function updateValue(event: Event) {
        const target = event.target as HTMLInputElement;
        value = parseFloat(target.value);
    }

</script>

<style>
    .slider-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 8px; /* Adjust the height of the container */
    }

    .slider {
        -webkit-appearance: none;
        width: 100%; /* Set the width of the slider to be horizontal */
        height: 10px; /* Adjust height for horizontal orientation */
        border-radius: 5px;
        outline: none;
        background: #ddd; /* Default track color */
        transition: background 0.3s ease-in-out; /* Smooth transition */
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
