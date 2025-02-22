<script>
  import { Button, Modal, Label, Input, Checkbox } from "flowbite-svelte";
  export let formModal = false;
  import { EyeOutline, EyeSlashOutline } from "flowbite-svelte-icons";
  let showPassword = false;

  let input = {
    username: "",
    password: "",
  };

  function handleSubmit() {
    alert("login");
  }
</script>

<Modal
  bind:open={formModal}
  size="xs"
  autoclose={false}
  class="w-full"
  backdropClass="bg-gray-900/50 dark:bg-gray-900/80"
  outsideclose={true}
>
  <form class="flex flex-col space-y-6" on:submit={handleSubmit} action="#">
    <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
      Войти
    </h3>
    <div>
      <Label for="username_input" class="space-y-2">Имя пользователя</Label>
      <Input
        id="username_input"
        placeholder="Имя пользователя"
        bind:value={input.username}
        required
      />
    </div>
    <div>
      <Label for="password_input" class="space-y-2">Пароль</Label>
      <Input
        id="password_input"
        type={showPassword ? "text" : "password"}
        placeholder="Пароль"
        required
      >
        <button
          type="button"
          slot="left"
          on:click={() => (showPassword = !showPassword)}
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
