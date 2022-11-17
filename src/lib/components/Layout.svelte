<script lang="ts">
  import Card from "./Card.svelte";
  import Button from "$lib/components/Button.svelte";
  import Divider from "$lib/components/Divider.svelte";
  import Text from "$lib/components/Text.svelte";
  import { Sun, Moon } from "tabler-icons-svelte";
  import { onMount } from "svelte";

  let dark = false;
  onMount(() => {
    dark = localStorage.getItem("dark") ? true : false;
  });
</script>

<svelte:head>
  <title>Phyhse</title>
</svelte:head>

<div class="wrapper">
  <Card m={0} round={0} px={16}>
    <div class="flex">
      <div class="logo">
        <img src="/hse.svg" alt="" />
      </div>
      <div class="row">
        <Button m={0} white>Вход</Button>
        <Button
          m={0}
          white
          mx={0}
          on:click={() => {
            dark = !dark;
            document.body.classList.toggle("dark", dark);
            localStorage.setItem("dark", dark.toString());
          }}
        >
          {#if !dark}
            <Sun size={24} />
          {/if}
          {#if dark}
            <Moon size={24} />
          {/if}
        </Button>
      </div>
    </div>
  </Card>
  <div class="main">
    <slot />
  </div>
  <footer>
    <Divider my={0} />
    <div class="footer-row">
      <Text softer>© НИУ ВШЭ 1993–2022</Text>
      <a href="https://github.com/nazar-si">Мой GitHub</a>
      <a href="https://github.com/nazar-si/physhse">Этот проект</a>
    </div>
  </footer>
</div>

<style lang="postcss">
  .flex {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .logo {
      height: 48px;
      img {
        height: 100%;
      }
    }
    .row {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
  }
  .main {
    flex: 1;
    margin: 1rem;
  }
  .wrapper {
    min-height: 100vh;
    display: flex;
    align-items: stretch;
    flex-direction: column;
  }
  .footer-row {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
    margin: 2rem 0;
    a {
      @apply text-blue-500 hover:underline;
    }
  }
</style>
