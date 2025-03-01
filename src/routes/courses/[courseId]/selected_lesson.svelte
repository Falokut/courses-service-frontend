<script lang="ts">
  import { Heading, Video, Span } from "flowbite-svelte";
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
  <div class="w-full p-10 mt-10">
    <Heading
      class="w-full flex justify-between items-center mb-5 dark:text-gray-100 "
      >{lesson.title}
    </Heading>
    <Span class="text-pretty w-full text-justify">
      {lesson.lessonContent}
    </Span>
  </div>
{/if}
