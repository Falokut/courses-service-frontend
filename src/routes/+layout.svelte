<script lang="ts">
  import "../app.css";
  import Toasts from "./toasts.svelte";
  import NavBar from "$lib/components/nav_bar.svelte";

  let { children } = $props();
</script>

<NavBar />

{@render children()}

<Toasts />
