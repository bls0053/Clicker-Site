<script lang="ts">
    
    import Prism from 'prismjs';
    import 'prismjs/themes/prism-tomorrow.css';
    import 'prismjs/components/prism-python.min.js';
    import 'prismjs/components/prism-javascript.min.js';

    import { onMount } from "svelte";
    import { active_tab, actual_char, overallRate_ms, unlocked } from "$lib/stores/stores";
    import { Timer_ms } from '$lib/util/time';

    import { 
        count_char,
        state
    } from '$lib/stores/stores';

    let filePath = "/code.txt"; 
    let code_source = "";
    let new_snippet = "";
    let code_to_write = "";
    let index = 0;
    export let paused = false;
    

    let prev_count = 0;
    let char_limit = 2000;
    let code_length = 0;
    let difference = 0;
    let highlightedCode = "";


    onMount(async () => {
        const response = await fetch(filePath);
        code_source = (await response.text());
        code_source = code_source.replace(/\r\n/g, "\n");
        
        
        code_length = code_source.length;
    });

    $: {
        if ($unlocked.auto_enter) {
            handleAutoEnter();
            paused = false;
        }
    }

    const update_char = () => {
        count_char.update((n) => n + $overallRate_ms);
    };

    Timer_ms.subscribe((time) => {
        if (!paused) {
            update_char();
        }
    });

    function handleKeydown(event: KeyboardEvent) {
        if (event.key === "Enter") {
            if (paused) {
                if (code_source[prev_count] !== "\n") {
                    paused = false;
                    
                    if ($unlocked.auto_enter) {
                        handleAutoEnter()
                    }
                }

                else {
                    prev_count += 1;
                    index = prev_count;
                    count_char.set(prev_count);
                    
                    if ($unlocked.auto_enter) {
                        handleAutoEnter()
                    }
                }
                code_to_write += "\n";
                $state["lines"].amount += 1;
                highlightedCode = Prism.highlight(code_to_write, Prism.languages.javascript, "javascript");
            }
            else {
            }
        }
    }

    function handleAutoEnter() {
        if (paused) {
            const enterEvent = new KeyboardEvent("keydown", {
                key: "Enter",
                keyCode: 13,
                code: "Enter",
                which: 13,
            });
            window.dispatchEvent(enterEvent);
        }
    }

    function trim_snippet() {
        if (code_to_write.length > (1.5 * char_limit)) {
            let updated_snippet = code_to_write.slice(code_to_write.length - char_limit);
            code_to_write = (updated_snippet);
        }
    }

    function count_lines() {
        $state.lines.amount += (new_snippet.match(/\n/g) || []).length
    }

    count_char.subscribe((count) => {

        if (!paused) {
            difference = Math.floor(count - prev_count);
            if (difference > 0) {
                
                new_snippet = code_source.slice(index, index + difference);
                

                if (!$unlocked.auto_enter) {
                    if (code_source[prev_count+1] === "\n") {
                        prev_count += 1;
                        paused = true;
                    }

                    const newLineIndex = new_snippet.indexOf("\n");
                    if (newLineIndex !== -1) {
                        new_snippet = new_snippet.slice(0, newLineIndex);
                        prev_count += 1;
                        paused = true; 
                    }
                }

                else {
                    count_lines();
                }
                

                if (index >= code_length) {
                    index = 185;
                    prev_count = 185;
                    count_char.set(185);
                }

                trim_snippet();
                prev_count += new_snippet.length;
                index = prev_count;
                code_to_write += new_snippet;
                highlightedCode = Prism.highlight(code_to_write, Prism.languages.javascript, "javascript");
                count_char.set(prev_count);
                actual_char.update((n) => n + new_snippet.length);

                // if ($unlocked.auto_enter) {
                //     handleAutoEnter();
                // }
                    
            }
        }
    });












</script>

<svelte:window on:keydown={handleKeydown} />

<style>
    @keyframes flash {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }

    .flashing-text {
        animation: flash .75s infinite;
    }
</style>

<div class="overflow-y-hidden mx-auto flex flex-col-reverse rounded-md h-5/6 w-5/6">
    {#if ($active_tab == "code")}
        <pre style="font-size: 24px" class="python pixel-font whitespace-pre-wrap break-words">{@html highlightedCode}<span style="font-size: 24px" class="pixel-font {paused ? 'flashing-text' : ''}">&gt </span><span style="font-size: 24px" class="pixel-font {paused ? 'flashing-text' : 'opacity-0'}">ENTER</span></pre>
    {/if}
</div>
