<script setup lang="ts">
import type {DocumentType} from "../../model/types/document.types.ts";

interface Props {
  doc: DocumentType,
}

const {doc} = defineProps<Props>()

const emit = defineEmits<{
  (e: 'clicked', id: number): void,
}>()

const onClick = () => emit('clicked', doc.id)

</script>

<template>
    <div class="document" @click="onClick">
      <img class="document__image" :src="doc.image || '/images/Rectangle.png'" :alt="doc.name" />
      <div :class="['document__content', {selected: doc.selected}]">
        <div class="document__content_name">{{doc.name}}</div>
        <div class="document__content_description">12 MB</div>
      </div>
    </div>
</template>

<style scoped lang="scss">
  .document {
    cursor: pointer;
    display: flex;
    min-height: 70px;
    box-shadow: 0px 0px 10px 0px #0000001A;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
    overflow: hidden;
    &__image {
      width: 70px;
      height: 70px;
      max-width: 70px;
    }
    &__content {
      &.selected {
        background: var(--blue);
        &_name, &_description {
          color: #F8F9FA;
        }
      }
      display: flex;
      flex-grow: 1;
      flex-direction: column;
      gap: 6px;
      padding: 15px;
      border-left: 1px solid #E0E0E0;
      &_name {
        font-weight: 600;
        font-size: 14px;
      }
      &_description {
        font-weight: 400;
        font-size: 14px;
      }
    }
  }
</style>
