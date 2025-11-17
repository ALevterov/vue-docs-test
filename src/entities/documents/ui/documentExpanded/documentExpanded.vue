<script setup lang="ts">

import type {DocumentType} from "@/entities/documents/model/types/document.types.ts";

interface Props {
  doc: DocumentType;
}
const {doc} = defineProps<Props>();

const emit = defineEmits<{
  (e: 'remove', id: number): void,
  (e: 'download', doc: DocumentType): void,
}>()

const onDownLoad = () => emit('download', doc)

const onRemove = () => emit('remove', doc.id)


</script>

<template>
  <div class="document">
    <div class="document__image_wrapper">
      <img class="document__image" :src="doc.image || '/images/Rectangle.png'" :alt="doc.name" />
    </div>
    <div class="document__content">
      <div class="document__content_name title">{{doc.name}}</div>
      <div class="document__content_buttons">
        <button class="document__content_btn blue" @click="onDownLoad">Скачать</button>
        <button class="document__content_btn red" :disabled="!doc.image" @click="onRemove">Удалить</button>
      </div>
      <div class="document__content_description-title title">Описание:</div>
      <div class="document__content_description">
        {{doc.description}}
      </div>
      <div>

      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.title {
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 14px;
}
.document {
  padding: 30px;
  display: flex;
  gap: 60px;
  &__image {
    &_wrapper {
      width: calc(50% - 30px);
    }
    border: 1px solid #E0E0E0;
    width: 100%;
    height: auto;
    object-fit: contain;
  }
  &__content {
    display: flex;
    flex-direction: column;
    width: calc(50% - 30px);
    &_buttons {
      display: flex;
      gap: 17px;
      align-items: center;
      margin-bottom: 47px;
    }
    &_btn {
      font-weight: 400;
      font-size: 14px;
      padding: 7px 28px;
      border-radius: 8px;
      cursor: pointer;
      background: transparent;
      &.blue {
        border: 1px solid var(--blue);
        color: var(--blue);
      }
      &.red {
        border: 1px solid var(--red);
        color: var(--red);
      }
      &:disabled {
        border: 1px solid var(--grey);
        color: var(--grey);
        cursor: not-allowed;
      }
    }
  }
}
</style>
