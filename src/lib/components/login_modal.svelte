<script lang="ts">
  import { Login } from "$lib/backend_client/user";
  import type { LoginRequest } from "$lib/types/login";
  import { Button, Modal, Label, Input } from "flowbite-svelte";
  let { formModal = $bindable() } = $props();
  import { EyeOutline, EyeSlashOutline } from "flowbite-svelte-icons";
  let showPassword = $state(false);

  let input: LoginRequest = {
    username: "",
    password: "",
  };

  async function handleSubmit() {
    if (await Login(input)) {
      location.reload();
    }
  }
</script>

<Modal
  bind:open={formModal}
  size="xs"
  autoclose={false}
  class="w-full"
  backdropClass="bg-gray-900/50 dark:bg-gray-900/80"
>
  <form class="flex flex-col space-y-6" onsubmit={handleSubmit} action="#">
    <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
      Войти
    </h3>
    <div>
      <Label for="username_input" class="space-y-2">Имя пользователя</Label>
      <Input
        id="username_input"
        placeholder="Имя пользователя"
        autocomplete="username"
        bind:value={input.username}
        minlength={4}
        maxlength={50}
        required
      />
    </div>
    <div>
      <Label for="password_input" class="space-y-2">Пароль</Label>
      <Input
        id="password_input"
        type={showPassword ? "text" : "password"}
        placeholder="Пароль"
        autocomplete="current-password"
        required
        minlength={6}
        maxlength={20}
        bind:value={input.password}
      >
        <button
          type="button"
          slot="left"
          onclick={() => (showPassword = !showPassword)}
          class="pointer-events-auto"
        >
          {#if showPassword}
            <EyeOutline class="w-6 h-6" />
          {:else}
            <EyeSlashOutline class="w-6 h-6" />
          {/if}
        </button>
      </Input>
    </div>
    <Button type="submit" class="w-full">Войти</Button>
  </form>
</Modal>
