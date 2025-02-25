<script lang="ts">
  import { Heading, Video, VideoPlaceholder, Span } from "flowbite-svelte";

  interface Lesson {
    id: number;
    title: string;
    created_at: string;
    content: string;
    video_url: string;
  }
  let { lesson = $bindable<Lesson | null>() } = $props();
</script>

{#if lesson != null}
  <div
    class="flex justify-center aspect-video max-h-1/2 w-full object-scale-down overflow-hidden justify-items-center"
  >
    {#if lesson.video_url != ""}
      <Video
        src={lesson.video_url}
        controls
        allowfullscreen
        frameborder={0}
        trackSrc={lesson.video_url}
        class="rounded-lg border border-gray-200 dark:border-gray-700 "
      />
    {:else}
      <VideoPlaceholder
        divClass="flex justify-center items-center bg-gray-700 rounded-lg w-full dark:bg-gray-700"
      />
    {/if}
  </div>
  <div class="w-full bg-primary-300 dark:bg-gray-800 rounded-2xl p-10 mt-10">
    <Heading
      class="w-full flex justify-between items-center mb-5 dark:text-gray-100 "
      >{lesson.title}</Heading
    >
    <Span class="text-pretty w-full text-justify">
      {lesson.content}
    </Span>
  </div>
{/if}
