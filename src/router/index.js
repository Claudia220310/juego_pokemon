import { createRouter, createWebHistory } from 'vue-router'
import PokemonListView from '../views/PokemonListView.vue'
import CaracteristicasPokemonView from '../views/CaracteristicasPokemonView.vue'
import JuegoView from '../views/JuegoView.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: PokemonListView
  },
  {
    path: '/caracteristicas/ :name',
    name: 'CaracteristicasPokemonView',
    component: CaracteristicasPokemonView
  },
  {
    path: '/juego',
    name: 'Juego',
    component: JuegoView
}
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
