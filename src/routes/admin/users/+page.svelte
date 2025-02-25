<script lang="ts">
  import { GetUsers } from "$lib/backend_client/user";
  import CrudTable from "$lib/components/crud_table.svelte";
  import RegisterUserModal from "$lib/components/register_user_modal.svelte";
  import UserRow from "$lib/components/table_rows/user.svelte";
  import { GetRole } from "$lib/types/roles";

  const headers = ["ID", "ФИО", "Имя пользователя", "Роль", ""];
  async function fetchUsers(offset: number, limit: number): Promise<any[]> {
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
      item.fio.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
    );
  };

  let formModal = $state(false);
  const AddItem = () => {
    formModal = true;
  };
</script>

<CrudTable
  BodyRow={UserRow}
  HeaderCells={headers}
  AddLabel={"Добавить пользователя"}
  FetchData={fetchUsers}
  FilterPredicate={filterPredicate}
  {AddItem}
/>

<RegisterUserModal bind:formModal></RegisterUserModal>
