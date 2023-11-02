export function onDOMChange(element, fn) {
  new MutationObserver(() => {
    fn.call(element)
  }).observe(element, { childList: true })  
}

