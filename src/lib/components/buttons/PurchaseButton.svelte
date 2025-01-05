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

    setInterval(() => {
        buttons_store.update((buttons) => {
            const updated_buttons = buttons.map((button) => {
                if (button.id === id) {
                    const { costScale } = button;
                    if (costScale === "rand") {
                        Object.keys(cost).forEach((key) => {
                            const typedKey = key as keyof typeof cost;
                            if (typedKey !== undefined && typeof cost[typedKey] === 'number') {
                                cost[typedKey] = Math.floor(Math.random() * 24) + 1;
                            }
                        });
                    }    
                }
                return button;
            });
            return updated_buttons;
        });
    },5000)

    const handleClick = () => {
        if (isCooldown || locked) { return };
        buttons_store.update((buttons) => {
            const updated_buttons = buttons.map((button) => {
                if (button.id === id) {
                    
                    const { cost } = button;

                    if (canPurchase) {
                        button.amount += 1;
                        
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

                        if (!locked && button.costScale === "exp") {
                            
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
                                    $state.lines.rate += amount;
                                }

                                else if (type === "mult") {
                                    if (!amount) {return}
                                    $state.lines.mult += amount;
                                }
                            }

                            
                            else if (button_type === "bencoin") {
                                if (type === "windows") {
                                    if (!amount) {return}
                                    $state.bencoin.windows += amount;
                                }

                                else if (type === "nodes") {
                                    if (!amount) {return}
                                    $state.bencoin.nodes += amount;
                                }

                                else if (type === "speed") {
                                    if (!amount) {return}
                                    $state.bencoin.speed += amount;
                                }
                            }

                            else if (button_type === "coffee") {

                            }   

                            else if (button_type === "water") {
                                if (type === "pour") {
                                    if (!amount) {return}
                                    $state.water.pour += amount;
                                }
                                else if (type === "speed") {
                                    if (!amount) {return}
                                    $state.water.speed += amount;
                                }
                            }

                            if (button_type === "beans") {
                                if (!amount) {return}
                                $state.beans.amount += amount;
                            }

                            if (button_type.includes("unlock")) {
                                if (type in $unlocked) {
                                    $unlocked[type as keyof typeof $unlocked] = true;
                                }
                            }

                            if (button.cooldown > 0) {
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

<style>

    .button-bg {
        background-image: url('/upgrade_header.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-position: center;
        image-rendering: pixelated;
        image-rendering: crisp-edges;
    }

</style>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->


<div class="flex flex-col h-full items-center w-11/12 pixel-font select-none button-bg hover:rotate-3 p-6 transiton-transform duration-200">
    <div on:click={handleClick} 
    id="{id}"
    class="flex h-full w-full
    {locked ? '' : (canPurchase ? '!text-green-900' : '!text-red-400')}">

        {label} 
        {#if (!locked)}
            {#each Object.entries(cost) as [key, value]}
                {#if value !== undefined}
                    <span>{key}: {value}</span>
                {/if}
            {/each}
        {/if}
        {#if (locked)}
            MAX
        {/if}
    </div>

    <div class="flex h-full w-full">
        
    </div>


</div>
