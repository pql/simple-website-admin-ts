import type { Directive, App } from 'vue';

function getInput(el) {
  let inputEle;
  const { tagName } = el;
  if (tagName === 'INPUT' || tagName === 'TEXTAREA') {
    inputEle = el;
  } else {
    inputEle = el.querySelector('input');
    if (!inputEle) {
      inputEle = el.querySelector('textarea');
    }
  }
  return inputEle;
}

function dispatchEvent(el: HTMLElement, type) {
  const evt = document.createEvent('HTMLEvents');
  evt.initEvent(type, true, true);
  el.dispatchEvent(evt);
}

const Trim: Directive = {
  mounted: (el) => {
    if (!el) return;
    const inputEle = getInput(el);
    const handler = function (event) {
      const newVal = event.target.value.trim();
      if (event.target.value != newVal) {
        event.target.value = newVal;
        dispatchEvent(inputEle, 'input');
      }
    };
    el.inputEle = inputEle;
    el._blurHandler = handler;
    inputEle?.addEventListener('blur', handler);
  },

  beforeUnmount(el) {
    const { inputEle } = el;
    inputEle?.removeEventListener('blur', el._blurHandler);
  },
};
export function setupTrimDirective(app: App) {
  app.directive('trim', Trim);
}
export default Trim;
