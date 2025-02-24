<script lang="ts">
  import { Toast } from "flowbite-svelte";
  import { messages, initGlobalErrorHandler } from "./hooks.client.js";
  import { CloseCircleSolid, CheckCircleSolid } from "flowbite-svelte-icons";

  import { onDestroy } from "svelte";

  let toastMessages: { id: number; text: string; isError: boolean }[] = $state(
    []
  );

  let messageId = 0;
  const maxMessages = 5;

  const removeMessage = (id: number) => {
    toastMessages = toastMessages.filter((msg) => msg.id !== id);
  };

  const addMessage = (text: string, isError: boolean) => {
    const id = messageId++;
    if (toastMessages.length >= maxMessages) {
      removeMessage(toastMessages[0].id);
    }
    toastMessages = [...toastMessages, { id, text, isError }];

    setTimeout(() => {
      removeMessage(id);
    }, 4000);
  };

  const unsubscribe = messages.subscribe((msgs: any[]) => {
    msgs.slice(messageId).forEach((msg) => {
      addMessage(msg.msg, msg.isError);
    });
  });

  onDestroy(() => {
    unsubscribe();
  });

  initGlobalErrorHandler();

  let successDivClass =
    "z-100 bg-primary-50 text-grey-900 dark:bg-primary-800 rounded-2xl border-2 border-green-600/50 dark:border-green-600/70";
  let errorDivClass =
    "z-100 bg-primary-50 text-grey-900 dark:bg-primary-800 rounded-2xl border-2 border-red-500/50 dark:border-red-5500/35";
</script>

<div class="fixed flex flex-col top-5 right-5 gap-2 z-50">
  {#each toastMessages as message (message.id)}
    {#if message.isError}
      <Toast
        on:close={() => removeMessage(message.id)}
        class={errorDivClass}
        color="red"
        dismissable
      >
        <svelte:fragment slot="icon">
          <CloseCircleSolid class="w-5 h-5" />
          <span class="sr-only">Error icon</span>
        </svelte:fragment>
        {message.text}
      </Toast>
    {:else}
      <Toast
        on:close={() => removeMessage(message.id)}
        class={successDivClass}
        color="green"
        dismissable
      >
        <svelte:fragment slot="icon">
          <CheckCircleSolid class="w-5 h-5" />
          <span class="sr-only">Success icon</span>
        </svelte:fragment>
        {message.text}
      </Toast>
    {/if}
  {/each}
</div>
