<script setup lang="ts">
import {computed, watch} from 'vue'
import {debounce, useInput} from "@/shared/lib/hooks";
import {useDocumentStore} from "@/entities/documents/model/store/document.store.ts";
import DocumentCard from "@/entities/documents/ui/documentCard/documentCard.vue";
import DocumentExpanded from "@/entities/documents/ui/documentExpanded/documentExpanded.vue";
import type {DocumentType} from "@/entities/documents/model/types/document.types.ts";

const {value: search, onInput} = useInput('')

const store = useDocumentStore()

const debouncedSearch = debounce((value) => {
  store.searchDocuments(value)
}, 400)

watch(search, (value) => {
  debouncedSearch(value)
})

const selectedDoc = computed(() => store.items.find(item => item.selected))

const onDocumentClicked = (id: number) => {
  store.selectOne(id)
}

const onDocumentRemove = (id: number) => {
    store.removeOne(id)
}

const onDocumentDownload = (doc: DocumentType) => {
  const {selected, ...docToSave} = doc
  const text = JSON.stringify(docToSave, null, 2)

  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })

  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = `${doc.name}.txt`

  link.click()

  URL.revokeObjectURL(link.href)
}

</script>

<template>
    <div class="board">
      <div class="board__sidebar">
          <div class="board__sidebar_title title">Поиск документа</div>
          <input :value="search" @input="onInput" class="board__sidebar_search" type="text" >
          <div class="board__sidebar_result title">Результаты</div>
          <div class="board__sidebar_result_docs">
            <document-card v-for="item in store.items" :key="item.id" :doc="item" @clicked="onDocumentClicked" />
            {{!store.items.length ? "Ничего не найдено" : null}}
          </div>
      </div>
      <div class="board__view_field">
          <document-expanded v-if="selectedDoc" :doc="selectedDoc" @remove="onDocumentRemove" @download="onDocumentDownload"/>
          <div v-else class="board__view_field-placeholder">"Выберите документ, чтобы посмотреть его содержиое"</div>
      </div>
    </div>
</template>

<style scoped lang="scss">
  .board {
    display: flex;
    height: 575px;
    box-shadow: 0px 0px 10px 0px #0000001A;
    border-radius: 10px;

    @media (max-width: 1024px) {
      flex-direction: column;
    }

    &__sidebar {
      width: 282px;
      padding: 27px 20px 20px 20px;
      display: flex;
      flex-direction: column;
      max-height: 100%;

      @media (max-width: 1024px) {
        width: 100%;
      }

      &_search {
        font-weight: 400;
        font-size: 14px;
        padding: 16px 24px;
        border: 1.5px solid #E9ECEF;
        border-radius: 8px;
        margin-bottom: 29px;
      }

      &_result {
        font-weight: 400;
        font-size: 14px;

        &_docs {
          display: flex;
          flex-direction: column;
          gap: 18px;
          overflow-y: auto;
        }
      }
    }
    &__view {
      &_field {
        border-left: 1px solid #E0E0E0;
        flex-grow: 1;

        @media (max-width: 1024px) {
          min-height: 400px;
          border-left: none;
          border-top: 1px solid #E0E0E0;
        }

        &-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;

          font-weight: 400;
          font-size: 14px;
          color: var(--grey);
        }
      }
    }
  }
  .title {
    font-weight: 600;
    font-size: 16px;
    line-height: 140%;
    margin-bottom: 14px;
  }
</style>
