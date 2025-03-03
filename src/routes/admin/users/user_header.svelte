<script lang="ts">
  import { TableHead, TableHeadCell } from "flowbite-svelte";

  let { headerClass = "" } = $props();
</script>

<TableHead class={headerClass}>
  <TableHeadCell padding="px-4 py-3" scope="col">ID</TableHeadCell>
  <TableHeadCell padding="px-4 py-3" scope="col">ФИО</TableHeadCell>
  <TableHeadCell padding="px-4 py-3" scope="col">
    Имя пользователя
  </TableHeadCell>
  <TableHeadCell padding="px-4 py-3" scope="col">Роль</TableHeadCell>
  <TableHeadCell padding="px-4 py-3" scope="col"></TableHeadCell>
</TableHead>
