<script lang="ts">
  import moment, { type Moment } from "moment";
  import {
    TerminateUserSession,
    GetUserSessions,
  } from "$lib/backend_client/user";
  import { Listgroup, ListgroupItem, Button } from "flowbite-svelte";
  import { Section } from "flowbite-svelte-blocks";
  import DeleteModal from "$lib/components/delete_modal.svelte";
  import { onMount } from "svelte";

  let sessions: { id: string; createdAt: Moment }[] = $state([]);
  let openModal: boolean = $state(false);
  let selectedSession: { id: string; createdAt: Moment } = $state({
    id: "",
    createdAt: moment(""),
  });

  let sortAsc: boolean = $state(false); // Флаг для сортировки

  const deleteSelectedSession = async () => {
    if (await TerminateUserSession(selectedSession.id)) {
      sessions = sessions.filter((v) => v.id != selectedSession.id);
      openModal = false;
    }
  };

  onMount(async () => {
    let fetchedSessions = await GetUserSessions();

    fetchedSessions.forEach((_, i) => {
      fetchedSessions[i].createdAt = moment(fetchedSessions[i].createdAt).local(
        true
      );
    });
    sessions = fetchedSessions;
    sortSessions();
  });

  const timeFormat = "YYYY-MM-DD HH:mm:ss";

  function sortSessions() {
    sessions = sessions.sort(
      (a, b) =>
        sortAsc
          ? a.createdAt.valueOf() - b.createdAt.valueOf() // По возрастанию
          : b.createdAt.valueOf() - a.createdAt.valueOf() // По убыванию
    );
  }
</script>

<Section name="content" sectionClass="p-3 sm:p-5">
  <div class="flex justify-between mb-3">
    <h2 class="dark:text-gray-200 text-gray-900">Текущие сессии</h2>
    <Button
      on:click={() => {
        sortAsc = !sortAsc;
        sortSessions();
      }}
    >
      Сортировать по дате: {sortAsc ? "↑" : "↓"}
    </Button>
  </div>

  <Listgroup>
    {#each sessions as session}
      <ListgroupItem>
        <div class="flex justify-between items-center w-full">
          <p class="text-sm font-semibold">
            Сессия от {session.createdAt.format(timeFormat)}
          </p>
          <Button
            class="!text-white !bg-red-600"
            on:click={() => {
              selectedSession = session;
              openModal = true;
            }}
          >
            Завершить
          </Button>
        </div>
      </ListgroupItem>
    {/each}
  </Listgroup>
</Section>

<DeleteModal
  bind:openModal
  DeleteText={`Вы уверены, что хотите завершить сессию от ${selectedSession.createdAt}?`}
  HandleDelete={deleteSelectedSession}
  HandleCancel={() => {
    openModal = false;
  }}
/>
