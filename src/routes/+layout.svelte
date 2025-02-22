<script>
  import "../app.css";
  import { DarkMode } from "flowbite-svelte";
  let { children } = $props();
</script>

<DarkMode />
{@render children()}
