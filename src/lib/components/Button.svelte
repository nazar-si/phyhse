<script lang="ts">
  import Color from "$lib/color";
  import type { colorType } from "$lib/types";
  export let secondary = false;
  export let tertiary = false;
  export let white = false;
  export let dark = false;
  export let py = 2;
  export let px = 3;
  export let m = 2;
  export let mx = 0;
  export let my = 0;
  export let disabled = false;
  export let round: number | number[] = 1.5;
  export let ring = false;
  export let ringOffset = 2;
  export let ringSize = 2;
  export let textSize: "xs" | "sm" | "lg" | "md" = "sm";

  export let color: colorType = "blue";
</script>

<button
  on:click
  style:font-size="{textSize == "xs"
    ? 12
    : textSize == "sm"
    ? 14
    : textSize == "md"
    ? 16
    : 20}px"
  class:primary={!secondary && !white && !dark && !tertiary}
  class:secondary
  class:ring
  class:white
  class:dark
  class:tertiary
  style:border-radius="{typeof round == "number"
    ? round / 4
    : round.map((a) => a / 4).join("rem ")}rem"
  style:margin="{(my ? my : m) / 4}rem {(mx ? mx : m) / 4}rem"
  style:--button-color={Color(color)}
  style:--button-color-low={Color(color, 75)}
  style:--button-color-lower={Color(color, 40)}
  style:--button-color-alpha={Color(color, 20)}
  style:--ring-size="{ringSize}px"
  style:outline-offset="{ringOffset}px"
  style:padding="{py / 4}rem {px / 4}rem"
  {disabled}
>
  <slot />
</button>

<style lang="postcss">
  button {
    outline: var(--ring-size) solid transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 0 0 #0000;
    @apply transition-all font-semibold;
    position: relative;
    &.primary {
      background: var(--button-color);
      color: white;
      border: 1px solid transparent;
      &:hover {
        background: var(--button-color-low);
      }
    }
    &.secondary {
      border: 1px solid var(--button-color-lower);
      background: var(--button-color-alpha);
      color: var(--button-color);
      &:hover {
        background: transparent;
        border-color: var(--button-color);
      }
    }
    &.white {
      @apply bg-white text-gray-700 border-1 border-gray-300 hover:bg-gray-50;
      @apply gdark:bg-gray-750 gdark:border-gray-700 gdark:text-gray-50 gdark:hover:bg-gray-700;
    }
    &.dark {
      @apply bg-gray-800 text-white border-1 border-gray-700 hover:bg-transparent hover:border-gray-800 hover:text-gray-800;
      @apply gdark:bg-gray-50 gdark:border-gray-300 gdark:text-gray-800 gdark:hover:text-gray-50 gdark:hover:bg-transparent;
    }
    &.tertiary {
      background: transparent;
      color: var(--button-color);
      border: 1px solid transparent;
      &:hover {
        background: var(--button-color-alpha);
      }
    }
    &:not(.ring):focus {
      border-color: var(--button-color) !important;
    }
    &.ring:focus {
      /* .line {
        border: 1px solid var(--button-color);
      } */
      outline: var(--ring-size) solid var(--button-color);
    }
    &:disabled {
      @apply !bg-transparent border-gray-300 gdark:border-gray-600 !text-gray-500/50;
      &.secondary {
        @apply !bg-gray-500/10;
      }
    }
  }
</style>
