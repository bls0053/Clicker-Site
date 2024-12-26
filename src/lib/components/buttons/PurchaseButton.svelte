<script lang='ts'>

    import { buttons_store } from "$lib/stores/buttons";
    import { nodes, state, unlocked, windows } from "$lib/stores/stores";
    import type { CostState } from "$lib/stores/buttons";

    export let label = "";
    export let id = "";
    export let cost = <CostState>{};
    
    let canPurchase = false;
    let locked = false;
    let isCooldown = false;
    

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
        if (isCooldown) { return };
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


                        const button_keys = Object.keys(button.type);
                        
                        button_keys.forEach(key => {

                            const button_type = key;
                            const { type, amount } = button.type[button_type];

                            if (button_type === "lines") {
                                if (type === "rate") {
                                    if (!amount) {return}
                                    $state["lines"].rate += amount;
                                }

                                else if (type === "mult") {
                                    if (!amount) {return}
                                    $state["lines"].mult += amount;
                                }
                            }

                            
                            else if (button_type === "bencoin") {
                                if (type === "windows") {
                                    if (!amount) {return}
                                    $state["bencoin"].windows += amount;
                                    console.log($state["bencoin"].windows)
                                }

                                else if (type === "nodes") {
                                    if (!amount) {return}
                                    $state["bencoin"].nodes += amount;
                                    console.log($state["bencoin"].nodes)
                                }

                                else if (type === "speed") {
                                    if (!amount) {return}
                                    $state["bencoin"].speed += amount;
                                    console.log($state["bencoin"].speed)
                                }
                            }

                            else if (button_type === "coffee") {

                            }   

                            if (button_type.includes("unlock")) {
                                console.log(type)
                                console.log($unlocked)
                                if (type in $unlocked) {
                                    $unlocked[type as keyof typeof $unlocked] = true;
                                    console.log($unlocked)
                                }
                            }

                            if (button.cooldown > 0) {
                                console.log("timeout")
                                isCooldown = true;
                                setTimeout(() => {     
                                    isCooldown = false;
                                }, button.cooldown*1000);
                            }

                        });
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
class=" p-6 bg-opacity-20 neo hover:rotate-3 transiton-transform duration-200 pixel-font
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

