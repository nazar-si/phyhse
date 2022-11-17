<script lang="ts">
  import Text from "./Text.svelte";
  export let tip = "";
  export let delay = 500;
  export let offset = 2;
  export let top = false;
  export let left = false;
  export let right = false;
</script>

<div class="wrapper">
  <slot />
  <div
    class="tip"
    class:left
    class:right
    class:top
    style:--delay="{delay / 1000}s"
    style:--offset="{offset / 4}rem"
  >
    <Text>{tip}</Text>
  </div>
</div>

<style lang="postcss">
  .wrapper {
    position: relative;
    .tip {
      pointer-events: none;
      transition: 0.15s;
      position: absolute;
      left: 50%;
      opacity: 0;
      bottom: 0;
      transform-origin: center;
      transform: scale(0.5) translate(-100%, calc(150% + var(--offset)));
      padding: 0.25rem 0.5rem;
      border-radius: 0.5rem;
      @apply bg-white gdark:bg-gray-800 border-1 border-gray-300 gdark:border-gray-650;
      &.top {
        bottom: unset;
        top: 0;
        transform: scale(0.5) translate(-100%, calc(-150% - var(--offset)));
      }
      &.left {
        bottom: unset;
        left: unset;
        top: 50%;
        left: 0;
        transform: scale(0.5) translate(calc(-150% - var(--offset)), -100%);
      }
      &.right {
        bottom: unset;
        left: unset;
        top: 50%;
        right: 0;
        transform: scale(0.5) translate(calc(150% + var(--offset)), -100%);
      }
    }
  }
  .wrapper:hover,
  .wrapper:focus-within {
    .tip {
      transition-delay: var(--delay);
      opacity: 1;
      transform: translate(-50%, calc(100% + var(--offset)));
      &.top {
        transform: translate(-50%, calc(-100% - var(--offset)));
      }
      &.left {
        transform: translate(calc(-100% - var(--offset)), -50%);
      }
      &.right {
        transform: translate(calc(100% + var(--offset)), -50%);
      }
    }
  }
</style>
