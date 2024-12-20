<script>

    import { buttons_store } from "$lib/stores/buttons";
    import { state } from "../../stores/stores";


    export let text = "purchase";
    export let label = "";
    export let id = "";
    



    const handleClick = () => {
        buttons_store.update((buttons) => {
            const updated_buttons = buttons.map((button) => {
                if (button.id === id) {

                    if (button.currency === "Lines" && $state.lines >= button.cost) {
                        $state.lines -= button.cost;
                        $state.char_rate += button.rateIncrease;
                        button.cost = Math.floor(button.cost * Math.pow(1.07, (button.amount)));
                        button.amount += 1;
                    }

                    if (button.currency === "Coffee"  && $state.coffee >= button.cost) {
                        $state.coffee -= button.cost
                        $state.coffee_rate += button.rateIncrease;
                        button.cost = Math.floor(button.cost * Math.pow(1.07, (button.amount)));
                        button.amount += 1;
                    }

                    if (button.currency === "BenCoin"  && $state.coins >= button.cost) {
                        $state.coins -= button.cost
                        $state.coin_rate += button.rateIncrease;
                        button.cost = Math.floor(button.cost * Math.pow(1.07, (button.amount)));
                        button.amount += 1;
                    }

                }
                return button;
            });
            return updated_buttons;
        });
    }



</script>



<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div on:click={handleClick} class="pixel2">
    {text} {label}
</div>

