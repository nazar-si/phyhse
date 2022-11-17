<script lang="ts">
  import Color from "$lib/color";
  import type { colorType } from "$lib/types";
  import { append } from "svelte/internal";

  export let color: colorType = "blue";
  export let size: "sm" | "md" | "lg" = "md";
  export let id = Math.floor(Math.random() * 0xffffff).toString(16);
  export let checkedGlow = false;
  export let ringOffset = 2;
  export let ringSize = 2;
  export let disabled = false;

  export let group: number | string | undefined = undefined;
  export let value: number | string;
</script>

<label
  tabindex={!disabled ? 0 : null}
  on:keypress={(e) => (e.code == "Space" ? (group = value) : null)}
  for={id}
  class="label"
  class:disabled
  class:checked={value == group}
  style:cursor={!disabled ? "pointer" : "default"}
  style:--check-color={Color(color)}
  style:width="{size == "sm" ? 16 : size == "md" ? 20 : 24}px"
  style:height="{size == "sm" ? 16 : size == "md" ? 20 : 24}px"
  style:box-shadow={value == group && checkedGlow && !disabled
    ? `0 0 0.5rem ${Color(color, 50)}`
    : "none"}
  style:--ring-size="{ringSize}px"
  style:outline-offset="{ringOffset}px"
  style:border-width="{value != group
    ? 1
    : size == "sm"
    ? 5
    : size == "md"
    ? 6
    : 7}px"
  style:border-color={disabled ? Color("gray") : ""}
>
  <input
    tabindex="-1"
    class="checkbox"
    type="radio"
    {value}
    {id}
    on:click
    bind:group
    {disabled}
  />
</label>

<style lang="postcss">
  .checkbox {
    opacity: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
  }
  .label {
    user-select: none;
    border-radius: 100%;
    transition: border 0.15s, outline 0.15s;
    outline: var(--ring-size) solid transparent;
    border: 1px solid #8888;
    display: flex;
    align-items: center;
    justify-content: center;
    &.checked {
      border-color: var(--check-color);
    }
    position: relative;
    &:focus-within,
    &:focus {
      outline: var(--ring-size) solid var(--check-color);
    }
    svg {
      transition: opacity 0.15s;
      top: 50%;
      left: 50%;
    }
    &.disabled {
      background: #8883 !important;
    }
  }
</style>
