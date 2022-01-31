<template>
  <div class="card main__card">
    <img :src="require('../assets/avatar.png')" alt="avatar" class="avatar__img">
    <div class="card__title">
      <p class="card__title__main">{{ employee.surName}} {{employee.name}} {{employee.patronymic}}</p>
      <p class="card__title__second">{{ employee.qualification }}</p>
      <p class="card__title__second">Отделение: {{employee.department.name}}</p>
    </div>
    <div class="button__card">
      <custom-button @click="$router.push('/patientList/' + employee.id)">Пациенты</custom-button>
      <custom-button @click="$router.push('/schedule/' + employee.id)">Расписание</custom-button>
    </div>
  </div>
  <div class="card single__button">
    <div class="card__title">
      <p class="card__title__main__blue">Личные данные</p>
      <ui-list :type="2" class="position">
        <ui-item>
          <ui-item-text-content>
            <ui-item-text1>{{employee.phoneNumber}}</ui-item-text1>
            <ui-item-text2>Телефон</ui-item-text2>
          </ui-item-text-content>
        </ui-item>
        <ui-item>
          <ui-item-text-content>
            <ui-item-text1>{{employee.email}}</ui-item-text1>
            <ui-item-text2>Почта</ui-item-text2>
          </ui-item-text-content>
        </ui-item>
        <ui-item>
          <ui-item-text-content>
            <ui-item-text1>{{employee.personnelNum}}</ui-item-text1>
            <ui-item-text2>Табельный номер</ui-item-text2>
          </ui-item-text-content>
        </ui-item>
        <ui-item>
          <ui-item-text-content>
            <ui-item-text1>{{employee.birthDate}}</ui-item-text1>
            <ui-item-text2>Дата рождения</ui-item-text2>
          </ui-item-text-content>
        </ui-item>
    </ui-list>
    </div>
    <div class="button__card">
        <custom-button @click="showModal = true">Изменить</custom-button>
    </div>
    <transition name="modal">
    <modal v-if="showModal" >
      <template v-slot:header>
        <h2>Изменение личных данных</h2>
      </template>
      <template v-slot:body>
        <Form :empl="employee" @update-empl="updateEmployee"></Form>
      </template>
      <template v-slot:footer>
      </template>
    </modal>
    </transition>
  </div>
  <div class="card single__button">
    <div class="card__title">
      <p class="card__title__main__blue">Образование</p>
      <p class="text">{{employee.education}}</p>
      <p class="card__title__main__blue">Опыт работы</p>
      <p class="text">{{employee.experience}}</p>
    </div>
    <div class="button__card">
        <custom-button @click="showModal = true">Изменить</custom-button>
      </div>
  </div>
</template>

<script>
import CustomButton from './UI/Button'
import Modal from './UI/Modal'
import Form from './UI/Form'
import axios from 'axios'
export default {
  name: 'EmployeeCard',
  components: {
    CustomButton,
    Modal,
    Form
  },
  props: {
    employee: {
      type: Object
    }
  },
  data () {
    return {
      showModal: false
    }
  },
  methods: {
    async updateEmployee (employee) {
      try {
        const response = await axios.put('http://localhost:8080/api/employee/update',
          {
            id: this.employee.id,
            personnelNum: this.employee.personnelNum,
            name: this.employee.name,
            surName: this.employee.surName,
            patronymic: this.employee.patronymic,
            gender: this.employee.gender,
            email: employee.email,
            phoneNumber: employee.phoneNumber,
            birthDate: employee.birthDate,
            username: this.employee.username,
            password: this.employee.password,
            experience: employee.experience,
            department: this.employee.department,
            qualification: this.employee.qualification,
            education: employee.education,
            photo: this.employee.photo,
            roleId: this.employee.roleId
          },
          {
            headers: { Authorization: 'Bearer ' + this.currentUser.token }
          }
        )
        console.log(response)
        this.showModal = false
      } catch (e) {
        console.log(e)
      }
    }
  },
  computed: {
    currentUser () {
      return this.$store.state.auth.user
    }
  }
}
</script>

<style scoped>
*{
  background: white;
}
.card{
  min-width: 70%;
  border-radius: 15px;
  padding: 24px;
  margin-left: 54px;
  background-color: white;
  margin-top: 24px;
  display: flex;
  margin-bottom: 60px;
}

.main__card {
  max-width: 50%;
}

.avatar__img{
  max-height: 216px;
  max-width: 216px;
}
.button__card{
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
}
.single__button{
  display: flex;
  justify-content: space-between;
  min-width: 100%;
  margin-bottom: 60px;
}

.card__title{
  background-color: white;
  margin-left: 30px;
}

.card__title__main{
  font-size: 48px;
  color: #515151;
}

.card__title__main__blue{
  color: rgba(90, 172, 218, 1);
  font-size: 42px;
}

.card__title__second{
  font-size: 32px;
  color: #515151;
  padding-top: 30px;
  text-align: justify-all;
}

.text{
  font-size: 16px;
  color: #515151;
  padding: 15px;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}
.buttons__row{
  display: flex;
  justify-content: flex-end;
}

</style>
