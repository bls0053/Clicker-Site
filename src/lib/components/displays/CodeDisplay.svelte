<script lang="ts">

    import hljs from "highlight.js";
    import python from 'highlight.js/lib/languages/python';
    
    hljs.registerLanguage('python', python);

    import { onMount } from "svelte";

    import { 
        count_char,
        code_index,
		code_snippet,
        state
    } from '../../stores/stores';

    

    let filePath = "/code.txt"; 
    let code_full = "";
    let new_snippet = "";

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
                $state.lines += 1;
            }
        } 
        else {
            const new_line_count = new_snippet.split('\n').length - 1;
            $state.lines += new_line_count;;
        }
    }

    count_char.subscribe((count) => {

        difference = Math.floor($count_char - prev_count);
        if (difference > 0) {

            new_snippet = code_full.slice($code_index, $code_index + difference);
            code_snippet.update(n => n + new_snippet);
            
            trim_snippet();
            set_index();
            set_lines();

            prev_count = $count_char;
            highlightedCode = hljs.highlight($code_snippet,{ language: 'python' }).value
        }
    });

</script>


<div class="h-full overflow-y-hidden flex flex-col-reverse ">
    <pre class="python pixel-font">{@html highlightedCode}</pre>
   
</div>

