function NumberInputElement(elementId) {
  let value = 0;

  function init() {
    const element = document.getElementById(elementId);
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
    const element = document.getElementById(elementId);
    if (element) element.value = value;
  }

  function disabled(isDisabled) {
    const element = document.getElementById(elementId);
    if (element) {
      if (isDisabled === undefined) {
        return element.getAttribute("disabled");
      }
      element.setAttribute("disabled", isDisabled);
    }
  }

  return {
    init,
    disabled,
    update: updateValue,
    getValue: () => value,
    reset: () => updateValue(0),
    inc: () => updateValue(value + 1),
    dec: () => updateValue(value - 1),
  };
}
