<script lang="ts">
  import { onMount } from "svelte";
  import {
    Avatar,
    Button,
    DarkMode,
    Dropdown,
    DropdownDivider,
    DropdownItem,
    Navbar,
    NavLi,
    NavUl,
  } from "flowbite-svelte";
  import LoginModal from "./login_modal.svelte";
  import { page } from "$app/state";
  import { Logout as Logout } from "$lib/backend_client/user";
  import { GetSessionId } from "$lib/utils/session";
  import { goto } from "$app/navigation";

  let pages: any[] = $state([]);
  let role = $state("");

  const fetchUserPages = async () => {
    const res = await fetch("/api/get-pages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sessionId: GetSessionId() }),
    });

    const data = await res.json();
    if (res.ok) {
      role = data.roleName;
      pages = data.pages;
      pages.sort((a, b) => {
        return ("" + a.url).localeCompare(b.url);
      });
    }
  };

  onMount(async () => {
    await fetchUserPages();
  });

  let loginModal = $state(false);
  let activeUrl = $derived(page.url.pathname);

  const logout = async () => {
    if (await Logout()) {
      await fetchUserPages();
      goto("/");
    }
  };
</script>

<Navbar>
  <DarkMode />
  <div class="flex flex-row gap-3">
    <NavUl
      hidden={false}
      {activeUrl}
      ulClass="flex flex-col p-4 mt-4 md:flex-row border-0 md:space-x-8 rtl:space-x-reverse md:mt-0 md:text-sm md:font-medium items-center"
    >
      {#each pages as page}
        <NavLi href={page.url}>{page.prettyName}</NavLi>
      {/each}
      <div class="flex">
        {#if role == "guest"}
          <Button size="sm" onclick={() => (loginModal = true)}>Войти</Button>
        {:else}
          <Avatar id="avatar-menu" />
          <Dropdown placement="bottom" triggeredBy="#avatar-menu">
            <DropdownItem href="/profile">Профиль</DropdownItem>
            <DropdownDivider />
            <DropdownItem onclick={logout}>Выйти</DropdownItem>
          </Dropdown>
        {/if}
      </div>
    </NavUl>
  </div>
</Navbar>

<LoginModal bind:formModal={loginModal} />
