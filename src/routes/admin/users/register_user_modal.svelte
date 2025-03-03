<script lang="ts">
  import { Register } from "$lib/backend_client/user";
  import { Button, Modal, Label, Input, Select } from "flowbite-svelte";
  import { EyeOutline, EyeSlashOutline } from "flowbite-svelte-icons";
  import { AddMessage } from "../../../routes/hooks.client";
  import RolesSelectInput from "./roles_select_input.svelte";
  let showPassword = $state(false);
  let { formModal = $bindable(), ItemAdded = () => {} } = $props();

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
    if (isSuccess) {
      AddMessage("пользователь успешно зарегистрирован", false);
      formModal = false;
      ItemAdded();
    }
  }
</script>

<Modal
  bind:open={formModal}
  size="md"
  autoclose={false}
  class="w-full"
  backdropClass="fixed inset-0 z-40 bg-gray-900/80"
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
      <RolesSelectInput bind:roleId={input.roleId}></RolesSelectInput>
    </div>
    <Button type="submit" class="w-full">Зарегистрировать</Button>
  </form>
</Modal>
