<script lang="ts">
  import { onMount } from "svelte";
  import { Button, ButtonGroup, Card, Pagination } from "flowbite-svelte";
  import { Paginator } from "$lib/utils/paginator";
  import type { CoursePreview } from "$lib/types/course_preview";
  import { page } from "$app/state";
  import { GetCourses } from "$lib/backend_client/course";
  import {
    ChevronLeftOutline,
    ChevronRightOutline,
  } from "flowbite-svelte-icons";

  const showPage: number = 5;
  const itemsPerPage = 10;
  let paginator = new Paginator<CoursePreview>(GetCourses, itemsPerPage);
  let courses: CoursePreview[] = $state([]);
  let currentPage = $state(1);

  let totalItems = $state(0);
  let totalPages = $derived(Math.ceil(totalItems / itemsPerPage));

  const calculatePagesToShow = () => {
    let startPage = Math.max(1, currentPage - Math.floor(showPage / 2));
    let endPage = Math.min(startPage + showPage - 1, totalPages);

    if (endPage - startPage + 1 < showPage) {
      startPage = Math.max(1, endPage - showPage + 1);
    }
    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  let pagesToShow: number[] = $derived(calculatePagesToShow());

  async function loadPage(page: number) {
    currentPage = page;
    courses = await paginator.getPageData(page, itemsPerPage, false);
    totalItems = paginator.getTotalItems();
  }

  onMount(() => {
    loadPage(1);
  });

  const loadPreviousPage = () => {
    loadPage(currentPage - 1);
  };

  const loadNextPage = () => {
    loadPage(currentPage + 1);
  };
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
        img={course.preview_picture_url}
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

  <ButtonGroup>
    <Button on:click={loadPreviousPage} disabled={currentPage === 1}
      ><ChevronLeftOutline size="xs" class="m-1.5" /></Button
    >
    {#each pagesToShow as pageNumber}
      <Button
        disabled={currentPage == pageNumber}
        on:click={() => loadPage(pageNumber)}>{pageNumber}</Button
      >
    {/each}
    <Button
      on:click={loadNextPage}
      disabled={currentPage * itemsPerPage >= totalItems ||
        !paginator.canLoadMore()}
      ><ChevronRightOutline size="xs" class="m-1.5" /></Button
    >
  </ButtonGroup>
</div>
