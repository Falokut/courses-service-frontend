<script lang="ts">
  import { DeleteCourse } from "$lib/backend_client/course";
  import { A, Button, TableBodyCell, TableBodyRow } from "flowbite-svelte";
  import DeleteModal from "$lib/components/delete_modal.svelte";
  import EditCourseModal from "./edit_course_modal.svelte";
  import type { CoursePreview } from "$lib/types/course_preview";
  let emptyItemDeleted = (id: any) => {};
  let {
    value = $bindable<CoursePreview>(),
    ItemDeleted = emptyItemDeleted,
    rowClass,
  } = $props();

  let openDeleteModal = $state(false);
  let openEditModal = $state(false);

  const deleteText = `Вы уверены, что хотите удалить курс с id ${value.id}?`;
</script>

<TableBodyRow class={rowClass}>
  <TableBodyCell>{value.id}</TableBodyCell>
  <TableBodyCell>{value.title}</TableBodyCell>
  <TableBodyCell>{value.authorFio}</TableBodyCell>
  <TableBodyCell>
    <A href={value.previewPictureUrl}>ссылка</A>
  </TableBodyCell>
  <TableBodyCell class="flex flex-row !content-between">
    <div class="flex justify-center items-center space-x-4 w-full">
      <Button
        class="!text-white !bg-red-600"
        onclick={() => (openDeleteModal = true)}
      >
        Удалить
      </Button>
      <Button onclick={() => (openEditModal = true)}>Редактировать</Button>
    </div>
  </TableBodyCell>
</TableBodyRow>

<DeleteModal
  bind:openModal={openDeleteModal}
  DeleteText={deleteText}
  HandleDelete={async () => {
    if (await DeleteCourse(value.id)) ItemDeleted(value.id);
  }}
  HandleCancel={() => {}}
/>

<EditCourseModal bind:formModal={openEditModal} bind:course={value}
></EditCourseModal>
