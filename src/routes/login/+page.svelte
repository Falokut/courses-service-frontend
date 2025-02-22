<script lang="ts">
  import { Label, Input, Button } from "flowbite-svelte";
  import { Register, Section } from "flowbite-svelte-blocks";
  import { EyeOutline, EyeSlashOutline } from "flowbite-svelte-icons";
  let showPassword = false;

  let input = {
    username: "",
    password: "",
  };
  function handleSubmit() {
    alert("Form submited.");
  }
</script>

<Section name="login">
  <Register>
    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
      <form on:submit={handleSubmit} class="flex flex-col space-y-6">
        <h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">
          Вход
        </h3>
        <Label class="space-y-2">
          Имя пользователя
          <Input
            type="text"
            placeholder="Имя пользователя"
            bind:value={input.username}
            required
          />
        </Label>
        <Label class="space-y-2">
          Пароль
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Пароль"
            required
          >
            <button
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
        </Label>
        <Button type="submit">Войти</Button>
      </form>
    </div>
  </Register>
</Section>
