<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="navbar">
    </q-header>

    <q-page-container>
      <div class="row">
        <q-img src="../assets/books.png" class="col-6" />
        <div class="col-4 row items-center justify-center">
          <router-view />
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<style scoped>
.img-container {
  width: 863.498px;
  transform: rotate(12.07deg);
  flex-shrink: 0;
}
</style>
