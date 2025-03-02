<script lang="ts">
  import { GetRoles } from "$lib/backend_client/roles";
  import { EditUser } from "$lib/backend_client/user";
  import { Button, Modal, Label, Input, Select } from "flowbite-svelte";
  import { EyeOutline, EyeSlashOutline } from "flowbite-svelte-icons";
  import { onMount } from "svelte";
  import { AddMessage } from "../../routes/hooks.client";
  import type { User } from "$lib/types/user";
  let showPassword = $state(false);
  let { formModal = $bindable(), user = $bindable<User>() } = $props();

  let input = $state({
    name: "",
    lastName: "",
    patronymic: "",
    username: "",
    password: "",
    roleId: 0,
  });

  function parseFullName(fullName: string) {
    const parts = fullName.trim().split(/\s+/);
    return {
      lastName: parts[0] || "",
      firstName: parts[1] || "",
      patronymic: parts[2] || "",
    };
  }

  async function handleSubmit() {
    let fioArr = [input.lastName, input.name];
    if (input.patronymic != "") {
      fioArr = [...fioArr, input.patronymic];
    }

    const updateReq = {
      userId: user.id,
      fio: fioArr.join(" "),
      username: input.username,
      password: input.password,
      roleId: input.roleId,
    };

    let isSuccess = await EditUser(updateReq);
    formModal = !isSuccess;
    if (isSuccess) {
      AddMessage("данные пользователя успешно изменены", false);
      user.fio = updateReq.fio;
      user.username = updateReq.username;
      const roleIndex = rolesValues.findIndex((v) => {
        return v.value == input.roleId;
      });
      if (roleIndex != -1) {
        user.roleName = rolesValues[roleIndex].name;
      }
    }
  }

  let rolesValues: any[] = $state([]);

  onMount(async () => {
    let roles = await GetRoles();
    roles.forEach((v) => {
      rolesValues = [...rolesValues, { value: v.id, name: v.name }];
    });
  });

  $effect(() => {
    const fio = parseFullName(user.fio);
    input.lastName = fio.lastName;
    input.name = fio.firstName;
    input.patronymic = fio.patronymic;
    input.username = user.username;
    const roleIndex = rolesValues.findIndex((v) => {
      return v.name == user.roleName;
    });
    if (roleIndex != -1) {
      input.roleId = rolesValues[roleIndex].value;
    }
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
      Редактирование данных пользователя
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
    <Button type="submit" class="w-full">Сохранить</Button>
  </form>
</Modal>
