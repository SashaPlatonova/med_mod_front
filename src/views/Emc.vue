<template>
  <div>
  <div class="search-wrapper">
      <input type="text" v-model="search" placeholder="Введите название:"/>
  </div>
<div class="cards">
  <EmcCard :document="document" @show-futures="changeFuture"></EmcCard>
  <div class="doc_cards">
  <DocCard v-for="doc in searchDoc"
           :document="doc"
           :key="doc.id"/>
  </div>
  <div class="filters_list">
    <li v-for="cat in categories" :key="cat.id" style="list-style: none">
      <input type="checkbox" id="cat" :value="cat.name" style="min-width: 50%" v-model="selectedCats" class="checkbox-other">
      <span>{{cat.name}}</span>
    </li>
  </div>
</div>
  </div>
</template>

<script>
import EmcCard from '../components/EmcCard'
import DocCard from '../components/DocCard'
import dateFormater from '../services/dateFormater'
import axios from 'axios'
export default {
  name: 'Emc',
  components: {
    EmcCard,
    DocCard
  },
  data () {
    return {
      documents: [],
      document: null,
      categories: [],
      selectedCats: [],
      search: '',
      futures: null,
      currentDocsList: []
    }
  },
  methods: {
    async fetchDocument () {
      try {
        const response = await axios.get('http://localhost:8080/api/schedule/find/patient/id',
          {
            headers: { Authorization: 'Bearer ' + this.$cookies.get('token').toString() },
            params: {
              id: this.$route.params.id
            }
          }
        )
        for (const doc of response.data) {
          if (this.document == null && doc.session.conclusion != null) {
            this.document = doc
          }
          doc.date = dateFormater(doc.date, true)
          this.documents.push(doc)
          this.currentDocsList.push(doc)
        }
      } catch (e) {
        console.log(e)
      }
    },
    changeFuture (future) {
      this.futures = future
    },
    async fetchCategories () {
      try {
        const response = await axios.get('http://localhost:8080/api/document/all/categories',
          {
            headers: { Authorization: 'Bearer ' + this.$cookies.get('token').toString() }
          }
        )
        this.categories = response.data
        for (let i = 0; i < this.categories.length; i++) {
          this.selectedCats.push(this.categories[i].name)
        }
      } catch (e) {
        console.log(e)
      }
    }
  },
  watch: {
    futures (newFuture) {
      if (newFuture) {
        this.currentDocsList = []
        var i = 0
        for (const doc of this.documents) {
          if (new Date(doc.date) >= new Date()) {
            this.currentDocsList[i] = doc
            i++
          }
        }
      } else {
        this.currentDocsList = this.documents
      }
    }
  },
  created () {
    // this.futures = false
    this.fetchDocument()
    this.fetchCategories()
  },
  computed: {
    searchDoc () {
      return this.currentDocsList.filter(d => d.session.sessionName.toLowerCase().includes(this.search.toLowerCase()) &&
        this.selectedCats.includes(d.session.category.name))
    }
  }
}
</script>

<style scoped>
* {
  position: unset;
}
.search-wrapper {
  position: unset;
  margin-left: 54px;
  min-width: 70%;
  height: 30px;
  margin-bottom: 54px;
}
 label {
   position: absolute;
   font-size: 12px;
   color: rgba(0, 0, 0, .50);
   top: 8px;
   left: 12px;
   z-index: -1;
   transition: .15s all ease-in-out;
 }
input {
  min-width: 100%;
  height: 30px;
  padding: 4px 12px;
  color: rgba(0, 0, 0, .70);
  border: 1px solid rgba(0, 0, 0, .12);
  border-radius: 15px;
  transition: .15s all ease-in-out;
  background: white;
}
input:focus {
        outline: none;
        transform: scale(1.05);
      }
input:focus + label {
          font-size: 10px;
          transform: translateY(-24px) translateX(-12px);
        }
      input:focus + label::-webkit-input-placeholder {
          font-size: 12px;
          color: rgba(0,0,0,.50);
          font-weight: 100;
      }
.cards{
  display: flex;
  /*justify-content: center;*/
  position: unset;
}
.doc_cards{
  display: flex;
  flex-direction: column;
  margin-left: 10%;
  margin-top: 30px;
  position: unset;
}
.filters_list {
  min-width: 300px;
  background: white;
  border-radius: 15px;
  margin-left: 54px;
  max-height: min-content;
  margin-top: 30px;
  margin-bottom: 60px;
}
.filters_list li {
  display: flex;
  justify-content: flex-start;
  margin-top: 20px;
}
</style>
