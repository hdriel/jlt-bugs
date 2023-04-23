function TextElement(elementId) {
  let value = "";
  let element = document.getElementById(elementId);

  function init() {
    element ||= document.getElementById(elementId);
  }

  function updateValue(newValue) {
    value = newValue;
    render(value);
  }

  function render(value) {
    if (element) element.innerText = `${value}`;
  }

  function remove() {
    if (element) {
      element.remove();
      element = null;
    }
  }

  return {
    init,
    remove,
    update: updateValue,
    getValue: () => value,
    reset: () => updateValue(0),
  };
}
