<script lang="ts">
  import Color from "$lib/color";
  import type { colorType } from "$lib/types";
  export let home = false;
  export let homeUrl = "";
  export let divider: "triangle" | "slash" | "angle" = "slash";
  export let gap = 2;
  interface link {
    title: string;
    url: string;
  }
  export let items: link[];
  export let hover: colorType = "blue";
  export let height = 8;
  export let backtrack = false;
  let hoverId = -2;
</script>

<div
  class="wrapper"
  style:--breadcrumb-color={Color(hover)}
  on:blur={() => {
    hoverId = -2;
  }}
>
  {#if home}
    <a
      class="entry"
      on:focus={() => {
        hoverId = -1;
      }}
      on:mouseover={() => {
        hoverId = -1;
      }}
      on:mouseleave={() => {
        hoverId = -2;
      }}
      class:hover={hoverId == -1 || (backtrack && hoverId >= -1)}
      href={homeUrl}
      style:height="{height / 4}rem"
      style:padding="0 {gap / 4}rem"
    >
      <slot />
    </a>
  {/if}
  {#each items as item, i}
    {#if i != 0 || home}<div
        class="divider"
        on:mouseover={() => {
          if (backtrack) hoverId = i - 1;
        }}
        on:focus={() => {
          if (backtrack) hoverId = i - 1;
        }}
        on:mouseleave={() => {
          if (backtrack) hoverId = -2;
        }}
      >
        {#if divider == "triangle"}
          <svg width={height * 2 + 4} height={height * 4}>
            <path
              d="M0 0 L{height * 2} {height * 2} L0 {height * 4}"
              class="path"
              class:hover={backtrack && hoverId >= i}
              fill="transparent"
            />
          </svg>
        {:else if divider == "slash"}
          <svg width="8" height="16">
            <path
              d="M0 16 L8 0"
              class="path"
              class:hover={backtrack && hoverId >= i}
              fill="transparent"
            />
          </svg>
        {:else if divider == "angle"}
          <svg width="7" height="10">
            <path
              d="M0 0 L6 5 L0 10"
              class="path"
              class:hover={backtrack && hoverId >= i}
              stroke-width={2}
              fill="transparent"
            />
          </svg>
        {/if}
      </div>{/if}
    <a
      class="entry"
      href={item.url}
      on:mouseover={() => {
        hoverId = i;
      }}
      on:focus={() => {
        hoverId = i;
      }}
      on:mouseleave={() => {
        hoverId = -2;
      }}
      class:hover={hoverId == i || (backtrack && hoverId >= i)}
      style:height="{height / 4}rem"
      style:padding="0 {gap / 4}rem">{item.title}</a
    >
  {/each}
</div>

<style lang="postcss">
  .wrapper {
    display: flex;
    align-items: center;
    .entry {
      height: 100%;
      display: flex;
      align-items: center;
      @apply text-gray-600 dark:text-gray-400 text-sm font-medium;
      transition: color 0.2s;
    }
    .entry.hover {
      color: var(--breadcrumb-color);
    }
    .divider {
      height: 100%;
      display: flex;
      align-items: center;
      .path {
        @apply stroke-gray-300 gdark:stroke-gray-650;
        transition: stroke 0.2s;
        &.hover {
          stroke: var(--breadcrumb-color);
        }
      }
    }
  }
</style>
