<script lang="ts">
  import {
    Heading,
    Video,
    Span,
    Button,
    Modal,
    Input,
    Textarea,
    Label,
    Fileupload,
  } from "flowbite-svelte";
  import { EditSolid, FileSolid, UploadSolid } from "flowbite-svelte-icons";

  import type { Lesson } from "$lib/types/lesson";
  import {
    AddVideo,
    AttachFile,
    DeleteAttachment,
    DeleteVideo,
    EditLessonContent,
    EditLessonTitle,
  } from "$lib/backend_client/lesson";
  import { ToBase64 } from "$lib/utils/base64";
  import DeleteModal from "$lib/components/delete_modal.svelte";

  let { lesson = $bindable<Lesson | null>() } = $props();
  let video = $state<FileList>();
  let attachment = $state<FileList>();
  let attachmentPrettyName = $state("");

  let showFileModal = $state(false);
  let showTitleModal = $state(false);
  let showContentModal = $state(false);
  let showVideoModal = $state(false);
  let showDeleteVideoModal = $state(false);

  let newTitle = $state(lesson?.title || "");
  let newContent = $state(lesson?.lessonContent || "");

  const videoDivClass =
    "rounded-2xl aspect-video object-scale-down overflow-hidden justify-items-center p-10 w-full";

  async function saveTitle() {
    if (
      lesson &&
      (await EditLessonTitle({ lessonId: lesson.id, newTitle: newTitle }))
    ) {
      lesson.title = newTitle;
    }
    showTitleModal = false;
  }

  async function saveContent() {
    if (
      lesson &&
      (await EditLessonContent({ lessonId: lesson.id, newContent: newContent }))
    ) {
      lesson.lessonContent = newContent;
    }
    showContentModal = false;
  }

  async function uploadVideo() {
    if (lesson && video) {
      const url = await AddVideo({
        lessonId: lesson.id,
        video: await ToBase64(video[0]),
      });
      lesson.videoUrl = url;
    }
    showVideoModal = false;
  }

  async function addAttachment() {
    if (lesson && attachment) {
      await AttachFile({
        lessonId: lesson.id,
        prettyName: attachmentPrettyName,
        attachmentContent: await ToBase64(attachment[0]),
      });
    }
    showFileModal = false;
  }
</script>

{#if lesson != null}
  <div class="flex justify-between items-center">
    <Heading class="mb-5">Просмотр урока</Heading>
  </div>

  <div class="w-full mt-10">
    <div class="flex items-center justify-between">
      <Heading class="mb-5">{lesson.title}</Heading>
      <Button color="primary" on:click={() => (showTitleModal = true)}>
        <EditSolid class="w-5 h-5" /> Редактировать заголовок
      </Button>
    </div>

    <div>
      {#if lesson.videoUrl}
        <div class="w-full flex justify-end mt-10">
          <Button color="red" on:click={() => (showDeleteVideoModal = true)}>
            <EditSolid class="w-5 h-5" /> Удалить видео
          </Button>
        </div>

        <Video
          src={lesson.videoUrl}
          trackSrc={lesson.videoUrl}
          controls
          allowfullscreen
          frameborder={0}
          class={videoDivClass}
        />
      {:else}
        <Button
          color="primary"
          class="mt-10"
          on:click={() => (showVideoModal = true)}
        >
          <UploadSolid class="w-5 h-5" /> Добавить видео
        </Button>
      {/if}
    </div>

    <Span class="text-pretty w-full text-justify whitespace-pre-wrap">
      {lesson.lessonContent}
    </Span>
    <Button
      color="primary"
      class="mt-3"
      on:click={() => (showContentModal = true)}
    >
      <EditSolid class="w-5 h-5 mr-2" /> Изменить текст
    </Button>
  </div>

  <div
    class="w-full mt-10 p-4 border rounded-lg bg-gray-50 dark:bg-gray-700 border-gray-400 dark:border-gray-700"
  >
    <div class="flex justify-between items-center">
      <Heading class="mb-3 text-lg font-semibold">Прикрепленные файлы</Heading>
      <Button color="green" on:click={() => (showFileModal = true)}>
        <UploadSolid class="w-5 h-5 mr-2" /> Добавить
      </Button>
    </div>

    <ul class="list-disc list-inside space-y-2">
      {#each lesson.attachments as attachment}
        <div class="flex flex-row w-full">
          <a
            href={attachment.url}
            target="_blank"
            class="flex items-center space-x-2 text-blue-600 hover:underline dark:text-blue-400"
          >
            <FileSolid class="w-6 h-6" />
            <span>{attachment.prettyName}</span>
          </a>
          <Button
            color="red"
            class="ml-3"
            onclick={() => {
              DeleteAttachment(lesson.id, attachment.id);
            }}>Удалить</Button
          >
        </div>
      {/each}
    </ul>
  </div>

  <Modal
    bind:open={showTitleModal}
    class="w-full"
    backdropClass="fixed inset-0 z-40 bg-gray-900/80"
    size="lg"
  >
    <Heading slot="header">Редактировать заголовок</Heading>
    <div class="p-4 w-full">
      <Input
        bind:value={newTitle}
        placeholder="Введите новый заголовок"
        class="w-full"
      />
    </div>
    <div class="flex justify-center items-center space-x-4">
      <Button color="red" on:click={() => (showTitleModal = false)}>
        Отмена
      </Button>
      <Button color="light" on:click={saveTitle}>Сохранить</Button>
    </div>
  </Modal>

  <Modal
    bind:open={showContentModal}
    size="lg"
    class="w-full"
    backdropClass="fixed inset-0 z-40 bg-gray-900/80"
  >
    <Heading slot="header">Редактировать текст</Heading>
    <div class="p-4">
      <Textarea
        bind:value={newContent}
        rows={10}
        placeholder="Введите текст урока"
      />
    </div>
    <div class="flex justify-center items-center space-x-4">
      <Button color="red" on:click={() => (showContentModal = false)}>
        Отмена
      </Button>
      <Button color="primary" on:click={saveContent}>Сохранить</Button>
    </div>
  </Modal>

  <Modal
    bind:open={showFileModal}
    class="w-full"
    backdropClass="fixed inset-0 z-40 bg-gray-900/80"
  >
    <Heading slot="header">Добавить файл</Heading>
    <div class="p-4">
      <Label for="pretty_name_input" class="pb-2">Добавить</Label>
      <Input
        id="upload_file"
        class="mb-2"
        bind:value={attachmentPrettyName}
        maxlength={100}
        required
      />
    </div>
    <div class="p-4">
      <Label for="upload_file" class="pb-2">Загрузить файл</Label>
      <Fileupload
        id="upload_file"
        class="mb-2"
        bind:files={attachment}
        maxlength={1}
        required
      />
    </div>
    <div class="flex justify-center items-center space-x-4">
      <Button color="red">Отмена</Button>
      <Button color="primary" on:click={addAttachment}>Сохранить</Button>
    </div>
  </Modal>

  <Modal
    bind:open={showVideoModal}
    class="w-full"
    backdropClass="fixed inset-0 z-40 bg-gray-900/80"
  >
    <Heading slot="header">Загрузить видео урока</Heading>
    <div class="p-4">
      <Label for="upload_file" class="pb-2">Загрузить файл</Label>
      <Fileupload
        id="upload_file"
        class="mb-2"
        bind:files={video}
        maxlength={1}
        required
      />
    </div>
    <div class="flex justify-center items-center space-x-4">
      <Button color="red" on:click={() => (showVideoModal = false)}>
        Отмена
      </Button>
      <Button color="primary" onclick={uploadVideo}>Сохранить</Button>
    </div>
  </Modal>
{/if}

<DeleteModal
  DeleteText="Вы действительно хотите удалить видео из урока?"
  bind:openModal={showDeleteVideoModal}
  HandleCancel={() => {}}
  HandleDelete={async () => {
    if (await DeleteVideo(lesson.id)) {
      lesson.videoUrl = "";
    }
  }}
></DeleteModal>
