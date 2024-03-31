
<template>
  <div class="main-wrapper" v-if="!engine">
    <div class="main-inner">
      <h1>HeroQuest Navigator </h1>
      <div style="margin-bottom: 1rem;">
        <button @click="playIntro">Intro</button>
      </div>
      <div v-for="quest of quests">
        <button @click="loadQuest(quest.quest as Quest)">{{quest.id}}. {{ quest.name }}</button>
      </div>
    </div>
  </div>
  <div class="gameMenu" v-if="engine">
    <button @click="engine.playIntroAudio">Intro</button>
  </div>
  <div class="gameBoard"></div>
</template>
<script setup lang="ts">

import {quest1} from "../quests/1/quest1.ts";
import {Engine} from "./2d-engine.const.ts";
import {onMounted, ref} from "vue";
import {Quest} from "../interfaces/quest.interface.ts";

const engine = ref<Engine>();

const quests = [
  {id: 1, name: 'Die Bewährung', quest: quest1},
  {id: 2, name: 'Sir Ragnars Rettung', quest: null},
  {id: 3, name: 'Die Festung des Feldherrn der Orks', quest: null},
  {id: 4, name: 'Das Gold von Prinz Magnus', quest: null},
  {id: 5, name: 'Melars Labyrinth', quest: null},
];


function playIntro(){
  const audio = new Audio('/audio/intro.mp3');
  audio.play();
}

function loadQuest(quest: Quest){
  engine.value = new Engine();
  engine.value?.loadQuest(quest);
}
onMounted(() => {
  loadQuest(quest1);
})

</script>

<style scoped>
.gameMenu {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 10;
}
.gameMenu button {
  padding: 10px;
  background: linear-gradient(90deg, #555, #363636);
  border: 1px solid grey;
  border-radius: 5px;
  color: #ffcc00;
  font-size: 1.5rem;
}
.gameBoard {
  background-color: #363636;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 100vw;
  max-height: 100vh;
}
.main-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
}
.main-inner {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 0 10px 0 rgba(0,0,0,0.5);
  background: rgba(0, 0, 0, 0.5);
}
h1 {
  color: white;
  font-size: 4rem;
  font-family: 'MedievalSharp', cursive;
  background: linear-gradient(90deg, orange, yellow, orange);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.main-inner button {
  padding: 10px;
  margin-bottom: .5rem;
  min-width: 40rem;
  background: linear-gradient(90deg, #555, #363636);
  border: 1px solid grey;
  border-radius: 5px;
  color: #ffcc00;
  font-size: 1.5rem;
}

* {
  overscroll-behavior: none!important;
}
</style>