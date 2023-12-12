<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="navbar">
      <q-toolbar class="row justify-between q-px-xl">
        <div>
          <q-img src="~assets/logo.png" width="230px" />
        </div>
        <div v-if="isLoggedIn">
          <q-btn class="btn-primary" unelevated :to="{ name: 'Login' }">
            <div>Iniciar Sesión</div>
            <q-icon name="login" />
          </q-btn>
        </div>
        <div v-else>
          <q-btn class="btn-primary" unelevated :to="{ name: 'Login' }">
            <div class="row justify-between items-center">
              <span>Mi perfil</span>
              <q-icon name="person" size="14px" />
            </div>
          </q-btn>
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
import { computed, defineComponent } from 'vue';
export default defineComponent({
  name: 'MainLayout',
  setup() {
    const store = useLoginStore()
    const isLoggedIn = computed(() => !!store.token)
    return {
      isLoggedIn
    }
  }
});
</script>
