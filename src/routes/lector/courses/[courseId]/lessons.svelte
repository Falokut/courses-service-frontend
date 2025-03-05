<script lang="ts">
  import {
    CloseButton,
    Drawer,
    Sidebar,
    SidebarItem,
    SidebarWrapper,
    SidebarGroup,
    Button,
  } from "flowbite-svelte";
  import { AngleLeftOutline } from "flowbite-svelte-icons";
  import { sineIn } from "svelte/easing";
  import type { Lesson } from "$lib/types/lesson";

  let {
    lessons = $bindable<Lesson[]>([]),
    selectedLesson = $bindable<Lesson | null>(),
  } = $props();

  let hideLessons = $state(true);
  let transitionParams = {
    x: 320,
    duration: 200,
    easing: sineIn,
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
      </SidebarGroup>
    </SidebarWrapper>
  </Sidebar>
</Drawer>
