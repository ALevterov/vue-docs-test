export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay = 300
) {
  let timer: number | null = null

  return function(this: any, ...args: Parameters<T>) {
    if (timer) clearTimeout(timer)

    timer = window.setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}
