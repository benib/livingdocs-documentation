<script>
  import { onMount } from 'svelte'
  export let nodes = []
  onMount(async () => {
    let data = await (await fetch('/api')).json()
    let menu = data.menu

    console.log(menu)
    nodes = menu.nodes
    console.log(nodes)
  })
</script>

<main>
  <h1>Livingdocs Documentation</h1>
  <!-- {@debug nodes} -->
  <ul>
    {#each nodes as entry}
      <li>
        <a href="/doc/{entry.documentId}">{entry.label}</a>
      </li>
    {/each}
  </ul>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
