<script lang="ts">
	import { onMount } from "svelte";

    let isDragging = false;
    let rotation = 0;
    let initialAngle = 0;
    let lastAngle = 0;

    function calculateAngle(x: number, y: number) {
        return Math.atan2(y, x) * (180 / Math.PI);
    }

    function handleMouseDown(event: MouseEvent): void {
        isDragging = true;
        const target = event.target as HTMLElement;
        const rect = target.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        initialAngle = calculateAngle(event.clientX - centerX, event.clientY - centerY);
        lastAngle = initialAngle;
    }

    function handleMouseMove(event: MouseEvent): void {
        if (!isDragging) return;
        const target = event.target as HTMLElement;
        const rect = target.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const angle = calculateAngle(event.clientX - centerX, event.clientY - centerY);
        const delta = angle - lastAngle;
        rotation += delta;
        lastAngle = angle;
    }

    function handleMouseUp() {
        isDragging = false;
    }

    onMount(() => {
    const interval = setInterval(() => {
      rotation = (rotation + 20) % 360;
      const dial = document.getElementById("dial");
      if (dial) {
        dial.style.transform = `rotate(${rotation}deg)`;
      }
    }, 1000);
    })

</script>

<style>
    .dial-container {
        width: 200px;
        height: 200px;
        border-radius: 50%;
        border: 5px solid #333;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        user-select: none;
        position: relative;
    }

    .dial {
        position: absolute;
        width: 140px;
        height: 140px;
        background-color: #ddd;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .indicator {
        position: absolute;
        width: 5px;
        height: 50px;
        background-color: #000;
        top: 10px;
    }
</style>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
    class="dial-container"
        on:mousedown={handleMouseDown}
        on:mousemove={handleMouseMove}
        on:mouseup={handleMouseUp}
        on:mouseleave={handleMouseUp}
>
    <div class="dial transition-transform ease-linear duration-500" style="transform: rotate({rotation}deg)">
        <div class="indicator"></div>
    </div>
</div>
