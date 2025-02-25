<script lang="ts">
  import { onMount } from "svelte";
  import { Card } from "flowbite-svelte";

  interface Course {
    id: number;
    title: string;
    author: string;
    image: string;
  }

  let courses: Course[] = [];

  onMount(async () => {
    // Замените этот код на реальный запрос к API
    courses = [
      {
        id: 1,
        title: "Введение в программирование",
        author: "Иван Иванов",
        image: "/images/course1.jpg",
      },
      {
        id: 2,
        title: "Svelte для начинающих",
        author: "Анна Петрова",
        image: "/images/course2.jpg",
      },
      {
        id: 3,
        title: "Разработка веб-приложений",
        author: "Максим Смирнов",
        image: "/images/course3.jpg",
      },
      {
        id: 4,
        title: "Алгоритмы и структуры данных",
        author: "Екатерина Васильева",
        image: "/images/course4.jpg",
      },
    ];
  });
</script>

<div class="container mx-auto p-6">
  <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
    Доступные курсы
  </h1>

  <div
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
  >
    {#each courses as course}
      <Card
        img={course.image}
        class="rounded-lg shadow-lg transition-transform transform hover:scale-105"
        href="/courses/{course.id}"
      >
        <h5
          class="text-xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          {course.title}
        </h5>
        <p class="font-normal text-gray-700 dark:text-gray-400">
          Автор: {course.author}
        </p>
      </Card>
    {/each}
  </div>
</div>
