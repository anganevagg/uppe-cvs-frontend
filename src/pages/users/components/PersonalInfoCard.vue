<template>
  <q-card bordered>
    <q-card-section class="row items-center justify-between">
      <span class="upp-text-primary text-h6">
        Información de contacto
      </span>
      <q-btn unelevated v-if="!isEditing" @click="isEditing = !isEditing" color="primary" no-caps>
        <div class="row items-center">
          <span class="q-mr-sm">
            Editar
          </span>
          <q-icon name="edit" size="16px"></q-icon>
        </div>
      </q-btn>
      <q-btn unelevated v-else @click="savePersonalInfo" no-caps color="primary" :loading="loading">
        <div class="row items-center">
          <span class="q-mr-sm">
            Guardar
          </span>
          <q-icon name="save" size="16px"></q-icon>
        </div>

      </q-btn>
    </q-card-section>
    <q-separator></q-separator>
    <q-card-section class="row justify-between items-center text-body1" v-if="!isEditing">
      <div class="col row items-center justify-start">
        <div class="img-unknown row items-center justify-center">
          <q-icon name="person" size="60px">

          </q-icon>
        </div>
      </div>
      <div class="col-10 row q-gutter-y-md">
        <div class="col-6">
          <span class="upp-text-primary">
            Nombre:
          </span>
          <span class="upp-text-secondary">
            {{ user?.first_name }} {{ user?.last_name }}
          </span>
        </div>
        <div class="col-6">
          <span class="upp-text-primary">
            Email personal:
          </span>
          <span class="upp-text-secondary">
            {{ user?.personal_email }}
          </span>
        </div>
        <div class="col-6">
          <span class="upp-text-primary">
            Email institucional:
          </span>
          <span class="upp-text-secondary">
            {{ user?.email }}
          </span>
        </div>
        <div class="col-6">
          <span class="upp-text-primary">
            Teléfono:
          </span>
          <span class="upp-text-secondary">
            {{ user?.phone }}
          </span>
        </div>
      </div>
    </q-card-section>
    <q-card-section class="row justify-between items-center" v-else>
      <div class="col row items-center justify-start">
        <q-btn class="img-unknown row items-center justify-center">
          <q-icon name="person" size="60px">

          </q-icon>
        </q-btn>
      </div>
      <div class="col-10 row q-gutter-y-md">
        <div class="col-6 row">
          <q-input class="col-8" label="Nombre" dense v-model="editUser.first_name"></q-input>
        </div>
        <div class="col-6 row">
          <q-input class="col-8" label="Apellido" dense v-model="editUser.last_name"></q-input>
        </div>
        <div class="col-6 row">
          <q-input class="col-8" label="Email personal" dense v-model="editUser.personal_email"></q-input>
        </div>
        <div class="col-6 row">
          <q-input class="col-8" label="Teléfono" dense v-model="editUser.phone"></q-input>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { IUser } from 'src/interfaces/user.interface';
import { Ref, ref, watch } from 'vue';
import { UserService } from '../service';

const props = defineProps<{
  user: IUser | null
}>()
const emit = defineEmits(['getMe'])
const isEditing = ref(false)
const loading = ref(false)

const userService = new UserService()
const editUser: Ref<{
  first_name: string,
  last_name: string,
  personal_email: string | null | undefined,
  phone: string | null | undefined
}> = ref({
  first_name: '',
  last_name: '',
  personal_email: null,
  phone: null
})

watch(isEditing, () => {
  if (!props.user) return
  editUser.value = {
    first_name: props.user.first_name,
    last_name: props.user.last_name,
    phone: props.user?.phone,
    personal_email: props.user?.personal_email,
  }
})

const savePersonalInfo = async () => {
  await userService.updateMe(loading, {
    first_name: editUser.value.first_name,
    last_name: editUser.value.last_name,
    personal_email: editUser.value.personal_email,
    phone: editUser.value.phone,
  })
  isEditing.value = false
  emit('getMe')
}
</script>
<style scoped lang="scss">
.img-unknown {
  background-color: $primary;
  color: white;
  border-radius: 100%;
  width: 10vh;
  height: 10vh;
}
</style>
