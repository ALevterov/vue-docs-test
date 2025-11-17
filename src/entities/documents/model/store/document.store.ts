import {defineStore} from "pinia";
import {api} from "@/entities/documents/api";
import {useToast} from "vue-toastification";
import type {DocumentState} from "@/entities/documents/model/types/document.types.ts";

const toast = useToast();

export const useDocumentStore = defineStore('documents', {
  state: (): DocumentState => ({
    items: [],
    selected: null,
    loading: false,
    error: null,
  }),
  actions: {
    async load() {
      this.loading = true;
      this.error = null;

      try {
        const res = await api.get('/user/docs');
        this.items = res.data;
      } catch (e) {
        useToast().error("Ошибка загрузки документов")
      }
    },
    selectOne(id: number) {
      this.items.forEach(doc => doc.selected = doc.id === id)
    },
    removeOne(id: number) {
      this.items = this.items.filter(doc => doc.id !== id)
    }
  }
})
