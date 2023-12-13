<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="navbar">
      <q-toolbar class="row q-px-xl">
        <div class="col-12 row justify-between">
          <q-btn :to="{ path: '/' }" unelevated flat>

            <q-img src="~assets/logo.png" width="230px" />
          </q-btn>
          <div>

            <q-btn :to="{
              name: 'Users'
            }" unelevated color="primary" no-caps>
              Administrar usuarios
            </q-btn>
            <q-btn @click="endSession" unelevated flat no-caps>
              Cerrar sesión
            </q-btn>
          </div>
        </div>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { useLoginStore } from 'src/stores/login';
import { Ref, computed, defineComponent, onMounted, ref } from 'vue';
import { IUser } from 'src/interfaces/user.interface'
import { UserService } from 'src/pages/users/service'
import { useRouter } from 'vue-router';
export default defineComponent({
  name: 'MainLayout',
  setup() {
    const router = useRouter()

    const store = useLoginStore()
    const isLoggedIn = computed(() => !!store.token)
    const userData: Ref<IUser | null> = ref(null)
    const userService = new UserService()

    const getMe = async () => {
      await userService.getMe(userData)
    }
    const endSession = () => {
      store.deleteToken()
      router.push({
        path: '/'
      })

    }
    const isRoot = computed(() => userData.value?.roles == 'ROOR')
    onMounted(async () => {
      await getMe()
    })
    return {
      isLoggedIn,
      endSession,
      isRoot
    }
  }
});
</script>
