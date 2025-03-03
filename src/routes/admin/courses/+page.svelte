<script lang="ts">
  import CrudTable from "$lib/components/crud_table.svelte";
  import CourseRow from "./course_row.svelte";
  import CourseHeader from "./course_header.svelte";
  import { GetCourses } from "$lib/backend_client/course";
  import type { CoursePreview } from "$lib/types/course_preview";
  import AddCourseModal from "./add_course_modal.svelte";

  const filterPredicate = (
    item: CoursePreview,
    searchTerm: string
  ): boolean => {
    return (
      item.authorFio.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
      item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
    );
  };

  let formAddModal = $state(false);
  const AddItem = () => {
    formAddModal = true;
  };
</script>

<CrudTable
  BodyRow={CourseRow}
  HeaderRow={CourseHeader}
  AddLabel={"Добавить курс"}
  FetchData={GetCourses}
  FilterPredicate={filterPredicate}
  {AddItem}
/>

<AddCourseModal bind:formModal={formAddModal}></AddCourseModal>
