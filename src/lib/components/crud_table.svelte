<script lang="ts">
  import { onMount } from "svelte";
  import {
    TableBody,
    TableHead,
    TableHeadCell,
    TableSearch,
    Button,
    ButtonGroup,
  } from "flowbite-svelte";
  import { Section } from "flowbite-svelte-blocks";
  import {
    PlusOutline,
    ChevronRightOutline,
    ChevronLeftOutline,
  } from "flowbite-svelte-icons";

  let divClass =
    "bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden";
  let innerDivClass =
    "flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4";
  let searchClass = "w-full md:w-1/2 relative";
  let classInput =
    "text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2  pl-10";

  const batchSize = 100;
  let searchTerm: string = $state("");
  let currentOffset: number = $state(0);
  const itemsPerPage: number = 10;
  const showPage: number = 5;
  let paginationData: any[] = $state([]);
  let totalPages = $derived(Math.ceil(paginationData.length / itemsPerPage));
  let currentPage = $state(1);

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

  const emptyFetchData = async (
    offset: number,
    limit: number
  ): Promise<any[]> => {
    return [];
  };

  let isFetching = $state(false);
  let lastFetchFull = $state(true);
  let currentPageItems = $derived(
    paginationData.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    )
  );
  const filterPredicate = (v: any, searchTerm: string): boolean => {
    return true;
  };

  const addItem = () => {};

  let {
    HeaderCells = $bindable([]),
    AddLabel = $bindable(""),
    FetchData = emptyFetchData,
    BodyRow = $bindable(),
    FilterPredicate = filterPredicate,
    AddItem = addItem,
  } = $props();

  const loadPageData = async () => {
    if (isFetching) return;

    isFetching = true;
    const items = await FetchData(paginationData.length, batchSize);
    isFetching = false;

    lastFetchFull = items.length === batchSize;

    paginationData = [...paginationData, ...items];
  };

  const loadNextPage = async () => {
    const nextPage = currentPage + 1;
    const maxPage = Math.ceil(paginationData.length / itemsPerPage);

    if (nextPage > maxPage && lastFetchFull) {
      await loadPageData();
    }

    if (nextPage <= Math.ceil(paginationData.length / itemsPerPage)) {
      currentPage = nextPage;
    }
  };

  const loadPreviousPage = () => {
    if (currentOffset >= itemsPerPage) {
      currentOffset -= itemsPerPage;
    }
  };

  const goToPage = (pageNumber: number) => {
    currentPage = pageNumber;
  };

  let filteredItems = $derived(
    paginationData.filter((v) => {
      return FilterPredicate(v, searchTerm);
    })
  );

  onMount(loadPageData);

  let startRange = $derived(currentOffset + 1);
  let endRange = $derived(
    Math.min(currentOffset + itemsPerPage, paginationData.length)
  );
</script>

<Section name="advancedTable" classSection="p-3 sm:p-5">
  <TableSearch
    placeholder="Поиск"
    hoverable={true}
    bind:inputValue={searchTerm}
    {divClass}
    {innerDivClass}
    {searchClass}
    {classInput}
  >
    <div
      slot="header"
      class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0"
    >
      <Button on:click={AddItem}>
        <PlusOutline class="h-3.5 w-3.5 mr-2" />{AddLabel}
      </Button>
    </div>
    <TableHead>
      {#each HeaderCells as cell}
        <TableHeadCell padding="px-4 py-3" scope="col">{cell}</TableHeadCell>
      {/each}
    </TableHead>
    <TableBody class="divide-y">
      {#if searchTerm !== ""}
        {#each filteredItems as value}
          <BodyRow {value} />
        {/each}
      {:else}
        {#each currentPageItems as value}
          <BodyRow {value} />
        {/each}
      {/if}
    </TableBody>
    <div
      slot="footer"
      class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
      aria-label="Table navigation"
    >
      <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
        <span class="font-semibold text-gray-900 dark:text-white"
          >{startRange}-{endRange}</span
        >
      </span>
      <ButtonGroup>
        <Button on:click={loadPreviousPage} disabled={currentOffset === 0}
          ><ChevronLeftOutline size="xs" class="m-1.5" /></Button
        >
        {#each pagesToShow as pageNumber}
          <Button
            disabled={currentPage == pageNumber}
            on:click={() => goToPage(pageNumber)}>{pageNumber}</Button
          >
        {/each}
        <Button
          on:click={loadNextPage}
          disabled={!lastFetchFull &&
            currentPage * itemsPerPage >= paginationData.length}
          ><ChevronRightOutline size="xs" class="m-1.5" /></Button
        >
      </ButtonGroup>
    </div>
  </TableSearch>
</Section>
