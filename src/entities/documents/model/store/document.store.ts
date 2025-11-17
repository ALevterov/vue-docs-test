import {defineStore} from "pinia";
import {api} from "@/entities/documents/api";
import {useToast} from "vue-toastification";
import type {DocumentState} from "@/entities/documents/model/types/document.types.ts";

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
        this.error = e as string;
        useToast().error(e)
      }
    },
    async searchDocuments(search: string) {
      if (!search) {
        this.items = []
        return
      }

      this.loading = true
      try {
        const { data } = await api.get(`/user/docs`, {
          params: { search },
        })
        this.items = data
      } catch(e) {
        this.error = e as string;
        useToast().error(e)
      }
      finally {
        this.loading = false
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
