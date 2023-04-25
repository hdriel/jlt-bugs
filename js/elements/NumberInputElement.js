function NumberInputElement(elementId) {
  let value = 0;
  let element = document.getElementById(elementId);

  function init() {
    element ||= document.getElementById(elementId);
    if (!element) return;

    element.addEventListener("change", (event) => {
      if (event.target.value !== "") value = +event.target.value;
    });

    element.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        setTimeout(() => triggerEvent(GLOBAL_EVENTS.PRESS_KEY_ENTER, event));
      }
    });
  }

  function updateValue(newValue) {
    value = newValue;
    render(value);
  }

  function render(value) {
    if (!element) return;
    element.value = value;
  }

  function disabled(isDisabled) {
    if (!element) return;

    if (typeof isDisabled === "boolean") {
      if (isDisabled) element.setAttribute("disabled", true);
      else element.removeAttribute("disabled");
    }

    if (isDisabled === undefined) return element.getAttribute("disabled");
  }

  function remove() {
    if (element) {
      element.remove();
      element = null;
    }
  }

  return {
    init,
    disabled,
    remove,
    update: updateValue,
    getValue: () => value,
    reset: () => updateValue(0),
    inc: () => updateValue(value + 1),
    dec: () => updateValue(value - 1),
    element: element,
  };
}
