<script lang="ts">
  import { Heading, Video, Span } from "flowbite-svelte";
  import { FileSolid } from "flowbite-svelte-icons";

  import type { Lesson } from "$lib/types/lesson";

  let { lesson = $bindable<Lesson | null>() } = $props();

  const videoDivClass =
    "rounded-2x1 aspect-video object-scale-down overflow-hidden justify-items-center p-10 w-full";
</script>

{#if lesson != null}
  {#if lesson.video_url}
    <Video
      src={lesson.video_url}
      controls
      allowfullscreen
      frameborder={0}
      trackSrc={lesson.video_url}
      class={videoDivClass}
    />
  {/if}
  <div class="w-full mt-10">
    <Heading class="mb-5">
      {lesson.title}
    </Heading>
    <Span class="text-pretty w-full text-justify whitespace-pre-wrap">
      {lesson.lessonContent}
    </Span>
  </div>

  {#if lesson.attachments && lesson.attachments.length > 0}
    <div class="w-full mt-10 p-4 border rounded-lg bg-gray-50 dark:bg-gray-700 border-gray-400 dark:border-gray-700">
      <Heading class="mb-3 text-lg font-semibold">Прикрепленные файлы</Heading>
      <ul class="list-disc list-inside space-y-2">
        {#each lesson.attachments as attachment}
          <a
            href={attachment.url}
            target="_blank"
            class="flex items-center space-x-2 text-blue-600 hover:underline dark:text-blue-400"
          >
            <FileSolid class="w-6 h-6" />
            <span>{attachment.prettyName}</span>
          </a>
        {/each}
      </ul>
    </div>
  {/if}
{/if}
