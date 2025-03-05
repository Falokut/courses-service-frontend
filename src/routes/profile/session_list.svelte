<script lang="ts">
  import moment, { type Moment } from "moment";
  import {
    TerminateUserSession,
    GetUserSessions,
  } from "$lib/backend_client/user";
  import {
    Listgroup,
    ListgroupItem,
    Button,
    P,
    Heading,
  } from "flowbite-svelte";
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
    sessions = [];
    fetchedSessions.forEach((v) => {
      sessions.push({ id: v.id, createdAt: moment(v.createdAt).local(true) });
    });
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

<Section name="content" sectionClass="w-full mt-5">
  <div class="flex justify-between mb-5 flex-nowrap w-full">
    <Heading class="text-2xl">Текущие сессии</Heading>
    <Button
      color={"primary"}
      on:click={() => {
        sortAsc = !sortAsc;
        sortSessions();
      }}
      size="sm"
    >
      Сортировать по дате: {sortAsc ? "↑" : "↓"}
    </Button>
  </div>

  <Listgroup>
    {#each sessions as session}
      <ListgroupItem itemDefaultClass="px-4 w-full text-sm font-medium">
        <div class="flex justify-between items-center border-0">
          <P class="text-sm font-semibold">
            Сессия от {session.createdAt.format(timeFormat)}
          </P>
          <Button
            color="red"
            on:click={() => {
              selectedSession = session;
              openModal = true;
            }}
            size="sm"
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
  DeleteText={`Вы уверены, что хотите завершить сессию от ${selectedSession.createdAt.format(timeFormat)}?`}
  HandleDelete={deleteSelectedSession}
  HandleCancel={() => {
    openModal = false;
  }}
/>
