<script lang="ts">
  import { GetLectors } from "$lib/backend_client/user";
  import { Label, Select } from "flowbite-svelte";
  import { onMount } from "svelte";

  let { lectorId = $bindable(0), lectorName = $bindable("") } = $props();

  let lectorValues: any[] = $state([]);
  onMount(async () => {
    let lectors = await GetLectors();
    lectors.forEach((v) => {
      lectorValues = [...lectorValues, { value: v.id, name: v.fio }];
    });
  });

  const updateLectorName = () => {
    const roleIndex = lectorValues.findIndex((v) => {
      return v.value == lectorId;
    });
    if (roleIndex != -1) {
      lectorName = lectorValues[roleIndex].name;
    }
  };
</script>

<Label>
  Автор
  <Select
    class="mt-2"
    items={lectorValues}
    bind:value={lectorId}
    on:change={updateLectorName}
  />
</Label>
