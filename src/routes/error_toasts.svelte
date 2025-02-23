<script lang="ts">
  import { Toast } from "flowbite-svelte";
  import { errorMessages, initGlobalErrorHandler } from "./hooks.client.js";
  import { CloseCircleSolid } from "flowbite-svelte-icons";

  import { onDestroy } from "svelte";
  import { slide } from "svelte/transition";
  import { elasticOut } from "svelte/easing";

  let messages: { id: number; text: string }[] = $state([]);
  let messageId = 0;
  const maxMessages = 5;

  const removeMessage = (id: number) => {
    messages = messages.filter((msg) => msg.id !== id);
  };

  const addMessage = (text: string) => {
    const id = messageId++;
    if (messages.length >= maxMessages) {
      removeMessage(messages[0].id);
    }
    messages = [...messages, { id, text }];

    setTimeout(() => {
      removeMessage(id);
    }, 5000);
  };

  const unsubscribe = errorMessages.subscribe((msgs: string[]) => {
    msgs.slice(messageId).forEach((msg) => addMessage(msg));
  });

  onDestroy(() => {
    unsubscribe();
  });

  initGlobalErrorHandler();
</script>

<div class="fixed flex flex-col top-5 right-5 gap-2 z-50">
  {#each messages as message (message.id)}
    <Toast
      on:close={() => removeMessage(message.id)}
      class="z-100 bg-primary-100 text-grey-900 dark:bg-primary-700 rounded-2xl border-2 border-red-500/35"
      transition={slide}
      params={{ delay: 250, duration: 1000, easing: elasticOut }}
      color="red"
      dismissable
    >
      <svelte:fragment slot="icon">
        <CloseCircleSolid class="w-5 h-5" />
        <span class="sr-only">Error icon</span>
      </svelte:fragment>
      {message.text}
    </Toast>
  {/each}
</div>
