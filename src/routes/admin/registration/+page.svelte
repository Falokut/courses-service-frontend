<script lang="ts">
  import { Label, Input, Select, Button } from "flowbite-svelte";
  import { Section } from "flowbite-svelte-blocks";
  import { EyeOutline, EyeSlashOutline } from "flowbite-svelte-icons";
  let roles = [{ value: "учитель", name: "учитель" }];

  let input = {
    fio: "",
    username: "",
    role: "",
    password: "",
  };
  let showPassword = false;

  function handleSubmit() {
    alert("Form submited.");
  }
</script>

<Section name="crudcreateform" class="dark:bg-primary-900 bg-primary-700">
  <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">Регистрация пользователя</h2>
  <form on:submit={handleSubmit}>
    <div class="grid gap-4 sm:grid-cols-1 sm:gap-6">
      <div class="w-f">
        <Label for="fio-input" class="mb-2">ФИО</Label>
        <Input
          id="fio-input"
          type="text"
          placeholder="ФИО"
          bind:value={input.fio}
          required
        />
      </div>
      <div>
        <Label for="username-input" class="mb-2">Имя пользователя</Label>
        <Input
          id="username-input"
          type="text"
          placeholder="Имя пользователя"
          bind:value={input.username}
          required
        />
      </div>
      <div>
        <Label for="password-input" class="mb-2">Пароль</Label>
        <Input
          id="password-input"
          type={showPassword ? "text" : "password"}
          placeholder="Пароль"
          size="lg"
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
      </div>
      <div>
        <Label>
          Роль
          <Select class="mt-2" items={roles} bind:value={input.role} required />
        </Label>
      </div>
      <Button type="submit">Зарегистрировать</Button>
    </div>
  </form>
</Section>
