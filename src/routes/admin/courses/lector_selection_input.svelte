<script lang="ts">
  import { GetLectors } from "$lib/backend_client/user";
  import { Label, Select } from "flowbite-svelte";
  import { onMount } from "svelte";

  let { lectorId = $bindable(0), lectorName = $bindable("") } = $props();

  let lectorValues: any[] = $state([]);
  onMount(async () => {
    let lectors = await GetLectors();
    lectors.sort((a, b) => a.fio.localeCompare(b.fio));
    lectors.forEach((v) => {
      lectorValues = [...lectorValues, { value: v.id, name: v.fio }];
    });
    if (lectorName != "") {
      const roleIndex = lectorValues.findIndex((v) => {
        return v.name == lectorName;
      });
      if (roleIndex != -1) {
        lectorId = lectorValues[roleIndex].value;
      }
    }
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
