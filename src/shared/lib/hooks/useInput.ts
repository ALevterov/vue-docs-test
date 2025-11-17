import { ref } from 'vue'

export function useInput(initialValue: string) {
  const value = ref<string>(initialValue)

  const onInput = (event: Event) => {
    const target = event.target as HTMLInputElement
    value.value = target.value
  }

  const setValue = (v: string) => {
    value.value = v
  }

  const reset = () => {
    value.value = initialValue
  }

  return { value, onInput, setValue, reset }
}
