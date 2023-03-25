
<template>
  <div class="list">
    <div class="bar">
      <img class="rick-morty-logo" :src="Logo" alt="ricky morty logo">
      <h2>Ricky and morty characters list</h2>
    </div>
    <ul class="characters">
      <!-- Iterar sobre a lista de personagens -->
      <li @click="showCharacter" v-for="character in characters" :key="character.id" class="character">
        <!-- Mostrar os dados do personagem -->
        <div class="card-container">
          <img class="character-image" :src="character.image" :alt="character.name" />
          <h4>{{ character.name }}</h4>
        </div>

        <div class="character-container">
          <div @click="closeCharacter" class="close-button">
            <span></span>
            <span></span>
          </div>
          <div class="container-image">
            <img :src="character.image" :alt="character.name" />
          </div>
          <p class="label-container"><span>Name:</span> {{ character.name }}</p>
          <p class="label-container"><span>Location:</span> {{ character.location.name }}</p>
          <p class="label-container"><span>Status:</span> {{ character.status }}</p>
          <p class="label-container"><span>Episodes:</span></p>
          <ul class="episodes-list">
            <!-- Iterar sobre os episódios do personagem -->
            <li v-for="episode in getEpisodes(character)" :key="episode.id"><span>{{ episode.episode }}</span>
            </li>
          </ul>
        </div>

      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
import Logo from '../assets/rickmortylogo.png'

export default {

  data() {
    return {
      characters: [],
      episodes: [],
      Logo,
    }
  },


  methods: {

    closeCharacter() {

      let allLinks = document.querySelectorAll('.character-container')
          for (let ind = 0; ind < allLinks.length; ind++) {
            let linkin = allLinks[ind];
            linkin.classList.remove('active')
          }
    },
    // Obter os episódios de um personagem
    getEpisodes(character) {
      // Filtrar os episódios que contêm o personagem na lista de personagens
      return this.episodes.filter(episode => episode.characters.includes(character.url));
    },
  },
  mounted() {


    axios.get('https://rickandmortyapi.com/api/character')
      .then(response => {
        // Obter a lista de personagens
        this.characters = response.data.results;
        // Obter a lista de URLs dos episódios
        let episodeUrls = [];
        this.characters.forEach(character => {
          character.episode.forEach(url => {
            if (!episodeUrls.includes(url)) {
              episodeUrls.push(url);
            }
          });
        });
        // Para cada URL, fazer uma requisição GET para obter os dados do episódio
        episodeUrls.forEach(url => {
          axios.get(url)
            .then(response => {
              // Adicionar o episódio à lista de episódios
              this.episodes.push(response.data);
            })
            .catch(error => {
              console.error(error);
            });
        });
      })
      .catch(error => {
        console.error(error);
      });

    setTimeout(() => {
      let cards = document.querySelectorAll('.character');
      for (let i = 0; i < cards.length; i++) {
        let card = cards[i];
        let clic = card.querySelector('.card-container');
        let container = card.querySelector('.character-container')
        clic.addEventListener('click', () => {
          let allClose = document.querySelectorAll('.character-container')
          for (let ind = 0; ind < allClose.length; ind++) {
            let close = allClose[ind];
            close.classList.remove('active')
            close.classList.remove('animate')
          }
          if (container.classList.contains('active')) {
            container.classList.remove('active')
            container.classList.remove('animate')
          } else {
            container.classList.add('active')
            container.classList.add('animate')
          }
        })
      }
    }, 1000)
  },
}
</script>

<style lang="scss">
.bar {
  display: flex;
  flex-wrap: wrap;
  padding: 0 0 40px;
  align-items: center;
}

.bar h2 {
  margin-left: 10px;

}

.rick-morty-logo {
  width: 70px;
  height: 70px;
}

.characters {
  display: flex;
  padding: 0;
  max-width: 900px;
  margin: 0 auto;
  list-style: none;
  flex-wrap: wrap;
  column-gap: 20px;
  row-gap: 20px;
}

.card-container {
  height: 100%;
}

.character {

  width: 31.30%;
  border: 0;
  background: var(--black);
  color: #fff;
  border-radius: 7px;
  cursor: pointer;
}

.character h4 {
  padding: 0px 20px;
}

.character-image {
  display: flex;
  margin: 0 auto;
  width: 100%;
  max-width: 500px;
  border-radius: 5px 5px 0 0;
}

.episodes-list {
  width: 100%;
  display: flex;
  padding: 0;
  text-align: center;
  flex-wrap: wrap;
  column-gap: 10px;
  row-gap: 10px;
  margin: 10px auto;

}

.episodes-list li {
  width: fit-content;
  list-style: none;
}

.episodes-list span {
  background-color: #fff;
  font-weight: bold;
  padding: 5px;
  font-size: 11px;
  border-radius: 5px;
  color: var(--black);
}

.character-container {
  display: none;
  background-color: var(--black);
  color: #fff;
  max-width: 302px;
  max-height: 90vh;
  width: auto;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: scroll;
  overflow-x: hidden;
  padding: 30px;
  border-radius: 5px;
  box-shadow: 10px 10px 10px rgb(0, 0, 0, 0.2);
  cursor: initial;

  .label-container span {
    font-weight: 600;
  }
}


.active {
  display: initial;
}

.animate {
  animation-name: moveUp;
  animation-duration: 0.2s;
  animation-timing-function: ease-in-out;
}

@keyframes moveUp {
  0% {
    transform: translate(-50%, 50%);
    opacity: 0;
  }

  100% {
    transform: translate(-50%, -50%);
    opacity: 1;
  }
}

.container-image {
  margin: 0 auto;
  text-align: center;
}

.container-image img {
  border-radius: 5px;
}




/*Close character Button*/
.close-button {
  position: fixed;
  background-color: #fff;
  right: 0;
  top: 0;
  height: 50px;
  width: 30px;
  transform: rotate(-45deg);
  margin-right: -10px;
  margin-top: -17px;
  cursor: pointer;
}

.close-button span {
  background: var(--black);
  width: 3px;
  height: 15px;
  position: absolute;
  bottom: 37%;
  margin-left: 8px;

}

.close-button span:nth-of-type(1) {
  transform: rotate(0deg)
}

.close-button span:nth-of-type(2) {
  transform: rotate(-90deg)
}
</style>