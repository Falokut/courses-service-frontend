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
    const res = await fetch("/api/get-role", {
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

  onMount(() => {
    fetchUserPages();
  });

  let loginModal = $state(false);
  let activeUrl = $derived(page.url.pathname);

  const logout = async () => {
    let isSuccessful = await Logout();
    if (isSuccessful) {
      goto("/");
    }
  };
</script>

<Navbar class="bg-primary-100">
  <DarkMode />
  <div class="flex flex-row gap-3">
    <NavUl hidden={false} class="order-1" {activeUrl} 
    ulClass="flex flex-col p-4 mt-4 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:text-sm md:font-medium items-center">
      {#each pages as page}
        <NavLi href={page.url}>{page.prettyName}</NavLi>
      {/each}
      <div class="flex order-2">
        {#if role == "guest"}
          <Button size="sm" onclick={() => (loginModal = true)}>Войти</Button>
        {:else}
          <div class="items-center">
            <Avatar id="avatar-menu" />
          </div>
          <Dropdown placement="bottom" triggeredBy="#avatar-menu">
            <DropdownItem href="/profile/sessions">Сессии</DropdownItem>
            <DropdownDivider />
            <DropdownItem onclick={logout}>Выйти</DropdownItem>
          </Dropdown>
        {/if}
      </div>
    </NavUl>
  </div>
</Navbar>

<LoginModal bind:formModal={loginModal} />
