let open = "{([";
let close = "})]";

// Check if a current character is a matching sibling to its previous character
const isMatching = (previousCharacter, currentCharacter) => {
  if (previousCharacter === "{" && currentCharacter == "}") {
    return true;
  } else if (previousCharacter === "[" && currentCharacter == "]") {
    return true;
  } else if (previousCharacter === "(" && currentCharacter == ")") {
    return true;
  }
  return false;
};

const isValidOpenAndClose = input => {
  // short circuit fail
  if (input === undefined || input == "" || input.length % 2 !== 0) {
    return false;
  }

  // store characters in array
  let chars = [];

  for (let i = 0; i < input.length; i++) {
    let currentCharacter = input[i];

    if (open.includes(currentCharacter)) {
      // we have an opening character, add it to the array
      chars.push(currentCharacter);
    } else {
      // we have a closin character, is it the correct closing character
      let previousChar = chars[chars.length - 1];
      if (isMatching(previousChar, currentCharacter)) {
        // we have a good match, remove the last element from the array
        chars.pop();
      } else {
        return false;
      }
    }
  }

  if (chars.length > 0) {
    // we ended without closing everything
    return false;
  }

  return true;
};

// quick assertions for testing
const assertIsTrue = value => {
  if (value) {
    //console.log("pass");
  } else {
    console.log("fail");
  }
};
const assertIsFalse = value => {
  assertIsTrue(!value);
};

console.log("starting test");

console.log("empty string test");
assertIsFalse(isValidOpenAndClose(""));

console.log("odd number test");
assertIsFalse(isValidOpenAndClose("("));

console.log("valid ({[]})");
assertIsTrue(isValidOpenAndClose("({[]})"));

console.log("valid (){}[]");
assertIsTrue(isValidOpenAndClose("(){}[]"));

console.log("valid ({}[])");
assertIsTrue(isValidOpenAndClose("({}[])"));

console.log("invalid ({]");
assertIsFalse(isValidOpenAndClose("({]"));

console.log("invalid ]()[");
assertIsFalse(isValidOpenAndClose("]()["));

console.log("invalid ((((");
assertIsFalse(isValidOpenAndClose("(((("));

console.log("invalid (((()");
assertIsFalse(isValidOpenAndClose("(((()"));
