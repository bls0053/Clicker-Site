<script lang='ts'>

    import { buttons_store } from "$lib/stores/buttons";
    import { state, unlocked } from "../../stores/stores";
    import type { CostState } from "$lib/stores/buttons";

    export let text = "purchase";
    export let label = "";
    export let id = "";
    export let cost = <CostState>{};
    
    let canPurchase = false;
    let locked = false;
    

    $:  {
        
        buttons_store.update((buttons) => {
            const updated_buttons = buttons.map((button) => {
                if (button.id === id) {
                    const { cost } = button;
                        canPurchase = Object.keys(cost).every((key) => {
                            const typedKey = key as keyof typeof $state;
                            if (typedKey !== undefined && typeof cost[typedKey] === 'number') {
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
                        console.log(button.type)

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

                            if (button.amount >= button.max && button.max > 0) {
                                locked = true;
                            }

                            if (!locked) {
                            // Increase cost
                                Object.keys(cost).forEach((key) => {
                                    const typedKey = key as keyof typeof cost;
                                    if (typedKey !== undefined && typeof cost[typedKey] === 'number') {
                                        cost[typedKey] = Math.ceil(cost[typedKey] * Math.pow(1.07, button.amount));
                                    }
                                });
                            }

                            // Apply rate upgrade
                            if (button.type == "rate") {
                                const resourceKey = Object.keys(button.increase)[0];
                                const rateval = button.increase[resourceKey];
                                if (rateval) {
                                    $state[resourceKey as keyof typeof $state].rate += rateval;
                                }
                            }

                            // Apply mult upgrade
                            if (button.type == "mult") {
                                const resourceKey = Object.keys(button.increase)[0];
                                const multval = button.increase[resourceKey];
                                if (multval) {
                                    $state[resourceKey as keyof typeof $state].mult += multval;
                                }
                            }

                            // Unlock specified id
                            button.unlocks.forEach(button => {
                                if (button in $unlocked) {
                                    $unlocked[button as keyof typeof $unlocked] = true;
                                }
                            })
                                

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
class=" p-6 bg-opacity-20 neo hover:rotate-3 transiton-transform duration-200
{locked ? '' : (canPurchase ? '!text-green-300' : '!text-red-400')}">
    {#if (!locked)}
    {#each Object.entries(cost) as [key, value]}
        {#if value !== undefined}
            <div>{key}: {value}</div>
        {/if}
    {/each}
    {/if}

    {label}

    {#if (locked)}
        MAX
    {/if}
</div>

