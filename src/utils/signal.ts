type TListener<T> = (value: T) => void

class Signal<T = void> {
  private listeners: TListener<T>[] = []

  public on(listener: TListener<T>) {
    this.listeners.push(listener)
  }

  public dispatch(value: T) {
    this.listeners.forEach((listener) => listener(value))
  }
}

export { Signal }
