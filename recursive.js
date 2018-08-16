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
  return recursiveCheck("", 0, input, []);
};

const recursiveCheck = (previousCharacter, index, input, openCharacters) => {
  if (index >= input.length) {
    // we only get here if we still have something that hasn't been closed
    return false;
  }
  let currentCharacter = input[index];
  if (open.includes(currentCharacter)) {
    // we have an open character, continue to the next
    let newOpenCharacters = openCharacters;
    newOpenCharacters.push(currentCharacter);
    return recursiveCheck(
      currentCharacter,
      index + 1,
      input,
      newOpenCharacters
    );
  } else {
    // we have a closing character, does it match its open partner
    if (isMatching(previousCharacter, currentCharacter)) {
      if (index === input.length - 1) {
        // we are at the end of the input
        return true;
      } else {
        let newOpenCharacters = openCharacters;
        newOpenCharacters.pop();
        return recursiveCheck(
          newOpenCharacters[newOpenCharacters.length - 1],
          index + 1,
          input,
          newOpenCharacters
        );
      }
    } else {
      return false;
    }
  }
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
