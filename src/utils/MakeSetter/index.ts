export function Setter<T>(initialState: T): [() => T, (newState: T) => void] {
  let value = initialState;

  function getValue() {
    return value;
  }

  function setValue(newState: T) {
    value = newState;
  }

  return [getValue, setValue];
}
