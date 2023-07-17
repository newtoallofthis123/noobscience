<script>
  import { onMount } from 'svelte';

  let editor;
  export let language = 'javascript';
  export let code = ''
  export let title = '';
  export let author = '';
  let current_code = '';

  const getCode = () => {
    current_code = editor.getValue();
    return current_code;
  }

  async function handleSubmit() {
    const code = getCode();
    const res = await fetch('/api/code/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, author, code, language })
    });
    const data = await res.json();
    console.log(data);
  } 

  onMount(() => {
    // Load the editor's script dynamically
    const loaderScript = document.createElement('script');
    loaderScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.26.1/min/vs/loader.min.js';
    loaderScript.async = true;
    loaderScript.onload = () => {
      window.require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.26.1/min/vs' }});
      window.require(['vs/editor/editor.main'], () => {
        editor = monaco.editor.create(document.getElementById('monaco-container'), {
          value: code,
          language: language,
        });
      });
    };

    document.body.appendChild(loaderScript);

    return () => {
      editor.dispose();
      document.body.removeChild(loaderScript);
    };
  });
</script>

<form class="flex flex-col justify-center" on:submit|preventDefault={handleSubmit}>
    <p>Enter the Paste Title</p>
    <input class="border-2 p-2 rounded-xl w-4/5" type="text" placeholder="Title" bind:value={title} required>
    <p>Author Name</p>
    <input class="input-field" type="text" placeholder="Author" bind:value={author} required>
    <p>Content</p>
    <div id="monaco-container" style="height: 400px;"></div>
    <button class="bg-blue-500 text-white px-4 py-2 rounded" type="submit">Submit</button>
</form>