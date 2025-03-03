<script lang="ts">
  import { GetRoles } from "$lib/backend_client/roles";
  import { Label, Select } from "flowbite-svelte";
  import { onMount } from "svelte";

  let { roleName = $bindable(""), roleId = $bindable(0) } = $props();

  let rolesValues: any[] = $state([]);
  onMount(async () => {
    let roles = await GetRoles();
    roles.forEach((v) => {
      rolesValues = [...rolesValues, { value: v.id, name: v.name }];
    });
    if (roleName != "") {
      const roleIndex = rolesValues.findIndex((v) => {
        return v.name == roleName;
      });
      if (roleIndex != -1) {
        roleId = rolesValues[roleIndex].value;
      }
    }
  });

  const updateRoleName = () => {
    const roleIndex = rolesValues.findIndex((v) => {
      return v.value == roleId;
    });
    if (roleIndex != -1) {
      roleName = rolesValues[roleIndex].name;
    }
  };
</script>

<Label>
  Роль
  <Select
    class="mt-2"
    items={rolesValues}
    bind:value={roleId}
    on:change={updateRoleName}
  />
</Label>
