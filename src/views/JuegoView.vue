<template>
  <div class="container" style="margin-top: 30px;">
    <div class="row justify-content-center">
      <div class="col-md-8 text-center">
        <h1 class="mb-4">¿Quién es este Pokémon?</h1>
        <div v-if="pokemonActual" class="game">
          <img :src="pokemonActual.sprites.other['official-artwork'].front_default" :alt="`Silueta de ${pokemonActual.name}`" :class="{'pokemon-silhouette': true, 'filtrada': respuesta !== 'Correcto'}" class="img-fluid mb-3 rounded">
          <div class="options">
            <button v-for="(option, index) in opciones" :key="index" @click="checkAnswer(option)" class="btn btn-primary m-2">
              {{ option }}
            </button>
          </div>
          <div v-if="respuesta" class="mt-3">
            <p :class="{'text-success': respuesta === 'Correcto!', 'text-danger': respuesta === 'Incorrecto!'}" class="fw-bold">{{ respuesta }}</p>
            <button @click="irAInicio" class="btn btn-danger mt-2 ms-2">Regresar</button>
            <button @click="reiniciarJuego" class="btn btn-warning mt-2 ms-2">Reiniciar</button>
            <button @click="juego" class="btn btn-secondary mt-2 ms-2">Siguiente</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PokemonServices from '@/services/PokemonServices';

export default {
  name: 'JuegoView',
  data() {
    return {
      listaPokemon: [],
      pokemonActual: null,
      opciones: [],
      respuesta: ''
    };
  },
  async created() {
    const data = await PokemonServices.getPokemons(0, 200); 
    this.listaPokemon = data.results; 
    this.juego();
  },
  methods: {
    async juego() {
      this.respuesta = '';
      const obtienePokemon = Math.floor(Math.random() * this.listaPokemon.length);
      const seleccionado = this.listaPokemon[obtienePokemon];
      this.pokemonActual = await PokemonServices.getPokemonDetail(seleccionado.name);

      const respuestaCorrecta = this.pokemonActual.name;

      // array para las opciones incorrectas
      const opcionesIncorrectas = [];
      const usados = new Set();
      usados.add(respuestaCorrecta); 

      // Ciclo para seleccionar 3 opciones incorrectas
      while (opcionesIncorrectas.length < 3) {
        const index = Math.floor(Math.random() * this.listaPokemon.length);
        const pokemon = this.listaPokemon[index].name;
      
        // Verificar que el Pokémon no sea la respuesta correcta y no se haya seleccionado antes
        if (!usados.has(pokemon)) {
        opcionesIncorrectas.push(pokemon);
        usados.add(pokemon); 
        }
      }

      // Combinar las opciones incorrectas con la correcta y mezclar
      this.opciones = [...opcionesIncorrectas, respuestaCorrecta].sort(() => 0.5 - Math.random());
    },
      //Respuesta del usuari
    async checkAnswer(opcionSeleccionada) {
      if (opcionSeleccionada === this.pokemonActual.name) {
        this.respuesta = 'Correcto';
      } else {
        this.respuesta = 'Incorrecto';
      }
    },
    reiniciarJuego() {
      this.juego();
    },
    irAInicio() {
      this.$router.push({ name: 'home' });
    }
  }
};
</script>

<style scoped>
.pokemon-silhouette {
  width: 200px;
  height: 200px;
  margin-bottom: 20px;
}

.pokemon-silhouette.filtrada {
  filter: brightness(0);
}


.options {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.text-success {
  color: #28a745;
}
.text-danger {
  color: #dc3545;
}
</style>
