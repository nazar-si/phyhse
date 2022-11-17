<script lang="ts">
  import Color from "$lib/color";
  import type { colorType } from "$lib/types";
  export let gradient = false;
  export let accent = false;
  export let hoverable = false;
  export let accentGlow = false;
  export let gap = 0;
  export let align: "center" | "left" | "right" = "center";
  export let stroke = 1;

  export let color: colorType = "gray/30";
  export let accentColor: colorType = "blue";

  export let mx = 0;
  export let my = 4;
  export let mt = 0;
  export let mb = 0;
  export let ml = 0;
  export let mr = 0;
</script>

<div
  class="wrapper"
  class:hoverable
  class:accent
  style:--divider-color={Color(color)}
  style:--divider-noalpha-color={Color(color, 100)}
  style:--divider-accent-color={Color(accentColor, 100, true)}
  style:--accent-shadow={accentGlow
    ? `0 0 .5rem ${Color(accentColor, 30)}`
    : "none"}
  style:padding-top="{(mt ? mt : my) / 4}rem"
  style:padding-bottom="{(mb ? mb : my) / 4}rem"
  style:padding-left="{(ml ? ml : mx) / 4}rem"
  style:padding-right="{(mr ? mr : mx) / 4}rem"
  style:gap="{gap / 4}rem"
>
  {#if align != "left"}<div
      class="line left"
      class:gradient
      style:height="{stroke}px"
    />{/if}
  <div class="content"><slot /></div>
  {#if align != "right"}<div
      class="line right"
      class:gradient
      style:height="{stroke}px"
    />{/if}
</div>

<style lang="postcss">
  .wrapper {
    display: flex;
    align-items: center;
    .line {
      transition: background 0.2s;
      flex: 1;
      &:not(.gradient) {
        background: var(--divider-color);
      }
      &.gradient.left {
        background: linear-gradient(90deg, #0000, var(--divider-color));
      }
      &.gradient.right {
        background: linear-gradient(90deg, var(--divider-color), #0000);
      }
    }
    .content {
      transition: color 0.2s;
      color: var(--divider-noalpha-color);
    }
  }
  .wrapper.hoverable:hover,
  .wrapper.accent {
    .line {
      box-shadow: var(--accent-shadow);
      &:not(.gradient) {
        background: var(--divider-accent-color);
      }
      &.gradient.left {
        background: linear-gradient(90deg, #0000, var(--divider-accent-color));
      }
      &.gradient.right {
        background: linear-gradient(90deg, var(--divider-accent-color), #0000);
      }
    }
    .content {
      color: var(--divider-accent-color);
    }
  }
</style>
