<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/state";
  import { Button, Heading } from "flowbite-svelte";
  import { Section } from "flowbite-svelte-blocks";
  import Lessons from "./lessons.svelte";
  import SelectedLesson from "./selected_lesson.svelte";
  import { GetCourse } from "$lib/backend_client/course";
  import type { Lesson } from "$lib/types/lesson";
  import type { Course } from "$lib/types/course";

  let course = $state<Course | null>(null);
  let isRegistered = $state(false);
  let selectedLesson = $state<Lesson | null>(null);

  const fetchCourse = async (courseId: string) => {
    course = await GetCourse(courseId);

    isRegistered = false;
    selectedLesson = course.lessons[0];
  };
  onMount(async () => {
    const { courseId } = page.params;
    await fetchCourse(courseId);
  });

  const registerForCourse = async () => {
    isRegistered = true;
  };
</script>

{#if course}
  <Section name="content">
    <div class="mt-10 bg-primary-50 rounded dark:bg-gray-800 p-5">
      <div class="flex content-around items-center">
        <Heading tag="h2" class="p-2xl font-bold">{course.title}</Heading>
        {#if !isRegistered}
          <Button class="mt-4" on:click={registerForCourse}>Подписаться</Button>
        {/if}
      </div>
      <Heading tag="h5">Автор: {course.authorFio}</Heading>
      <Lessons bind:lessons={course.lessons} bind:selectedLesson />
      <SelectedLesson bind:lesson={selectedLesson} />
    </div>
  </Section>
{/if}
