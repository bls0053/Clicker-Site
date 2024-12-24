<script lang="ts">
    import hljs from "highlight.js";
    import python from 'highlight.js/lib/languages/python';
    
    hljs.registerLanguage('python', python);

    import { onMount } from "svelte";
    import { active_tab, actual_char, unlocked } from "$lib/stores/stores";
    import { Timer_ms } from '$lib/util/time';

    import { 
        count_char,
        code_index,
        state
    } from '$lib/stores/stores';

    let filePath = "/code.txt"; 
    let code_full = "";
    let new_snippet = "";
    let code_snippet = "";
    let index = 0;
    export let paused = false;
    

    let prev_count = 0;
    let char_limit = 1000;
    let code_length = 0;
    let difference = 0;
    let highlightedCode = "";


    onMount(async () => {
        const response = await fetch(filePath);
        code_full = (await response.text());
        code_length = code_full.length;
    });

    $: {
        if ($unlocked.auto_enter) {
            paused = false;
        }
    }

    const update_char = () => {
        count_char.update((n) => n + ($state["lines"].rate * $state["lines"].mult));
    };

    Timer_ms.subscribe((time) => {
        if (!paused) {
            update_char();
        }
    });

    function handleKeydown(event: KeyboardEvent) {
        if (event.key === "Enter") {
            if (paused) {
                
                code_snippet += "\r\n";
                $state["lines"].amount += 1;
                paused = false;
                count_char.update((n) => n + 1);
                
            }
            else {
            }
        }
    }

    function trim_snippet() {
        if (code_snippet.length > (1.5 * char_limit)) {
            let updated_snippet = code_snippet.slice(code_snippet.length - char_limit);
            code_snippet = (updated_snippet);
        }
    }

    function set_index() {
        if ($code_index < code_length) {
            code_index.update(n => n + difference);
        } else {
            code_index.set(0);
        }
    }

    function set_lines() {
        if (difference == 1) {
            if (new_snippet === "\n") {
                $state["lines"].amount += 1;
            }
        } else {
            const new_line_count = new_snippet.split('\n').length - 1;
            $state["lines"].amount += new_line_count;
        }
    }

    count_char.subscribe((count) => {
     
        if (!paused) {
            difference = Math.floor(count - prev_count);

            if (index >= code_length) {
                prev_count = 0;
                index = 0;
                count_char.set(0);
            }
            
            if (!$unlocked.auto_enter) {  
                
                if (difference > 0) {
                    console.log("!$unlocked.auto_enter: ", !$unlocked.auto_enter)
                    new_snippet = code_full.slice(index, index + difference);

                    const newlineIndex = new_snippet.indexOf("\r");
                    console.log(newlineIndex)
                    if (newlineIndex !== -1) {
                        prev_count += 2;
                        new_snippet = new_snippet.slice(0,newlineIndex);
                        paused = true;
                        console.log(paused);
                    }

                    prev_count += new_snippet.length;

                    index = prev_count
                    code_snippet += new_snippet;
                    trim_snippet();
                    highlightedCode = hljs.highlight(code_snippet, { language: 'python' }).value;
                    code_index.set(index);
                    count_char.set(prev_count);
                }
            }

            else {
                if (difference > 0) {
                    new_snippet = code_full.slice($code_index, $code_index + difference);
                    code_snippet += new_snippet;
                    
                    trim_snippet();
                    set_index();
                    set_lines();

                    prev_count = $count_char;
                    highlightedCode = hljs.highlight(code_snippet, { language: 'python' }).value;
                }   
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

<div class="h-full overflow-y-hidden flex flex-col-reverse rounded-md p-4">
    {#if ($active_tab == "code")}
        <pre class="python pixel-font">{@html highlightedCode}<span class="pixel-font {paused ? 'flashing-text' : ''}">| </span><span class="pixel-font {paused ? 'flashing-text' : 'opacity-0'}">ENTER</span></pre>
    {/if}
</div>
