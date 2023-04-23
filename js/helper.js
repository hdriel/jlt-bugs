function calcAdd(a, b) {
  return a + b;
}

function calcMinus(a, b) {
  return a - b;
}

function calcMultiple(a, b) {
  return a * b;
}

function calcDivider(a, b) {
  return a / b;
}

function oppositeOperatorBySign(op) {
  switch (op) {
    case "+":
      return calcMinus;
    case "-":
      return calcAdd;
    case "*":
      return calcDivider;
    case "/":
      return calcMultiple;
    default:
      throw `Operator '${op}' is not recognized`;
  }
}

function classifyOperationBySing(op) {
  switch (op) {
    case "+":
      return calcAdd;
    case "-":
      return calcMinus;
    case "*":
      return calcMultiple;
    case "/":
      return calcDivider;
    default:
      throw `Operator '${op}' is not recognized`;
  }
}

function calcEquation(a, b, c, op) {
  const func = classifyOperationBySing(op);
  const oppositeFunc = oppositeOperatorBySign(op);
  if (c === null) return func(a, b);
  if (b === null) {
    if (["+", "-"].includes(op)) {
      return func(c, a);
    } else if (["*", "/"].includes(op)) {
      return oppositeFunc(c, a);
    }
  }
  if (a === null) return oppositeFunc(c, b);
}
