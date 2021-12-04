<template>
  <div class="load">
    <b>API DOWNLOADS:</b> {{ downloads }}<br>
    <b>FIREBASE INSERTS:</b> {{ inserts }}<br>
  </div>
</template>

<script>
import { collection, addDoc } from 'firebase/firestore'
import db from '@/firebase'
import axios from 'axios'

export default {
  data () {
    return {
      downloads: 0,
      inserts: 0
    }
  },
  methods: {
    async getPokemonsFromApi (url) {
      axios.get(url).then(pokemons => {
        if (pokemons.data.results) {
          pokemons.data.results.forEach(pokemon => {
            this.downloads++
            axios.get(pokemon.url).then(async pokemonData => {
              await addDoc(collection(db, 'pokemons'), {
                id: pokemonData.data.id,
                name: pokemonData.data.name,
                order: pokemonData.data.order,
                url: pokemon.url,
                image: pokemonData.data.sprites.front_default
              })
              this.inserts++
            })
          })
          if (pokemons.data.next) {
            this.getPokemonsFromApi(pokemons.data.next)
          }
        }
      })
    }
  },
  mounted () {
    this.getPokemonsFromApi('https://pokeapi.co/api/v2/pokemon/')
  }
}
</script>
