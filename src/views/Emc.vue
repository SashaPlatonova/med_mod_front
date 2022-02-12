<template>
  <div>
  <div class="search-wrapper">
      <input type="text" v-model="search" placeholder="Введите название:"/>
        <label>Название документа:</label>
  </div>
<div class="cards">
  <EmcCard :document="documents[0]"></EmcCard>
  <div class="doc_cards">
  <DocCard v-for="doc in searchDoc"
           :document="doc"
           :key="doc.id"/>
  </div>
</div>
  </div>
</template>

<script>
import EmcCard from '../components/EmcCard'
import DocCard from '../components/DocCard'
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
      search: ''
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
        this.documents = response.data
        this.document = this.documents[0]
      } catch (e) {
        console.log(e)
      }
    }
  },
  created () {
    this.fetchDocument()
  },
  computed: {
    searchDoc () {
      return this.documents.filter(d => d.session.sessionName.toLowerCase().includes(this.search.toLowerCase()))
    }
  }
}
</script>

<style scoped>
* {
  position: unset;
}
.search-wrapper {
  position: relative;
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
}
.doc_cards{
  display: flex;
  flex-direction: column;
  margin-left: 10%;
  margin-top: 30px;
}
</style>
