export function MakeElement<T extends HTMLElement>(
  type: keyof HTMLElementTagNameMap,
  key: string,
) {
  const Element = document.createElement(type);
  Element.id = key;
  Element.className = key;
  return Element as T;
}
