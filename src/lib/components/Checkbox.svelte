<script lang="ts">
  import Color from "$lib/color";
  import type { colorType } from "$lib/types";

  export let color: colorType = "blue";
  export let size: "sm" | "md" | "lg" = "md";
  export let id = Math.floor(Math.random() * 0xffffff).toString(16);
  export let noRound = false;
  export let checkedGlow = false;
  export let ringOffset = 2;
  export let ringSize = 2;
  export let inter = false;
  export let disabled = false;
  export let style: "check" | "fill" | "square" = "square";

  export let checked = false;
</script>

<label
  tabindex={!disabled ? -1 : null}
  for={id}
  class:square={style == "square"}
  class="label"
  class:disabled
  class:checked
  class:inter
  style:border-radius={noRound ? "" : "0.25rem"}
  style:background={checked && !inter && style != "square"
    ? Color(disabled ? "gray" : color)
    : "transparent"}
  style:--check-color={Color(disabled ? "gray" : color)}
  style:width="{size == "sm" ? 16 : size == "md" ? 20 : 24}px"
  style:height="{size == "sm" ? 16 : size == "md" ? 20 : 24}px"
  style:box-shadow={checked && checkedGlow && !inter && !disabled
    ? `0 0 0.5rem ${Color(color, 50)}`
    : "none"}
  style:--ring-size="{ringSize}px"
  style:outline-offset="{ringOffset}px"
  style:border-width="{!checked || style != "square"
    ? 1
    : size == "sm"
    ? 5
    : size == "md"
    ? 6
    : 7}px"
>
  <input
    name="test"
    class="checkbox"
    type="checkbox"
    {disabled}
    {id}
    on:click
    bind:checked
    indeterminate={inter}
  />
  {#if style == "check"}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="white"
      style:opacity="{!inter && checked ? 100 : 0}%"
      ><path
        d="M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z"
      /></svg
    >
  {/if}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="white"
    style:opacity="{inter ? 100 : 0}%"
    ><path d="M2 6.5 L14 6.5 L14 9.5 L2 9.5 L2 6.5" fill={Color(color)} /></svg
  >
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
    transition: background 0.15s, outline 0.15s, border 0.15s;
    outline: var(--ring-size) solid transparent;
    cursor: pointer;
    border: 1px solid #8888;
    display: flex;
    align-items: center;
    justify-content: center;
    &.checked:not(.inter) {
      border-color: transparent;
      &.square {
        border-color: var(--check-color);
      }
    }
    position: relative;
    &:focus-within,
    &:focus {
      outline: var(--ring-size) solid var(--check-color);
    }
    svg {
      transition: opacity 0.15s;
      position: absolute;
    }
    &.disabled {
      background: #8883 !important;
    }
  }
</style>
