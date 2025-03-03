<script lang="ts">
  import { EditUser } from "$lib/backend_client/user";
  import { Button, Modal, Label, Input, Select } from "flowbite-svelte";
  import { EyeOutline, EyeSlashOutline } from "flowbite-svelte-icons";
  import { AddMessage } from "../../hooks.client";
  import type { User } from "$lib/types/user";
  import RolesSelectInput from "./roles_select_input.svelte";
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

  let roleName = $state("");

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

    if (await EditUser(updateReq)) {
      AddMessage("данные пользователя успешно изменены", false);
      user.fio = updateReq.fio;
      user.username = updateReq.username;
      user.roleName = roleName;
      formModal = false;
    }
  }

  $effect(() => {
    const fio = parseFullName(user.fio);
    input.lastName = fio.lastName;
    input.name = fio.firstName;
    input.patronymic = fio.patronymic;
    input.username = user.username;
    roleName = user.roleName;
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
          minlength={2}
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
          minlength={2}
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
          autocomplete="new-password"
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
    </div>
    <div>
      <RolesSelectInput bind:roleId={input.roleId} bind:roleName
      ></RolesSelectInput>
    </div>
    <Button type="submit" class="w-full">Сохранить</Button>
  </form>
</Modal>
