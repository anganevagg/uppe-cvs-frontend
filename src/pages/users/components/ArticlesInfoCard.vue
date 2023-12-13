<template>
  <q-card bordered>
    <q-card-section class="row items-center justify-between">
      <span class="upp-text-primary text-h6">
        Artículos publicados
      </span>
      <q-btn unelevated color="primary" no-caps @click="addDialog = true">
        <div class="row items-center">
          <span class="q-mr-sm">
            Agregar
          </span>
          <q-icon name="add" size="16px"></q-icon>
        </div>
      </q-btn>
    </q-card-section>
    <q-separator></q-separator>
    <q-card-section class="row justify-between items-center q-gutter-y-md">
      <q-table class="col-12" hide-pagination :rows-per-page-options="[0]" :columns="tableData" :rows="articles"
        table-class="text-body1">
        <template #no-data>
          <div class="row justify-center full-width">
            <span class="upp-text-terciary">
              No hay artículos publicados aún
            </span>
          </div>
        </template>
        <template #body-cell-files="props">
          <q-td :props="props">
            <q-btn unelevated flat stretch padding="none" :href="props.row.file_url" v-if="props.row.file_url">
              <q-icon name="description">

              </q-icon>
            </q-btn>
          </q-td>
        </template>
        <template #body-cell-actions="props">
          <q-td :props="props">
            <div class="q-gutter-x-md">
              <q-btn unelevated flat stretch padding="none" :href="props.row.file_url"
                @click="deleteArticle(props.row.id)">
                <q-icon name="delete">

                </q-icon>
              </q-btn>
              <q-btn unelevated flat stretch padding="none" :href="props.row.file_url">
                <q-icon name="edit">

                </q-icon>
              </q-btn>
            </div>
          </q-td>
        </template>
      </q-table>
    </q-card-section>
    <q-dialog v-model="addDialog" @hide="addDialog = false" @keyup.esc="addDialog = false" persistent>
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section class="row justify-between items-center">
          <span class="text-h5 upp-text-primary">
            Agregar artículo
          </span>
          <q-btn icon="close" padding="none" unelevated @click="addDialog = false">

          </q-btn>
        </q-card-section>
        <q-separator></q-separator>
        <q-card-section>
          <q-form class="row q-col-gutter-md" ref="articleForm">
            <q-input label="Titulo" class="col-6" dense v-model="title" :rules="rules.required" />
            <q-select label="Autores" class="col-6" dense use-input use-chips multiple hide-dropdown-icon
              v-model="authors" new-value-mode="add" :rules="rules.required" />
            <q-input label="DOI" class="col-6" dense v-model="doi" />
            <q-input label="URL" class="col-6" dense v-model="url" />
            <q-input label="Fecha de publicación" class="col-6" dense type="date" v-model="date"
              :rules="rules.required" />
          </q-form>
        </q-card-section>
        <q-card-section class="row justify-end">
          <q-btn no-caps color="primary" @click="createArticle" :loading="loading">Guardar</q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-card>
</template>

<script setup lang="ts">
import { QForm, QTable } from 'quasar';
import { IArticle } from 'src/interfaces/article.interface';
import { Ref, ref } from 'vue';
import { UserService } from '../service';
import { IUser } from 'src/interfaces/user.interface';
import { rules } from 'src/helpers/rules';
const userService = new UserService()
const props = defineProps<{
  articles: IArticle[] | undefined,
  user: IUser | null
}>()
const emit = defineEmits(['getMe'])
const articleForm: Ref<QForm | null> = ref(null)
const addDialog = ref(false)
const isEdit = ref(false)
const title: Ref<string | null> = ref(null)
const url: Ref<string | null> = ref(null)
const authors: Ref<string[]> = ref([])
const doi: Ref<string | null> = ref(null)
const date: Ref<string | null> = ref(null)
const loading = ref(false)
const tableData: QTable['columns'] = [
  {
    label: 'Título',
    headerClasses: 'upp-text-terciary',
    field: (row: IArticle) => row.title,
    classes: 'upp-text-terciary ellipsis',
    align: 'left',
    name: 'title'
  },
  {
    label: 'Fecha de publicación',
    headerClasses: 'upp-text-terciary',
    field: (row: IArticle) => formatDate(row.publication_date),
    classes: 'upp-text-terciary ellipsis',
    align: 'left',
    name: 'date'
  },
  {
    label: 'Autores',
    headerClasses: 'upp-text-terciary',
    field: (row: IArticle) => row.authors.join(', '),
    classes: 'upp-text-terciary ellipsis',
    align: 'left',
    name: 'authors',
    style: 'width: 200px'
  },
  {
    label: 'Enlace',
    headerClasses: 'upp-text-terciary',
    field: (row: IArticle) => row.url ?? '--',
    classes: 'upp-text-terciary ellipsis',
    align: 'left',
    name: 'link',
    style: 'width: 100px'
  },
  {
    label: 'DOI',
    headerClasses: 'upp-text-terciary',
    field: (row: IArticle) => row.doi,
    classes: 'upp-text-terciary ellipsis',
    align: 'left',
    name: 'doi'
  },
  {
    label: 'Archivos',
    headerClasses: 'upp-text-terciary',
    field: '',
    classes: 'upp-text-terciary ellipsis',
    align: 'left',
    name: 'files',
    style: 'width: 30px'

  },
  {
    label: '',
    headerClasses: 'upp-text-terciary',
    field: '',
    classes: 'upp-text-terciary',
    align: 'right',
    name: 'actions',
    style: 'width: 30px'
  },
]
const formatDate = (date: string) => {
  const dateObj = new Date(date)
  return Intl.DateTimeFormat().format(dateObj)
}
const createArticle = async () => {
  if (!articleForm.value) return
  if (!await articleForm.value.validate()) return
  if (!date.value || !title.value || !props.user?.id) return
  await userService.createArticle(loading, {
    authors: authors.value,
    doi: doi.value,
    url: url.value,
    publication_date: date.value,
    title: title.value
  }, props.user.id)
  addDialog.value = false
  emit('getMe')
}
const deleteArticle = async (id: string) => {
  await userService.deleteArticle(id)
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
