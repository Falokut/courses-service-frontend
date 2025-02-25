<script lang="ts">
  import { Heading, Video, P, VideoPlaceholder } from "flowbite-svelte";

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
  <div class="flex justify-center">
    {#if lesson.video_url != ""}
      <Video
        src={lesson.video_url}
        controls
        allowfullscreen
        frameborder={0}
        trackSrc={lesson.video_url}
        class="h-1/5 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden object-scale-down"
      />
    {:else}
      <VideoPlaceholder
        divClass="flex justify-center items-center h-56 bg-gray-700 rounded-lg w-full dark:bg-gray-700"
      />
    {/if}
  </div>

  <Heading tag="h3" class="p-xl font-semibold top-10 text-center"
    >{lesson.title}</Heading
  >
  <P class="p-gray-500 p-sm text-center">урок от {lesson.created_at}</P>
  <P class="mt-2 text-wrap">{lesson.content}</P>
{/if}
