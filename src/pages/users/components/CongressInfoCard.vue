<template>
  <q-card bordered>
    <q-card-section class="row items-center justify-between">
      <span class="upp-text-primary">
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
      <q-btn unelevated v-else @click="isEditing = !isEditing" no-caps color="primary">
        <div class="row items-center">
          <span class="q-mr-sm">
            Guardar
          </span>
          <q-icon name="save" size="16px"></q-icon>
        </div>

      </q-btn>
    </q-card-section>
    <q-separator></q-separator>
    <q-card-section class="row justify-between items-center q-gutter-y-md" v-if="!isEditing">
      <div class="col row items-center justify-start">
        <div class="img-unknown row items-center justify-center">
          <q-icon name="person" size="60px">

          </q-icon>
        </div>
      </div>
      <div class="col-10 row">
        <div class="col-6">
          <span class="upp-text-primary">
            Nombre:
          </span>
          <span class="upp-text-secondary">
            Angel
          </span>
        </div>
        <div class="col-6">
          <span class="upp-text-primary">
            Email personal:
          </span>
          <span class="upp-text-secondary">
            Angel
          </span>
        </div>
        <div class="col-6">
          <span class="upp-text-primary">
            Email institucional:
          </span>
          <span class="upp-text-secondary">
            Angel
          </span>
        </div>
        <div class="col-6">
          <span class="upp-text-primary">
            Teléfono:
          </span>
          <span class="upp-text-secondary">
            Angel
          </span>
        </div>
      </div>
    </q-card-section>
    <q-card-section class="row justify-between items-center q-gutter-y-md" v-else>
      <div class="col row items-center justify-start">
        <q-btn class="img-unknown row items-center justify-center">
          <q-icon name="person" size="60px">

          </q-icon>
        </q-btn>
      </div>
      <div class="col-10 row q-gutter-y-sm">
        <div class="col-6 row">
          <q-input class="col-8" label="Nombre" dense></q-input>
        </div>
        <div class="col-6 row">
          <q-input class="col-8" label="Email personal" dense></q-input>
        </div>
        <div class="col-6 row">
          <q-input class="col-8" label="Email institucional" dense></q-input>

        </div>
        <div class="col-6 row">
          <q-input class="col-8" label="Teléfono" dense></q-input>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref } from 'vue';

const isEditing = ref(false)
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
