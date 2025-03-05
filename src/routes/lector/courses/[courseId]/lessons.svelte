<script lang="ts">
  import {
    CloseButton,
    Drawer,
    Sidebar,
    SidebarItem,
    SidebarWrapper,
    SidebarGroup,
    Button,
    Modal,
    Heading,
    Input,
  } from "flowbite-svelte";
  import { AngleLeftOutline } from "flowbite-svelte-icons";
  import { sineIn } from "svelte/easing";
  import type { Lesson } from "$lib/types/lesson";
  import type { CreateLessonRequest } from "$lib/types/create_lesson_request";
  import { CreateLesson } from "$lib/backend_client/lesson";

  let input = $state<CreateLessonRequest>({
    courseId: 0,
    title: "",
    lessonNumber: 0,
  });
  let showCreateModal = $state(false);

  let {
    lessons = $bindable<Lesson[]>([]),
    selectedLesson = $bindable<Lesson | null>(),
    courseId = $bindable<number>(),
  } = $props();

  let hideLessons = $state(true);
  let transitionParams = {
    x: 320,
    duration: 200,
    easing: sineIn,
  };

  const createLesson = async () => {
    if (!input) return;
    input.lessonNumber = lessons.length;
    input.courseId = courseId;
    await CreateLesson(input);
    showCreateModal = false;
  };
</script>

{#if hideLessons}
  <Button
    class="!bg-transparent fixed right-0 top-1/2"
    onclick={() => {
      hideLessons = false;
    }}
    ><AngleLeftOutline
      width={32}
      height={32}
      class="dark:text-gray-200 text-gray-900"
    /></Button
  >
{/if}
<Drawer
  placement="right"
  transitionType="fly"
  {transitionParams}
  backdrop={false}
  bind:hidden={hideLessons}
>
  <div class="flex items-center">
    <h5
      id="drawer-label"
      class="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400"
    >
      Список уроков
    </h5>
    <CloseButton
      on:click={() => (hideLessons = true)}
      class="mb-4 dark:text-white"
    />
  </div>
  <Sidebar>
    <SidebarWrapper
      divClass="overflow-y-auto py-4 px-3 rounded-sm dark:bg-gray-800"
    >
      <SidebarGroup>
        {#each lessons as lesson}
          <SidebarItem
            label={lesson.title}
            onclick={() => {
              selectedLesson = lesson;
            }}
          ></SidebarItem>
        {/each}
        <SidebarItem
          label="Добавить урок"
          class="bg-primary-600 text-center justify-center"
          onclick={() => {
            showCreateModal = true;
          }}
        ></SidebarItem>
      </SidebarGroup>
    </SidebarWrapper>
  </Sidebar>
</Drawer>

<Modal
  bind:open={showCreateModal}
  class="w-full"
  backdropClass="fixed inset-0 z-40 bg-gray-900/80"
  size="lg"
>
  <Heading slot="header">Добавить урок</Heading>
  <div class="p-4 w-full">
    <Input
      bind:value={input.title}
      placeholder="Введите новый заголовок"
      class="w-full"
      required
    />
  </div>
  <div class="flex justify-center items-center space-x-4">
    <Button color="red" on:click={() => (showCreateModal = false)}>
      Отмена
    </Button>
    <Button color="light" on:click={createLesson}>Сохранить</Button>
  </div>
</Modal>
