<script lang='ts'>

    export let text = "";
    export let type = "";
    export let link: string | undefined;

    let email = "simsben52@gmail.com";
    let subject = "";
    let body = "" 


    function handleClick() {

        if (type == "link" && link) {
            window.open(link, '_blank');
        }

        if (type == "email") {
            const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            window.location.href = mailtoLink;
        }

    }


</script>





<div class="flex flex-row h-full p-3 lg:p-4 pixel-font z-50  ">
    <button on:click={handleClick} class="flex flex-col items-center hover:scale-110 active:scale-80 ">
        <slot></slot>
        <p>{text}</p>
    </button>
</div>