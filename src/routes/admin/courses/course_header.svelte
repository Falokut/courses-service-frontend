<script lang="ts">
  import { TableHead, TableHeadCell } from "flowbite-svelte";

  let { headerClass = "" } = $props();
</script>

<TableHead class={headerClass}>
  <TableHeadCell padding="px-4 py-3" scope="col">ID</TableHeadCell>
  <TableHeadCell padding="px-4 py-3" scope="col">Название</TableHeadCell>
  <TableHeadCell padding="px-4 py-3" scope="col">ФИО Автора</TableHeadCell>
  <TableHeadCell padding="px-4 py-3" scope="col"
    >Ссылка на картинку курса</TableHeadCell
  >
  <TableHeadCell padding="px-4 py-3" scope="col"></TableHeadCell>
</TableHead>
