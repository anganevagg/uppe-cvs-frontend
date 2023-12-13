<template>
  <q-page class="row items-center justify-center container">
    <div>
      <div class="row col-12 justify-center text-center q-py-md">
        <p class="col-12 message__secondary">Bienvenido</p>
        <p class="col-12 message__main">correcamino</p>
      </div>
      <div class="col-12 row justify-center">
        <div>

        </div>
        <q-input class="col-12 input" v-model="search" placeholder="Buscar por carrera o docente" outlined rounded
          input-class="placeholder" @update:model-value="filter" debounce="500">
          <template #prepend>
            <q-icon name="search" class="placeholder"></q-icon>
          </template>
        </q-input>
      </div>
      <div class="row q-pa-lg col-12">
        <q-card v-for="user in users" :key="user.id" class="col-6" @click="detailUser(user.id)">
          <q-card-section class="row justify-center">
            <div class="img-unknown row items-center justify-center">
              <q-icon name="person" size="60px">

              </q-icon>
            </div>
          </q-card-section>
          <q-card-section class="text-center">
            <span class="text-h6 uppe-primary-text">
              {{ user.first_name }} {{ user.last_name }}
            </span>
          </q-card-section>
          <q-card-section class="row justify-center">
            <q-btn no-caps color="primary" rounded>
              Ver detalles
            </q-btn>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { IUser } from 'src/interfaces/user.interface';
import { Ref, ref } from 'vue';
import { UserService } from './users/service';
const usersService = new UserService()
const users: Ref<IUser[]> = ref([])
const search = ref('');
const filter = (val: string | number | null) => {
  if (!val) val = ''
  usersService.getAll(val.toString(), users)
}
const detailUser = (id: string) => {
  console.log(id)
}
</script>

<style scoped lang="scss">
.message__secondary {
  color: $primary-text;
  text-align: center;
  font-family: Inter;
  font-size: 34px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-transform: uppercase;
}

.message__main {
  color: $primary-text;
  font-family: Inter;
  font-size: 46px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-transform: uppercase;
}

.container {
  top: -80px;
}

.input {
  border-radius: 100px;
  border: 0.5px solid #007d8c;
  background: rgba(217, 217, 217, 0);
  box-shadow: 0px 2px 4px 2px rgba(0, 125, 140, 0.25);
}

.placeholder {
  color: rgba(0, 125, 140, 0.25);
}

.placeholder::placeholder {
  color: rgba(0, 125, 140, 0.25);
}

.img-unknown {
  background-color: $primary;
  color: white;
  border-radius: 100%;
  width: 10vh;
  height: 10vh;
}
</style>
