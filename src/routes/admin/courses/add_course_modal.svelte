<script lang="ts">
  import {
    Modal,
    Fileupload,
    Label,
    Input,
    Helper,
    Button,
  } from "flowbite-svelte";
  import LectorSelectionInput from "./lector_selection_input.svelte";

  let { formModal = $bindable(false) } = $props();
  let files = $state<FileList>();
  let input = $state({
    title: "",
    authorId: 0,
    previewPicture: {},
  });
  async function handleSubmit() {}
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
      Создание курса
    </h3>
    <div class="mb-2">
      <Label for="title_input" class="space-y-2">Название курса</Label>
      <Input
        id="title_input"
        placeholder="Название курса"
        bind:value={input.title}
        minlength={10}
        maxlength={30}
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
      />
      <Helper>SVG, PNG, JPG or GIF (макс. 800x400px).</Helper>
    </div>
    <Button type="submit" class="w-full">Создать</Button>
  </form>
</Modal>
