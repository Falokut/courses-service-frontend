<script lang="ts">
  import type { CoursePreview } from "$lib/types/course_preview";
  import {
    Button,
    Fileupload,
    Helper,
    Input,
    Label,
    Modal,
  } from "flowbite-svelte";
  import LectorSelectionInput from "./lector_selection_input.svelte";
  import { ToBase64 } from "$lib/utils/base64";
  import { EditCourse } from "$lib/backend_client/course";

  let { formModal = $bindable(false), course = $bindable<CoursePreview>() } =
    $props();
  let files = $state<FileList>();

  async function handleSubmit() {
    if (!files) return;
    input.previewPicture = await ToBase64(files[0]);
    course.previewPictureUrl = await EditCourse(input);
    formModal = false;
  }

  $effect(() => {
    input.courseId = course.id;
    input.title = course.title;
    input.authorId = course.authorId;
  });
  let input = $state({
    courseId: 0,
    title: "",
    authorId: 0,
    previewPicture: {},
  });
</script>

<Modal
  bind:open={formModal}
  size="md"
  autoclose={false}
  class="w-full"
  backdropClass="fixed inset-0 z-40 bg-gray-900/80"
>
  <form class="flex flex-col space-y-6" onsubmit={handleSubmit} action="#">
    <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
      Редактирование курса
    </h3>
    <div class="mb-2">
      <Label for="title_input" class="space-y-2">Название курса</Label>
      <Input
        id="title_input"
        placeholder="Название курса"
        autocomplete="family-name"
        bind:value={input.title}
        required
      />
    </div>
    <div class="mb-2">
      <LectorSelectionInput bind:lectorId={input.authorId} />
    </div>
    <div class="mb-2">
      <Label for="preview_picture_upload" class="pb-2">Загрузить файл</Label>
      <Fileupload
        id="preview_picture_upload"
        class="mb-2"
        bind:files
        maxlength={1}
        required
      />
      <Helper>SVG, PNG, JPG or GIF (макс. 800x400px).</Helper>
    </div>
    <Button type="submit" class="w-full">Сохранить</Button>
  </form>
</Modal>
