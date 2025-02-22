<script lang="ts">
  import { TableBodyCell, TableBodyRow } from "flowbite-svelte";
  let { value = $bindable() } = $props();
</script>

<TableBodyRow>
  <TableBodyCell>{value.id}</TableBodyCell>
  <TableBodyCell>{value.fio}</TableBodyCell>
  <TableBodyCell>{value.username}</TableBodyCell>
  <TableBodyCell>{value.roleName}</TableBodyCell>
</TableBodyRow>
