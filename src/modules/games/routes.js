import GamePage from './Games.vue';

export const gamesRoutes = [
  {
    name: 'GamePage',
    path: '/games/:gameName?',
    component: GamePage
  }
]