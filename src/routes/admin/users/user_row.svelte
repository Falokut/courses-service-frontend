<script lang="ts">
  import { DeleteUser } from "$lib/backend_client/user";
  import { Button, TableBodyCell, TableBodyRow } from "flowbite-svelte";
  import DeleteModal from "$lib/components/delete_modal.svelte";
  import EditUserModal from "./edit_user_modal.svelte";
  let emptyItemDeleted = (id: any) => {};
  let {
    value = $bindable(),
    ItemDeleted = emptyItemDeleted,
    rowClass,
  } = $props();

  let openDeleteModal = $state(false);
  let openEditModal = $state(false);

  const deleteText = `Вы уверены, что хотите удалить пользователя с id ${value.id}?`;
</script>

<TableBodyRow class={rowClass}>
  <TableBodyCell id="{value.username}-id-div">{value.id}</TableBodyCell>
  <TableBodyCell id="{value.username}-fio-div">{value.fio}</TableBodyCell>
  <TableBodyCell id="{value.username}-username-div">{value.username}</TableBodyCell>
  <TableBodyCell>{value.roleName}</TableBodyCell>
  <TableBodyCell class="flex flex-row !content-between">
    <div class="flex justify-center items-center space-x-4 w-full">
      <Button
        id="delete-{value.username}-button"
        class="!text-white !bg-red-600"
        onclick={() => (openDeleteModal = true)}
      >
        Удалить
      </Button>
      <Button
        id="edit-{value.username}-button"
        onclick={() => (openEditModal = true)}>Редактировать</Button
      >
    </div>
  </TableBodyCell>
</TableBodyRow>

<DeleteModal
  bind:openModal={openDeleteModal}
  DeleteText={deleteText}
  HandleDelete={async () => {
    if (await DeleteUser(value.id)) ItemDeleted(value.id);
  }}
  HandleCancel={() => {}}
/>

<EditUserModal bind:formModal={openEditModal} bind:user={value}></EditUserModal>
