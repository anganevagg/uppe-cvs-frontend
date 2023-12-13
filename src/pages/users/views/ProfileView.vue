<template>
  <div>
    <q-img src="~assets/woman.png" height="230px" position="0 0">
      <div class="absolute-bottom text-subtitle1 text-center woman-img">
      </div>
    </q-img>
  </div>
  <div class="row justify-center q-py-lg q-gutter-y-md">
    <personal-info-card :user="userData" class="col-8" @getMe="getMe">
    </personal-info-card>
    <articles-info-card :articles="userData?.articles" :user="userData" class="col-8" @getMe="getMe">

    </articles-info-card>
  </div>
</template>
<script setup lang="ts">
import { Ref, onMounted, ref } from 'vue';
import ArticlesInfoCard from '../components/ArticlesInfoCard.vue';
import PersonalInfoCard from '../components/PersonalInfoCard.vue';
import { UserService } from '../service';
import { IUser } from 'src/interfaces/user.interface';

const userData: Ref<IUser | null> = ref(null)
const userService = new UserService()

const getMe = async () => {
  await userService.getMe(userData)
}
onMounted(async () => {
  await getMe()
})
</script>
<style scoped>
.woman-img {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, #FFF 100%);
}

.btn__icon {
  color: #00000085;
}
</style>
