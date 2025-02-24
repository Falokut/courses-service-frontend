<script lang="ts">
  import { GetRoles } from "$lib/backend_client/roles";
  import { Register } from "$lib/backend_client/user";
  import { Button, Modal, Label, Input, Select, Toast } from "flowbite-svelte";
  import { EyeOutline, EyeSlashOutline } from "flowbite-svelte-icons";
  import { onMount } from "svelte";
  import { AddMessage } from "../../routes/hooks.client";
  let showPassword = $state(false);
  let { formModal = $bindable() } = $props();

  let input = $state({
    name: "",
    lastName: "",
    patronymic: "",
    username: "",
    password: "",
    roleId: 0,
  });

  async function handleSubmit() {
    let fioArr = [input.lastName, input.name];
    if (input.patronymic != "") {
      fioArr = [...fioArr, input.patronymic];
    }
    let isSuccess = await Register({
      fio: fioArr.join(" "),
      username: input.username,
      password: input.password,
      roleId: input.roleId,
    });
    formModal = !isSuccess;
    if (isSuccess) {
      AddMessage("пользователь успешно зарегистрирован", false);
    }
  }

  let rolesValues: any[] = $state([]);

  onMount(async () => {
    let roles = await GetRoles();
    roles.forEach((v) => {
      rolesValues = [...rolesValues, { value: v.id, name: v.name }];
    });
  });
</script>

<Modal
  bind:open={formModal}
  size="md"
  autoclose={false}
  class="w-full"
  backdropClass="bg-gray-900/50 dark:bg-gray-900/80"
>
  <form class="flex flex-col space-y-6" onsubmit={handleSubmit} action="#">
    <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
      Регистрация
    </h3>
    <div class="grid gap-6 mb-6 sm:grid-cols-3">
      <div class="mb-2">
        <Label for="lastname_input" class="space-y-2">Фамилия</Label>
        <Input
          id="lastname_input"
          placeholder="Фамилия"
          autocomplete="family-name"
          bind:value={input.lastName}
          required
        />
      </div>
      <div class="mb-2">
        <Label for="name_input" class="space-y-2">Имя</Label>
        <Input
          id="name_input"
          placeholder="Имя"
          autocomplete="given-name"
          bind:value={input.name}
          required
        />
      </div>
      <div class="mb-2">
        <Label for="patronymic_input" class="space-y-2">Отчество</Label>
        <Input
          id="patronymic_input"
          placeholder="Отчество"
          autocomplete="additional-name"
          bind:value={input.patronymic}
        />
      </div>
    </div>
    <div class="grid gap-6 mb-6 md:grid-cols-2">
      <div>
        <Label for="username_input" class="space-y-2">Имя пользователя</Label>
        <Input
          id="username_input"
          placeholder="Имя пользователя"
          autocomplete="username"
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
          autocomplete="new-password"
          required
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
    </div>
    <div>
      <Label>
        Роль
        <Select class="mt-2" items={rolesValues} bind:value={input.roleId} />
      </Label>
    </div>
    <Button type="submit" class="w-full">Зарегистрировать</Button>
  </form>
</Modal>
