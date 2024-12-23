<script lang="ts">

    import hljs from "highlight.js";
    import python from 'highlight.js/lib/languages/python';
    
    hljs.registerLanguage('python', python);

    import { onMount } from "svelte";
    import { active_tab, unlocked } from "../../stores/stores";
    import { Timer_ms } from '../../util/time';

    import { 
        count_char,
        code_index,
		code_snippet,
        state
    } from '../../stores/stores';

    

    let filePath = "/code.txt"; 
    let code_full = "";
    let new_snippet = "";
    let paused = false;

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

    const update_char = () => {
        count_char.update((n) => n + ($state["lines"].rate * $state["lines"].mult));
    };

    Timer_ms.subscribe((time) => {
        if (paused == false) {
            update_char();
        }
    });


    function handleKeydown(event: KeyboardEvent) {
        if (event.key === "Enter") {
            if (paused) {
                paused = false;
                $state["lines"].amount += 1;
                code_snippet.update(n => n + "\n");
            }
        }
    }

    function trim_snippet() {
        if ($code_snippet.length > (1.5 * char_limit)) {
            let updated_snippet = $code_snippet.slice($code_snippet.length - char_limit);
            code_snippet.set(updated_snippet);
        }
    }
    
    function set_index() {
        if ($code_index < code_length) {
            code_index.update(n => n + difference);
        }
        else {
            code_index.set(0);
        }
    }

    function set_lines() {
        if (difference == 1) {
            if (new_snippet === "\n") {
                $state["lines"].amount += 1;
            }
        } 
        else {
            const new_line_count = new_snippet.split('\n').length - 1;
            $state["lines"].amount += new_line_count;
        }
    }

    count_char.subscribe((count) => {


        if (!paused) {
            difference = Math.floor(count) - prev_count;
            if (difference > 0) {

                new_snippet = code_full.slice($code_index, $code_index + difference);

                if (!$unlocked.auto_enter) {
                    
                    const newlineIndex = new_snippet.indexOf("\n");
                    if (newlineIndex !== -1) {
                        if (new_snippet === "\n") {
                            
                        }
                        else {
                            new_snippet = new_snippet.slice(0, newlineIndex-1)

                        }
                        prev_count = prev_count += new_snippet.length;
                        paused = true;
                            
                    }
                }

                
                code_snippet.update(n => n + new_snippet);
                // trim_snippet();
                set_index();
                // set_lines();

                highlightedCode = hljs.highlight($code_snippet,{ language: 'python' }).value
            }
        }

        
    });

</script>

<svelte:window on:keydown={handleKeydown} />

<div class="h-full overflow-y-hidden flex flex-col-reverse rounded-md p-4">
{#if ($active_tab == "code")}
    <pre class="python pixel-font">{@html highlightedCode}|</pre>
{/if}
   
</div>

