<script lang="ts">
  import { onMount } from "svelte";
  import { Button, ButtonGroup, Card, Footer } from "flowbite-svelte";
  import { Paginator } from "$lib/utils/paginator.svelte";
  import type { CoursePreview } from "$lib/types/course_preview";
  import { GetCourses } from "$lib/backend_client/course";
  import {
    ChevronLeftOutline,
    ChevronRightOutline,
  } from "flowbite-svelte-icons";

  const showPage: number = 5;
  const itemsPerPage = 12;
  let paginator = new Paginator<CoursePreview>(GetCourses, itemsPerPage);
  let pageData: CoursePreview[] = $state([]);

  let currentPage = $state(1);
  let totalPages = $derived(Math.ceil(paginator.totalItems / itemsPerPage));

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
    pageData = await paginator.getPageData(page, itemsPerPage, false);
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

<div class="container mx-auto mb-20">
  <h1 class="text-3xl font-bold text-gray-900 dark:text-white mt-1 mb-6">
    Доступные курсы
  </h1>

  <div
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
  >
    {#each pageData as course}
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

<Footer
  class="w-full z-50 dark:bg-gray-800 bg-primary-300 content-center bottom-0 fixed"
>
  <div class="w-full h-fit flex justify-center">
    <ButtonGroup>
      <Button on:click={loadPreviousPage} disabled={currentPage === 1}>
        <ChevronLeftOutline size="xs" class="m-1.5" />
      </Button>
      {#each pagesToShow as pageNumber}
        <Button
          disabled={currentPage == pageNumber}
          on:click={() => loadPage(pageNumber)}
        >
          {pageNumber}
        </Button>
      {/each}
      <Button
        on:click={loadNextPage}
        disabled={currentPage >= totalPages && !paginator.canLoadMore}
      >
        <ChevronRightOutline size="xs" class="m-1.5" />
      </Button>
    </ButtonGroup>
  </div>
</Footer>
