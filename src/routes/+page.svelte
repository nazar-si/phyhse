<script lang="ts">
  import Button from "$lib/components/Button.svelte";
  import Card from "$lib/components/Card.svelte";
  import Frame from "$lib/components/Frame.svelte";
  import Text from "$lib/components/Text.svelte";

  import { Calendar } from "tabler-icons-svelte";

  let selected = 0;
</script>

<Card>
  <div class="button-row">
    {#each Array(4) as _, i}
      <Frame
        flex
        hover="gray/50"
        hoverable
        hoverBackground="gray/10"
        accent={selected == i}
        on:click={() => (selected = i)}
        p={selected == i ? 5 : 4}
        m={selected == i ? 3 : 4}
      >
        <Text
          soft={selected != i}
          weight="medium"
          color={selected == i ? "blue" : null}>{i + 1} Курс</Text
        >
      </Frame>
    {/each}
  </div>
</Card>

<div class="timeline m-4 mt-8 ml-4">
  <div class="title">
    <Card width="fit-content" m={0} p={2} round={6} accent accentGlow>
      <Text><Calendar /></Text>
    </Card>
    <Text>Какая-то точка</Text>
  </div>
  <div class="content active dashed">
    <Text soft>Время 1</Text>
    <Text soft>Время 2</Text>
  </div>
  <div class="title">
    <Card width="fit-content" m={0} p={2} round={6}>
      <Text><Calendar /></Text>
    </Card>
    <Text>Какая-то точка</Text>
  </div>
  <div class="content dashed">
    <Text soft>Время 1</Text>
    <Text soft>Время 2</Text>
  </div>
  <div class="title">
    <Card width="fit-content" m={0} p={2} round={6}>
      <Text><Calendar /></Text>
    </Card>
    <Text>Какая-то точка</Text>
  </div>
</div>

<style lang="postcss">
  .button-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .timeline {
    display: flex;
    flex-direction: column;
    .title {
      display: flex;
      gap: 1rem;
      align-items: center;
    }
    .content {
      @apply ml-5 border-l-2 border-gray-350 pl-12 gdark:border-gray-700;
    }
    .content.active {
      @apply border-blue-500;
    }
    .content.dashed {
      @apply border-dashed;
    }
  }
</style>
