<script lang="ts">
  import type { colorType } from "$lib/types";
  import Color, { mix } from "$lib/color";

  export let round: number | number[] = 1;
  export let dashed = false;
  export let double = false;
  export let accent = false;
  export let hoverable = false;
  export let accentGlow = false;
  export let clickable = false;
  export let shadow: "sm" | "lg" | "md" | "none" = "none";

  export let opacity: number = 100;

  export let stroke = 1;
  let strokeWeight;
  $: strokeWeight = `${stroke}px`;

  export let border: colorType = "gray/30";
  export let hover: colorType = "blue";
  export let accentColor: colorType = "blue";

  export let background: colorType = undefined;
  export let hoverBackground: colorType = "blue/10";
  export let noHoverBack = false;
  export let accentBackground: colorType = undefined;

  export let p = 4;
  export let px: number | undefined = undefined;
  export let py: number | undefined = undefined;
  export let m = 4;
  export let mx: number | undefined = undefined;
  export let my: number | undefined = undefined;

  export let width: string | number | undefined = undefined;
  export let minWidth: string | number | undefined = undefined;
  export let height: string | number | undefined = undefined;
  export let flex: number | boolean = false;
  let realFlex = 0;
  $: realFlex = flex == true ? 1 : !flex ? 0 : flex;
</script>

<div
  on:click
  on:dragover
  on:dragleave
  on:drop
  on:focus
  class="wrapper"
  class:accent
  class:hoverable
  style:cursor={clickable ? "pointer" : "default"}
  style:opacity="{opacity}%"
  style:--border-color={Color(border)}
  style:--background-color={Color(background)}
  style:--accent-color={Color(accentColor)}
  style:flex={realFlex}
  style:--shadow={shadow == "sm"
    ? "0 0 4px #0002"
    : shadow == "md"
    ? "0 0 8px #0002"
    : shadow == "lg"
    ? "0 0 12px #0002"
    : "none"}
  style:--accent-shadow={accentGlow
    ? `0 0 1rem ${Color(accentColor, 35)}`
    : "none"}
  style:--accent-background-color={Color(
    accentBackground ? accentBackground : accentColor,
    15,
    true
  )}
  style:--hover-border-color={Color(hover)}
  style:--border-stroke={strokeWeight}
  style:--hover-background-color={noHoverBack
    ? "transparent"
    : Color(hoverBackground)}
  style:margin="{(!isNaN(my) ? my : m) / 4}rem {(!isNaN(mx) ? mx : m) / 4}rem"
  style:border-radius="{typeof round == "number"
    ? round / 4
    : round.map((a) => a / 4).join("rem ")}rem"
  style:padding="{(!isNaN(py) ? py : p) / 4}rem {(!isNaN(px) ? px : p) / 4}rem"
  style:--border-style={dashed ? "dashed" : double ? "double" : "solid"}
  style:height={typeof height == "number"
    ? height.toString() + "px"
    : height
    ? height
    : ""}
  style:width={typeof width == "number"
    ? width.toString() + "px"
    : width
    ? width
    : ""}
  style:min-width={typeof minWidth == "number"
    ? minWidth.toString() + "px"
    : minWidth
    ? minWidth
    : ""}
>
  <slot />
</div>

<style lang="postcss">
  .wrapper {
    position: relative;
    border: var(--border-style) var(--border-stroke) var(--border-color);
    transition: 0.2s;
    background: var(--background-color);
    box-shadow: var(--shadow);
  }
  .wrapper.hoverable:hover {
    border: var(--border-style) var(--border-stroke) var(--hover-border-color);
    background: var(--hover-background-color);
  }
  .wrapper.accent {
    border: var(--border-style) var(--border-stroke) var(--accent-color) !important;
    background: var(--accent-background-color) !important;
    box-shadow: var(--accent-shadow);
  }
</style>
