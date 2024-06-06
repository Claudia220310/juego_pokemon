<template>
  <div class="container" style="margin-top: 30px;">
    <div class="row">
      <div class="col text-center">
        <h3 class="text-dark">Listado de Pokémon</h3>
        <button type="button" @click="goToGame" class="btn btn-danger mb-3">Juego</button>
      </div>
    </div>
    <div class="row p-3 mt-3 mb-3 d-flex justify-content-center">
      <div v-for="pokemon in pokemons" :key="pokemon.name" class="col-4 col-md-4 col-lg-4 mb-4">
        <div class="card h-100 text-center">
          <div class="card-body">
            <h5 class="card-title text-capitalize">{{ pokemon.name }}</h5>
            <img :src="pokemon.image" alt="pokemon.name" class="img-fluid mb-2"  @click="PokemonCaracteristicas(pokemon.name)">
            
          </div>
        </div>
      </div>
    </div>
    <nav aria-label="Page navigation example">
  <ul class="pagination justify-content-center">
    <li class="page-item"><a class="page-link" href="#" @click.prevent="prevPage" :disabled="!prevUrl">Anterior</a></li>
    <li class="page-item"><a class="page-link" href="#" @click.prevent="nextPage" :disabled="!nextUrl">1</a></li>
    <li class="page-item"><a class="page-link" href="#" @click.prevent="nextPage" :disabled="!nextUrl">2</a></li>
    <li class="page-item"><a class="page-link" href="#" @click.prevent="nextPage" :disabled="!nextUrl">3</a></li>
    <li class="page-item">
      <a class="page-link" href="#" @click.prevent="nextPage" :disabled="!nextUrl">Siguiente</a>
    </li>
  </ul>
</nav>

  </div>
</template>

<script>
import PokemonServices from '@/services/PokemonServices';

export default {
  name: 'PokemonListView',
  data() {
    return {
      pokemons: [],
      currentPage: 1,
      limit: 10,
      nextUrl: null,
      prevUrl: null,
      totalPokemons: 0,
    };
  },
  async created() {
    await this.fetchPokemons();
  },
  methods: {
    async fetchPokemons(url = null) {
      const response = url
        ? await PokemonServices.getPokemonsByUrl(url)
        : await PokemonServices.getPokemons((this.currentPage - 1) * this.limit, this.limit);
        
      this.pokemons = await Promise.all(response.results.map(async pokemon => {
        const details = await PokemonServices.getPokemonDetail(pokemon.name);
        return {
          name: pokemon.name,
          image: details.sprites.front_default
        };
      }));

      this.nextUrl = response.next;
      this.prevUrl = response.previous;
      this.totalPokemons = response.count;
    },
    async nextPage() {
      if (this.nextUrl) {
        this.currentPage++;
        await this.fetchPokemons(this.nextUrl);
      }
    },
    async prevPage() {
      if (this.prevUrl) {
        this.currentPage--;
        await this.fetchPokemons(this.prevUrl);
      }
    },
    PokemonCaracteristicas(name) {
      this.$router.push({ name: 'CaracteristicasPokemonView', params: { name } });
    },
    goToGame() {
      this.$router.push({ name: 'Juego' });
    }
  }
};
</script>

<style scoped>
.card-title {
  font-size: 1.25rem;
  color: #333;
}
.img-fluid {
  max-width: 100%;
  height: auto;
}
</style>
