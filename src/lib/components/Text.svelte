<script lang="ts">
  import Color from "$lib/color";
  import type { colorType } from "$lib/types";

  export let size: "xs" | "sm" | "md" | "lg" | "xl" = "md";
  export let soft = false;
  export let softer = false;
  export let color: colorType = undefined;
  export let underline = false;
  export let italic = false;
  export let span = false;
  export let weight:
    | "thin"
    | "light"
    | "normal"
    | "medium"
    | "semibold"
    | "bold" = "normal";
</script>

<div
  class="text"
  class:soft
  class:softer
  class:colored={color ? true : false}
  style:text-decoration={underline ? "underline" : ""}
  style:font-style={italic ? "italic" : ""}
  style:--text-color={Color(color)}
  style:display={span ? "inline" : "block"}
  style:font-size="{size == "xs"
    ? 12
    : size == "sm"
    ? 14
    : size == "md"
    ? 16
    : size == "lg"
    ? 20
    : 28}px"
  style:font-weight={weight == "thin"
    ? 200
    : weight == "light"
    ? 300
    : weight == "normal"
    ? 400
    : weight == "medium"
    ? 500
    : weight == "semibold"
    ? 600
    : 700}
>
  <slot />
</div>

<style lang="postcss">
  .text {
    @apply text-gray-800 gdark:text-gray-50;
    &.soft {
      @apply text-gray-500 gdark:text-gray-400;
    }
    &.softer {
      @apply text-gray-400 gdark:text-gray-500;
    }
    &.colored {
      color: var(--text-color) !important;
    }
  }
</style>
