<template>
  <q-page class="row items-center justify-center container">
    <div>
      <div class="row col-12 justify-center text-center q-py-md">
        <p class="col-12 message__secondary">Bienvenido</p>
        <p class="col-12 message__main">correcamino</p>
      </div>
      <div class="col-12 row justify-center">
        <q-input class="col-12 input" :model-value="search" placeholder="Buscar por carrera o docente" outlined rounded
          input-class="placeholder">
          <template #prepend>
            <q-icon name="search" class="placeholder"></q-icon>
          </template>
        </q-input>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'IndexPage',
  setup() {
    const search = ref('');
    return {
      search,
    };
  },
});
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
</style>
