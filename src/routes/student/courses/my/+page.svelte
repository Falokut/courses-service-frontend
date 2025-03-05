<script lang="ts">
  import { UserCourses } from "$lib/backend_client/course";
  import type { CoursePreview } from "$lib/types/course_preview";
  import { Card } from "flowbite-svelte";
  import { onMount } from "svelte";

  let courses = $state<CoursePreview[]>([]);
  onMount(async () => {
    courses = await UserCourses();
  });
</script>

<div class="container mx-auto mb-20">
  <h1 class="text-3xl font-bold text-gray-900 dark:text-white mt-1 mb-6">
    Мои курсы
  </h1>

  <div
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
  >
    {#each courses as course}
      <Card
        img={course.previewPictureUrl}
        class="rounded-lg shadow-lg transition-transform transform hover:scale-105"
        href="/student/courses/{course.id}"
      >
        <h5
          class="text-xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          {course.title}
        </h5>
        <p class="font-normal text-gray-700 dark:text-gray-400">
          Автор: {course.authorFio}
        </p>
      </Card>
    {/each}
  </div>
</div>
