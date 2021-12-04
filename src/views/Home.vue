<template>
  <div class="home">
    <div v-if="pokemons.length == 0" class="text-center mt-5">
      <Loading width="128" height="128" />
    </div>
    <div v-else class="custom-row">
      <div class="custom-col" v-for="pokemon in pokemons" :key="pokemon.id">
          <img :src="pokemon.data.image" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-html="true" :title="`&nbsp;&nbsp;&nbsp;&nbsp;${pokemon.data.name.toUpperCase()}&nbsp;&nbsp;&nbsp;&nbsp;<br>ID ${pokemon.data.id}`">
      </div>
    </div>
  </div>
</template>

<script>
import Loading from '@/components/Loading'
import { collection, query, orderBy, getDocs } from 'firebase/firestore'
import db from '@/firebase'
import { Tooltip } from 'bootstrap'

export default {
  name: 'Home',
  components: {
    Loading
  },
  data () {
    return {
      pokemons: []
    }
  },
  methods: {
    async getPokemons () {
      const pokemonsQuery = query(collection(db, 'pokemons'), orderBy('id'))
      const pokemons = await getDocs(pokemonsQuery)
      pokemons.forEach((pokemon) => {
        this.pokemons.push({
          id: pokemon.id,
          data: pokemon.data()
        })
      })
    },
    setTooltips () {
      const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
      tooltipTriggerList.map(elm => new Tooltip(elm))
    }
  },
  async mounted () {
    await this.getPokemons()
    this.setTooltips()
  },
  async updated () {
    this.setTooltips()
  }
}
</script>

<style lang="scss" scoped>
.custom-row {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  .custom-col {
    cursor: pointer;
    align-self: center;
    border: 1px solid transparent;
    img {
      width: 120px;
      height: 120px;
    }
    &:hover {
      border-color: #3761a8;
      background-color: #fff;
      border-radius: 50%;
    }
  }
}
</style>
