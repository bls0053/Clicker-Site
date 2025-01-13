<script lang='ts'>
	import { flip } from "svelte/animate";
	import ButtonSection from "./ButtonSection.svelte";
	import { cubicOut } from "svelte/easing";
	import PurchaseButton from "../buttons/PurchaseButton.svelte";
	import { canShowButton } from "$lib/util/prereq";
	import { buttons_store } from "$lib/stores/buttons";


</script>

<!-- <img src="/upgrades.png" alt="Enter Button" class="sprite pointer-events-none" draggable="false"/> -->

<div class="flex flex-col h-full w-full z-10">
    <ButtonSection section="section1" image="/ButtonSections/button_section1.png" section_num={1} />
    <ButtonSection section="section2" image="/ButtonSections/button_section2.png" section_num={2}/>
    <ButtonSection section="section3" image="/ButtonSections/button_section3.png" section_num={4}/>
    <ButtonSection section="section4" image="/ButtonSections/button_section4.png" section_num={5}/>
    <!-- <ButtonSection section="section5" image="/ButtonSections/button_section5.png" section_num={5}/> -->

</div>
  
    

    <!-- <button class="flex w-full h-full select-none ">
        <img src="/upgrade_header.png" alt="Enter Button" class="sprite  pointer-events-none" draggable="false"/>
    </button> -->

   