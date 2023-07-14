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
    <input class="input-field" type="text" placeholder="Title" bind:value={title} required>
    <p>Author Name</p>
    <input class="input-field" type="text" placeholder="Author" bind:value={author} required>
    <p>Language</p>
    <select class="input-field" bind:value={language}>
      <option value="javascript">JavaScript</option>
      <option value="python">Python</option>
      <option value="c">C</option>
      <option value="cpp">C++</option>
      <option value="java">Java</option>
      <option value="html">HTML</option>
      <option value="css">CSS</option>
      <option value="php">PHP</option>
      <option value="ruby">Ruby</option>
      <option value="rust">Rust</option>
      <option value="go">Go</option>
      <option value="sql">SQL</option>
      <option value="swift">Swift</option>
      <option value="kotlin">Kotlin</option>
      <option value="typescript">TypeScript</option>
      <option value="plaintext">Plain Text</option>
    </select>
    <p>Content</p>
    <div id="monaco-container" style="height: 400px;"></div>
    <button class="bg-blue-500 text-white px-4 py-2 rounded" type="submit">Submit</button>
</form>