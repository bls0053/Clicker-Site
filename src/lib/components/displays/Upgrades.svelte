<script lang='ts'>
	import { flip } from "svelte/animate";
	import ButtonSection from "./ButtonSection.svelte";
	import { cubicOut } from "svelte/easing";
	import PurchaseButton from "../buttons/PurchaseButton.svelte";
	import { canShowButton } from "$lib/util/prereq";
	import { buttons_store } from "$lib/stores/buttons";


</script>

<!-- <img src="/upgrades.png" alt="Enter Button" class="sprite pointer-events-none" draggable="false"/> -->

<div class="flex flex-col h-full w-full">
    <ButtonSection image="/ButtonSections/button_section1.png" section={1} />
    <ButtonSection image="/ButtonSections/button_section2.png" section={2}/>
    <ButtonSection image="/ButtonSections/button_section3.png" section={3}/>
    <ButtonSection image="/ButtonSections/button_section4.png" section={4}/>
    <ButtonSection image="/ButtonSections/button_section5.png" section={5}/>
</div>
  
    

    <!-- <button class="flex w-full h-full select-none ">
        <img src="/upgrade_header.png" alt="Enter Button" class="sprite  pointer-events-none" draggable="false"/>
    </button> -->

   