<template>
  <q-btn icon="keyboard_backspace" @click="router.back()" unelevated size="30px" padding="none" class="q-ma-md">

  </q-btn>
  <div class="row justify-center">
    <q-card style="width: 80vw;">
      <q-card-section class="row justify-between">
        <span class="text-h5 upp-text-primary">
          Usuarios
        </span>
        <q-btn color="primary" no-caps @click="addModal = true">
          <div class="row items-center">
            <span class="q-mr-sm">
              Agregar
            </span>
            <q-icon name="add" size="16px"></q-icon>
          </div>
        </q-btn>
      </q-card-section>
      <q-separator></q-separator>
      <q-card-section>
        <q-table :columns="tableData" :rows="users" hide-pagination :rows-per-page-options="[0]">

        </q-table>
      </q-card-section>
      <q-dialog v-model="addModal" @hide="addModal = false">
        <q-card style="width: 80vw; max-width: 40vw;">
          <q-card-section class="row items-center justify-between">
            <span class="text-h6 upp-text-primary">
              Agregar usuario
            </span>
            <q-btn icon="close" padding="none" unelevated @click="addModal = false">

            </q-btn>
          </q-card-section>
          <q-separator></q-separator>
          <q-card-section>
            <q-form class="q-col-gutter-lg q-gutter-y-md row justify-center" ref="userForm">
              <q-input class="col-6" type="email" label="Correo institucional" v-model="email"
                :rules="rules.email"></q-input>
              <q-select class="col-6" label="Rol" :options="roles" v-model="selectedRole"
                :rules="rules.required"></q-select>
            </q-form>
          </q-card-section>
          <q-card-section class="row justify-end">
            <q-btn color="primary" no-caps @click="createUser" :loading="loading">
              Guardar
            </q-btn>
          </q-card-section>
        </q-card>
      </q-dialog>
    </q-card>
  </div>
</template>

<script lang="ts" setup>
import { Ref, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { UserService } from '../service';
import { IUser } from 'src/interfaces/user.interface';
import { QForm, QTable } from 'quasar';
import { rules } from 'src/helpers/rules';
const router = useRouter()
const userService = new UserService()
const addModal = ref(false)
const roles = ['ADMIN', 'USER']
const selectedRole: Ref<string | null> = ref(null)
const email: Ref<string | null> = ref('')
const loading = ref(false)
const users: Ref<IUser[]> = ref([])
const userForm: Ref<QForm | null> = ref(null)
const tableData: QTable['columns'] = [
  {
    label: 'Nombre',
    headerClasses: 'upp-text-terciary',
    field: (row: IUser) => `${row.first_name} ${row.last_name}`,
    classes: 'upp-text-terciary ellipsis',
    align: 'left',
    name: 'name'
  },
  {
    label: 'Rol',
    headerClasses: 'upp-text-terciary',
    field: (row: IUser) => row.roles,
    classes: 'upp-text-terciary ellipsis',
    align: 'left',
    name: 'role'
  },
  {
    label: 'Correo',
    headerClasses: 'upp-text-terciary',
    field: (row: IUser) => row.email,
    classes: 'upp-text-terciary ellipsis',
    align: 'left',
    name: 'email'
  }
]
const createUser = async () => {
  if (!userForm.value) return
  if (!await userForm.value.validate()) return
  await userService.createUser(loading, {
    email: email.value,
    role: selectedRole.value
  })
  addModal.value = false
  getUsers()
  email.value = null
  selectedRole.value = null
}
const getUsers = async () => {
  await userService.getAll('', users)
}
onMounted(() => {
  getUsers()
})
</script>
