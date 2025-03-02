<script lang="ts">
  import { Heading, P } from "flowbite-svelte";
  import SessionList from "./session_list.svelte";
  import type { UserProfile } from "$lib/types/user_profile";
  import { onMount } from "svelte";
  import { GetUserProfile } from "$lib/backend_client/user";

  let user = $state<UserProfile | null>(null);

  onMount(async () => {
    user = await GetUserProfile();
  });
</script>

<main class="max-w-4xl mx-auto p-6 space-y-6 bg-primary-100 dark:bg-gray-800 mt-5 rounded-2xl">
  <div class="p-4">
    <Heading class="text-2xl w-full text-center">Профиль пользователя</Heading>
    <P class="text-lg mt-2"><strong>ФИО:</strong> {user?.fio}</P>
    <P class="text-lg"><strong>Роль:</strong> {user?.roleName}</P>
  </div>

  <SessionList />
</main>
