<script>
  import LoginModal from "$lib/components/login_modal.svelte";
  import { Button } from "flowbite-svelte";
  import { Alert } from "flowbite-svelte";
  import { DarkMode } from "flowbite-svelte";

  let loginModal = false;
</script>

<div class="p-8">
  <Alert>
    <span class="font-medium">Info alert!</span>
    Change a few things up and try submitting again.
  </Alert>
</div>

<Button on:click={() => (loginModal = true)}>Войти</Button>
<LoginModal bind:formModal={loginModal}></LoginModal>
