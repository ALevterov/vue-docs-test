<script setup lang="ts">

import {useDocumentStore} from "@/entities/documents/model/store/document.store.ts";
import {onMounted} from "vue";
import FileBoard from "@/widgets/fileBoard/ui/fileBoard.vue";

const documents = useDocumentStore()

onMounted(async () => {
  await documents.load()
  console.log(documents.items)
})


</script>

<template>
  <div class="dashboard__page">
    <div class="container">
      <div class="dashboard__head">
        <div class="dashboard__head__title">
          MyApp
        </div>
        <div class="dashboard__head__user">
          Username
        </div>
      </div>
      <file-board />
    </div>
  </div>
</template>

<style scoped lang="scss">
.dashboard {
  &__page {
    padding-top: 41px;
    padding-bottom: 58px;
  }
  &__head {
    display: flex;
    justify-content: space-between;
    margin-bottom: 35px;
    align-items: center;
    &__title {
      font-weight: 700;
      font-size: 32px;
    }
    &__user {
      font-weight: 400;
      font-size: 16px;
    }
  }
}
</style>
