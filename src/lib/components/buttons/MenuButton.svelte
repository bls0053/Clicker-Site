<script lang='ts'>

    export let text = "";
    export let type = "";
    export let link: string | undefined;

    let email = "simsben52@gmail.com";
    let subject = "YOU HIRE NOW";
    let body = "PLEASE, I NEED TO HIRE YOU. WORK FOR US, WE NEED HIRE YOU. \n\n My best,\n Employer" 


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





<div class="flex flex-row h-full p-2 neo">
    <button on:click={handleClick} class="flex flex-col pixel-font items-center">
        <slot></slot>
        <p>{text}</p>
    </button>

</div>