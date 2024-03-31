

<template>
  <div>
    <div id="contain">
      <div id="parchment">
        <div id="parchment-top"></div>
        <div id="parchment-middle">
          <div id="parchment-bottom"></div>
        </div>
      </div>
    </div>
    <GameBoard v-if="inGame"></GameBoard>
  </div>
</template>
<script setup lang="ts">
import GameBoard from "./components/GameBoard.vue";
import {ref} from "vue";

const inGame = ref(true);

</script>
