<script lang="ts">
  import type { colorType, sizeType } from "$lib/types";
  import Color from "$lib/color";
  import Shadow from "$lib/shadow";
  import Size from "$lib/size";

  export let clickable = false;
  export let hoverable = false;
  export let accent = false;
  export let separateCorner = false;
  export let noBorder = false;
  export let noTopBorder = false;
  export let noBottomBorder = false;
  export let noLeftBorder = false;
  export let noRightBorder = false;

  export let accentColor: colorType = "blue";
  export let accentGlow = false;
  export let gray = false;

  export let p = 4;
  export let px: undefined | number = undefined;
  export let py: undefined | number = undefined;
  export let m = 4;
  export let mx: undefined | number = undefined;
  export let my: undefined | number = undefined;
  export let mb: undefined | number = undefined;
  export let mt: undefined | number = undefined;
  export let mr: undefined | number = undefined;
  export let ml: undefined | number = undefined;
  export let cornerX = 0;
  export let cornerY = 0;
  export let stroke = 1;

  export let round: number | number[] = 2;
  export let overflowY: "scroll" | "hidden" | "auto" | "unset" = "unset";
  export let overflowX: "scroll" | "hidden" | "auto" | "unset" = "unset";

  export let shadow: "none" | "xs" | "sm" | "md" | "lg" | "xl" = "md";

  export let width: sizeType = undefined;
  export let height: sizeType = undefined;
  export let minWidth: sizeType = undefined;
  export let minHeight: sizeType = undefined;
  export let maxWidth: sizeType = undefined;
  export let maxHeight: sizeType = undefined;

  export let flex: number | boolean = false;
  let realFlex = 0;
  $: realFlex = flex == true ? 1 : !flex ? 0 : flex;
</script>

<section
  on:click
  on:dragover
  on:dragleave
  on:drop
  on:focus
  class="wrapper"
  class:hoverable
  class:accent
  class:gray
  style:border-left-width="{noBorder || noLeftBorder ? 0 : stroke}px"
  style:border-right-width="{noBorder || noRightBorder ? 0 : stroke}px"
  style:border-top-width="{noBorder || noTopBorder ? 0 : stroke}px"
  style:border-bottom-width="{noBorder || noBottomBorder ? 0 : stroke}px"
  style:margin-top="{(!isNaN(mt) ? mt : !isNaN(my) ? my : m) / 4}rem"
  style:margin-bottom="{(!isNaN(mb) ? mb : !isNaN(my) ? my : m) / 4}rem"
  style:margin-left="{(!isNaN(ml) ? ml : !isNaN(mx) ? mx : m) / 4}rem"
  style:margin-right="{(!isNaN(mr) ? mr : !isNaN(mx) ? mx : m) / 4}rem"
  style:--accent-color={Color(accentColor)}
  style:--dark-hover-color={Color("gray-750")}
  style:--shadow={Shadow(shadow)}
  style:--accent-shadow={accentGlow
    ? `0 0 1rem ${Color(accentColor, 35)}`
    : "none"}
  style:cursor={clickable ? "pointer" : "default"}
  style:overflow-x={overflowX == "scroll" || overflowX == "auto"
    ? "hidden"
    : "unset"}
  style:overflow-y={overflowY == "scroll" || overflowY == "auto"
    ? "hidden"
    : "unset"}
  style:border-radius="{typeof round == "number"
    ? round / 4
    : round.map((a) => a / 4).join("rem ")}rem"
  style:flex={realFlex}
  style:height={Size(height)}
  style:width={Size(width)}
  style:min-width={Size(minWidth)}
  style:min-height={Size(minHeight)}
  style:max-width={Size(maxWidth)}
  style:max-height={Size(maxHeight)}
>
  <div
    style:border-radius="{typeof round == "number"
      ? round / 4
      : round.map((a) => a / 4).join("rem ")}rem"
    class="content"
    style:overflow-x={overflowX}
    style:overflow-y={overflowY}
    style:margin="{(py && py >= 1) || (!py && p >= 1) ? 0.25 : 0}rem {(px &&
      px >= 1) ||
    (!py && p >= 1)
      ? 0.25
      : 0}rem"
    style:padding="{Math.max(0, py ? py - 1 : p - 1) / 4}rem {Math.max(
      0,
      px ? px - 1 : p - 1
    ) / 4}rem"
  >
    <slot />
  </div>
  <div
    class="corner"
    style:position={separateCorner ? "unset" : "absolute"}
    style:top="{cornerY / 4}rem"
    style:right="{cornerX / 4}rem"
  >
    <slot name="corner" />
  </div>
</section>

<style lang="postcss">
  .wrapper {
    @apply border-gray-300 gdark:border-gray-700;
    @apply bg-white gdark:bg-gray-750;
    &.gray {
      @apply bg-gray-50 gdark:bg-gray-800;
    }
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: stretch;
    transition: border 0.2s, background 0.2s;
    box-shadow: var(--shadow);
    position: relative;
    .content {
      transition: background 0.2s;
      margin-right: 0.25rem;
      padding-right: -0.25rem;
      width: 100%;
      &::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }
      &::-webkit-scrollbar-track {
        @apply bg-white gdark:bg-gray-750;
      }
      &::-webkit-scrollbar-thumb {
        @apply bg-gray-300 hover:bg-gray-400 gdark:bg-gray-700 gdark:hover:bg-gray-600 rounded-md;
      }
    }
  }
  .wrapper.hoverable:hover {
    @apply bg-gray-50;
  }
  .wrapper.accent {
    border-color: var(--accent-color);
    box-shadow: var(--accent-shadow);
  }
  :global(body.dark) {
    .wrapper.hoverable:hover {
      background: var(--dark-hover-color) !important;
    }
  }
</style>
