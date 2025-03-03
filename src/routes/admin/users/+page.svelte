<script lang="ts">
  import { GetUsers } from "$lib/backend_client/user";
  import CrudTable from "$lib/components/crud_table.svelte";
  import RegisterUserModal from "./register_user_modal.svelte";
  import UserRow from "./user_row.svelte";
  import { GetRole } from "$lib/types/roles";
  import UserHeader from "./user_header.svelte";

  async function fetchUsers(limit: number, offset: number): Promise<any[]> {
    let users = await GetUsers(limit, offset);
    let filteredUsers: any[] = [];
    users.forEach((u) => {
      let roleName = GetRole(u.roleName);
      if (roleName == "") return;
      u.roleName = roleName;
      filteredUsers.push(u);
    });
    return filteredUsers;
  }

  const filterPredicate = (item: any, searchTerm: string): boolean => {
    return (
      item.username.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
      item.fio.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
      item.roleName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
    );
  };

  let formRegisterModal = $state(false);
  const AddItem = () => {
    formRegisterModal = true;
  };

  let table = $state<CrudTable>();
</script>

<CrudTable
  bind:this={table}
  BodyRow={UserRow}
  HeaderRow={UserHeader}
  AddLabel={"Добавить пользователя"}
  FetchData={fetchUsers}
  FilterPredicate={filterPredicate}
  {AddItem}
/>

{#if table}
  <RegisterUserModal
    bind:formModal={formRegisterModal}
    ItemAdded={table.ItemAdded}
  />
{/if}
