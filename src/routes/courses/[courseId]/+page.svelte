<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/state";
  import {
    Button,
    Card,
    CloseButton,
    Heading,
    Video,
  } from "flowbite-svelte";
  import { Section } from "flowbite-svelte-blocks";
  import { AngleLeftOutline } from "flowbite-svelte-icons";
  import Lessons from "./lessons.svelte";
  import SelectedLesson from "./selected_lesson.svelte";

  interface Course {
    id: number;
    name: string;
    author: string;
    preview_picture_url: string;
  }

  interface Lesson {
    id: number;
    title: string;
    created_at: string;
    content: string;
    video_url: string;
  }

  let course = $state<Course | null>(null);
  let lessons = $state<Lesson[]>([]);
  let isRegistered = $state(false);
  let selectedLesson = $state<Lesson | null>(null);

  const fetchCourse = async (courseId: number) => {
    // Заглушка API-запроса
    course = {
      id: courseId,
      name: "Svelte для начинающих",
      author: "Анна Петрова",
      preview_picture_url: "/images/course2.jpg",
    };

    let fetchedLessons = [
      {
        id: 1,
        title: "Введение",
        created_at: "2024-01-01",
        content: "Основы Svelte",
        video_url: "",
      },
      {
        id: 2,
        title: "Компоненты",
        created_at: "2024-01-02",
        content: "Как работать с компонентами",
        video_url: "http://localhost:8181/file/video/vid.mp4",
      },
      {
        id: 3,
        title: "API",
        created_at: "2024-01-03",
        content: "Запросы и взаимодействие",
        video_url: "http://localhost:8181/file/video/vid.mp4",
      },
    ];

    lessons = fetchedLessons;
    isRegistered = false;
    selectedLesson = fetchedLessons[0];
  };

  onMount(() => {
    const courseId = +page.url.pathname.split("/").pop();
    fetchCourse(courseId);
  });

  const registerForCourse = async () => {
    isRegistered = true;
  };
</script>

<Section name="content">
  {#if course != null}
    <div class="flex content-around items-center">
      <Heading tag="h2" class="p-2xl font-bold">{course.name}</Heading>
      {#if !isRegistered}
        <Button class="mt-4" on:click={registerForCourse}
          >Записаться на курс</Button
        >
      {/if}
    </div>
    <Heading tag="h5">Автор: {course.author}</Heading>
    <div class="h-10"/>
    <Lessons bind:lessons bind:selectedLesson />
    <SelectedLesson bind:lesson={selectedLesson} />
  {/if}
</Section>
