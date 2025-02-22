<script lang="ts">
  import CrudTable from "$lib/components/crud_table.svelte";
  import UserRow from "$lib/components/table_rows/user.svelte";

  const headers = ["ID", "ФИО", "Имя пользователя", "Роль"];
  async function fetchUsers(offset: number, limit: number): Promise<any[]> {
    return [
      {
        id: 10,
        username: "user",
        fio: "ИВАНОВ ИВАН ИВАНОВИЧ",
        roleName: "ЛЕКТОР",
      },
    ];
  }
  const filterPredicate = (item: any, searchTerm: string): boolean => {
    return (
      item.username.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
      item.fio.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
    );
  };
</script>

<CrudTable
  BodyRow={UserRow}
  HeaderCells={headers}
  AddLabel={"Добавить пользователя"}
  FetchData={fetchUsers}
  FilterPredicate={filterPredicate}
/>
