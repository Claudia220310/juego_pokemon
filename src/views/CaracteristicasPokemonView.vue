<template>
  <div class="container" style="margin-top: 30px;">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div v-if="pokemon" class="card">
          <div class="card-header text-center">
            <h1 class="card-title">{{ pokemon.name }}</h1>
          </div>
          <div class="card-body text-center">
            <img :src="pokemon.sprites.other['official-artwork'].front_default" alt="Imagen de {{ pokemon.name }}" class="img-fluid mb-3 rounded">
            <div class="row">
              <div class="col-md-6">
                <p class="card-text"><strong>Altura:</strong> {{ pokemon.height }} decímetros</p>
                <p class="card-text"><strong>Peso:</strong> {{ pokemon.weight }} hectogramos</p>
                <p class="card-text"><strong>Habilidades:</strong>
                  <ul class="list-unstyled">
                    <li v-for="(ability, index) in pokemon.abilities" :key="index">
                      {{ ability.ability.name }}
                    </li>
                  </ul>
                </p>
              </div>
              <div class="col-md-6">
                <p class="card-text"><strong>Tipos:</strong>
                  <ul class="list-unstyled">
                    <li v-for="(type, index) in pokemon.types" :key="index">
                      {{ type.type.name }}
                    </li>
                  </ul>
                </p>
                <p class="card-text"><strong>Movimientos:</strong>
                  <ul class="list-unstyled">
                    <li v-for="(move, index) in pokemon.moves.slice(0, 5)" :key="index">
                      {{ move.move.name }}
                    </li>
                    <li v-if="pokemon.moves.length > 5"></li>
                  </ul>
                </p>
              </div>
            </div>
            <button @click="goBack" class="btn btn-secondary mb-3">Regresar</button>
            <button @click="irAJuego" class="btn btn-danger mb-3">Ir a Juego</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PokemonServices from '@/services/PokemonServices';

export default {
  name: 'CaracteristicasPokemonView',
  data() {
    return {
      pokemon: null
    };
  },
  async created() {
    const { name } = this.$route.params;
    this.pokemon = await PokemonServices.getPokemonDetail(name);
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    irAJuego() {
      this.$router.push({ name: 'Juego' });
    }
  }
};
</script>

<style scoped>

.card-header {
  background-color: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
}

.card-title {
  margin: 0;
  font-size: 1.75rem;
  color: #333;
}

.card-body {
  padding: 2rem;
}

.img-fluid {
  max-width: 100%;
  height: auto;
}

.list-unstyled {
  padding-left: 0;
  list-style: none;
}

.btn-danger {
  margin-left: 10px;
}
.card-header {
  background-color: #ffcc00; /* Cambiamos el color de fondo del encabezado */
  border-bottom: 2px solid #ff9900; /* Aumentamos el grosor y cambiamos el color del borde inferior */
}

.card-title {
  margin: 0;
  font-size: 2rem; /* Aumentamos el tamaño de la fuente del título */
  color: #333;
  text-transform: uppercase; /* Convertimos el texto del título en mayúsculas */
}

.card-body {
  padding: 2rem;
  background-color: #f7f7f7; /* Cambiamos el color de fondo del cuerpo de la tarjeta */
}

.img-fluid {
  max-width: 100%;
  height: auto;
  border-radius: 10px; /* Agregamos bordes redondeados a la imagen */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Agregamos una sombra sutil */
}

.list-unstyled {
  padding-left: 0;
  list-style: none;
}

.btn-danger {
  margin-left: 10px;
  background-color: #ff6666; /* Cambiamos el color de fondo del botón */
  border-color: #ff3333; /* Cambiamos el color del borde del botón */
}

.btn-danger:hover {
  background-color: #ff4d4d; /* Cambiamos el color de fondo del botón al pasar el mouse */
  border-color: #ff1a1a; /* Cambiamos el color del borde del botón al pasar el mouse */
}
</style>
