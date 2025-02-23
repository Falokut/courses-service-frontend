<script lang="ts">
  import "../app.css";
  import { DarkMode } from "flowbite-svelte";
  import ErrorToasts from "./error_toasts.svelte";

  let { children } = $props();
</script>

<DarkMode />

{@render children()}

<ErrorToasts></ErrorToasts>
