<template>
  <section class="games-page container inner-app flex column gap10 height-all">
    <nav class="games-ul flex wrap space-between">
      <!-- <RouterLink url="/games">Games</RouterLink> -->
      <RouterLink v-for="gameName in allGamesNames" :key="gameName" :to="{ name: 'GamePage', params: { gameName } }">
        {{gameName}}
      </RouterLink>
    </nav>
    <section class="content-container flex-1 flex column align-center space-between">
      <!-- <h2>Game: {{currGameName}}</h2> -->
      
      <div v-if="currGame" class="curr-game-container height-all width-all"></div>

      <div v-else class="error-container flex column align-center space-between">
        <h2>404</h2>
        <p>Unknown game "{{routeGameName}}"</p>
      </div>
    </section>
  </section>
</template>


<script>
import { alertService } from '@/modules/common/services/alert.service.js';
const A_Alert = alertService.A_Alert;

import { Games } from './games-instances/index.js';
const allGames = Games.allGames;

var gGame = null;

export default {
    name: 'GamesPage',
    computed: {
      routeGameName() {
        return this.$route.params.gameName;
      },
      allGamesNames() {
        return allGames.map(c => c.name);
      },
      currGame() {
        return allGames.find(c => c.name === this.routeGameName);
      },
      currGameName() {
        return this.currGame?.name || '';
      },
    },
    created() {
      if (!this.routeGameName) this.$router.push({ name: 'GamePage', params: { gameName: 'Damka' } });
    },
    async mounted() {
      this.setupGame();
    },
    destroyed() {
      this.stopGame();
    },
    watch: {
      '$route.params.gameName'(val) {
        if (!val) return;
        this.setupGame();
      }
    },
    methods: {
      setupGame() {
        this.stopGame();
        if (!this.currGame) return;
        const popup = new A_Alert('.content-container', true);
        gGame = new this.currGame('.curr-game-container', popup);
      },
      stopGame() {
        gGame?.destroy();
        gGame = null;
        // const gameCotainer = document.querySelector('.curr-game-container');
        // if (gameCotainer) gameCotainer.innerHTML = '';
      }
    }
}
</script>

<style lang="scss">
@import '@/assets/styles/global/index';
.games-page {
  // all: unset;
  direction: ltr;
  button {
    border: unset;
    background: unset;
    padding: 3px;
    outline: none;
    border: 1px solid black;
    color: black;
    border-radius: 5px;
  } button:hover {cursor: pointer;}
    button:active {
        color: white;
        border-color: white;
        background-color: black;
      }
  table {
    background-color: white;
    td {
      padding: 1px;
      vertical-align: middle;
    }
  }
  h2 {
    margin: 30px 0;
  }
  .content-container {
    position: relative;
  }
  .curr-game-container {
    width: 100%;
    flex: 1;
    display: flex;
    align-items: center;
    flex-direction: column;
    .board-container {
      max-width: 300px;
    }
  }
  .games-ul {
    gap: 10px;
    a {
      color: $layout-clr;
      &.router-link-active {
        color: $layout-clr2;
      }
    }
  }
  .error-container {

  }
}
</style>