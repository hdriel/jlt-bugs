function NumberInputElement(elementId) {
  let value = 0;
  let element = document.getElementById(elementId);

  function init() {
    element ||= document.getElementById(elementId);
    if (element)
      element.addEventListener("change", (event) => {
        value = +event.target.value || 0;
      });
  }

  function updateValue(newValue) {
    value = newValue;
    render(value);
  }

  function render(value) {
    if (element) element.value = value;
  }

  function disabled(isDisabled) {
    if (element) {
      if (isDisabled === undefined) {
        return element.getAttribute("disabled");
      }
      element.setAttribute("disabled", isDisabled);
    }
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
  };
}
