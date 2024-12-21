<script lang='ts'>

    import { buttons_store } from "$lib/stores/buttons";
    import { state, unlocked } from "../../stores/stores";


    export let text = "purchase";
    export let label = "";
    export let id = "";
    
    let canPurchase = false;

    $:  {
        
        buttons_store.update((buttons) => {
            const updated_buttons = buttons.map((button) => {
                if (button.id === id) {
                    const { cost } = button;
                        canPurchase = Object.keys(cost).every((key) => {
                            const typedKey = key as keyof typeof $state;
                            if (typedKey !== undefined && typeof cost[typedKey] === 'number') {
                                console.log("hello")
                                return $state[typedKey]?.amount >= cost[typedKey];
                            }       
                        });
                }
                return button;
            });
            return updated_buttons;
        });
    }

    const handleClick = () => {
            buttons_store.update((buttons) => {
                const updated_buttons = buttons.map((button) => {
                    if (button.id === id) {
                        
                        const { cost } = button;
                        if (canPurchase) {
                            button.amount += 1;
                            // Deduct cost from store
                            state.update((currentState) => {
                                Object.keys(cost).forEach((key) => {
                                const typedKey = key as keyof typeof currentState;
                                if (typedKey !== undefined && typeof cost[typedKey] === 'number') {
                                    currentState[typedKey].amount -= cost[typedKey];
                                }
                                });
                                return currentState;
                            });

                            // Increase cost
                            Object.keys(cost).forEach((key) => {
                                const typedKey = key as keyof typeof cost;
                                if (typedKey !== undefined && typeof cost[typedKey] === 'number') {
                                    cost[typedKey] = Math.ceil(cost[typedKey] * Math.pow(1.07, button.amount));
                                }
                            });

                            if (button.type == "rate") {
                                const resourceKey = Object.keys(button.increase)[0];
                                const rateval = button.increase[resourceKey];
                                if (rateval) {
                                    $state[resourceKey as keyof typeof $state].rate += rateval;
                                }
                            }

                            if (button.type == "mult") {
                                const resourceKey = Object.keys(button.increase)[0];
                                const multval = button.increase[resourceKey];
                                if (multval) {
                                    $state[resourceKey as keyof typeof $state].mult += multval;
                                }
                            }

                            if (button.unlocks in $unlocked) {
                                $unlocked[button.unlocks as keyof typeof $unlocked] = true;
                            }

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
<div on:click={handleClick} 
class="pixel2 p-1 bg-opacity-20
{canPurchase ? '!text-green-300' : '!text-red-400 '}">
    {label}
</div>

