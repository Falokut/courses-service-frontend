<script lang="ts">
  import "../app.css";
  import { DarkMode } from "flowbite-svelte";
  import Toasts from "./toasts.svelte";

  let { children } = $props();
</script>

<DarkMode />

{@render children()}

<Toasts></Toasts>
